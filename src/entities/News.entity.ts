import { BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "./Category.entity";
import { NewsActionHistory } from "./NewsActionHistory.entity";
import { CommentEntity } from "./Comment.entity";

@Entity('news')
export class NewsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    thumbnail: string;

    @Column()
    slug: string;

    @Column({ default: 0 })
    views: number;

    @Column({ default: 0 })
    like: number;

    @Column({ default: 0 })
    dislike: number;

    @Column({ default: false })
    hot: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    categoryId: number;

    @OneToMany(() => CommentEntity, (item: CommentEntity) => item.news)
    comments: CommentEntity;

    @ManyToOne(() => CategoryEntity, (item: CategoryEntity) => item.news)
    category: CategoryEntity;

    @OneToMany(() => NewsActionHistory, (item: NewsActionHistory) => item.news)
    actionHistory: NewsActionHistory[];

    @BeforeInsert()
    @BeforeUpdate()
    beforeUpsert() {
        if (!this.slug && this.title) {
            this.slug = this.title
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/^-+|-+$/g, '');
        }
    }
}