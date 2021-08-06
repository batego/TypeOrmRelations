import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employe } from './employe.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employe) private employeeRepo: Repository<Employe>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  async seed() {
    const ceo = this.employeeRepo.create({ name: 'Mr. CEO' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactInfoRepo.create({
      email: 'email@email.com',
    });

    ceoContactInfo.employe = ceo;
    await this.contactInfoRepo.save(ceoContactInfo);

    const managerr = this.employeeRepo.create({
      name: 'Marius',
      manager: ceo,
    });

    const task1 = this.taskRepo.create({ name: 'hire people' });
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({ name: 'hire people' });
    await this.taskRepo.save(task2);

    managerr.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    managerr.meetings = [meeting1];

    this.employeeRepo.save(managerr);
  }

  getEmployeById(id: number): any {
    return this.employeeRepo.findOne(id, {
      relations: [
        'manager',
        'directReports',
        'contactInfo',
        'tasks',
        'meetings',
      ],
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
