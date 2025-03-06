import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import { UserModule } from './moduls/user/user.module';
import { AuthModule } from './moduls/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { NewsModule } from './moduls/news/news.module';
import { CategoryModule } from './moduls/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.databaseUrl,
      migrations: [],
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      autoLoadEntities: true,
      logging: true,
    }),
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: {
        expiresIn: '1d',
      }
    }),
    UserModule,
    AuthModule,
    NewsModule,
    CategoryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
