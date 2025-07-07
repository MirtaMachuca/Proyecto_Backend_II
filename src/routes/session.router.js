import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = Router();
const JWT_SECRET = "jwtSecret";


router.post("/register", passport.authenticate("register", { session: false }), (req, res) => {
  res.json({ message: "Usuario registrado correctamente", user: req.user });
});

router.post("/login", passport.authenticate("login", { session: false }), async (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "Login exitoso", token });
});


router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
