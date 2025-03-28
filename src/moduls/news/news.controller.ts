import { Body, Controller, Get, Param, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { NewsService } from "./news.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateNewsDto } from "./dto/create-news.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { NewsListQueryDto } from "./dto/list-news.dto";
import { NewsActionType } from "./news.types";
import { AuthorizedRequest } from "../auth/auth.types";
import { Roles } from "src/shared/decorator/role.decorator";
import { UserRole } from "../user/user.types";
import { LogRequestTimeInterceptor } from "src/interceptors/log-request-time.interceptor";

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @Get()
    @UseInterceptors(LogRequestTimeInterceptor)
    list(@Query() query: NewsListQueryDto) {
        return this.newsService.list(query);
    }

    @Get(':id')
    item(@Param('id') id: number) {
        return this.newsService.item(id);
    }


    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    create(@Body() body: CreateNewsDto) {
        return this.newsService.create(body);
    }


    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    update(@Body() body: UpdateNewsDto, @Param('id') id: number) {
        return this.newsService.update(id, body)
    }


    @Post(':id/action/:type')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Roles(UserRole.GUEST)
    action(@Param('id') id: number, @Param('type') type: NewsActionType) {
        return this.newsService.action(id, type);
    }
}