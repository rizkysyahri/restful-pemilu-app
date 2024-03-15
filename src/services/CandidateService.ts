import { AppDataSource } from "../data-source";
import { Candidate } from "../entity/Candidate";

export default new (class CandidateService {
  repository = AppDataSource.getRepository(Candidate);

  async getAllCandidate(): Promise<Candidate[]> {
    try {
      // const candidate = await this.repository.find();

      const candidate = await this.repository
        .createQueryBuilder("candidate")
        .leftJoinAndSelect("candidate.votes", "votes")
        .loadAllRelationIds()
        .getMany();

      return candidate;
    } catch (error) {
      throw error;
    }
  }

  async createCandidate(reqBody: Partial<Candidate>): Promise<Candidate> {
    try {
      const voteId = reqBody.votes;

      const candidate = this.repository.create({
        candidate_name: reqBody.candidate_name,
        serial_number: reqBody.serial_number,
        vision_mission: reqBody.vision_mission,
        votes: voteId,
      });

      const savedCandidate = await this.repository.save(candidate);

      if (!savedCandidate) {
        throw new Error("Could not save candidate");
      }

      return savedCandidate;
    } catch (error) {
      throw error;
    }
  }

  async getCandidateById(id: number): Promise<Candidate> {
    try {
      const candidateById = await this.repository
        .createQueryBuilder("candidate")
        .where("candidate.id = :id", { id })
        .getOne();

      return candidateById;
    } catch (error) {
      throw error;
    }
  }

  async updateCandidateById(
    id: number,
    newData: Partial<Candidate>
  ): Promise<Candidate> {
    try {
      const updateById = await this.repository
        .createQueryBuilder("candidate")
        .where("candidate.id = :id", { id })
        .getOne();

      await this.repository.update(id, newData);

      return updateById;
    } catch (error) {
      throw error;
    }
  }

  async deleteCandidateById(id: number): Promise<Candidate> {
    try {
      const deletedCandidate = await this.repository
        .createQueryBuilder("candidate")
        .where("candidate.id = :id", { id })
        .getOne();

      await this.repository.remove(deletedCandidate);

      return deletedCandidate;
    } catch (error) {
      throw error;
    }
  }
})();
