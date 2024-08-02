// import { Request, Response, NextFunction } from "express";
// import postService from "../services/post.service";
// import { JSON_OBJECT } from "./constants";

// class PostController {
//   // Публичные роуты дял взаимодействия с посатми. неавторизованный пользователь может получить либо 1, либо все посы
//   async getAllPosts(req: Request, res: Response, next: NextFunction) {
//     try {
//       const posts = await postService.getAllPosts();
//       res.json(posts);
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }

//   async getPost(req: Request, res: Response, next: NextFunction) {
//     try {
//       const id = Number(req.params.id);
//       const post = await postService.getPost(id);
//       res.json(post);
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }

//   // Приватные роуты для авторизованного пользователя. Создание, Обновление, Удаление

//   async createPost(req: Request, res: Response, next: NextFunction) {
//     try {
//       const post = await postService.createPost(req.body);
//       res.status(200).json(post);
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }

//   async updatePost(req: Request, res: Response, next: NextFunction) {
//     try {
//       const post = await postService.updatePost(req.body);
//       res.json(post);
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }

//   async deletePost(req: Request, res: Response, next: NextFunction) {
//     try {
//       const id = Number(req.params.id);
//       const post = await postService.deletePost(id);
//       if (post === 1) {
//         res.status(200).json({ message: `Удален элемент ${id}` });
//       } else {
//         res.status(500).json({ message: `Ошибка удаления элемента ${id}` });
//       }
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }

//   async getRules(req: Request, res: Response, next: NextFunction) {
//     try {
//       // const id = Number(req.params.id);
//       // const post = await postService.getPost(id);
//       const obj = JSON_OBJECT;
//       // console.log(req.params.id);
//       res.json(obj);
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }

//   async testPost(req: Request, res: Response, next: NextFunction) {
//     try {
//       console.log(req.body);
//       // const post = await postService.updatePost(req.body);
//       // res.json(post);
//       res.status(200);
//       next();
//     } catch (e: any) {
//       res.status(500).json({ message: e.message });
//     }
//   }
// }

// export default new PostController();
