import { Injectable, NotFoundException } from '@nestjs/common';
import { getRepository, Repository } from 'typeorm';
import { Event } from '../event.entity';
import { CreateEventDto } from '../dto/create-event.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  async findOne(id: string): Promise<Event> {
    const eventRepository = getRepository(Event);
    const event = await eventRepository.findOneBy({ id });
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async create(userId: string, createEventDto: CreateEventDto): Promise<Event> {
    const event = new Event();
    event.date = createEventDto.date;
    event.eventType = createEventDto.eventType;
    event.eventDescription = createEventDto.eventDescription;
    event.userId = userId;
    return this.eventsRepository.save(event);
  }
}
