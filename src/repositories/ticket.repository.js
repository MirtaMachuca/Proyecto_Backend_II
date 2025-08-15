import { ticketModel } from "../models/ticket.model.js";

export class TicketRepository {
  async create(ticketData) {
    return await ticketModel.create(ticketData);
  }

  async getAll() {
    return await ticketModel.find();
  }

  async getByCode(code) {
    return await ticketModel.findOne({ code });
  }
}
