import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCityMigration1743624802546 implements MigrationInterface {
    name = 'CreateCityMigration1743624802546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "city_from"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "city_to"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "cityFromId" integer`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "cityToId" integer`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_755d0cbd268319dc720eb5ea678" FOREIGN KEY ("cityFromId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ride" ADD CONSTRAINT "FK_91c4b4c768f49b98b491b19b2cf" FOREIGN KEY ("cityToId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_91c4b4c768f49b98b491b19b2cf"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP CONSTRAINT "FK_755d0cbd268319dc720eb5ea678"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "cityToId"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "cityFromId"`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "city_to" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ADD "city_from" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
