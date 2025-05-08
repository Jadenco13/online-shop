import { Component } from '@angular/core';
import { CartService } from '../../api-services/cart.service';

@Component({
  selector: 'app-right-canvas',
  imports: [],
  templateUrl: './right-canvas.component.html',
  styleUrl: './right-canvas.component.css'
})
export class RightCanvasComponent {
  public canvasCondition!: boolean;
  public cart: any; 
  constructor(private cartService: CartService) { 
    this.seeCanvasCondition()
    // this.seeCart()
  }
  seeCanvasCondition() {
    this.cartService.rightCanvasCondition.subscribe(data => this.canvasCondition = data)
  }
  closeCanvas() {
    this.cartService.rightCanvasCondition.next(false)
  }
  seeCart() {
    this.cartService.getCart().subscribe(data => {data = this.cart, console.log(data)})
  }
}
