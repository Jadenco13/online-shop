import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductInCartType, CartType } from '../types/cart-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public isUserHaveCart = new BehaviorSubject<boolean>(false)
  public cartLength = new BehaviorSubject<number>(0)
  public rightCanvasCondition = new BehaviorSubject<boolean>(false)
  public leftCanvasCondition = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient) { }
  getCart() {
    return this.http.get<CartType>('https://api.everrest.educata.dev/shop/cart')
  }
  deleteCart() {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart')
  }
  postCart(productObj: AddProductInCartType) {
    return this.http.post('https://api.everrest.educata.dev/shop/cart/product', productObj)
  }
  patchCart(productObj: AddProductInCartType) {
    return this.http.patch('https://api.everrest.educata.dev/shop/cart/product', productObj)
  }
  checkOutCart(body: string) {
    return this.http.post('https://api.everrest.educata.dev/shop/cart/checkout', body)
  }
}
