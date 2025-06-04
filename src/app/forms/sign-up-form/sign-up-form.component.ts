import { Component } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpType } from '../../types/sign-up-type';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
  constructor(private authService: AuthService) { }
  public signUpForm = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    age: new FormControl<number>(0, { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('+995', { nonNullable: true, validators: [Validators.required] }),
    zipcode: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    avatar: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    gender: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  })
  closeSignUpForm() {
    this.authService.userSignUp.next(false)
  }
  register() {
    console.log(this.signUpForm.value)
    this.authService.signUp(this.signUpForm.value as SignUpType).subscribe(el => console.log(el))
    this.closeSignUpForm()
  }
}
