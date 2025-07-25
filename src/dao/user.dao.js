
//const UserModel = require('../models/user.model');

class UserDao {
    constructor() {
        this.users = [];
        this.currentId = 1;
    }

    async create(userData) {
        const newUser = { id: this.currentId++, ...userData };
        this.users.push(newUser);
        return newUser;
    }

    async findById(id) {
        return this.users.find(u => u.id === id);
    }

    async findByEmail(email) {
        return this.users.find(u => u.email === email);
    }

    async update(id, newData) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return null;
        this.users[index] = { ...this.users[index], ...newData };
        return this.users[index];
    }
   
}

module.exports = new UserDao();