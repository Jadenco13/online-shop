import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../api-services/auth.service';
import { CartService } from '../api-services/cart.service';
import { UserInfo } from '../types/auth-type';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private cartService = inject(CartService)
  private authService = inject(AuthService)
  public isUserOnline$ = this.authService._isUserOnline$;
  public userData$ =  this.authService._user$;
  public cartSize$ = this.cartService._cart$.pipe(
    map((cart) => cart?.total.quantity)
  )
  public basketLength!: number;
  constructor() { }
  openSignInForm() {
    this.authService.userSignIn.next(true)
  }
  openSignUpForm() {
    this.authService.userSignUp.next(true)
  }
  openRightCanvas() {
    this.authService.rightCanvasCondition.next(true)
  }
  openLeftCanvas() {
    this.authService.leftCanvasCondition.next(true)
  }
}
