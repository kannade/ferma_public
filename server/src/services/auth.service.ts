import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { UserRoles } from "../models/users.model";
import { LoginRequest, RegisterRequest } from "../dtos/auth.dto";
// import { UserResponse } from "../dtos/user.dto";
import { JwtPayload, generateTokens } from "../utils/utils";

class AuthService {
  async register(userDTO: RegisterRequest) {
    const userExist = await User.findOne({
      where: {
        user_email: userDTO.userEmail,
      },
    });
    if (!userExist) {
      const hashPassword = await bcrypt.hash(userDTO.userPass, 10);
      const user = await User.create({
        user_email: userDTO.userEmail,
        user_pass: hashPassword,
        user_login: userDTO.userName,
        user_role: UserRoles.USER,
        user_lastlogin: new Date(),
        user_phone: userDTO.userPhone,
        user_status: 1,
      });

      return user.toJSON();
    } else {
      return undefined;
    }
  }

  async login(loginDTO: LoginRequest) {
    const user = await User.findOne({
      where: {
        user_email: loginDTO.userEmail,
      },
    });
    if (!user)
      return {
        accessToken: "",
        refreshToken: "",
        userEmail: loginDTO.userEmail,
        userName: "",
        userId: 0,
        userRemember: false,
      };
    // const hashFrom = await bcrypt.hash(loginDTO.password, 10) Типичная ошибка, коллеги!

    // console.log('user', user[0].dataValues);
    // console.log('loginDTO', loginDTO);

    let tokens = {
      accessToken: "",
      refreshToken: "",
      userRemember: false,
      userEmail: user.dataValues.user_email,
      userName: user.dataValues.user_login,
      userId: user.dataValues.user_id,
    };

    if (
      loginDTO.userEmail === user.dataValues.user_email &&
      (await bcrypt.compare(loginDTO.userPass, user.dataValues.user_pass))
    ) {
      return generateTokens({
        userEmail: user.dataValues.user_email,
        userId: user.dataValues.user_id,
        userName: user.dataValues.user_login,
        userRemember: loginDTO.userRemember,
      });
    }

    return tokens;
  }

  async refresh(refreshToken: string) {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET_REFRESH as string
    ) as JwtPayload;

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return undefined;
    }

    return generateTokens(decoded);
  }
}

export default new AuthService();
