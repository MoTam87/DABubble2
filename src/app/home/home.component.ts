import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { DialogNewChannelComponent } from '../dialog-new-channel/dialog-new-channel.component';
import { ContactInterface } from '../interfaces/contact-interface';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { DialogProfilInfoComponent } from '../dialog-profil-info/dialog-profil-info.component';
import { AuthenticationService } from '../services/authentication.service';
import { Route, Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;

  user$ = this.contacts.currentUserProfile$;
  users: ContactInterface[] = []; // Create an array to store users
  
  


  constructor(public dialog: MatDialog, 
    private contacts: ContactsServiceService, 
    private auth: AuthenticationService,
    private router: Router,
  
    ){}

  openDialog(){
    this.dialog.open(DialogNewChannelComponent)
  }

  openProfilDialog() {
    this.dialog.open(DialogProfilInfoComponent, {
    });
  }

  logout(){
    this.auth.logout().subscribe(() => {
      this.router.navigate([''])
    })
  }

  ngOnInit() {
    // Fetch the list of users from your service
    this.contacts.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  
}
