import { Router } from "express";
import userModel from "../models/user.model.js";
import { createHash } from "../utils/hash.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

router.get("/:uid", async (req, res) => {
  const user = await userModel.findById(req.params.uid);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
});

router.post("/", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const hashed = createHash(password);
  const user = await userModel.create({ first_name, last_name, email, age, password: hashed });
  res.status(201).json(user);
});

router.put("/:uid", async (req, res) => {
  const updated = await userModel.findByIdAndUpdate(req.params.uid, req.body, { new: true });
  res.json(updated);
});

router.delete("/:uid", async (req, res) => {
  await userModel.findByIdAndDelete(req.params.uid);
  res.json({ message: "Usuario eliminado" });
});

export default router;
