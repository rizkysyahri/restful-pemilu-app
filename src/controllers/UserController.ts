import { Request, Response } from "express";
import UserService from "../services/UserService";

export default new (class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const users = await UserService.create(data);

      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.find();

      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const userLogin = await UserService.login(username, password);

      return res.status(200).json({ data: userLogin });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const newData = req.body;

      const updatedUser = await UserService.update(id, newData);

      return res
        .status(200)
        .json({ data: updatedUser, message: "Updated successfully" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const newData = req.body;

      const patchUser = await UserService.update(id, newData);

      return res
        .status(200)
        .json({ data: patchUser, message: `Updated id user ${id}` });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      await UserService.delete(id);

      return res.status(200).send("Data Removed successfully");
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
})();
