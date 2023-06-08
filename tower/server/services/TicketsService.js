import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";

class TicketsService {
  async createTicket(ticketsData) {
    const tickets = await dbContext.Tickets.create(ticketsData)
    await tickets.populate('profile event')
    return tickets
  }
  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) throw new BadRequest(`Ticket at id: ${ticketId} does not exist`)
    if (ticket.accountId != userId) throw new BadRequest("You can't keep me out of the chocolate factory")
    await ticket.delete()
    return `ticket is destroyed`
  }
  async findAllTickets(eventId) {
    const allTickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile event')
    return allTickets
  }
  async findMyTickets(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return myTickets
  }
}

export const ticketsService = new TicketsService()