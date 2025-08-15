import ticketModel from '../../models/ticket.model.js';

const create = async (ticketData) => {
  const newTicket = new ticketModel(ticketData);
  return newTicket.save();
};

export {
  create,
};