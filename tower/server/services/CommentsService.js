import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors.js";

class CommentsService {
  async createComment(commentsData) {
    const comment = await dbContext.Comments.create(commentsData)
    await comment.populate('creator')
    return comment
  }
}
export const commentsService = new CommentsService()