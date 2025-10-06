import { Body,Controller,Get,Post,Put,Delete,Param,Req,UseGuards,HttpException,HttpStatus,} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';
import { projectGuard } from './project.guard';
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() projectData: CreateProjectDto, @Req() req) {
    const userId = req.user.sub;
    const created = await this.projectsService.createProject(projectData, userId);
    if (!created)
      throw new HttpException('Project creation failed', HttpStatus.BAD_REQUEST);

    return { message: 'Project created successfully' };
  }
  
  @UseGuards(projectGuard)
  @Get('my-projects')
  async getUserProjects(@Req() req) {
    const userId = req.user.sub;
    const projects = await this.projectsService.findProjectsByUser(userId);
    return { projects: projects ?? [] };
  }

  @UseGuards(projectGuard)
  @Get(':id')
  async getProjectById(@Param('id') id: number) {
    const project = await this.projectsService.findProjectById(id);
    return project;
  }

  @UseGuards(projectGuard)
  @Put(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() projectUpdate: UpdateProjectDto,
  ) {
    const updated = await this.projectsService.updateProject(id, projectUpdate);
    return { success: updated };
  }

  @UseGuards(projectGuard)
  @Delete(':id')
  async deleteProject(@Param('id') id: number) {
    const deleted = await this.projectsService.deleteProject(id);
    return { success: deleted };
  }
}
