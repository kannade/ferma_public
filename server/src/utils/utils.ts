import jwt from "jsonwebtoken";

export interface JwtPayload {
  userEmail: string;
  userId: number | undefined;
  userName: string;
  userRemember: boolean;
}

export const generateTokens = (user: JwtPayload) => {
  const userEmail = user.userEmail;
  const userId = user.userId;
  const userName = user.userName;
  const userRemember = user.userRemember;

  const accessToken = jwt.sign(
    {
      userEmail,
      userId,
      userName,
      userRemember,
    },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    {
      userEmail,
      userId,
      userName,
      userRemember,
    },
    process.env.JWT_SECRET_REFRESH || "your_refresh_jwt_secret",
    {
      expiresIn: userRemember ? "30d" : "1d",
    }
  );

  return {
    accessToken,
    refreshToken,
    userEmail,
    userId,
    userName,
    userRemember,
  };
};

export const getCookiesAge = (userRemember: boolean | undefined) => {
  return userRemember ? 30 * 24 * 60 * 60 * 1000 : 1 * 24 * 60 * 60 * 1000;
};
