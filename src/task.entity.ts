import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employe } from './employe.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employe)
  contactInfo: any;

  @ManyToOne(() => Employe, (employe) => employe.tasks, {
    onDelete: 'SET NULL',
  })
  employe: Employe;
}
