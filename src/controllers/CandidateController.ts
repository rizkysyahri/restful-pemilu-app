import { Request, Response } from "express";
import CandidateService from "../services/CandidateService";

export default new (class CandidateController {
  async getAllCandidate(req: Request, res: Response): Promise<Response> {
    try {
      const candidate = await CandidateService.getAllCandidate();

      return res.status(200).json({ data: candidate });
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  }

  async CreateCandidate(req: Request, res: Response): Promise<Response> {
    try {
      const reqBody = req.body;
      // console.log(reqBody)

      const createToCandidate = await CandidateService.createCandidate(reqBody);

      return res.status(200).json({
        data: createToCandidate,
        message: "Create candidate successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getCandidateById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      // console.log(id);

      const candidateById = await CandidateService.getCandidateById(id);

      return res.status(200).json({ data: candidateById });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  async updateCandidateById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id)
      const newData = req.body
      // console.log(id)
      // console.log(newData)

      const updateCandidateById = await CandidateService.updateCandidateById(id, newData)

      return res.status(200).json({data: updateCandidateById, message: `Success update candidate id ${id}`})
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
  

  async deleteCandidate(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id)

       await CandidateService.deleteCandidateById(id)

      return res.status(200).send("Candidate deleted successfully")
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
})();
