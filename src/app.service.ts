import { Injectable } from '@nestjs/common';
import { EventsGateway } from './socket/socket.gateway';

@Injectable()
export class AppService {
  constructor(private eventsGateway: EventsGateway) {}
  getHello(): string {
    return 'Hello World!';
  }
}
