import { Component } from '@angular/core';
import { CartService } from '../../api-services/cart.service';
import { UserInfo } from '../../types/auth-type';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'app-left-canvas',
  imports: [],
  templateUrl: './left-canvas.component.html',
  styleUrl: './left-canvas.component.css'
})
export class LeftCanvasComponent {
  public canvasCondition!: boolean;
  public userInfo!: UserInfo;
  constructor(private cartService: CartService, private authService: AuthService) {
    this.seeCanvasCondition()
    this.getUserInfo()
  }
  seeCanvasCondition() {
    this.cartService.leftCanvasCondition.subscribe(data => this.canvasCondition = data)
  }
  getUserInfo() {
    this.authService.authFun().subscribe(data => {this.userInfo = data, console.log(this.userInfo)})
  }
  closeCanvas() {
    this.cartService.leftCanvasCondition.next(false)
  }
}
