import { type MigrationInterface, type QueryRunner } from "typeorm";

export class CreateRideMigration1741719694191 implements MigrationInterface {
    name = 'CreateRideMigration1741719694191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ride" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "date" date NOT NULL, "time" TIME NOT NULL, "pickups" text array NOT NULL, "drops" text array NOT NULL, "cost" numeric NOT NULL, "drop_date" date NOT NULL, "drop_time" TIME NOT NULL, "num_seats" integer NOT NULL, "city_from" text NOT NULL, "city_to" text NOT NULL, "contact_number" bigint NOT NULL, "whatsapp_number" bigint NOT NULL, CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ride"`);
    }

}
