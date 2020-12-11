import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = "";

  constructor(public wsService: WebsocketService,
              private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(this.name.trim() === "") {
      return;
    }

    this.wsService.loginWS(this.name)
      .then((res) => {
        console.log(res);
        this.router.navigateByUrl("/messages");
      })
  }

}
