import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { UserModule } from './moduls/user/user.module';
import { AuthModule } from './moduls/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { NewsModule } from './moduls/news/news.module';
import { CategoryModule } from './moduls/category/category.module';
import { CommentModule } from './moduls/comment/comment.module';
import { ClsModule } from 'nestjs-cls';
import DataSource from './config/typeorm';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UploadModule } from './moduls/upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(DataSource.options),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: '1d',
      }
    }),
    ClsModule.forRoot({
      global: true,
      guard: { mount: true },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 2,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../uploads"),
      serveRoot: '/uploads',
    }),
    UserModule,
    AuthModule,
    NewsModule,
    CategoryModule,
    CommentModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerModule }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
