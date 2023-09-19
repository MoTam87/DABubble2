import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ContactInterface } from '../interfaces/contact-interface';
import { ShowChatCardService } from '../services/show-chat-card.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  @Input() myContact !:ContactInterface;

  constructor(public contacts: ContactsServiceService, private chatCard: ShowChatCardService){

  }

  openContact() {
 
    this.chatCard.setShow(true);
  }


}
