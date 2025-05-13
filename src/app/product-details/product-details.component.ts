import { Component } from '@angular/core';
import { ProductsService } from '../api-services/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../types/product-type';
import { CartService } from '../api-services/cart.service';
import { AuthService } from '../api-services/auth.service';
import { NotificationComponent } from "../toasts/notification/notification.component";
import { userareaInterceptor } from '../interceptors/userarea.interceptor';

@Component({
  selector: 'app-product-details',
  imports: [FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  public product!: Product;
  public productId!: string;
  public roundProductRate!: number;
  public productQuantity!: number;
  public isUserHaveBasket!: boolean;
  public isUserOnline!: boolean;
  constructor(private productService: ProductsService, private actR: ActivatedRoute, private cartService: CartService, private authService: AuthService) {
    this.getProductId()
    this.getCartInfo()
    this.isUserOnlineFun()
  }
  getProductId() {
    this.actR.queryParams.subscribe((data: any) => {
      this.productId = data['id']
      this.getProduct()
    })
  }
  showToastNotification() {
    this.authService.userNotification.next(true)
  }
  isUserOnlineFun() {
    this.authService.userIsOnline.subscribe(data => this.isUserOnline = data)
  }
  getCartInfo() {
    this.cartService.isUserHaveCart.subscribe(data => this.isUserHaveBasket = data)
  }
  getProduct() {
    this.productService.product(this.productId).subscribe((data: any) => { this.product = data, this.roundProductRate = Math.round(data.rating) })
  }
  get range() {
    return Array(this.roundProductRate).fill(0).map((_, i) => i);
  }
  addProductInCart() {
    if (this.isUserOnline) {
      let productObj = {
        id: this.productId,
        quantity: this.productQuantity
      }
      if (this.isUserHaveBasket) {
        this.cartService.patchCart(productObj).subscribe()
      } else {
        this.cartService.postCart(productObj).subscribe()
        this.cartService.isUserHaveCart.next(true)
      }
    }
    else {
      this.authService.userNotification.next(true)
    }
  }
}
