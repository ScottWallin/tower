import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventsService } from "../services/TowerEventService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.findAllEvents)
      .get('/:eventId', this.findEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:eventId', this.editEvent)
      .post('', this.createEvent)
      .delete('/:eventId', this.cancelEvent)
  }
  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const events = await towerEventsService.createEvent(req.body)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async findAllEvents(req, res, next) {
    try {
      const events = await towerEventsService.findAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async findEventById(req, res, next) {
    try {
      const events = await towerEventsService.findEventById(req.params.eventId)
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      const eventsData = req.body
      const eventsId = req.params.eventId
      const userId = req.userInfo.id
      const updatedEvent = await towerEventsService.editEvent(eventsId, eventsData, userId)
      return res.send(updatedEvent)
    } catch (error) {
      next(error)
    };
  }
  async cancelEvent(req, res, next) {
    try {
      const event = await towerEventsService.cancelEvent(req.params.eventId, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

}