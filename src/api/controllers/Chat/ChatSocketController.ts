import {
  OnConnect,
  SocketController,
  ConnectedSocket,
  SocketIO,
  OnDisconnect,
  MessageBody,
  OnMessage,
} from 'socket-controllers';
import { Service } from 'typedi';

@Service()
@SocketController()
export class ChatSocketController {
  @OnConnect()
  connection(@ConnectedSocket() socket: any) {
    console.log('Client connected.');
  }

  @OnDisconnect()
  disconnect(@ConnectedSocket() socket: any) {
    console.log('Client disconnected.');
  }

  @OnMessage('save-message')
  save(@SocketIO() socket: any, @MessageBody() message: any) {
    console.log('Received message: ', message);
    console.log('Setting id to the message and sending it back to the client.');
    message.id = 1;

    socket.emit('message-saved', message);
  }
}
