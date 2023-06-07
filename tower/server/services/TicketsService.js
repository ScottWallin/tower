import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";

class TicketsService {
  async createTicket(ticketsData) {
    const tickets = await dbContext.Tickets.create(ticketsData)
    await tickets.populate('profile event')
    return tickets
  }
  async deleteTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId).populate('ticket profile')
    if (!ticket) throw new BadRequest(`Ticket at id: ${ticketId} does not exist`)
    await ticket.delete()
    return `ticket for ${ticket.profile.name} to ${ticket.event.title} is destroyed`
  }
}

export const ticketsService = new TicketsService()