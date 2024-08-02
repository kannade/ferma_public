import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { UserRoles } from "../models/users.model";
import Firmware from "../models/firmwares.model";
import { LoginRequest, RegisterRequest } from "../dtos/auth.dto";
import { JwtPayload } from "../utils/utils";
import { Op } from "sequelize";

class UserService {
  // async createUser(userDTO: RegisterRequest) {
  //   const hashPassword = await bcrypt.hash(userDTO.userPass, 10);
  //   const user = await User.create({
  //     user_email: userDTO.userEmail,
  //     user_pass: hashPassword,
  //     user_login: userDTO.userName,
  //     user_registered: new Date(),
  //     user_status: UserRoles.USER,
  //     user_lastlogin: new Date(),
  //     user_phone: userDTO.userPhone,
  //   });

  //   return user.toJSON();
  //}

  async getAllUsers() {
    const users = User.findAll();

    return users;
  }

  async getProfile(accessToken: string) {
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return undefined;
    }

    const version = await Firmware.findOne({
      where: {
        [Op.or]: [{ ferma_id: 0 }],
        begda: {
          [Op.lte]: new Date(),
        },
        endda: {
          [Op.gte]: new Date(),
        },
      },
    });

    return { login: user.user_login, version: version?.version };
  }

  // async getUser(loginDTO: LoginRequest) {
  //   const user = await User.findOne({
  //     where: {
  //       user_email: loginDTO.userEmail,
  //     },
  //   });
  //   if (!user) return { token: undefined };
  //   let accessToken = "";
  //   let refreshToken = "";

  //   // const hashFrom = await bcrypt.hash(loginDTO.password, 10) Типичная ошибка, коллеги!

  //   // console.log('user', user[0].dataValues);
  //   // console.log('loginDTO', loginDTO);

  //   if (
  //     loginDTO.userEmail === user.dataValues.user_email &&
  //     (await bcrypt.compare(loginDTO.userPass, user.dataValues.user_pass))
  //   ) {
  //     accessToken = jwt.sign(
  //       {
  //         userEmail: user.dataValues.user_email,
  //         userId: user.dataValues.user_id,
  //       },
  //       process.env.JWT_SECRET as string,
  //       { expiresIn: "1h" }
  //     );
  //     refreshToken = jwt.sign(
  //       {
  //         userEmail: user.dataValues.user_email,
  //         userId: user.dataValues.user_id,
  //       },
  //       process.env.JWT_SECRET_REFRESH as string,
  //       { expiresIn: "7d" }
  //     );
  //   }
  //   return {
  //     accessToken,
  //     refreshToken,
  //     userEmail: loginDTO.userEmail,
  //     userName: user.dataValues.user_login,
  //   };
  // }
}

export default new UserService();
