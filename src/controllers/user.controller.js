const UserService = require('../services/user.service');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res) {
        try {
            const user = await this.userService.registerUser(req.body);
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getProfile(req, res) {
        try {
         
            const user = await this.userService.getUserProfile(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    
}

module.exports = new UserController(UserService);