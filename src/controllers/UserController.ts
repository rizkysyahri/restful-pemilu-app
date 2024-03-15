import { Request, Response } from "express";
import UserService from "../services/UserService";
import { LoginScema, UserValidator } from "../validators/User";

export default new (class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const { error, value } = UserValidator.validate(data);
      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const users = await UserService.create(value);

      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserService.getAllUsers();

      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      // console.log(id)

      const userById = await UserService.getUserById(id);

      return res.status(200).json({ data: userById });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = LoginScema.validate(req.body);

      if (error)
        return res.status(400).json({ message: error.details[0].message });

      const { username, password } = value;

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
