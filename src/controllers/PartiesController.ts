import { Request, Response } from "express";
import PartiesService from "../services/PartiesService";

export default new (class PartiesController {
  async getAllParties(req: Request, res: Response): Promise<Response> {
    try {
      const parties = await PartiesService.getAllParties();

      return res.status(200).json({ data: parties });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async createParties(req: Request, res: Response): Promise<Response> {
    try {
      const reqBody = req.body;
      // console.log(reqBody)

      const createParties = await PartiesService.createParties(reqBody);

      return res
        .status(200)
        .json({ data: createParties, message: "Parties was created!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getPartiesById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      const result = await PartiesService.getPartiesById(id);

      if (!result) {
        throw new Error("Could not find parties")
      }

      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updatePartiesById(req: Request, res: Response): Promise<Response> {
    try {
        const id = parseInt(req.params.id)
        const newData = req.body

        const partiesUpdateById = await PartiesService.updatePartiesById(id, newData)

        return res.status(200).json({data: partiesUpdateById, message: `Success updated parties id ${id}`})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
  }

  async deletePartiesById(req: Request, res: Response): Promise<Response> {
    try {
        const id = parseInt(req.params.id)

       await PartiesService.deleteCandidateById(id)

        return res.status(200).send("Parties deleted successfully")
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
  }
})();
