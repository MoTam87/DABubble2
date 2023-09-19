import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowChatCardService {

  show: boolean = false;

  constructor() { }

  

  setShow(value: boolean) {
    this.show = value;
  }
}
