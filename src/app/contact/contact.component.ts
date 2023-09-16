import { Component, Input } from '@angular/core';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ContactInterface } from '../interfaces/contact-interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  @Input() myContact !:ContactInterface;

  constructor(private contacts: ContactsServiceService){

  }



}
