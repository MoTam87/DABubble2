import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ContactInterface } from '../interfaces/contact-interface';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {

  hide = true;
  name!: string;
  privacyAgreed: boolean = false;
  fullName = "";
  email = "";
  password = "";

  



  constructor(private contacts: ContactsServiceService ) {
  

  }

  addContact(){
    let contact: ContactInterface = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      avatar: "",
      
    }
    this.contacts.addContact(contact)
  }



  isNameInvalid(): boolean {
    return !this.name;
  }


}
