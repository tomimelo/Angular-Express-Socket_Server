import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Sockets';

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getPrivateMessages().subscribe((msg: any) => {
      console.log(`New message from ${msg.name}: ${msg.message}`);
    });
  }
}
