import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddHotFieldToNews1741791532768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'news',
            [new TableColumn({
                name: 'hot',
                type: 'boolean',
                default: false,
                isNullable: true,
            }),]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('news', 'hot');
    }

}
