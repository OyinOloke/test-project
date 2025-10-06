import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.models';
import { Task } from './tasks/tasks.model';
import { Project } from './projects/projects.model';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.middleware';

@Module(
  {
  imports: [ConfigModule.forRoot({isGlobal:true}),
     SequelizeModule.forRoot({
      dialect:"postgres",
      host: process.env.DB_HOST,
      port:Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels:true,
      synchronize:true,
      models:[User,Project,Task],
    }),
     UsersModule,
     TasksModule, 
     ProjectsModule,
     AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
