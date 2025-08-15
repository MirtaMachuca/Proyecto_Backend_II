import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No se proporcionó token.' });
  }

  const token = authHeader.split(' ')[1]; 
  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }
};

export default authMiddleware;