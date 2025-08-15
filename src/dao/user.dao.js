import User from '../../models/user.model.js'; 
const findAll = async () => {
  return User.find();
};

const findById = async (id) => {
  return User.findById(id);
};

const create = async (userData) => {
  const newUser = new User(userData);
  return newUser.save();
};

export {
  findAll,
  findById,
  create,
};