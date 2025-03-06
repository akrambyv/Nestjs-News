import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { NewsService } from "./news.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateNewsDto } from "./dto/create-news.dto";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('news')
export class NewsController {
    constructor(private NewsService: NewsService){}

    @Get()
    list() {
        return this.NewsService.list();
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    create(@Body() body: CreateNewsDto) {
        return this.NewsService.create(body);
    }
}