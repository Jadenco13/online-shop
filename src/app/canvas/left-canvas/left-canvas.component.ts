import { Component, inject } from '@angular/core';
import { CartService } from '../../api-services/cart.service';
import { AuthService } from '../../api-services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-left-canvas',
  imports: [AsyncPipe],
  templateUrl: './left-canvas.component.html',
  styleUrl: './left-canvas.component.css'
})
export class LeftCanvasComponent {
  private authService = inject(AuthService)
  public canvasCondition$ = this.authService.leftCanvasCondition;
  public userInfo$ = this.authService._user$;
  constructor() { }
  showCart() {
    this.authService.rightCanvasCondition.next(true)
    this.closeCanvas()
  }
  closeCanvas() {
    this.authService.leftCanvasCondition.next(false)
  }
  userLogOut() {
    this.authService.logOut()
    this.closeCanvas()
  }
  deleteAccount() {
    let question = confirm('Are you sure you want to delete your account?')
    if (question) {
      this.authService.deleteUser().subscribe(el => console.log(el))
    } else {
      alert('We are glad that you stayed with us and trusted our service.')
    }
  }
}
