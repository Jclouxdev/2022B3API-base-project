import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { ProjectUser } from '../project-user.entity';
import { User } from '../../auth/decorators/UserDecorator';
import { getRepository } from 'typeorm';
import AuthGuard from '../../auth/guards/jwt-auth.guard';
import UserEntity from '../../users/user.entity';

@Controller('project-users')
@UseGuards(AuthGuard)
export class ProjectUsersController {
  // GET /project-users
  @Get()
  async findAll(@User() user: UserEntity): Promise<ProjectUser[]> {
    const userRepository = getRepository(User);
    const projectUserRepository = getRepository(ProjectUser);

    if (user.role === 'Employee') {
      return projectUserRepository.find({
        where: { userId: user.id },
      });
    } else {
      return projectUserRepository.find();
    }
  }

  // GET /project-users/:id
  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: UserEntity): Promise<ProjectUser> {
    const projectUserRepository = getRepository(ProjectUser);
    const projectUser = await projectUserRepository.findOne({ id });

    if (!projectUser) {
      throw new NotFoundException();
    }

    if (user.role === 'Employee' && user.id !== projectUser.userId) {
      throw new UnauthorizedException();
    }

    return projectUser;
  }

  // POST /project-users
  @Post()
  async create(
    @Body() projectUserData: CreateProjectUserDto,
    @User() user: UserEntity,
  ) {
    const userRepository = getRepository(User);
    const projectRepository = getRepository(Project);
    const projectUserRepository = getRepository(ProjectUser);

    if (user.role !== 'Admin' && user.role !== 'ProjectManager') {
      throw new UnauthorizedException();
    }

    const overlappingProjectUsers = await projectUserRepository.find({
      where: {
        userId: projectUserData.userId,
        startDate: Between(projectUserData.startDate, projectUserData.endDate),
      },
    });

    if (overlappingProjectUsers.length > 0) {
      throw new ConflictException(
        'The user is already assigned to a project during this period',
      );
    }

    const user = await userRepository.findOne({
      id: projectUserData.userId,
    });
    const project = await projectRepository.findOne({
      id: projectUserData.projectId,
    });

    if (!user || !project) {
      throw new NotFoundException();
    }

    const projectUser = projectUserRepository.create(projectUserData);
    await projectUserRepository.save(projectUser);
    return { user, project, ...projectUser };
  }
}
