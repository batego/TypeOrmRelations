import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employe } from './employe.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zoomUrl: string;

  @ManyToMany(() => Employe, (employe) => employe.meetings)
  attendees: Employe[];
}
