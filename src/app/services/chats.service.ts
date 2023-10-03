import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, updateDoc, Timestamp,collectionData, doc, orderBy } from '@angular/fire/firestore';
import { ContactInterface } from '../interfaces/contact-interface';
import { BehaviorSubject, Observable, Subject, concatMap,  of,   from } from 'rxjs';
import { ContactsServiceService } from '../firebase-services/contacts-service.service';
import { Chat, Message } from '../interfaces/chat-interface';
import { query, where, getDocs } from 'firebase/firestore';
import { switchMap, map, tap, take  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  //  globalChatId!: string ;
  
  private storedChatIdSubject = new BehaviorSubject<string>('');
  storedChatId$ = this.storedChatIdSubject.asObservable();

  constructor(private firestore: Firestore,
    private contacts: ContactsServiceService) { }

    createChat(otherUser: ContactInterface): Observable<string> {
      const ref = collection(this.firestore, 'chats');
    
      return this.contacts.currentUserProfile$.pipe(
        take(1),
        switchMap(user => {
          if (!user) {
            return of(null);
          }
          // Überprüfe, ob ein Chat zwischen den beiden Benutzern bereits existiert
          const chatQuery = query(
            ref,
            where('userids', '==', [user.uid, otherUser?.uid])
          );
          const reverseChatQuery = query(
            ref,
            where('userids', '==', [otherUser?.uid, user.uid])
          );
          // Kombiniere beide Abfragen
          const combinedQuery = query(
            ref,
            where('userids', 'in', [
              [user.uid, otherUser?.uid],
              [otherUser?.uid, user.uid],
            ])
          );
          // Verwende from, um die Promise in ein Observable umzuwandeln
          return from(getDocs(combinedQuery)).pipe(
            map(querySnapshot => {
              if (!querySnapshot.empty) {
                // Ein Chat existiert bereits, gib die vorhandene Chat-ID zurück
                const existingChat = querySnapshot.docs[0];
                return existingChat.id;
              } else {
                // Kein vorhandener Chat, gib null zurück
                return null;
              }
            }),
            // Füge user als Argument hinzu
            map(existingChatId => ({ existingChatId, user }))
          );
        }),
        switchMap(result => {
          const { existingChatId, user } = result || {};
          if (existingChatId) {
            // Ein Chat existiert bereits, gib die vorhandene Chat-ID zurück
            return of(existingChatId);
          } else {
            // Kein vorhandener Chat, erstelle einen neuen Chat
            return from(addDoc(ref, {
              userids: [user?.uid, otherUser?.uid],
              users: [
                {
                  displayName: user?.displayName ?? '',
                  photoURL: user?.photoURL ?? ''
                },
                {
                  displayName: otherUser?.displayName ?? '',
                  photoURL: otherUser?.photoURL ?? ''
                },
              ]
            })).pipe(
              map(docRef => docRef.id)
            );
          }
        }),
        tap(chatId => {
          this.storedChatIdSubject.next(chatId);
          console.log('Chat ID:', chatId);
        })
      );
    }
    
  // get myChats$(): Observable<Chat[]> {
  //   const ref = collection(this.firestore, 'chats');
  //   return this.contacts.currentUserProfile$.pipe(
  //     concatMap((user) => {
  //       const myQuery = query(ref, where('userIds', 'array-contains', user?.uid))
  //       return collectionData(myQuery, {idField: 'id'}).pipe(
  //         map(chats => this.addChatNameAndPic(user?.uid, chats as Chat[]))
  //       ) as Observable<Chat[]>
  //     })
  //   )
  // }

  addChatNameAndPic(currentUserId: string, chats: Chat[]): Chat[]{
    chats.forEach(chat => {
      const otherIndex = chat.userIds.indexOf(currentUserId) === 0 ? 1 : 0;
      const {displayName, photoURL} = chat.users[otherIndex];
      chat.chatName = displayName;
      chat.chatPic = photoURL;
    })
    return chats;
  }

  addChatMessage(chatId: string, message: string): Observable<any> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const chatRef = doc(this.firestore, 'chats', chatId);
    const today = Timestamp.fromDate(new Date());
    return this.contacts.currentUserProfile$.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          text: message,
          senderId: user?.uid,
          sentDate: today,
        })
      ),
      concatMap(() =>
        updateDoc(chatRef, { lastMessage: message, lastMessageDate: today })
      )
    );
  }

  setChatId(chatId: string) {
    this.storedChatIdSubject.next(chatId);
  }

  getChatMessages$(chatId: string): Observable<Message[]> {
    const ref = collection(this.firestore, 'chats', chatId, 'messages');
    const queryAll = query(ref, orderBy('sentDate', 'asc'));
    return collectionData(queryAll) as Observable<Message[]>;
  }













}

