import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "secret",
};

passport.use(
  new JwtStrategy(opts, (user, done) => {
    done(null, user);
  })
);

// passport.use(
//   new Strategy(opts, async (payload, done) => {
//     try {
//       const user = lb_users.findById(payload.id);
//       if (user) return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );
