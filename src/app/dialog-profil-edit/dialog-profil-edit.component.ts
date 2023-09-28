import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ContactInterface } from '../interfaces/contact-interface';

@UntilDestroy()

@Component({
  selector: 'app-dialog-profil-edit',
  templateUrl: './dialog-profil-edit.component.html',
  styleUrls: ['./dialog-profil-edit.component.scss']
})
export class DialogProfilEditComponent {

  avatarImagePath: string = './assets/character20.png'; 

  profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', Validators.required),
     uid: new FormControl('')
  })


  constructor(
    private auth: AuthenticationService,
    private contacts: ContactsServiceService
  ){}

  ngOnInit(): void {
    this.contacts.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) => {
      console.log('Das ist', user);
      
      this.profileForm.patchValue({ ...user });

      // Aktualisiere den Bildpfad basierend auf Benutzerdaten, falls vorhanden
      if (user?.photoURL) {
        this.avatarImagePath = user.photoURL;
      }
    });
  }

  saveProfile(){
    const profileData = this.profileForm.value;
    this.contacts.updateUser(profileData as ContactInterface).subscribe(response => {
      console.log('Update response:', response);
    });
  }











}
