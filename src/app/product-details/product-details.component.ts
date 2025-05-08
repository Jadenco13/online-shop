import { Component } from '@angular/core';
import { ProductsService } from '../api-services/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../types/product-type';
import { CartService } from '../api-services/cart.service';

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
  constructor(private productService: ProductsService, private actR: ActivatedRoute, private cartService: CartService) {
    this.getProductId()
    this.getCartInfo()
  }
  getProductId() {
    this.actR.queryParams.subscribe((data: any) => {
      this.productId = data['id']
      this.getProduct()
    })
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
    let productObj = {
      id: this.productId,
      quantity: this.productQuantity
    }
    if (this.isUserHaveBasket) {
      this.cartService.patchCart(productObj).subscribe(el => console.log(el))
    } else {
      this.cartService.postCart(productObj).subscribe()
      this.cartService.isUserHaveCart.next(true)
    }
  }
}
