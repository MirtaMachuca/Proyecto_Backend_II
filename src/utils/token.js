import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateResetToken = (payload) =>
  jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

export const verifyResetToken = (token) =>
  jwt.verify(token, process.env.SECRET);
