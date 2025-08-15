import { checkout } from '../services/cart.service.js';

const handleCheckout = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { email } = req.user; 

    const result = await checkout(cartId, email);

    res.status(200).json({
      message: "Compra realizada con éxito",
      ticket: result.ticket,
      products_not_purchased: result.productsWithoutStock
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  handleCheckout,
};