import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private firestore: AngularFirestore) { }

  add(user: User) {
    return this.firestore.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getById(id: string) {
    return this.firestore.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  getByEmail(emails: string[]) {
    return this.firestore.collection<User>(this.collectionName, ref => ref.where('email', 'in', emails)).valueChanges();
  }

  update(user: User) {
    return this.firestore.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  delete(id: string) {
    return this.firestore.collection<User>(this.collectionName).doc(id).delete();
  }

}
