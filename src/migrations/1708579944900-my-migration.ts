import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1708579944900 implements MigrationInterface {
    name = 'MyMigration1708579944900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "provinces" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2e4260eedbcad036ec53222e0c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "provinces"`);
    }

}
