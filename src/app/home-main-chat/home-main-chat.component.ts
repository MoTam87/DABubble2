import { Component, EventEmitter, Output } from '@angular/core';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ShowChatCardService } from '../services/show-chat-card.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContactDetailsComponent } from '../dialog-contact-details/dialog-contact-details.component';

@Component({
  selector: 'app-home-main-chat',
  templateUrl: './home-main-chat.component.html',
  styleUrls: ['./home-main-chat.component.scss']
})
export class HomeMainChatComponent {

  constructor(public dialog: MatDialog, 
    public contacts: ContactsServiceService, 
    public chatCard: ShowChatCardService){}



  openDialog() {
    this.dialog.open(DialogContactDetailsComponent);
  }



  

  

}
