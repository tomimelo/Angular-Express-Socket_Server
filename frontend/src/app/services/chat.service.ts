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
      from: "Tomas",
      message: msg
    };

    this.wsService.emit('message', payload);
  }

  getMessages() {
    return this.wsService.listen("new-message");
  }
}
