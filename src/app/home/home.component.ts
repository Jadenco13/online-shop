import { Component } from '@angular/core';
import { OurServiceComponent } from "./our-service/our-service.component";
import { FavoriteProductsComponent } from "./favorite-products/favorite-products.component";
import { ProductsService } from '../api-services/products.service';
import { ProductType } from '../types/product-type';
import { CartService } from '../api-services/cart.service';
import { AuthService } from '../api-services/auth.service';

@Component({
  selector: 'app-home',
  imports: [OurServiceComponent, FavoriteProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public isUserHaveBasket!: boolean;
  public favoriteProducts!: ProductType;
  public notification!: boolean;
  public isUserOnline!: boolean;
  constructor(private productService: ProductsService, private cartService: CartService, private authService: AuthService) {
    this.getProducts()
    this.getCartInfo()
    authService.userNotification.subscribe(data => this.notification = data)
    authService.userIsOnline.subscribe(data => this.isUserOnline = data)
  }
  getProducts() {
    this.productService.favoriteProducts().subscribe(data => {
      this.favoriteProducts = data
    })
  }
  getCartInfo() {
    this.cartService.isUserHaveCart.subscribe(data => { this.isUserHaveBasket = data, console.log(`user ${this.isUserHaveBasket ? "have" : "don't have"} cart`) })
  }
  addProductInCart(eventProductId: string) {
    if (this.isUserOnline) {
      let productObj = {
        id: eventProductId,
        quantity: 1
      }
      if (this.isUserHaveBasket) {
        this.cartService.patchCart(productObj).subscribe()
      } else {
        this.cartService.postCart(productObj).subscribe()
        this.cartService.isUserHaveCart.next(true)
      }
    } else {
      this.authService.userNotification.next(true)
    }
  }
}