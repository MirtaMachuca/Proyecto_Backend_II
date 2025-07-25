import nodemailer from 'nodemailer';
import config from '../config/index.js'; 

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.EMAIL_USER, 
                pass: config.EMAIL_PASS 
            }
        });
    }

    async sendEmail(to, subject, htmlContent) {
        const mailOptions = {
            from: config.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to ${to}`);
            return true;
        } catch (error) {
            console.error(`Error sending email to ${to}:`, error);
            throw new Error('Could not send email. Please try again later.');
        }
    }

    async sendPasswordResetEmail(to, resetLink) {
        const subject = 'Recuperación de Contraseña - Tu Aplicación';
        const htmlContent = `
            <h1>Recuperación de Contraseña</h1>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${resetLink}">Restablecer Contraseña</a>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste un restablecimiento de contraseña, ignora este correo electrónico.</p>
        `;
        return this.sendEmail(to, subject, htmlContent);
    }
}

export default new EmailService();