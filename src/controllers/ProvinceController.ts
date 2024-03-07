import { Request, Response } from "express";
import ProvinceService from "../services/ProvinceService";

export default new class ProvinceController {
    find(req: Request, res: Response) {
        ProvinceService.find(req, res)
    }
}