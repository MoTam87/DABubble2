import { Injectable, OnDestroy, inject } from '@angular/core';
import { ContactInterface } from '../interfaces/contact-interface';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc, getDoc, setDoc, getDocs, query } from '@angular/fire/firestore';
import { Observable, elementAt, from, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { docData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactsServiceService {

  // allContacts: ContactInterface[] = []
  // firestore: Firestore = inject(Firestore);
  // updatedContact:any[] = []

  public currentContact: ContactInterface[] = [];
  // unsubContacts;
  // unsubSingle;

  get currentUserProfile$ (): Observable<ContactInterface | null>{
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user?.uid){
          return of(null)
        }
        const ref = doc(this.firestore, 'users', user?.uid)
        return docData(ref) as Observable<ContactInterface>;
      })
    )
  }

  constructor(private firestore: Firestore, private authService: AuthenticationService) { 
    // this.unsubContacts = this.subContactList();
  }

  addUser(user: ContactInterface) : Observable<any>{
    const ref = doc(this.firestore, 'users', user?.uid)
    return from(setDoc(ref, user))
  }

  updateUser(user: ContactInterface) : Observable<any>{
    const ref = doc(this.firestore, 'users', user?.uid)
    return from(updateDoc(ref, { ...user }))
  }


  getAllUsers(): Observable<ContactInterface[]> {
    const usersCollection = collection(this.firestore, 'users');
    const usersQuery = query(usersCollection);

    return new Observable<ContactInterface[]>((observer) => {
      getDocs(usersQuery)
        .then((querySnapshot) => {
          const users: ContactInterface[] = [];
          querySnapshot.forEach((doc) => {
            const userData = doc.data() as ContactInterface;
            users.push(userData);
          });
          observer.next(users);
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  
  getclickedContact(contact: ContactInterface): void {
    this.currentContact = [];
    this.currentContact.push(contact); 
    console.log('der user ist', this.currentContact);
    
  }

  



}
