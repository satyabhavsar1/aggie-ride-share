import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRideRequestMigration1744386222293 implements MigrationInterface {
    name = 'AddRideRequestMigration1744386222293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ride_request" ("id" SERIAL NOT NULL, "requestedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'pending', "requesterId" integer, "rideId" integer, CONSTRAINT "PK_f5d356576522e43e56a3a0e906b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "contactNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride_request" ADD CONSTRAINT "FK_f5701d1810b2f1a8a4a7721ff8b" FOREIGN KEY ("requesterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride_request" ADD CONSTRAINT "FK_ed9a52a1fb727df792aefac8ac3" FOREIGN KEY ("rideId") REFERENCES "ride"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride_request" DROP CONSTRAINT "FK_ed9a52a1fb727df792aefac8ac3"`);
        await queryRunner.query(`ALTER TABLE "ride_request" DROP CONSTRAINT "FK_f5701d1810b2f1a8a4a7721ff8b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "contactNumber" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "ride_request"`);
    }

}
