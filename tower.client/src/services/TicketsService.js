import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Ticket } from "../models/Ticket.js";

class TicketsService{
async getMyTickets() {
  const res = await api.get('account/tickets') 
  logger.log('punch my ticket', res.data)
  AppState.myTickets = res.data.map(t => new Ticket(t))
  logger.log(AppState.myTickets)
}
async getTicketsByEventId(eventId) {
  const res = await api.get(`/api/events/${eventId}/tickets`)
  logger.log('Aaaaaall the tickets are here', res.data)
  AppState.tickets = res.data.map(t => new Ticket(t))
}

}
export const ticketsService = new TicketsService()
