import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSpotMigration1745026678819 implements MigrationInterface {
    name = 'AddSpotMigration1745026678819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "spot" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cityId" integer, CONSTRAINT "PK_f2a0a47e5ae78713daf83a5f7b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "spot" ADD CONSTRAINT "FK_4726dec41bc9aa87afbe5bf58f9" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "spot" DROP CONSTRAINT "FK_4726dec41bc9aa87afbe5bf58f9"`);
        await queryRunner.query(`DROP TABLE "spot"`);
    }

}
