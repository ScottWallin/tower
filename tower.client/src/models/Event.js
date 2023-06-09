
function computeDate(date) {
  return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", dat: "numeric", time: "short" }) + ":" + date.toLocaleTimeString('en-us', {timeStyle: "medium"})
}

export class Event {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.startDate = new Date(data.startDate)
    this.type = data.type
    this.isCancelled = data.isCanceled
    this.creator = data.creator
    this.ticketCount = data.ticketCount
  }
}