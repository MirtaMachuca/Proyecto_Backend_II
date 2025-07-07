import { Strategy } from "passport-local";
import userModel from "../../models/user.model.js";
import { createHash, isValidPassword } from "../../utils/hash.js";

async function verifyRegister(req, username, password, done) {
  const { first_name, last_name, age, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: username });
    if (existingUser) return done(null, false, { message: "User already exists" });

    const hashedPassword = createHash(password);

    const newUser = await userModel.create({
      first_name,
      last_name,
      email: username,
      age,
      role,
      password: hashedPassword,
    });

    return done(null, newUser);
  } catch (error) {
    return done("Internal error");
  }
}

async function verifyLogin(req, username, password, done) {
  try {
    const user = await userModel.findOne({ email: username });
    if (!user || !isValidPassword(user, password)) {
      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, user);
  } catch (error) {
    return done("Internal error");
  }
}

export const registerLocal = new Strategy(
  { usernameField: "email", passReqToCallback: true },
  verifyRegister
);

export const loginLocal = new Strategy(
  { usernameField: "email", passReqToCallback: true },
  verifyLogin
);
