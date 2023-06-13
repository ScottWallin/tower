// FIXME for this model....refer to the Collab model in PostIt
import { Account } from "./Account.js"
import { Event } from "./Event.js"

export class Ticket {
  constructor(data) {
    this.id = data.id
    this.eventId = data.eventId
    this.accountId = data.accountId
    this.profile = data.profile
    this.event = data.event
    this.creatorId = data.creatorId

    this.account = data.account
    this. event = data.event
  }
}
export class Attendee extends Ticket {
  constructor(data){
  super(data) 
  this.accountId = data.account.id
  this.picture = data.account.picture
  this.name = data.account.name
  }
}

export class ticketForEvent extends Ticket {
  constructor(data) {
    super(data)
    this.title = data.title
    this.coverImg = data.event.coverImg
    this.description = data.event.description
    this.coverImg = data.event.coverImg
    this.location = data.event.location
    this.capacity = data.event.capacity
    this.startDate = new Date(data.event.startDate)
    this.type = data.event.type
    this.isCanceled = data.event.isCanceled
    this.creator = data.event.creator
    this.ticketCount = data.event.ticketCount
  }

}