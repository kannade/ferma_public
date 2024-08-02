import { Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();

    res.json(users);
  }

  async getProfile(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    const accessToken =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    // console.log("refreshToken2", refreshToken);
    // console.log("accessToken2", accessToken);
    if (!accessToken) {
      return res.status(401).send("Access Denied. No access token provided.");
    }
    const users = await userService.getProfile(accessToken);

    res.json(users);
  }
}

export default new UserController();
