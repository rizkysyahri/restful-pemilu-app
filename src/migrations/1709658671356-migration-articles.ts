import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationArticles1709658671356 implements MigrationInterface {
    name = 'MigrationArticles1709658671356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "publication_date"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "publication_date" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "publication_date"`);
        await queryRunner.query(`ALTER TABLE "articles" ADD "publication_date" date NOT NULL`);
    }

}
