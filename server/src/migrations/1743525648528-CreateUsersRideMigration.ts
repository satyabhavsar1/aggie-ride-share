import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersRideMigration1743525648528 implements MigrationInterface {
    name = 'CreateUsersRideMigration1743525648528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "passwordHash" character varying NOT NULL, "email" character varying NOT NULL, "registrationTime" TIMESTAMP NOT NULL DEFAULT now(), "resetToken" character varying, "tokenExpirationDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "date" date NOT NULL, "time" TIME NOT NULL, "pickups" text array NOT NULL, "drops" text array NOT NULL, "cost" numeric NOT NULL, "drop_date" date NOT NULL, "drop_time" TIME NOT NULL, "num_seats" integer NOT NULL, "city_from" text NOT NULL, "city_to" text NOT NULL, "contact_number" bigint NOT NULL, "whatsapp_number" bigint NOT NULL, "userId" integer, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_9ae4b85478d3d8adb6e8f6f7172" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_9ae4b85478d3d8adb6e8f6f7172"`);
        await queryRunner.query(`DROP TABLE "ride"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
