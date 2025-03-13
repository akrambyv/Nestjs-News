import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddBalanceToUser1741796507039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({ name: 'balance', type: 'integer', default: 0 }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'balance');
    }
}
