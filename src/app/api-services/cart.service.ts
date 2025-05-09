import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddProductInCartType, CartType } from '../types/cart-type';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartLength = new BehaviorSubject<number>(0)
  public rightCanvasCondition = new BehaviorSubject<boolean>(false)
  public isUserHaveCart = new Subject<boolean>()
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
