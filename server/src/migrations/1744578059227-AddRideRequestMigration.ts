import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRideRequestMigration1744578059227 implements MigrationInterface {
    name = 'AddRideRequestMigration1744578059227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride_request" ADD "num_seats_requested" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride_request" DROP COLUMN "num_seats_requested"`);
    }

}
