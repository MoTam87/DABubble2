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

  

  // ngonDestroy(){
  //   this.unsubContacts();
    
  // }

  // subContactList(){
  //   return onSnapshot(this.getContactsRef(), (list) => {
  //     this.allContacts = [];
  //     list.forEach(element => {
  //       this.allContacts.push(this.setContactObject(element.data(), element.id))
  //     })
  //   })
  // }

  // getContactsRef(){
  //   return collection(this.firestore, 'contacts');
  // }

  // setContactObject(obj:any, id:string):ContactInterface{
  //   return {
  //     displayName: obj.fullName || "",
  //     email: obj.email || "",
  //     password: obj.password || "",

  //     uid: id || "",
  //   }
  // }

  // async addContact(item: ContactInterface){
  //   await addDoc (this.getContactsRef(), item).catch (
  //     (err) => {console.error(err)}
  //   ).then (
  //     (docRef) => {console.log("Document written with ID:", docRef)}
  //   )
  // }

  // async updateNote(contact: ContactInterface) {
   
  //   if (contact.id) {
  //     try {
  //       // Aktualisiere die Daten in Firebase
  //       await updateDoc(this.getSingleDocRef('contacts', contact.id), this.getCleanJson(contact));
        
  //       // Lese die Daten aus Firebase aus
  //       const updatedContactData = await getDoc(this.getSingleDocRef('contacts', contact.id));

  //       // Leere das Array, um Platz für die neuen Daten zu machen
  //       this.updatedContact = [];
  
  //       // Speichere die aktualisierten Daten in einer Variable
  //       this.updatedContact.push(updatedContactData.data());
  
  //       // Jetzt kannst du auf die aktualisierten Daten in der Variable "updatedContact" zugreifen
  //       console.log("Aktualisierte Kontakt-Daten:", this.updatedContact);
        
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // }

  // getCleanJson(contact: ContactInterface){
  //   return {
  //     fullName: contact.fullName,
  //     email: contact.email,
  //     avatar: contact.avatar,
  //   }
  // }







  // getSingleDocRef(colId:string, docId:string){
  //   return doc(collection(this.firestore, colId), docId)
  // }




}
