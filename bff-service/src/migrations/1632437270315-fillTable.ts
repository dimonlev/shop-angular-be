import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class fillTable1632437270315 implements MigrationInterface {
  name = 'fillTable1632437270315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL, "login" text NOT NULL, "password" text NOT NULL, "age" integer NOT NULL, "isdeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `insert into users (id, login, password, age, isdeleted) values ('${uuidv4()}', 'masha1', 'pass1', 35, false), ('${uuidv4()}', 'misha2', 'pass2', 45, false), ('${uuidv4()}', 'dasha3', 'pass3', 13, false), ('${uuidv4()}', 'sasha4', 'pass4', 65, false)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
