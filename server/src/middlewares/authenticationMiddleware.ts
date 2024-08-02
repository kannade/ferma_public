import { Request, Response, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { JwtPayload, generateTokens, getCookiesAge } from "../utils/utils";
import User from "../models/users.model";

export const AuthenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false });
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(
      accessToken as string,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = await User.findByPk(decoded.userId);
    if (!user?.user_id || !user.user_status) {
      return res.status(404).send("User not found");
    }
    req.user = {
      userEmail: user?.user_email,
      userId: user?.user_id,
      userName: user?.user_login,
      accessToken: accessToken,
    };
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).send("Access Denied. No refresh token provided.");
    }

    try {
      console.log("GENERATE NEW ACCESS TOKEN");
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH as string
      ) as JwtPayload;

      const user = await User.findByPk(decodedRefreshToken.userId);
      if (!user?.user_id) {
        return res.status(404).send("User not found");
      }
      const tokens = generateTokens(decodedRefreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: getCookiesAge(tokens.userRemember),
      });
      req.user = user;
      res.locals.newAccessToken = tokens.accessToken;

      return next();
    } catch (error) {
      return res.status(400).send("Invalid Token.");
    }
  }
};
