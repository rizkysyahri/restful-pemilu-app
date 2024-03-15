import { Request, Response } from "express";
import VoteService from "../services/VoteService";

export default new (class VoteController {
  async getAllVotes(req: Request, res: Response): Promise<Response> {
    try {
      const result = await VoteService.getAllVotes();

      return res.status(200).json({ data: result });
    } catch (error) {}
  }

  async createVotes(req: Request, res: Response): Promise<Response> {
    try {
      const reqBody = req.body;
    //   console.log(reqBody)

      const result = await VoteService.createVotes(reqBody);

      if (!result) {
        throw new Error("Could not create votes");
      }
      return res
        .status(201)
        .json({ data: result, message: "Create Votes Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
})();
