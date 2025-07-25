import UserRepository from '../repositories/user.repository.js';
import { UserRegisterDTO, UserProfileDTO } from '../dtos/user.dto.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import EmailService from './email.service.js';
import config from '../config/index.js'; 

class UserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    async requestPasswordReset(email) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new Error('User not found with that email.');
        }

        const token = generateToken({ id: user.id, email: user.email }, '1h');
        const resetLink = `${config.BASE_URL}/reset-password/${token}`; 

        await this.emailService.sendPasswordResetEmail(user.email, resetLink);
        return { message: 'Password reset link sent to your email.' };
    }

}

export default new UserService(UserRepository, EmailService);