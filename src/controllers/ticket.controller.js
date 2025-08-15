import { TicketService } from "../services/ticket.service.js";

const ticketService = new TicketService();

export const createTicket = async (req, res) => {
  try {
    const newTicket = await ticketService.createTicket(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await ticketService.getTickets();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
