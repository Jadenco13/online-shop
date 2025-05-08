import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../api-services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../api-services/cart.service';
import { UserInfo } from '../types/auth-type';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  public isUserOnline!: boolean;
  public basketLength!: number;
  public userData!: UserInfo;
  constructor(private authSerice: AuthService, private cartServce: CartService, private cookie: CookieService) {
    this.isUserOnlineFun()
  }
  isUserOnlineFun() {
    let isUserSignIn = this.cookie.get("userToken")
    if (isUserSignIn) {
      this.authSerice.userIsOnline.next(true)
      this.authSerice.userIsOnline.subscribe(data => { this.isUserOnline = data })
      this.authSerice.authFun().subscribe(userinfo => {
        this.userData = userinfo
        if (this.userData.cartID) {
          this.showCart()
        } else {
          
        }
      })
    }
  }
  openSignInForm() {
    this.authSerice.userSignIn.next(true)
    console.log(this.basketLength)
  }
  openSignUpForm() {
    this.authSerice.userSignUp.next(true)
    console.log(this.basketLength)
  }
  showCart() {
    this.cartServce.getCart().subscribe(cartInfo => {
      this.basketLength = cartInfo.total.quantity
      this.cartServce.cartLength.next(this.basketLength)
      this.cartServce.isUserHaveCart.next(true)
    })
  }
  deleteCart() {
    this.cartServce.deleteCart().subscribe()
    this.cartServce.isUserHaveCart.next(false)
  }
}
