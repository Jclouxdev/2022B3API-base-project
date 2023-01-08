import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "../users/user.entity";

@Entity()
export default class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar')
  description?: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  referringEmployeeId: string;
}
