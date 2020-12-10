import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: SocketIOClient.Socket;
  public socketStatus: boolean = false;

  constructor() {
    this.socket = io.connect(environment.wsUrl);
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      console.log("Connected to server");
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log("Disconnected from server");
      this.socketStatus = false;
    });

  }

  emit(event: string, payload?: any, callback?: VoidFunction) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return new Observable(observer => {
      this.socket.on(event, data => {
        observer.next(data);
      });
    });
  }
}
