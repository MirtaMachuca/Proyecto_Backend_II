import { TicketDTO } from "../dto/ticket.dto.js";
import { TicketRepository } from "../repositories/ticket.repository.js";

const ticketRepository = new TicketRepository();

export class TicketService {
  async createTicket(data) {
    const dto = new TicketDTO(data);
    return await ticketRepository.create(dto);
  }

  async getTickets() {
    return await ticketRepository.getAll();
  }

  async getTicketByCode(code) {
    return await ticketRepository.getByCode(code);
  }
}
