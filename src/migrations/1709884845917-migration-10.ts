import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration101709884845917 implements MigrationInterface {
    name = 'Migration101709884845917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "vision_mission"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD "vision_mission" text DEFAULT 'No Vision Mission Specified' NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "candidate" DROP COLUMN "vision_mission"`);
        await queryRunner.query(`ALTER TABLE "candidate" ADD "vision_mission" character varying NOT NULL`);
    }

}
