// import { ICreateRequest, IUpdateRequest } from '../dtos/post.dto';
// import Posts from '../models/posts.model';

// class PostService {
//   // Публичные роуты дял взаимодействия с посатми. неавторизованный пользователь может получить либо 1, либо все посы
//   async getAllPosts() {
//     const posts = await Posts.findAll({
//       order: [['id', 'ASC']],
//     });
//     return posts;
//   }

//   async getPost(id: number) {
//     const post = await Posts.findOne({
//       where: {
//         id,
//       },
//     });

//     return post?.toJSON();
//   }
//   // Приватные роуты для авторизованного пользователя. Создание, Обновление, Удаление
//   async createPost(postDTO: ICreateRequest) {
//     //TODO: брать postAuthor от текущего юзера
//     const post = await Posts.create({
//       postAuthor: postDTO.postAuthor,
//       postDate: new Date(),
//       postContent: postDTO.postContent,
//       postTitle: postDTO.postTitle,
//       postStatus: postDTO.postStatus,
//       postType: postDTO.postType,
//     });

//     return post.toJSON();
//   }

//   async updatePost(postDTO: IUpdateRequest) {
//     const post = Posts.update(
//       {
//         postContent: postDTO.postContent,
//         postTitle: postDTO.postTitle,
//         postStatus: postDTO.postStatus,
//         postModify: new Date(),
//         postType: postDTO.postType,
//       },
//       { where: { id: postDTO.id } }
//     );
//     return post;
//   }

//   async deletePost(id: number) {
//     const post = await Posts.destroy({
//       where: {
//         id,
//       },
//     });

//     return post;
//   }
// }

// export default new PostService();
