import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employe } from './employe.entity';

@Entity()
export class ContactInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  employeId: number;

  @OneToOne(() => Employe, (employe) => employe.contactInfo, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  employe: Employe;
}
