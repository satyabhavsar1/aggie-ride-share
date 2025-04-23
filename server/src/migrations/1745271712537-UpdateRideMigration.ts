import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRideMigration1745271712537 implements MigrationInterface {
    name = 'UpdateRideMigration1745271712537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "pickups"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "drops"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "pickup" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "drop" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "drop"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "pickup"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "drops" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "pickups" text array NOT NULL`);
    }

}
