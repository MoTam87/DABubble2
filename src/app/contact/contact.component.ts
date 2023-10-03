import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ContactInterface } from '../interfaces/contact-interface';
import { ShowChatCardService } from '../services/show-chat-card.service';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent  {

  @Input() myContact !:ContactInterface;

  

  constructor(public contacts: ContactsServiceService, 
    private chatCard: ShowChatCardService,
    private chatService: ChatsService
    ){

  }

  openContact() {
    this.chatCard.setShow(true);
  };

  createChat(otherUser: ContactInterface){
    this.chatService.createChat(otherUser).subscribe();
  }

 




}
