import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class addGroupTable1632483591282 implements MigrationInterface {
  name = 'addGroupTable1632483591282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE IF EXISTS "groups_permissions_enum";`);
    await queryRunner.query(
      `CREATE TYPE "groups_permissions_enum" AS ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')`
    );
    await queryRunner.query(
      `CREATE TABLE "groups" ("id" uuid NOT NULL, "name" text NOT NULL, "permissions" "groups_permissions_enum" array NOT NULL DEFAULT '{}', CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `insert into groups (id, name, permissions) values ('${uuidv4()}', 'developer', '{"WRITE"}'), ('${uuidv4()}', 'QA engineer', '{"WRITE", "READ", "SHARE"}'), ('${uuidv4()}', 'administrator', '{"READ" , "WRITE" , "DELETE" , "SHARE" , "UPLOAD_FILES"}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "groups"`);
    await queryRunner.query(`DROP TYPE "groups_permissions_enum"`);
  }
}
