import { MigrationInterface, QueryRunner } from "typeorm";

export class TesteTabelaPuf1727460809607 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(
            `CREATE TABLE "teste_tabela_puf" (
                  id  SERIAL PRIMARY KEY,
                  id_cliente varchar NOT NULL,
                  ativo BOOLEAN default false
              );`,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
