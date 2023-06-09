import { AppState } from "../AppState.js";
import { Event } from "../models/Event.js";
import { api } from "./AxiosService.js";
import { logger } from "../utils/Logger.js";

class EventsService {
async getEvents() {
  const res = await api.get('api/events')
  logger.log('[GET EVENTS BY ID', res.data)
  AppState.events = res.data.map(e => new Event(e))
}
}

export const eventsService = new EventsService