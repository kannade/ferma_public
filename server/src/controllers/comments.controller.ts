import { Request, Response } from 'express';
import commentsService from '../services/comments.service';

class CommentsController {
  async getComments(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const comment = await commentsService.getComments(id);
      res.json(comment);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }

  // Приватные роуты для авторизованного пользователя. Создание, Обновление, Удаление

  async createComment(req: Request, res: Response) {
    try {
      const comment = await commentsService.createComment(req.body);
      res.status(200).json(comment);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }

  // async updatComment(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const comment = await commentsService.updateComment(req.body);
  //     res.json(comment);
  //   } catch (e: any) {
  //     res.status(500).json({ message: e.message });
  //   }
  // }

  async deleteComment(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const comment = await commentsService.deleteComment(id);
      if (comment === 1) {
        res.status(200).json({ message: `Удален элемент ${id}` });
      } else {
        res.status(500).json({ message: `Ошибка удаления элемента ${id}` });
      }
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new CommentsController();
