import { Component, OnInit } from '@angular/core';
import { ContactsServiceService } from './firebase-services/contacts-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DABubble';
  showLogo: boolean = false;

  constructor(private contacts: ContactsServiceService) {}
  ngOnInit(){

    setTimeout(() => {
      this.showLogo = true;
    }, 8000);
  }
  }


