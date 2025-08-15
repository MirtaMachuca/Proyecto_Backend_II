import cartRepository from '../repositories/cart.repository.js';
import productRepository from '../repositories/product.repository.js';
import ticketRepository from '../repositories/ticket.repository.js';

const checkout = async (cartId, purchaserEmail) => {
  const cart = await cartRepository.findById(cartId); 
  if (!cart) {
    throw new Error("Carrito no encontrado.");
  }

  let totalAmount = 0;
  const productsToPurchase = [];
  const productsWithoutStock = [];

  for (const item of cart.products) {
    const product = item.product;
    const quantity = item.quantity;

    if (product.stock >= quantity) {
      productsToPurchase.push({
        product: product._id,
        quantity: quantity,
        price: product.price
      });
      totalAmount += product.price * quantity;

      await productRepository.updateStock(product._id, product.stock - quantity);
    } else {
      productsWithoutStock.push({
        product: product._id,
        quantity: quantity
      });
    }
  }

  if (productsToPurchase.length > 0) {
    // Llama al repositorio de tickets para crear el ticket
    const newTicket = await ticketRepository.create({
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      amount: totalAmount,
      purchaser: purchaserEmail,
      products: productsToPurchase
    });


    await cartRepository.update(cartId, { products: productsWithoutStock });

    return {
      ticket: newTicket,
      productsWithoutStock
    };
  } else {
    throw new Error("No hay productos con suficiente stock para completar la compra.");
  }
};

export {
  checkout,
};