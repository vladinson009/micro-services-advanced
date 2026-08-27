import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({}).where('orderId').exists(false);

  res.send(tickets);
});

export { router as indexTicketRouter };
