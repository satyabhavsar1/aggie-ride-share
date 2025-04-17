import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserMigration1744846395507 implements MigrationInterface {
    name = 'UpdateUserMigration1744846395507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "verificationCode" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "verificationCode"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isVerified"`);
    }

}
