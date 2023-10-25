import { Timestamp } from "@angular/fire/firestore";
import { ContactInterface } from "./contact-interface";

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDAte?: Date & Timestamp;
    userIds: string[];
    users: ContactInterface[];

    chatPic?: string;
    chatName?: string;
}


export interface Message {
    id: string;
    text: string;
    senderId: string;
    sentDate: Date & Timestamp;

}

export interface ChatUsers {
    displayName: string;
    photoURL: string;


}
