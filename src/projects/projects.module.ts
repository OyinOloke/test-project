import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './projects.model';


@Module({
  imports:[SequelizeModule.forFeature([Project])],
  providers: [ProjectsService,],
  controllers: [ProjectsController],
  exports:[ProjectsService]
})
export class ProjectsModule {}
