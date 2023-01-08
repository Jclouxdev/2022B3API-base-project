import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import  User  from '../users/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: ['Pending', 'Accepted', 'Declined'], default: 'Pending' })
  eventStatus: 'Pending' | 'Accepted' | 'Declined';

  @Column({ type: 'enum', enum: ['RemoteWork', 'PaidLeave'] })
  eventType: 'RemoteWork' | 'PaidLeave';

  @Column()
  eventDescription: string;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
