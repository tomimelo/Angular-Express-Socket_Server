import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public message: string = "";
  public chat$: Subscription;
  chatBox: HTMLElement;

  messages: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatBox = document.getElementById("chat-box");
    this.chat$ = this.chatService.getMessages().subscribe((msg: any) => {
      this.messages.push(msg);
      setTimeout(() => {
        this.chatBox.scrollTop = this.chatBox.scrollHeight;
      }, 50);
    });
  }

  send() {
    if(this.message.trim() === "") {
      return;
    }
    this.chatService.sendMessage(this.message);
    this.message = "";
  }

  ngOnDestroy(): void {
    this.chat$.unsubscribe();    
  }

}
