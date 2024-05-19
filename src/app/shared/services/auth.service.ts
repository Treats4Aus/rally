import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { EmailAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private auth: AngularFireAuth) { }
  
  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  
  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  
  changePassword(email: string, oldPassword: string, newPassword: string) {
    const credential = EmailAuthProvider.credential(email, oldPassword);
    return this.auth.currentUser.then(user => {
      user?.reauthenticateWithCredential(credential)
      .then(cred => user?.updatePassword(newPassword));
    });
  }
  
  async deleteUser(email: string, password: string): Promise<boolean> {
    const credential = EmailAuthProvider.credential(email, password);
    const user = await this.auth.currentUser;
    try {
      await user?.reauthenticateWithCredential(credential);
      await user?.delete();
      return true;
    } catch (error) {
      return false;
    }
  }
  
  signout() {
    return this.auth.signOut();
  }
  
  getCurrentUser() {
    return this.auth.user;
  }
  
}
