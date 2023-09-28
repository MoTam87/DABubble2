import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogProfilEditComponent } from '../dialog-profil-edit/dialog-profil-edit.component';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';

@Component({
  selector: 'app-dialog-profil-info',
  templateUrl: './dialog-profil-info.component.html',
  styleUrls: ['./dialog-profil-info.component.scss']
})
export class DialogProfilInfoComponent {

  constructor(public dialog: MatDialog,  
    public contacts: ContactsServiceService, 
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  openProfilEditDialog() {
    this.dialog.open(DialogProfilEditComponent);
  }

}
