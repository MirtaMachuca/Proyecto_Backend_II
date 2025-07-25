// user.repository.js
const UserDao = require('../dao/user.dao');

class UserRepository {
    constructor(userDao) {
        this.userDao = userDao;
    }

    async createUser(userData) {
        return this.userDao.create(userData); 
    }

    async getUserById(id) {
        return this.userDao.findById(id);
    }

    async getUserByEmail(email) {
        return this.userDao.findByEmail(email);
    }

    async updateUser(id, newData) {
        return this.userDao.update(id, newData);
    }
}

module.exports = new UserRepository(UserDao);