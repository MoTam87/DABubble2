import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { ContactInterface } from '../interfaces/contact-interface';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { concat, concatMap, switchMap } from 'rxjs';
import { User } from '@angular/fire/auth';
import { ImageUploadService } from '../services/image-upload.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent {

  hide = true;
  // name!: string;
  privacyAgreed: boolean = false;
  // fullName = "";
  // email = "";
  // password = "";
  selectedImage: string | ArrayBuffer | null = "./assets/avatar-photo.png";
  isLoginCard2Hidden = false;
  isLoginCard1Hidden = true;
  user$ = this.auth.currentUser$

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', Validators.required),
     uid: new FormControl('')
  })

 



  constructor(private contacts: ContactsServiceService, 
    private auth: AuthenticationService,
    private router: Router,
    private imageService: ImageUploadService
    ) {

  }



  get signUpName(){
    return this.signUpForm.get('name')
  }

  get signUpPassword(){
    return this.signUpForm.get('password')
  }

  get signUpEmail(){
    return this.signUpForm.get('email')
  }

  submit() {
    if (!this.signUpForm.valid) 
      return;
  
    const { name, email, password } = this.signUpForm.value;
  
    if (email && password) {
      this.auth.signUp(email, password).pipe(
        switchMap(({ user: { uid } }) => {
          const userData: ContactInterface = { uid, email, displayName: name };
          if (this.selectedImage) {
            userData.photoURL = this.selectedImage; // Setzen Sie das selectedImage in userData.photoURL
          }
          return this.contacts.addUser(userData);
        })
      ).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      // Handle the case where email or password is not defined (e.g., display an error message).
    }
  }

  // uploadImage(event: any, user: User) {
  //   this.imageService
  //     .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
  //     .pipe(
  //       concatMap((photoURL) =>
  //         this.auth.updateProfileData({
  //           photoURL,
  //         })
  //       )
  //     )
  //     .subscribe();
  // }

 
  

  // addContact(){
  //   let contact: ContactInterface = {
  //     fullName: this.fullName,
  //     email: this.email,
  //     password: this.password,
  //     avatar: this.selectedImage,
  //   }
  //   this.contacts.addContact(contact)
  // }

  // isNameInvalid(): boolean {
  //   return !this.name;
  // }

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
