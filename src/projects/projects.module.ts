import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import{ APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { User } from 'src/users/users.models';
@Module({
  imports:[SequelizeModule.forFeature([Project])],
  providers: [ProjectsService,{provide:APP_GUARD, useClass:AuthGuard}],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
