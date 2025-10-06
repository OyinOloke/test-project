import {Controller,Post,Body,Param,Get,Put,Delete,UseGuards,} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { projectGuard } from '../projects/project.guard';

@Controller('projects/:id/tasks')
@UseGuards(projectGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Param('id') projectId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(+projectId, createTaskDto);
  }

  @Get()
  async getTasks(@Param('id') projectId: string) {
    return this.tasksService.getTasksByProject(+projectId);
  }

  @Put(':taskId')
  async updateTask(
    @Param('id') projectId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(+projectId, +taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async deleteTask(
    @Param('id') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.deleteTask(+projectId, +taskId);
  }
}