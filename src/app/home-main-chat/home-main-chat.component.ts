import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ShowChatCardService } from '../services/show-chat-card.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContactDetailsComponent } from '../dialog-contact-details/dialog-contact-details.component';
import { FormControl } from '@angular/forms';
import { ChatsService } from '../services/chats.service';
import { Observable, map, switchMap, take } from 'rxjs';
import { Message } from '../interfaces/chat-interface';

@Component({
  selector: 'app-home-main-chat',
  templateUrl: './home-main-chat.component.html',
  styleUrls: ['./home-main-chat.component.scss']
})
export class HomeMainChatComponent implements OnInit {

  messageControl = new FormControl ('');

  // messages$: 
  // messages$ = this.chatsService.storedChatId$.pipe(
  //   switchMap(chatId => this.chatsService.getChatMessages$(chatId))
  // );

  storedChatId: string = '';
  messages$: Observable<Message[]> | undefined;

  constructor(public dialog: MatDialog, 
    public contacts: ContactsServiceService, 
    public chatCard: ShowChatCardService,
    private chatsService: ChatsService){}

    

  openDialog() {
    this.dialog.open(DialogContactDetailsComponent);
  }

  sendMessage() {
    const message = this.messageControl.value;
  
    this.chatsService.storedChatId$.pipe(
      take(1) // Nimm nur den ersten emittierten Wert
    ).subscribe(selectedChatId => {
      if (selectedChatId && message) {
        this.chatsService.addChatMessage(selectedChatId, message).subscribe();
        this.messageControl.setValue('');
      }
    });
  }

  ngOnInit() {
    this.chatsService.storedChatId$.subscribe(chatId => {
      this.storedChatId = chatId;
      if (chatId) {
        this.messages$ = this.chatsService.getChatMessages$(chatId);
      }
    });
  }




  

}
