import { Component } from '@angular/core';
import { OurServiceComponent } from "./our-service/our-service.component";
import { FavoriteProductsComponent } from "./favorite-products/favorite-products.component";
import { ProductsService } from '../api-services/products.service';
import { ProductType } from '../types/product-type';
import { PaginationType } from '../types/pagination-type';
import { AuthService } from '../api-services/auth.service';
import { CartService } from '../api-services/cart.service';

@Component({
  selector: 'app-home',
  imports: [OurServiceComponent, FavoriteProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public isUserHaveBasket!: boolean;
  public favoriteProducts!: ProductType;
  public productsQuantity: PaginationType = {
    pageInd: 1,
    pageSize: 10
  }
  constructor(private productService: ProductsService, private cartService: CartService) {
    this.getProducts()
    this.getCartInfo()
  }
  getProducts() {
    this.productService.allProducts(this.productsQuantity).subscribe(data => {
      this.favoriteProducts = data
    })
  }
  getCartInfo() {
    this.cartService.isUserHaveCart.subscribe(data => this.isUserHaveBasket = data)
  }
  addProductInCart(eventProductId: string) {
    let productObj = {
      id: eventProductId,
      quantity: 1
    }
    if (this.isUserHaveBasket) {
      this.cartService.patchCart(productObj).subscribe()
      this.cartService.isUserHaveCart.next(true)
    } else {
      this.cartService.postCart(productObj).subscribe()
      this.cartService.isUserHaveCart.next(true)
    }
  }
}
