import { Component } from '@angular/core';
import { ProductsService } from '../api-services/products.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../types/product-type';

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
  constructor(public productService: ProductsService, public actR: ActivatedRoute) {
    this.getProductId()
  }
  getProductId() {
    this.actR.queryParams.subscribe((data: any) => {
      this.productId = data['id']
      this.getProduct()
    })
  }
  getProduct() {
    this.productService.product(this.productId).subscribe((data: any) => { this.product = data, this.roundProductRate = Math.round(data.rating) })
  }
  get range() {
    return Array(this.roundProductRate).fill(0).map((_, i) => i);
  }
  myFun() {
    console.log(this.productQuantity)
  }
}
