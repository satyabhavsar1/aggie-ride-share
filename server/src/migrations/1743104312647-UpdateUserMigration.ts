import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserMigration1743104312647 implements MigrationInterface {
    name = 'UpdateUserMigration1743104312647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetToken" SET NOT NULL`);
    }

}
