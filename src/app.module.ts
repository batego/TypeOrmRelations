import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfo } from './contact-info.entity';
import { Employe } from './employe.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Sara0105',
      database: 'curso',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      // retryDelay: 3000,
      // retryAttempts: 10,
      // logging: true,
    }),
    TypeOrmModule.forFeature([Employe, ContactInfo, Meeting, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
