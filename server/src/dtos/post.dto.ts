export interface ICreateRequest {
  postAuthor: string;
  postDate: Date;
  postContent: string;
  postTitle: string;
  postStatus: string;
  postType: string;
}

export interface IUpdateRequest {
  id: number;
  postContent: string;
  postTitle: string;
  postStatus: string;
  postType: string;
  postModify: Date;
}
