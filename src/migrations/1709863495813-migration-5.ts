import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration51709863495813 implements MigrationInterface {
    name = 'Migration51709863495813'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fa37facff1866d6e6492743e863"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "votesId" TO "voteId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_8299e39c619e66f12fd15d86bb4" UNIQUE ("voteId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8299e39c619e66f12fd15d86bb4" FOREIGN KEY ("voteId") REFERENCES "vote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8299e39c619e66f12fd15d86bb4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_8299e39c619e66f12fd15d86bb4"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "voteId" TO "votesId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fa37facff1866d6e6492743e863" FOREIGN KEY ("votesId") REFERENCES "vote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
