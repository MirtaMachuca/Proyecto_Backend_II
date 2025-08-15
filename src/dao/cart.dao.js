import cartModel from '../../models/cart.model.js';

const findByIdAndPopulate = async (id) => {
  return cartModel.findById(id).populate('products.product');
};

const update = async (id, data) => {
  return cartModel.findByIdAndUpdate(id, data, { new: true });
};

export {
  findByIdAndPopulate,
  update,
};