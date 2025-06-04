import { Component } from '@angular/core';
import { OurServiceComponent } from "./our-service/our-service.component";
import { FavoriteProductsComponent } from "./favorite-products/favorite-products.component";
import { ProductsService } from '../api-services/products.service';
import { ProductType } from '../types/product-type';
import { CartService } from '../api-services/cart.service';
import { AuthService } from '../api-services/auth.service';
import { tap } from 'rxjs';

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
    authService.userNotification.subscribe(data => this.notification = data)
    authService._isUserOnline$.subscribe(data => this.isUserOnline = data)
    authService._user$.pipe(
      tap((user) => {
        this.isUserHaveBasket = !!user?.cartID
      })
    ).subscribe()
  }
  getProducts() {
    this.productService.favoriteProducts().subscribe(data => {
      this.favoriteProducts = data
    })
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
      }
    } else {
      this.authService.userNotification.next(true)
    }
  }
}