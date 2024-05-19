import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  collectionName = 'Messages';

  constructor(private firestore: AngularFirestore) { }

  add(message: Message) {
    return this.firestore.collection<Message>(this.collectionName).add(message);
  }

  getByGroup(groupId: string) {
    return this.firestore.collection<Message>(this.collectionName, ref => ref.where('groupId', '==', groupId).orderBy('sentTimeStamp', 'asc')).valueChanges();
  }

}
