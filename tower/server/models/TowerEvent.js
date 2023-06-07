import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const TowerEventSchema = new Schema(
  {

    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    description: { type: String, required: true, minlength: 2, maxlength: 1000 },
    coverImg: { type: String, required: true, maxlength: 300, default: 'https://images.unsplash.com/photo-1565798846807-2af22c843402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1266&q=80' },
    location: { type: String, required: true, minlength: 10, maxlength: 100 },
    capacity: { type: Number, required: true, }, //NOTE finish the rest then come back to this for help
    startDate: { type: Date, required: true, },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'] },
  }, { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
// TODO come back later
TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  foreignField: 'eventId',
  ref: 'Ticket',
  count: true,
})