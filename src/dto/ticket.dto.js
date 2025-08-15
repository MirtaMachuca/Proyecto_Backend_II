const toTicketDto = (ticket) => {
  if (!ticket) return null;

  return {
    id: ticket._id,
    code: ticket.code,
    purchaseDatetime: ticket.purchase_datetime,
    amount: ticket.amount,
    purchaser: ticket.purchaser,
    products: ticket.products.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
    }))
  };
};

export { toTicketDto };