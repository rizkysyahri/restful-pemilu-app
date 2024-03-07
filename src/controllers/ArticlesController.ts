import { Request, Response } from "express";
import ArticleService from "../services/ArticleService";

export default new (class ArticlesController {
  async find(req: Request, res: Response): Promise<Response> {
    try {
      const articles = await ArticleService.AllArticles();

      return res.status(200).json({ data: articles });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      // console.log("data masuk", data);

      const articles = await ArticleService.CreateArticle(data);

      return res
        .status(200)
        .json({ data: articles, message: "data berhasil dibuat" });
      //   const articles = await ArticleService.CreateArticle(data)
    } catch (error) {
      return res.status(400).json({ message: error.message });
      // console.log(error)
    }
  }

  async findGetUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = parseInt(req.params.userId);
      //   console.log("userId", userId)

      const article = await ArticleService.getUserArticleById(userId);

      return res.status(200).json({ data: article, message: `user ${userId}` });
    } catch (error) {
      return res.status(400).json({ message: error.message });
      // console.log(error)
    }
  }

  async findUpdateArticles(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const newData = req.body;
      // console.log(id)
      // console.log(newData)

      const updatedUsers = await ArticleService.updateArticle(id, newData);

      return res
        .status(200)
        .json({ data: updatedUsers, message: "Updated data successfully" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findPatchArticles(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const newData = req.body;
      // console.log(id)
      // console.log(newData)

      const updatedUsers = await ArticleService.patchArticle(id, newData);

      return res
        .status(200)
        .json({ data: updatedUsers, message: "Updated data successfully" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findDeleteArticle(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      // console.log("delete success",id)

      await ArticleService.deleteArticle(id);

      return res.status(200).send("Data Removed Successfully");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
})();
