import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Group } from '../models/Group'
import { Membership } from '../models/Membership'

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupCollectionName = 'Groups';
  membershipsCollectionName = 'Memberships';

  constructor(private firestore: AngularFirestore) { }

  add(group: Group) {
    group.id = this.firestore.createId();
    return new Promise<string>((resolve, reject) => {
      this.firestore.collection<Group>(this.groupCollectionName).doc(group.id).set(group)
      .then(() => resolve(group.id))
      .catch(error => reject(error));
    });
  }

  getById(id: string) {
    return this.firestore.collection<Group>(this.groupCollectionName).doc(id).valueChanges();
  }

  addMembership(membership: Membership) {
    return this.firestore.collection<Membership>(this.membershipsCollectionName).add(membership);
  }

  getMemberships(userId: string) {
    return this.firestore.collection<Membership>(this.membershipsCollectionName, ref => ref.where('userId', '==', userId)).valueChanges();
  }

  getMembershipsByGroup(groupId: string) {
    return this.firestore.collection<Membership>(this.membershipsCollectionName, ref => ref.where('groupId', '==', groupId)).valueChanges();
  }

}
