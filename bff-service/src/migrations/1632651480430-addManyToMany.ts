import { MigrationInterface, QueryRunner } from 'typeorm';

export class addManyToMany1632651480430 implements MigrationInterface {
  name = 'addManyToMany1632651480430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "groups_users_users" ("groupsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_8dee02fc8de57bffcccce22565d" PRIMARY KEY ("groupsId", "usersId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6320d5cbd6f7702b2e78d38d6b" ON "groups_users_users" ("groupsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0f3881cfe1ef94b0e435d1d72f" ON "groups_users_users" ("usersId") `
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" ADD CONSTRAINT "FK_6320d5cbd6f7702b2e78d38d6b8" FOREIGN KEY ("groupsId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" ADD CONSTRAINT "FK_0f3881cfe1ef94b0e435d1d72f9" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" DROP CONSTRAINT "FK_0f3881cfe1ef94b0e435d1d72f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "groups_users_users" DROP CONSTRAINT "FK_6320d5cbd6f7702b2e78d38d6b8"`
    );
    await queryRunner.query(`DROP INDEX "IDX_0f3881cfe1ef94b0e435d1d72f"`);
    await queryRunner.query(`DROP INDEX "IDX_6320d5cbd6f7702b2e78d38d6b"`);
    await queryRunner.query(`DROP TABLE "groups_users_users"`);
  }
}
