import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  
  signUpForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>('', [Validators.pattern('\\+[0-9]{1,2} [0-9]{2} [0-9]{3} [0-9]{3,4}')]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  });
  
  constructor(
    private router: Router, 
    private authService: AuthService, 
    private userService: UserService,
    private snackBar: MatSnackBar) { }
  
  onSubmit() {
    if (this.signUpForm.valid) {
      let username = this.signUpForm.get('username')?.value as string;
      let email = this.signUpForm.get('email')?.value as string;
      let phone = this.signUpForm.get('phone')?.value as string;
      let password = this.signUpForm.get('password')?.value as string;
      let passwordConfirm = this.signUpForm.get('passwordConfirm')?.value as string;
      console.log(`Username: ${username} Email: ${email} Phone: ${phone} Password: ${password} - ${passwordConfirm}`)
      if (password !== passwordConfirm) {
        this.snackBar.open('The given passwords are not the same', 'Dismiss', {duration: 3000});
        return;
      }
      this.authService.signup(email, password).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          username: username,
          email: email,
          phone: phone
        }
        this.userService.add(user)
          .then(() => this.router.navigateByUrl('/home'))
          .catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
      }).catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
    } else {
      this.snackBar.open('Not every form field is properly filled', 'Dismiss', {duration: 3000});
    }
  }
}
