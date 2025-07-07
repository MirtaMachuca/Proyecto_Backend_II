import passport from "passport";
import { loginLocal, registerLocal } from "./local.strategy.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "../../models/user.model.js";

const JWT_SECRET = "jwtSecret";

const initializedPassport = () => {
  passport.use("register", registerLocal);
  passport.use("login", loginLocal);

  passport.use("jwt", new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  }, async (jwt_payload, done) => {
    try {
      const user = await userModel.findById(jwt_payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }));

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializedPassport;
