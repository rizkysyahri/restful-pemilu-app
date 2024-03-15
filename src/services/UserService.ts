import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/User";

export default new (class UserService {
  repository = AppDataSource.getRepository(Users);

  async create(reqBody: any): Promise<any> {
    try {
      // console.log("Received request body:", reqBody);
      const repository = AppDataSource.getRepository(Users);

      const voteId = reqBody.votes

      const users = repository.create({
        fullname: reqBody.fullname,
        address: reqBody.address,
        gender: reqBody.gender,
        username: reqBody.username,
        password: reqBody.password,
        votes: voteId

      });

      await AppDataSource.getRepository(Users)
        .createQueryBuilder()
        .insert()
        .into(Users)
        .values(users)
        .execute();

      return users;
      // console.log(users)
    } catch (error) {
      throw error();
      // console.log(error)
    }
  }

  async getAllUsers(): Promise<Users[]> {
    try {
      const users = await AppDataSource.getRepository(Users)
        .createQueryBuilder("users")
        .leftJoin("users.votes", "votes")
        .loadAllRelationIds()
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number): Promise<Users> {
    try {
      const userById = await this.repository.findOne({
        where: { id },
      });

      return userById
    } catch (error) {
      throw error
    }
  }

  async login(username: string, password: string): Promise<any> {
    try {
      const userLogin = await this.repository.findOne({
        where: {
          username,
          password,
        },
      });

      // console.log(userLogin);
      return userLogin;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async update(id: number, newData: any): Promise<any> {
    try {
      const userToUpdate = await this.repository.findOne({
        where: { id },
      });

      if (!userToUpdate) {
        throw new Error("User not found");
      }

      Object.assign(userToUpdate, newData);

      const updatedUser = await this.repository.save(userToUpdate);

      // console.log(updatedUser);
      return updatedUser;
    } catch (error) {
      // console.log(error)
      throw error;
    }
  }

  async patch(id: number, newData: any): Promise<any> {
    try {
      const userToPatch = await this.repository.findOne({
        where: { id },
      });

      if (!userToPatch) {
        throw new Error("User not found");
      }

      Object.assign(userToPatch, newData);

      const patchUser = await this.repository.save(userToPatch);

      // console.log(updatedUser);
      return patchUser;
    } catch (error) {
      // console.log(error)
      throw error;
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const userToDelete = await this.repository.findOne({
        where: { id },
      });

      if (!userToDelete) {
        throw new Error("User not found");
      }

      await this.repository.remove(userToDelete);

      await AppDataSource.getRepository(Users)
        .createQueryBuilder()
        .delete()
        .from(Users)
        .where(userToDelete)
        .execute();

      // console.log("User remove Successfuly", userToDelete);
      return userToDelete;
    } catch (error) {
      return error;
      // console.log(error);
    }
  }
})();
