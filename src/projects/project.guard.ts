import {CanActivate,ExecutionContext,Injectable,ForbiddenException,NotFoundException,} from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Injectable()
export class projectGuard implements CanActivate {
  constructor(private readonly projectsService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const projectId = parseInt(request.params.id, 10);

    if (!user || isNaN(projectId)) {
      throw new ForbiddenException('Invalid user or project ID.');
    }

    const project = await this.projectsService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    if (project.userId !== user.sub) {
      throw new ForbiddenException('You do not have access to this project.');
    }
    return true;
  }
}
