import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from '../../../shared/password-dialog/password-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-updater',
  templateUrl: './profile-updater.component.html',
  styleUrl: './profile-updater.component.scss'
})
export class ProfileUpdaterComponent implements OnDestroy {
  
  @Input() currentUser?: User;
  password?: string;
  dialogSubscription?: Subscription;
  
  usernameForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(4)])
  });
  
  passwordForm = new FormGroup({
    oldPassword: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  })
  
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }
  
  onSubmitUsername() {
    if (this.usernameForm.valid) {
      let username = this.usernameForm.get('username')?.value as string;
      console.log(`Username: ${username}`);
      if (this.currentUser !== undefined) {
        this.currentUser.username = username;
        this.userService.update(this.currentUser)
        .then(() => {
          this.snackBar.open('Username successfully changed', 'Dismiss', {duration: 3000});
          this.usernameForm.reset();
        })
        .catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
      }
    } else {
      this.snackBar.open('Username field is not properly filled', 'Dismiss', {duration: 3000});
    }
  }
  
  onSubmitPassword() {
    if (this.passwordForm.valid) {
      let oldPassword = this.passwordForm.get('oldPassword')?.value as string;
      let password = this.passwordForm.get('password')?.value as string;
      let passwordConfirm = this.passwordForm.get('passwordConfirm')?.value as string;
      console.log(`Old: ${oldPassword} New: ${password} - ${passwordConfirm}`);
      if (this.currentUser !== undefined) {
        this.authService.changePassword(this.currentUser?.email, oldPassword, password)
        .then(() => {
          this.snackBar.open('Password successfully changed', 'Dismiss', {duration: 3000});
          this.passwordForm.reset();
        })
        .catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
      }
    } else {
      this.snackBar.open('Not every form field is properly filled', 'Dismiss', {duration: 3000});
    }
  }
  
  deleteAccount() {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      data: this.password
    })
    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.password = result;
      if (this.currentUser !== undefined && this.password !== undefined) {
        this.authService.deleteUser(this.currentUser.email, this.password)
        .then(result => {
          if (result && this.currentUser !== undefined) {
            this.userService.delete(this.currentUser.id)
            .then(() => {
              this.snackBar.open('Your account has been deleted', 'Dismiss', {duration: 3000});
              this.router.navigateByUrl('/login');
            })
            .catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
          } else {
            this.snackBar.open('The given password is incorrect', 'Dismiss', {duration: 3000});
          }
        })
        .catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
      }
    })
  }

  ngOnDestroy(): void {
    this.dialogSubscription?.unsubscribe();
  }
  
}
