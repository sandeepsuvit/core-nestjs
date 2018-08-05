import { MigrationInterface, QueryRunner } from 'typeorm';

export class OauthTokensAccesstokenAddField1533382555230
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "temporary_oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200) NOT NULL, "expires_at" datetime, "token_type" varchar(200) NOT NULL, "scope" varchar(512) NOT NULL, "user_id" integer, "providerClientId" varchar(200) NOT NULL, CONSTRAINT "FK_61da71977c0f172fe607e4e54c7" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_oauth_tokens_accesstoken"("id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "oauth_tokens_accesstoken"`
    );
    await queryRunner.query(`DROP TABLE "oauth_tokens_accesstoken"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_oauth_tokens_accesstoken" RENAME TO "oauth_tokens_accesstoken"`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar(128) NOT NULL, "last_login" datetime DEFAULT (datetime('now')), "is_superuser" boolean NOT NULL DEFAULT (0), "username" varchar(150) NOT NULL, "first_name" varchar(30) NOT NULL, "last_name" varchar(30) NOT NULL, "email" varchar(254) NOT NULL, "is_staff" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "date_of_birth" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth") SELECT "id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth" FROM "user"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200), "expires_at" datetime, "token_type" varchar(200), "scope" varchar(512), "user_id" integer, "providerClientId" varchar(200) NOT NULL, CONSTRAINT "FK_61da71977c0f172fe607e4e54c7" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_oauth_tokens_accesstoken"("id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id", "providerClientId") SELECT "id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id", "providerClientId" FROM "oauth_tokens_accesstoken"`
    );
    await queryRunner.query(`DROP TABLE "oauth_tokens_accesstoken"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_oauth_tokens_accesstoken" RENAME TO "oauth_tokens_accesstoken"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "oauth_tokens_accesstoken" RENAME TO "temporary_oauth_tokens_accesstoken"`
    );
    await queryRunner.query(
      `CREATE TABLE "oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200) NOT NULL, "expires_at" datetime, "token_type" varchar(200) NOT NULL, "scope" varchar(512) NOT NULL, "user_id" integer, "providerClientId" varchar(200) NOT NULL, CONSTRAINT "FK_61da71977c0f172fe607e4e54c7" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "oauth_tokens_accesstoken"("id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id", "providerClientId") SELECT "id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id", "providerClientId" FROM "temporary_oauth_tokens_accesstoken"`
    );
    await queryRunner.query(`DROP TABLE "temporary_oauth_tokens_accesstoken"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar(128) NOT NULL, "last_login" datetime DEFAULT (datetime('now')), "is_superuser" boolean NOT NULL DEFAULT (0), "username" varchar(150), "first_name" varchar(30), "last_name" varchar(30), "email" varchar(254) NOT NULL, "is_staff" boolean NOT NULL DEFAULT (0), "is_active" boolean NOT NULL DEFAULT (0), "date_joined" datetime NOT NULL DEFAULT (datetime('now')), "date_of_birth" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth") SELECT "id", "password", "last_login", "is_superuser", "username", "first_name", "last_name", "email", "is_staff", "is_active", "date_joined", "date_of_birth" FROM "temporary_user"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(
      `ALTER TABLE "oauth_tokens_accesstoken" RENAME TO "temporary_oauth_tokens_accesstoken"`
    );
    await queryRunner.query(
      `CREATE TABLE "oauth_tokens_accesstoken" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "provider" varchar(20) NOT NULL, "granted_at" datetime NOT NULL DEFAULT (datetime('now')), "access_token" varchar(500) NOT NULL, "refresh_token" varchar(200) NOT NULL, "expires_at" datetime, "token_type" varchar(200) NOT NULL, "scope" varchar(512) NOT NULL, "user_id" integer, CONSTRAINT "FK_61da71977c0f172fe607e4e54c7" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "oauth_tokens_accesstoken"("id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id") SELECT "id", "provider", "granted_at", "access_token", "refresh_token", "expires_at", "token_type", "scope", "user_id" FROM "temporary_oauth_tokens_accesstoken"`
    );
    await queryRunner.query(`DROP TABLE "temporary_oauth_tokens_accesstoken"`);
  }
}