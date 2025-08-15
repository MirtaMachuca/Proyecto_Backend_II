import userService from '../services/user.service.js';
import transporter from '../config/nodemailer.config.js';

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const token = await userService.requestPasswordReset(email);

    const resetUrl = `http://localhost:3000/api/reset-password/${token}`;
    const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Recuperación de contraseña',
      html: `
        <p>Has solicitado la recuperación de tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para restablecerla:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email de recuperación enviado.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Aquí iría el hasheo de la nueva contraseña
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {

  handleForgotPassword,
  handleResetPassword,
};