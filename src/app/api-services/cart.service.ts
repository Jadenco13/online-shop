import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductInCart } from '../types/cart-type';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }
  getCart() {
    return this.http.get('https://api.everrest.educata.dev/shop/cart')
  }
  deleteCart() {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart')
  }
  postCart(body: ProductInCart) {
    return this.http.post('https://api.everrest.educata.dev/shop/cart/product', body)
  }
  patchCart(body: ProductInCart) {
    return this.http.patch('https://api.everrest.educata.dev/shop/cart/product', body)
  }
  checkOutCart(body: string) {
    return this.http.post('https://api.everrest.educata.dev/shop/cart/checkout', body)
  }
}
