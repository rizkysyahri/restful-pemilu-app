import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationArtickel1709654030401 implements MigrationInterface {
    name = 'MigrationArtickel1709654030401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articel" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "publication_date" date NOT NULL, "image" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "usersId" integer, CONSTRAINT "PK_bd1ed5b384af050460febe282f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articel" ADD CONSTRAINT "FK_6792d2a8e047ee44249038a347e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articel" DROP CONSTRAINT "FK_6792d2a8e047ee44249038a347e"`);
        await queryRunner.query(`DROP TABLE "articel"`);
    }

}
