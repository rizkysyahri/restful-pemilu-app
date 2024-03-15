import { AppDataSource } from "../data-source";
import { Parties } from "../entity/Parties";

export default new (class PartiesService {
  repository = AppDataSource.getRepository(Parties);

  async getAllParties(): Promise<Parties[]> {
    try {
      const parties = await this.repository
        .createQueryBuilder("parties")
        .getMany();

      return parties;
    } catch (error) {
      throw error;
    }
  }

  async createParties(reqBody: any): Promise<any> {
    try {
      const parties = this.repository.create({
        parties_name: reqBody.parties_name,
        parties_chairman: reqBody.parties_chairman,
        vision_mission: reqBody.vision_mission,
        parties_address: reqBody.parties_address,
        parties_image: reqBody.parties_image,
      });

      const savedParties = await this.repository.save(parties);

      return savedParties;
    } catch (error) {
      throw error;
    }
  }

  async getPartiesById(id: number): Promise<Parties> {
    try {
      const partiesById = await this.repository
        .createQueryBuilder("parties")
        .where("parties.id = :id", { id })
        .getOne();

      return partiesById;
    } catch (error) {
      throw error;
    }
  }

  async updatePartiesById(
    id: number,
    newData: Partial<Parties>
  ): Promise<Parties> {
    try {
      const partiesId = await this.repository
        .createQueryBuilder("parties")
        .where("parties.id = :id", { id })
        .getOne();

      await this.repository.update(id, newData);

      return partiesId;
    } catch (error) {
      throw error;
    }
  }

  async deleteCandidateById(id: number): Promise<any> {
    try {
      const deletedPartiesById = await this.repository
        .createQueryBuilder()
        .delete()
        .from(Parties)
        .where("id = :id", { id })
        .execute();

      return deletedPartiesById;
    } catch (error) {
      throw error;
    }
  }
})();
