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
  isLoginCard2Hidden = false;
  isLoginCard1Hidden = true;


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

  onContinueClick() {
    this.isLoginCard2Hidden = true;
    this.isLoginCard1Hidden = false;
  }

  onArrowBackClick() {
    // Hier können Sie weitere Aktionen ausführen, wenn auf den "Zurück"-Pfeil geklickt wird.
    // Um zwischen den Karten zu wechseln, setzen Sie die isLoginCard1Hidden und isLoginCard2Hidden Variablen entsprechend.
    
    this.isLoginCard2Hidden = false;
    this.isLoginCard1Hidden = true;
  }

}
