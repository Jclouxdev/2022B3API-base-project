import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectService } from './services/projects.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectService]
})
export class ProjectsModule {}
