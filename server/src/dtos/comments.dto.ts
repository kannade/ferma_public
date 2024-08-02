export interface ICreateRequest {
  commentPostId: number;
  commentDate: Date;
  commentContent: string;
  commentStatus: string;
  commentType: string;
  commentParent: number;
  commentAuthor: string;
}

export interface IUpdateRequest {
  commentDate: Date;
  commentContent: string;
  commentStatus: string;
  commentType: string;
}
