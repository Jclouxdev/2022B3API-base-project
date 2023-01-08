import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { Event } from '../event.entity';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../auth/decorators/UserDecorator'
import UserEntity from '../../users/user.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@User() user: UserEntity): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@User() user: UserEntity, @Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(user.id, createEventDto);
  }
}
