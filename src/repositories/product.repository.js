import productDAO from '../daos/product.dao.js';

const findAll = async () => {
  return productDAO.findAll();
};

const findById = async (id) => {
  return productDAO.findById(id);
};

const update = async (id, productData) => {
  return productDAO.update(id, productData);
};

const remove = async (id) => {
  return productDAO.remove(id);
};

export {
  findAll,
  findById,
  update,
  remove,
};