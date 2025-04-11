import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserMigration1744152007249 implements MigrationInterface {
    name = 'UpdateUserMigration1744152007249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "contactNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contactNumber NOT NULL"`);
    }

}
