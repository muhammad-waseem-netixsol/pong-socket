import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    handleMessage(client: any, payload: string): string;
}
