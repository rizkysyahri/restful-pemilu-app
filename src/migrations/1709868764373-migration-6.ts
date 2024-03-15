import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration61709868764373 implements MigrationInterface {
    name = 'Migration61709868764373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_122ddb23dc6257c14b2ef377466"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8299e39c619e66f12fd15d86bb4"`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "UQ_122ddb23dc6257c14b2ef377466"`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "voteId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_8299e39c619e66f12fd15d86bb4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "voteId"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_2d7b9fc93f085b1373f3fed397f"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "UQ_2d7b9fc93f085b1373f3fed397f"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "UQ_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_2d7b9fc93f085b1373f3fed397f" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_2d7b9fc93f085b1373f3fed397f"`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "UQ_f5de237a438d298031d11a57c3b" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "UQ_2d7b9fc93f085b1373f3fed397f" UNIQUE ("candidateId")`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_2d7b9fc93f085b1373f3fed397f" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD "voteId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_8299e39c619e66f12fd15d86bb4" UNIQUE ("voteId")`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD "voteId" integer`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "UQ_122ddb23dc6257c14b2ef377466" UNIQUE ("voteId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8299e39c619e66f12fd15d86bb4" FOREIGN KEY ("voteId") REFERENCES "vote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_122ddb23dc6257c14b2ef377466" FOREIGN KEY ("voteId") REFERENCES "vote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
