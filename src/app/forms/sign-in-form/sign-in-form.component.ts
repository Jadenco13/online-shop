import { Component } from '@angular/core';
import { AuthService } from '../../api-services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInType } from '../../types/sign-in-type';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../api-services/cart.service';

@Component({
  selector: 'app-sign-in-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
  public signInForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', { nonNullable: true, validators: Validators.required })
  })
  constructor(private authService: AuthService, private cookie: CookieService, private cartService: CartService) { }
  closeSignInForm() {
    this.authService.userSignIn.next(false)
  }
  signIn() {
    this.authService.signInFun(this.signInForm.value as SignInType).subscribe(data => {
      this.cookie.set('userToken', data.access_token)
      this.authService.authFun().subscribe(userData => {
        this.authService.userIsOnline.next(true)
        if(userData.cartID) {
          this.cartService.isUserHaveCart.next(true)
        }
        this.closeSignInForm()
      })
    })
  }
  showCartFun() {
    this.cartService.getCart().subscribe((data: any) => console.log(data))
  }
  deleteCart() {
    this.cartService.deleteCart().subscribe()
  }
}
