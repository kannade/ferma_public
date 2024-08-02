import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import authService from "../services/auth.service";
import { JwtPayload, getCookiesAge } from "../utils/utils";
import User from "../models/users.model";
import UserToken from "../models/userTokens.model";
import MailService, { MailInterface } from "./email.controller";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await authService.register(req.body);
      if (newUser?.user_id) {
        return res.status(201).json({
          message: "Пользователь создан успешно! Теперь вы можете войти.",
        });
      } else {
        return res
          .status(409)
          .json({ message: "Пользователь с таким email уже существует!" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await authService.login(req.body);
      if (user.accessToken) {
        res.cookie("refreshToken", user.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: getCookiesAge(user.userRemember),
        });
        res.set("Authorization", `Bearer ${user.accessToken}`);
        res.send({
          accessToken: user.accessToken,
          userEmail: user.userEmail,
          userName: user.userName,
          userId: user.userId,
          message: "success",
        });
      } else {
        return res
          .status(404)
          .json({ message: "Пользователь с такими данными не существует!" });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error" });
      next(e);
    }
  }

  async reset(req: Request, res: Response, next: NextFunction) {
    const { userEmail } = req.body;
    try {
      const user = await User.findOne({
        where: {
          user_email: userEmail,
        },
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Пользователь с таким Email не существует!" });
      }

      if (user.user_id && user.user_email) {
        const resetToken = await UserToken.findOne({
          where: {
            user_id: user.user_id,
            token_type: 1,
            expires: { [Op.gte]: new Date() },
          },
        });

        let token = "";
        if (resetToken && resetToken.token) {
          token = resetToken.token;
        } else {
          token = crypto.randomBytes(20).toString("hex");
          const userToken = await UserToken.create({
            user_id: user.user_id,
            token,
            token_type: 1,
            created: new Date(),
            expires: new Date(Date.now() + 3600000), // 1 hour from now
          });

          if (!userToken) {
            return res.status(500).json({ message: "Ошибка создания токена!" });
          }
        }

        const resetUrl = `${process.env.HOST}/reset-password/${token}`;

        const mailOptions: MailInterface = {
          to: user.user_email,
          from: process.env.SMTP_USERNAME as string,
          subject: "Восстановление пароля",
          html: `Кто-то запросил восстановление пароля к вашему аккаунту на luckberry.ru.<br /><br />
               Для сброса пароля перейдите по <a href="${resetUrl}" target="_blank">ссылке</a>.<br /><br />
               Если это были не вы, проигнорируйте, пожалуйста, это письмо!`,
        };

        await MailService.getInstance()
          .sendMailMethod(mailOptions)
          .then((info) => {
            res.status(200).json({
              message:
                "Инструкция по восстановлению пароля отправлена на ваш Email!",
            });
          });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async resetPasswordGet(req: Request, res: Response, next: NextFunction) {
    try {
      const resetToken = await UserToken.findOne({
        where: {
          token: req.params.token,
        },
      });
      if (!resetToken) {
        return res.status(400).json({
          message: "Ошибка сброса пароля, попробуйте запросить письмо еще раз.",
        });
      }

      const user = await User.findByPk(resetToken.user_id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден." });
      }

      res.status(200).json({ token: req.params.token });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async resetPasswordPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { userPass, token } = req.body;
      const resetToken = await UserToken.findOne({
        where: {
          token,
          expires: { [Op.gte]: new Date() },
        },
      });
      if (!resetToken) {
        return res.status(400).json({
          message: "Ошибка сброса пароля, попробуйте запросить письмо еще раз.",
        });
      }

      const user = await User.findByPk(resetToken.user_id);
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден." });
      }

      user.user_pass = await bcrypt.hash(userPass, 10);
      await user.save();
      UserToken.destroy({
        where: {
          token,
        },
      });

      res.status(200).json({ message: "Пароль был успешно изменен!" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return res
          .status(401)
          .send("Access Denied. No refresh token provided.");
      }

      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH as string
      ) as JwtPayload;

      const user = await User.findByPk(decodedRefreshToken.userId);
      if (!user?.user_id || !user.user_status) {
        return res.status(404).send("User not found");
      }

      const tokens = await authService.refresh(refreshToken);

      res.cookie("refreshToken", tokens?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: getCookiesAge(tokens?.userRemember),
      });
      res.set("Authorization", `Bearer ${tokens?.accessToken}`);
      res.send({
        accessToken: tokens?.accessToken,
        userEmail: tokens?.userEmail,
        userId: tokens?.userId,
        userName: tokens?.userName,
        message: "success",
      });
    } catch (e) {
      return res.status(400).send("Invalid refresh token.");
    }
  }
}

export default new AuthController();
