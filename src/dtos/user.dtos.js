// user.dto.js
class UserRegisterDTO {
    constructor(userData) {
        this.first_name = userData.first_name || '';
        this.last_name = userData.last_name || '';
        this.email = userData.email;
        this.password = userData.password;
        this.age = userData.age || null;
        this.role = userData.role || 'user'; 
    }
}

class UserProfileDTO {
    constructor(user) {
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
       
    }
}

module.exports = {
    UserRegisterDTO,
    UserProfileDTO
};