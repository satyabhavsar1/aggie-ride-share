import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRideAndUserMigration1745946351291 implements MigrationInterface {
    name = 'UpdateRideAndUserMigration1745946351291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "resetToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tokenExpirationDate"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "drop_date"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "drop_time"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "whatsapp_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" ADD "whatsapp_number" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "drop_time" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "drop_date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "tokenExpirationDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "resetToken" character varying`);
    }

}
