import { Controller, Get, Param, Post, Body, UseGuards, NotFoundException, ForbiddenException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import  Project  from '../project.entity';
import  UserEntity from '../../users/user.entity';
import { User } from '../../auth/decorators/UserDecorator'
import { getRepository } from 'typeorm';
import AuthGuard from '../../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  // GET /projects
  @Get()
  async findAll(@User() user: UserEntity): Promise<Project[]> {
    const userRepository = getRepository(UserEntity);
    const projectRepository = getRepository(Project);

    if (user.role === 'Employee') {
      return projectRepository.find({
        where: { referringEmployeeId: user.id },
      });
    } else {
      return projectRepository.find();
    }
  }

  // GET /projects/:id
  @Get(':id')
  async findOne(@Param('id') id: string, @User() user: UserEntity): Promise<Project> {
    const userRepository = getRepository(UserEntity);
    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne({ id });

    if (!project) {
      throw new NotFoundException();
    }

    if (user.role === 'Employee' && user.id !== project.referringEmployeeId) {
      throw new ForbiddenException();
    }

    return project;
  }

  // POST /projects
  @Post()
  async create(@Body() projectData: CreateProjectDto, @User() user: UserEntity) {
    const userRepository = getRepository(UserEntity);
    const projectRepository = getRepository(Project);

    if (user.role !== 'Admin') {
      throw new UnauthorizedException();
    }

    const referringEmployee = await userRepository.findOne({
      id: projectData.referringEmployeeId,
    });

    if (!referringEmployee || referringEmployee.role !== 'Admin') {
      throw new BadRequestException(
        'The referring employee must be an admin',
      );
    }

    const project = projectRepository.create(projectData);
    await projectRepository.save(project);
    return project;
  }
}
