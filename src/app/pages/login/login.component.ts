import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) { }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email')?.value as string;
      let password = this.loginForm.get('password')?.value as string;
      console.log(`Email: ${email} Password: ${password}`);
      this.authService.login(email, password).then(cred => {
        console.log(cred);
        this.router.navigateByUrl('/home');
      }).catch(error => this.snackBar.open(error, 'Dismiss', {duration: 3000}));
    } else {
      this.snackBar.open('Not every form field is properly filled', 'Dismiss', {duration: 3000});
    }
  }
}
