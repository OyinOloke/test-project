import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './projects.model';
import { CreateProjectDto, UpdateProjectDto } from './projects.dto';

@Injectable()
export class ProjectsService {
  constructor( @InjectModel(Project) private projectModel: typeof Project) {}

  async createProject(projectData: CreateProjectDto, userId: number): Promise<any> {
    if (!userId) {
      return 'User not authenticated';
    }

    const createdProject = await this.projectModel.create({
      name: projectData.name,
      description: projectData.description,
      userId: userId,
    });

    return createdProject;
  }

  async findProjectById(id: number): Promise<any> {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      return 'Project not found';
    }
    return project;
  }

  async findProjectsByUser(userId: number): Promise<Project[]> {
    const projects = await this.projectModel.findAll({ where: { userId } });
    return projects;
  }

  async findAllProjects(): Promise<Project[]> {
    return this.projectModel.findAll();
  }

  async updateProject(id: number, updateData: UpdateProjectDto): Promise<Project> {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }


    await project.update(updateData);
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    const project = await this.projectModel.findByPk(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    await project.destroy();
    return true;
  }
}
