import { Component } from '@angular/core';
import { ProductsService } from '../api-services/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../types/product-type';
import { CartService } from '../api-services/cart.service';
import { AuthService } from '../api-services/auth.service';
import { UserInfo } from '../types/auth-type';

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
  public userData!: UserInfo | null;
  constructor(private productService: ProductsService, private actR: ActivatedRoute, private cartService: CartService, private authService: AuthService) {
    this.getProductId()
    authService._user$.subscribe(userInfo => this.userData = userInfo)
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
  getProduct() {
    this.productService.product(this.productId).subscribe((data: any) => { this.product = data, this.roundProductRate = Math.round(data.rating) })
  }
  get range() {
    return Array(this.roundProductRate).fill(0).map((_, i) => i);
  }
  addProductInCart() {
    if (this.userData) {
      let productObj = {
        id: this.productId,
        quantity: this.productQuantity
      }
      if (this.userData?.cartID) {
        this.cartService.patchCart(productObj).subscribe()
      } else {
        this.cartService.postCart(productObj).subscribe()
      }
    }
    else {
      this.authService.userNotification.next(true)
    }
  }
}
