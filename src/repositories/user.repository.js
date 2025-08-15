import userDAO from '../daos/user.dao.js';

const findAll = async () => {
  return userDAO.findAll();
};

const findById = async (id) => {
  return userDAO.findById(id);
};

const create = async (userData) => {
  return userDAO.create(userData);
};

export {
  findAll,
  findById,
  create,
};