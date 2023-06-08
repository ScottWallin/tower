import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";

class CommentsService {
  async createComment(commentsData) {
    const comment = await dbContext.Comments.create(commentsData)
    await comment.populate('creator')
    return comment
  }
  async findEventComments(eventId) {
    const eventComment = await dbContext.Comments.find({ eventId }).populate('creator')
    return eventComment
  }
  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) throw new BadRequest(`Comment at id: ${commentId} does not exist`)
    if (comment.creatorId != userId) throw new Forbidden('Stop silencing the people')
    await comment.remove()
    return 'comment removed'
  }
}
export const commentsService = new CommentsService()