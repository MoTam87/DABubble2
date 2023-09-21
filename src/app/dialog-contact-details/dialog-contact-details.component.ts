import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';

@Component({
  selector: 'app-dialog-contact-details',
  templateUrl: './dialog-contact-details.component.html',
  styleUrls: ['./dialog-contact-details.component.scss']
})
export class DialogContactDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public contacts: ContactsServiceService){}
}
