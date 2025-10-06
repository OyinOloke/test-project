import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['todo', 'in-progress', 'done'])
  @IsOptional()
  status?: 'todo' | 'in-progress' | 'done';
}


export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(['todo', 'in-progress', 'done'])
  @IsOptional()
  status: 'todo' | 'in-progress' | 'done';
}
