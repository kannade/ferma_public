import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import morgan from "morgan";
import logger from "./utils/logger";
import router from "./routes";
import { sequelize } from "./sequelize";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import MailService from "./controllers/email.controller";
import User from "./models/users.model";
import lb_users from "./models/users.model";

dotenv.config({
  path: `${__dirname}/env/.${process.env.NODE_ENV}.env`,
});

const server: Application = express();
const port = process.env.PORT || 3000;
// Use morgan for HTTP request logging
server.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || "secret",
    },
    (jwt_payload, done) => {
      console.log('JWT Payload:', jwt_payload);
      User.findByPk(jwt_payload.userId)
        .then((user: lb_users | null) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err: unknown) => done(err, false));
      // done(null, user);
    }
  )
);

// passport.serializeUser((user: Express.User, done) => {
//   console.log("serializeUser", user);
//   done(null, user.userId);
// });

// passport.deserializeUser((userId: number, done) => {
//   console.log("deserializeUser", userId);
//   User.findByPk(userId).then((user) => {
//     done(null, user?.user_id);
//     return null;
//   });
// });

server.use(cookieParser());
// Body parsing Middleware
// parse requests of content-type - application/json
server.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: false }));
server.use(ErrorMiddleware);
// if (process.env.NODE_ENV === "dev") {
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Access-Control-Allow-Headers"
  // );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Auth-Token, User-agent"
  );
  next();
});
// }

server.options("/*", (_, res) => {
  res.sendStatus(200);
});

server.get(
  "/",
  async (req: Request, res: Response): Promise<Response> =>
    res.status(200).send({
      message: `Endpoints available at http://localhost:${port}/api/v1`,
    })
);

server.use("/api", router);

server.get("*", async (req: Request, res: Response): Promise<Response> => {
  return res.status(404).send({ message: "not found" });
});

async function start() {
  try {
    await sequelize.sync({ alter: false, force: false });
    logger.info("[OK] Sequelize synced!");

    logger.info("ENV = ", process.env.NODE_ENV);
    logger.info("DIRs = ", __dirname);

    const mailService = MailService.getInstance();
    if (process.env.NODE_ENV === "dev") {
      logger.info("TRY mailService DEV!");
      await mailService.createLocalConnection();
      logger.info("[OK] mailService DEV!");
    } else if (process.env.NODE_ENV === "prod") {
      logger.info("TRY mailService PROD!");
      await mailService.createConnection();
      logger.info("[OK] mailService PROD!");
    }

    server.listen(port, () => {
      logger.info(`[OK] Server running on http://localhost:${port}`);
    });
  } catch (e) {
    if (typeof e === "string") {
      e.toUpperCase();
    } else if (e instanceof Error) {
      logger.info(`[ERR] Error occurred: ${e.message}`);
    }
  }
}

start();
