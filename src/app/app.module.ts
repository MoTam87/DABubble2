import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, NgIf} from '@angular/common';
import { NewAccountComponent } from './new-account/new-account.component';
import {NgFor} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AvatarComponent } from './avatar/avatar.component';
import { HomeComponent } from './home/home.component';
import {MatMenuModule} from '@angular/material/menu';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeThreadComponent } from './home-thread/home-thread.component';
import { HomeMainChatComponent } from './home-main-chat/home-main-chat.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogNewChannelComponent } from './dialog-new-channel/dialog-new-channel.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ContactComponent } from './contact/contact.component';
import { DialogContactDetailsComponent } from './dialog-contact-details/dialog-contact-details.component';
import { DialogProfilInfoComponent } from './dialog-profil-info/dialog-profil-info.component';
import { DialogProfilEditComponent } from './dialog-profil-edit/dialog-profil-edit.component';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {MatListModule} from '@angular/material/list';
import { DateDisplayPipe } from './pipes/date-display.pipe';
import { OnlyDateDisplayPipe } from './pipes/only-date-display.pipe';
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { HttpClientModule } from '@angular/common/http';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewAccountComponent,
    ResetPasswordComponent,
    AvatarComponent,
    HomeComponent,
    HomeMenuComponent,
    HomeThreadComponent,
    HomeMainChatComponent,
    DialogNewChannelComponent,
    ContactComponent,
    DialogContactDetailsComponent,
    DialogProfilInfoComponent,
    DialogProfilEditComponent,
    DateDisplayPipe,
    OnlyDateDisplayPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgFor,
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatListModule,
    PickerModule,
    HttpClientModule
    
    





  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
