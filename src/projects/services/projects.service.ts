import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Project from '../project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import User from '../../users/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findById(id: string): Promise<Project> {
    return this.projectRepository.findOneBy({id});
  }

  async findByUser(userId: string): Promise<Project[]> {
    const projects = await this.projectRepository.find({ relations: ['users', 'referringEmployee'] });
    return projects.filter(project => project.users.some(user => user.id === userId));
  }

  // async create(createProjectDto: CreateProjectDto, referringEmployee: User): Promise<Project> {
  //   const project = new Project();
  //   project.name = createProjectDto.name;
  //   project.referringEmployee = referringEmployee;
  //   return this.projectRepository.save(project);
  // }
}
