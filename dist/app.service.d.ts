import { EventsGateway } from './socket/socket.gateway';
export declare class AppService {
    private eventsGateway;
    constructor(eventsGateway: EventsGateway);
    getHello(): string;
}
