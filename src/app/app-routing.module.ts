import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAccountComponent } from './new-account/new-account.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AvatarComponent } from './avatar/avatar.component';
import { HomeComponent } from './home/home.component';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';

const redirectTologin = () => redirectUnauthorizedTo(['']);
const redirectToHome = () => redirectLoggedInTo(['home'])


const routes: Routes = [
  { path: '', component: LoginComponent, ...canActivate(redirectToHome) },
  { path: 'newAccount', component: NewAccountComponent, ...canActivate(redirectToHome) },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'avatar', component: AvatarComponent },
  { path: 'home', component: HomeComponent, ...canActivate(redirectTologin) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

