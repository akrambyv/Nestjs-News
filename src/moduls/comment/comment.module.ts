import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "src/entities/Comment.entity";
import { NewsModule } from "../news/news.module";

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity]), NewsModule],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule { }