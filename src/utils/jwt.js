import jwt from 'jsonwebtoken';
import config from '../config/index.js'; 
const JWT_SECRET_KEY = config.SECRET;

const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
};

export {
    generateToken,
    verifyToken
};