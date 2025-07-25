const UserService = require('../services/user.service');

class SessionController {
    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res) {
        try {
            const newUser = await this.userService.registerUser(req.body);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    loginSuccess(req, res) {
   
        res.status(200).json({ message: 'Logged in successfully', user: req.user });
    }

    logout(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.status(200).json({ message: 'Logged out successfully' });
        });
    }

    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            const result = await this.userService.requestPasswordReset(email);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    async resetPassword(req, res) {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            const result = await this.userService.resetPassword(token, newPassword);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new SessionController(UserService);