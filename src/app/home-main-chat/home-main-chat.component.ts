import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { DialogContactDetailsComponent } from '../dialog-contact-details/dialog-contact-details.component';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ChatUsers, Message } from '../interfaces/chat-interface';
import { ChatsService } from '../services/chats.service';
import { ShowChatCardService } from '../services/show-chat-card.service';
import { ContactInterface } from '../interfaces/contact-interface';

@Component({
  selector: 'app-home-main-chat',
  templateUrl: './home-main-chat.component.html',
  styleUrls: ['./home-main-chat.component.scss']
})
export class HomeMainChatComponent implements OnInit  {

  messageControl = new FormControl ('');
  user$ = this.contacts.currentUserProfile$;
  userId !: String;
  storedChatId: string = '';
  messages$: Observable<Message[]> | undefined;
  users$: Observable<ChatUsers[]> | undefined;

  @ViewChild('endOfChat') endOfChat!:ElementRef;
 

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
        this.chatsService.addChatMessage(selectedChatId, message).subscribe( () => {
          this.scrollToBottom();
        });
        this.messageControl.setValue('');
      }
    });
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: "smooth"})
      }
    }, 10);

  }

  ngOnInit() {
    this.chatsService.storedChatId$.subscribe(chatId => {
      this.storedChatId = chatId;
      if (chatId) {
        this.messages$ = this.chatsService.getChatMessages$(chatId);
        this.messages$.subscribe( () => {
          this.scrollToBottom();
        })
      }
    });
    this.user$.subscribe( user => {
      this.userId = user?.uid
    })
  }


  

}
