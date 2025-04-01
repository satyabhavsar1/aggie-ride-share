import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimeStampToRideMigration1743096842028 implements MigrationInterface {
    name = 'AddTimeStampToRideMigration1743096842028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "passwordHash" character varying NOT NULL, "email" character varying NOT NULL, "registrationTime" TIMESTAMP NOT NULL DEFAULT now(), "resetToken" character varying NOT NULL, "tokenExpirationDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373761" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride_users_user" ("rideId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_f4043e5196ac1922ecce4bfe2a2" PRIMARY KEY ("rideId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b39ce007c3f6757f5772c4e980" ON "ride_users_user" ("rideId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd7786a5287a74e84650b5deb7" ON "ride_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "ride" ADD "creator" character varying DEFAULT '' NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "created_time" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "updated_time" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ride_users_user" ADD CONSTRAINT "FK_b39ce007c3f6757f5772c4e980f" FOREIGN KEY ("rideId") REFERENCES "ride"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ride_users_user" ADD CONSTRAINT "FK_dd7786a5287a74e84650b5deb7b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride_users_user" DROP CONSTRAINT "FK_dd7786a5287a74e84650b5deb7b"`);
        await queryRunner.query(`ALTER TABLE "ride_users_user" DROP CONSTRAINT "FK_b39ce007c3f6757f5772c4e980f"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "updated_time"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "created_time"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "creator"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd7786a5287a74e84650b5deb7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b39ce007c3f6757f5772c4e980"`);
        await queryRunner.query(`DROP TABLE "ride_users_user"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
