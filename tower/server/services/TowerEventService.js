import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";

class TowerEventsService {


  async createEvent(eventsData) {
    const events = await dbContext.Events.create(eventsData)
    await events.populate('creator')
    return events
  }
  async findAllEvents() {
    const events = await dbContext.Events.find()
    return events
  }
  async findEventById(eventId) {
    const events = await dbContext.Events.findById(eventId).populate('creator ticketCount')
    if (!events) throw new BadRequest(`Event at id: ${eventId} can't be found. Try again.`)
    return events
  }
  async editEvent(eventId, eventsData, userId) {
    const originalEvent = await this.findEventById(eventId)
    if (originalEvent.isCanceled == true) throw new BadRequest('Stop beating this dead horse')
    if (originalEvent.creatorId != userId) { throw new Forbidden("Not yours to edit") }

    originalEvent.name = eventsData.name || originalEvent.name
    originalEvent.description = eventsData.description || originalEvent.description
    originalEvent.coverImg = eventsData.coverImg || originalEvent.coverImg
    originalEvent.location = eventsData.location || originalEvent.location
    originalEvent.capacity = eventsData.capacity || originalEvent.capacity
    originalEvent.startDate = eventsData.startDate || originalEvent.startDate
    // originalEvent.isCanceled = eventsData.isCanceled ? eventsData.isCanceled : originalEvent.isCanceled
    originalEvent.type = eventsData.type || originalEvent.type
    await originalEvent.save()
    return originalEvent
  }
  async cancelEvent(eventId, userId) {
    const event = await this.findEventById(eventId)
    if (event.creatorId != userId) throw new Forbidden('Stop trying to sabotage me, Janet!')
    event.isCanceled = true

    await event.save()
    return event
  }
}
export const towerEventsService = new TowerEventsService()