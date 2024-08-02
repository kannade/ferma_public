import { ICreateRequest } from '../dtos/comments.dto';
import Comments from '../models/comments.model';

class CommentsService {
  async getComments(id: number) {
    const comment = await Comments.findAll({
      where: {
        commentPostId: id,
      },
    });

    return comment;
  }
  async createComment(commentDTO: ICreateRequest) {
    const comment = await Comments.create({
      commentPostId: commentDTO.commentPostId,
      commentDate: new Date(),
      commentContent: commentDTO.commentContent,
      commentStatus: commentDTO.commentStatus,
      commentParent: commentDTO.commentParent,
      commentAuthor: commentDTO.commentAuthor,
    });

    return comment.toJSON();
  }

  // async updateComment(commentDTO: IUpdateRequest) {
  //   const comment = Comments.update(
  //     {
  //       commentContent: commentDTO.commentContent,
  //       commentStatus: commentDTO.commentStatus,
  //     },
  //     { where: { commentId: commentDTO.commentId } }
  //   );
  //   return comment;
  // }

  async deleteComment(id: number) {
    const comment = await Comments.destroy({
      where: {
        commentId: id,
      },
    });

    return comment;
  }
}

export default new CommentsService();
