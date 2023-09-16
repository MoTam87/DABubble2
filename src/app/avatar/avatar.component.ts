import { Component, OnInit } from '@angular/core';
import { ContactInterface } from '../interfaces/contact-interface';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent  {

  selectedImage: string | ArrayBuffer | null = "./assets/avatar-photo.png";
  

  constructor(private contactsService: ContactsServiceService) { }



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
