import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductInCartType, CartType } from '../types/cart-type';
import { BehaviorSubject, filter, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<CartType | null>(null)
  public _cart$ = this.cart.asObservable()
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService._user$.pipe(
      filter((user) => user !== null),
      switchMap(() => this.getCart())
    ).subscribe()
  }
  getCart() {
    return this.http.get<CartType>('https://api.everrest.educata.dev/shop/cart').pipe(
      tap((cartData) => this.cart.next(cartData))
    )
  }
  postCart(productObj: AddProductInCartType) {
    return this.http.post<CartType>('https://api.everrest.educata.dev/shop/cart/product', productObj).pipe(
      tap((cart) => this.cart.next(cart))
    )
  }
  patchCart(productObj: AddProductInCartType) {
    return this.http.patch<CartType>('https://api.everrest.educata.dev/shop/cart/product', productObj).pipe(
      tap((cart) => this.cart.next(cart))
    )
  }
  deleteProductFromCart(productId: string) {
    return this.http.delete<CartType>('https://api.everrest.educata.dev/shop/cart/product', {
      body: {
        id: productId
      }
    }).pipe(
      tap((cartData) => this.cart.next(cartData))
    )
  }
  deleteCart() {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart').pipe(
      tap(() => this.cart.next(null))
    )
  }
  checkOutCart(body: string) {
    return this.http.post('https://api.everrest.educata.dev/shop/cart/checkout', body)
  }
}
