import { Component } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInType } from '../../types/sign-in-type';

@Component({
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  public signInForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required })
  })
  constructor(private authService: AuthService) { }
  closeSignInForm() {
    this.authService.userSignIn.next(false)
  }
  signIn() {
    console.log(this.signInForm.value)
    this.authService.signInFun(this.signInForm.value as SignInType).subscribe()
    this.closeSignInForm()
  }
}
