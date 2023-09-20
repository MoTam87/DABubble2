import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfilEditComponent } from '../dialog-profil-edit/dialog-profil-edit.component';

@Component({
  selector: 'app-dialog-profil-info',
  templateUrl: './dialog-profil-info.component.html',
  styleUrls: ['./dialog-profil-info.component.scss']
})
export class DialogProfilInfoComponent {

  constructor(public dialog: MatDialog) {}

  openProfilEditDialog() {
    this.dialog.open(DialogProfilEditComponent);
  }

}
