import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1709703989128 implements MigrationInterface {
    name = 'Migration1709703989128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_2b27d3effb4b0e6e7f38ae4c992"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "usersId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_a9d18538b896fe2a6762e143bea" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_a9d18538b896fe2a6762e143bea"`);
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "userId" TO "usersId"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_2b27d3effb4b0e6e7f38ae4c992" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
