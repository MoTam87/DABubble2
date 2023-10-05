import { ContactInterface } from "./contact-interface";

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDAte?: Date;
    userIds: string[];
    users: ContactInterface[];

    chatPic?: string;
    chatName?: string;
}


export interface Message {
    id: string;
    text: string;
    senderId: string;
    sentDate: Date;

}

export interface ChatUsers {
    displayName: string;
    photoURL: string;


}
