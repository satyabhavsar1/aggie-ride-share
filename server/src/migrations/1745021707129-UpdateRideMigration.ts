import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRideMigration1745021707129 implements MigrationInterface {
    name = 'UpdateRideMigration1745021707129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" RENAME COLUMN "contact_number" TO "contactNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" RENAME COLUMN "contactNumber" TO "contact_number"`);
    }

}
