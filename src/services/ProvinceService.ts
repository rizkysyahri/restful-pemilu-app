import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Province } from "../entity/Province"

export default new class ProvinceService {
    ProvinceRepository = AppDataSource.getRepository(Province)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const provinces = await this.ProvinceRepository.find()

            return res.status(200).json(provinces)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}