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
  selectedImage: string | ArrayBuffer | null = "./assets/avatar-photo.png";


  constructor(private contacts: ContactsServiceService ) {

  }

  addContact(){
    let contact: ContactInterface = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      avatar: this.selectedImage,
    }
    this.contacts.addContact(contact)
  }



  isNameInvalid(): boolean {
    return !this.name;
  }


  

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  showMainImage(imagePath: string): void {
    this.selectedImage = imagePath;
  }


}
