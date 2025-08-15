import cartDAO from '../daos/cart.dao.js';

const findById = async (id) => {
  return cartDAO.findById(id);
};

const create = async () => {
  return cartDAO.create();
};

const addProduct = async (cartId, productId, quantity) => {
  return cartDAO.addProduct(cartId, productId, quantity);
};

export {
  findById,
  create,
  addProduct,
};