import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { DialogNewChannelComponent } from '../dialog-new-channel/dialog-new-channel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  panelOpenState = false;

  constructor(public dialog: MatDialog){}

  openDialog(){
    this.dialog.open(DialogNewChannelComponent)
  }





  
}
