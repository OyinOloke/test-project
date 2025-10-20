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
    const createdTask= await this.tasksService.createTask(+projectId, createTaskDto);
    return {
      message: "Project created",
      content: createdTask
    }
  }

  @Get()
  async getTasks(@Param('id') projectId: string) {
    const GottenTask= await this.tasksService.getTasksByProject(+projectId);
    return { message:"Tasks successfully found",
      content: GottenTask}
  }

  @Put(':taskId')
  async updateTask(
    @Param('id') projectId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    this.tasksService.updateTask(+projectId, +taskId, updateTaskDto);
    return {message: "Task updated"}
  }

  @Delete(':taskId')
  async deleteTask(
    @Param('id') projectId: string,
    @Param('taskId') taskId: string,
  ) {
     this.tasksService.deleteTask(+projectId, +taskId);
     return {message: "Tasks are deleted"}
  }
}