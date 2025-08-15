import { Router } from "express";
import { createTicket, getAllTickets } from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", createTicket);
router.get("/", getAllTickets);

export default router;
