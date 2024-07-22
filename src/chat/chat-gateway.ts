import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket,Server } from 'socket.io';

    @WebSocketGateway(3002)
    export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect {
        
    @WebSocketServer() server:Server;

    handleConnection(client: Socket) {
        console.log('new user connected',client.id);

        client.broadcast.emit('reply','new user joined',client.id);// this will give msg to all users except the current user
    }

    handleDisconnect(client: Socket) {
        console.log('user disconnected',client.id);
    }
    
    @SubscribeMessage('newMessage')
    handleNewMessage(client:Socket,message:any){
        console.log(message);

        client.emit('reply','This is my reply');
        this.server.emit('reply','broadcasting msg');
        
    }
    }
