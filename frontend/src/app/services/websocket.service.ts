import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket: SocketIOClient.Socket;
  public socketStatus: boolean = false;
  public user: User = null;

  constructor(private router: Router) {
    this.socket = io.connect(environment.wsUrl);
    this.loadStorage();
    this.checkStatus();
  }

  checkStatus() {

    this.socket.on('connect', () => {
      this.socketStatus = true;
      this.loadStorage();
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    });

  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return new Observable(observer => {
      this.socket.on(event, data => {
        observer.next(data);
      });
    });
  }

  loginWS(name: string) {
    return new Promise( (resolve, reject) => {
      this.emit('user-configuration', {name}, (resp) => {
        this.user = new User(resp.user.name);
        this.saveStorage();
        resolve(resp);
      });
    });
  }

  logoutWS() {
    this.user = null;
    localStorage.removeItem("user");
    const payload = {
      name: "anonymous"
    }
    this.emit("user-configuration", payload);
    this.router.navigateByUrl("/login");
  }

  getUser() {
    return this.user;
  }

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage() {
    if(localStorage.getItem("user")) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.loginWS(this.user.name);
    }
  }
}
