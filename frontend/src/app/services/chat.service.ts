import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private wsService: WebsocketService
  ) { }

  sendMessage(msg: string) {
    const payload = {
      name: this.wsService.getUser().name,
      message: msg
    };

    this.wsService.emit('message', payload);
  }

  getMessages() {
    return this.wsService.listen("new-message");
  }

  getPrivateMessages() {
    return this.wsService.listen("new-private-message");
  }
}
