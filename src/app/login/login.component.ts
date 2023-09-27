import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide = true;
  title = 'Login With Google';
  auth2: any;
  show:boolean = true;


  
  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })


  constructor(private authService: AuthenticationService, 
    private router: Router) {}

  ngOnInit() {
    // this.googleAuthSDK();
    setTimeout(() => {
      this.show = false;
    }, 6000);
  }


  get password(){
    return this.loginForm.get('password')
  }
  get email(){
    return this.loginForm.get('email')
  }
  
  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const emailValue = this.loginForm.get('email')?.value;
    const passwordValue = this.loginForm.get('password')?.value;
  
    if (emailValue && passwordValue) {
      this.authService.login(emailValue, passwordValue).pipe(

      ).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }



}

 

  // callLogin() {
  //   this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
  //     (googleAuthUser: any) => {
  //       let profile = googleAuthUser.getBasicProfile();
  //       console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
  //       console.log('ID: ' + profile.getId());
  //       console.log('Name: ' + profile.getName());
  //       console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());
  //     }
  //   );
  // }

  // googleAuthSDK() {
  //   (<any>window)['googleSDKLoaded'] = () => {
  //     (<any>window)['gapi'].load('auth2', () => {
  //       this.auth2 = (<any>window)['gapi'].auth2.init({
  //         client_id: '546802283600-mf7ubah1ur86ovfft4j9juvmp5h4mr9j.apps.googleusercontent.com',
  //         plugin_name:'login',
  //         cookiepolicy: 'single_host_origin',
  //         scope: 'profile email'
  //       });
  //       this.callLogin();
  //     });
  //   }

  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement('script');
  //     js.id = id;
  //     js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
  //     fjs?.parentNode?.insertBefore(js, fjs);
  //   }(document, 'script', 'google-jssdk'));
  // }




