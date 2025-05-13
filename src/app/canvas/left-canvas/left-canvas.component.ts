import { Component } from '@angular/core';
import { CartService } from '../../api-services/cart.service';
import { UserInfo } from '../../types/auth-type';
import { AuthService } from '../../api-services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-left-canvas',
  imports: [],
  templateUrl: './left-canvas.component.html',
  styleUrl: './left-canvas.component.css'
})
export class LeftCanvasComponent {
  public canvasCondition!: boolean;
  public userInfo!: UserInfo;
  constructor(private cartService: CartService, private authService: AuthService, private cookie: CookieService) {
    this.seeCanvasCondition()
    this.getUserInfo()
  }
  seeCanvasCondition() {
    this.authService.leftCanvasCondition.subscribe(data => this.canvasCondition = data)
  }
  getUserInfo() {
    this.authService.authFun().subscribe(data => {this.userInfo = data})
  }
  showCart() {
    this.cartService.rightCanvasCondition.next(true)
    this.closeCanvas()
  }
  logOut() {
    this.cookie.delete('userToken')
  }
  closeCanvas() {
    this.authService.leftCanvasCondition.next(false)
  }
}
