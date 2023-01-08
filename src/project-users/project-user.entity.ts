import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import  User  from '../users/user.entity';
import Project from '../projects/project.entity';

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid' })
  projectId: string;

  @ManyToOne(type => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
