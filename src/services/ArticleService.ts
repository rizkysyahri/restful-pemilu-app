import { AppDataSource } from "../data-source";
import { Articles } from "../entity/Articles";
import { Users } from "../entity/User";

export default new (class ArticelService {
  repository = AppDataSource.getRepository(Articles);

  async AllArticles(): Promise<Articles[]> {
    try {
      const articles = await this.repository
        .createQueryBuilder("articles")
        .innerJoin("articles.users", "users")
        .loadAllRelationIds()
        .getMany();

      return articles;
    } catch (error) {
      throw error;
    }
  }

  async CreateArticle(reqBody: any): Promise<Articles> {
    try {
      const userId = reqBody.userId;

      const articles = this.repository.create({
        title: reqBody.title,
        slug: reqBody.slug,
        image: reqBody.image,
        content: reqBody.content,
        users: userId,
      });

      const savedArticles = await this.repository.save(articles);

      const articleWithUser = await this.repository
        .createQueryBuilder("articles")
        .leftJoinAndSelect("articles.users", "users")
        .where("articles.id = :id", { id: savedArticles.id })
        .loadAllRelationIds()
        .getOne();

      return articleWithUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserArticleById(userId: number): Promise<Articles[]> {
    try {
      const articlesUser = await this.repository
        .createQueryBuilder("articles")
        .leftJoin("articles.users", "users")
        .addSelect(["users.id"])
        .where("users.id = :userId", { userId })
        .loadAllRelationIds()
        .getMany();

      return articlesUser;
    } catch (error) {
      throw error;
    }
  }

  async updateArticle(id: number, newData: any): Promise<Articles> {
    try {
      const userId = newData.users.id;

      await this.repository.update(id, newData);

      const updatedArticle = await this.repository
        .createQueryBuilder("article")
        .leftJoin("article.users", "users")
        .addSelect(["users.id"])
        .where("article.id = :id", { id })
        .getOne();

      if (!updatedArticle) {
        throw new Error("users not found");
      }

      if (userId !== undefined) {
        updatedArticle.users.id = userId;
      }
      return updatedArticle;
    } catch (error) {
      throw error;
    }
  }

  async patchArticle(id: number, newData: any): Promise<Articles> {
    try {
      const userId = newData.users.id;

      await this.repository.update(id, newData);

      const updatedArticle = await this.repository
        .createQueryBuilder("article")
        .leftJoin("article.users", "users")
        .addSelect(["users.id"])
        .where("article.id = :id", { id })
        .getOne();

      if (!updatedArticle) {
        throw new Error("users not found");
      }

      if (userId !== undefined) {
        updatedArticle.users.id = userId;
      }
      return updatedArticle;
    } catch (error) {
      throw error;
    }
  }

  async deleteArticle(id: number): Promise<Articles> {
    try {
      const deleteArticle = await this.repository.findOne({
        where: { id },
      });

      if (!deleteArticle) {
        throw new Error("Article not found");
      }

      await this.repository.remove(deleteArticle);

      await AppDataSource.getRepository(Articles)
        .createQueryBuilder()
        .delete()
        .where(deleteArticle)
        .execute();

      return deleteArticle;
    } catch (error) {
      throw error;
    }
  }
})();
