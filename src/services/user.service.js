import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js'; 

const requestPasswordReset = async (email) => {

  const user = await userRepository.findByEmail(email); 
  if (!user) {
    throw new Error('No se encontró un usuario con ese email.');
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });


  await userRepository.updatePasswordResetToken(user._id, token, Date.now() + 3600000);

  return token;
};

const resetPassword = async (token, newPassword) => {

  const user = await userRepository.findByResetToken(token);

  if (!user) {
    throw new Error('El token de recuperación es inválido o ha expirado.');
  }
  await userRepository.updatePassword(user._id, newPassword);

  return user;
};

export {
  requestPasswordReset,
  resetPassword,
};