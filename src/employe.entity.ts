import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Entity()
export class Employe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employe, (employe) => employe.directReports, {
    onDelete: 'SET NULL',
  })
  manager: Employe;

  @OneToMany(() => Employe, (employe) => employe.manager)
  directReports: Employe[];

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employe)
  contactInfo: any;

  @OneToMany(() => Task, (task) => task.employe)
  tasks: Task[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meeting[];
}
