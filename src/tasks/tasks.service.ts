import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { ProjectsService } from '../projects/projects.service'; 
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task,private readonly projectsService: ProjectsService,) {}

   async createTask(projectId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectsService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const task = await this.taskModel.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: createTaskDto.status ?? 'todo', 
      projectId: projectId,
    });

    return task;
  }


  async getTasksByProject(projectId: number) {
    return this.taskModel.findAll({ where: { projectId } });
  }

  async updateTask(projectId: number, taskId: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findOne({ where: { id: taskId, projectId } });
    if (!task) throw new NotFoundException('Task not found.');
    return task.update(updateTaskDto);
  }

  async deleteTask(projectId: number, taskId: number) {
    const task = await this.taskModel.findOne({ where: { id: taskId, projectId } });
    if (!task) throw new NotFoundException('Task not found.');
    await task.destroy();
    return { message: 'Task deleted successfully.' };
  }
}
