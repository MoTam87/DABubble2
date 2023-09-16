import { Injectable, OnDestroy, inject } from '@angular/core';
import { ContactInterface } from '../interfaces/contact-interface';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {

  allContacts: ContactInterface[] = []
  firestore: Firestore = inject(Firestore);


  unsubContacts;
  // unsubSingle;

  constructor() { 
    this.unsubContacts = this.subContactList();


  }

  ngonDestroy(){
    this.unsubContacts();
    
  }

  subContactList(){
    return onSnapshot(this.getContactsRef(), (list) => {
      this.allContacts = [];
      list.forEach(element => {
        this.allContacts.push(this.setContactObject(element.data(), element.id))
      })
    })
  }

  getContactsRef(){
    return collection(this.firestore, 'contacts');
  }

  setContactObject(obj:any, id:string):ContactInterface{
    return {
      fullName: obj.fullName || "",
      email: obj.email || "",
      password: obj.password || "",
      avatar: obj.avatar || "",
      id: id || "",
    }
  }

  async addContact(item: ContactInterface){
    await addDoc (this.getContactsRef(), item).catch (
      (err) => {console.error(err)}
    ).then (
      (docRef) => {console.log("Document written with ID:", docRef)}
    )
  }







  // getSingleDocRef(colId:string, docId:string){
  //   return doc(collection(this.firestore, colId), docId)
  // }



}
