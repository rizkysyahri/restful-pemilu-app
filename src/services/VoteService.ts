import { AppDataSource } from "../data-source";
import { Vote } from "../entity/Vote";

export default new (class VoteService {
  repository = AppDataSource.getRepository(Vote);

  async getAllVotes(): Promise<Vote[]> {
    try {
      const votes = await this.repository
        .createQueryBuilder("votes")
        .leftJoinAndSelect("votes.candidates", "candidates")
        .leftJoinAndSelect("votes.users", "users")
        .getMany();

      // const votes = await this.repository.find()

      return votes;
    } catch (error) {
      throw error;
    }
  }

  async createVotes(reqBody: any): Promise<Vote> {
    try {
      const candidateId = reqBody.candidateId;
      const userId = reqBody.userId;

      const votes = this.repository.create({
        candidates: candidateId,
        users: userId,
      });

      const savedVotes = await this.repository.save(votes);

      const votesWithAllId = await this.repository
      .createQueryBuilder("votes")
      .leftJoinAndSelect("votes.candidates", "candidates")
      .leftJoinAndSelect("votes.users", "users")
      .where("votes.id = :id", { id: savedVotes.id })
      .loadAllRelationIds()
      .getOne();

      return votesWithAllId;
    } catch (error) {
      throw error;
    }
  }
})();
