import productModel from '../../models/product.model.js';

const update = async (id, data) => {
  return productModel.findByIdAndUpdate(id, data, { new: true });
};

export {
  update,
};