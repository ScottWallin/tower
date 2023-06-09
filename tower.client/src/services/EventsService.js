import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js";
import { AuthPlugin } from "@bcwdev/auth0provider-client";

class EventsService {
async getEvents() {
  const res = await api.get('api/events')
  logger.log('[GET EVENTS]', res.data)
  AppState.events = res.data.map(e => new Event(e))
}
async getEventById(eventId) {
  const res = await api.get(`api/events/${eventId}`)
  logger.log('[GETTING EVENTS BY THEIR ID]', res.data)
  AppState.activeEvent = new Event(res.data)
  logger.log(res.data)
  logger.log(AppState.activeEvent)
}
async createEvent(formData){
  const res = await api.post('api/events', formData)
  logger.log('creating event', res.data)
  return res.data
}
}

export const eventsService = new EventsService