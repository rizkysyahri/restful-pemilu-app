import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration51709860812998 implements MigrationInterface {
    name = 'Migration51709860812998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" ADD "votesId" integer`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD CONSTRAINT "FK_80eb9ab58ad9b77b0113103c619" FOREIGN KEY ("votesId") REFERENCES "vote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" DROP CONSTRAINT "FK_80eb9ab58ad9b77b0113103c619"`);
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "votesId"`);
    }

}
