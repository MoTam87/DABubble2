import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { DialogNewChannelComponent } from '../dialog-new-channel/dialog-new-channel.component';
import { ContactInterface } from '../interfaces/contact-interface';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { DialogProfilInfoComponent } from '../dialog-profil-info/dialog-profil-info.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  panelOpenState = false;


  constructor(public dialog: MatDialog, public contacts: ContactsServiceService){}

  openDialog(){
    this.dialog.open(DialogNewChannelComponent)
  }

  getContacts(): ContactInterface[]{
    return this.contacts.allContacts
  }

  openProfilDialog() {
    this.dialog.open(DialogProfilInfoComponent);
  }





  
}
