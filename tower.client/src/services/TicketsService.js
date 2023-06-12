import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Ticket } from "../models/Ticket.js";

class TicketsService{
async getMyTickets() {
  const res = await api.get('account/tickets') 
  logger.log('punch my ticket', res.data)
  // AppState.myTickets = res.data.map(t => new Ticket(t))
  // logger.log(AppState.myTickets)
  AppState.myTickets = res.data
}
async getTicketsByEventId(eventId) {
  const res = await api.get(`/api/events/${eventId}/tickets`)
  logger.log('Aaaaaall the tickets are here', res.data)
  AppState.tickets = res.data.map(t => new Ticket(t))
}
async createTicket(eventId){
  logger.log(eventId)
  const res = await api.post('api/tickets', {eventId})
  logger.log('creating ticket', res.data)
  AppState.activeEvent.capacity--
  AppState.tickets.push(new Ticket(res.data))
  AppState.myTickets.push(new Ticket(res.data))
}
async removeTicket(ticketId) {
  const res = await api.delete(`api/tickets/${ticketId}`)
  logger.log('goodbye ticket', res.data)
  AppState.activeEvent.capacity++
  AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
  AppState.myTickets = AppState.myTickets.filter(t => t.id !== ticketId)
}
}
export const ticketsService = new TicketsService()
