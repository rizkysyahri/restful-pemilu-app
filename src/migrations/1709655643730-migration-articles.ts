import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationArticles1709655643730 implements MigrationInterface {
    name = 'MigrationArticles1709655643730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "publication_date" date NOT NULL, "image" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "usersId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_2b27d3effb4b0e6e7f38ae4c992" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_2b27d3effb4b0e6e7f38ae4c992"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
