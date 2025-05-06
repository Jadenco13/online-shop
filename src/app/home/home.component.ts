import { Component } from '@angular/core';
import { OurServiceComponent } from "./our-service/our-service.component";
import { FavoriteProductsComponent } from "./favorite-products/favorite-products.component";
import { ProductsService } from '../api-services/products.service';
import { ProductType } from '../types/product-type';
import { PaginationType } from '../types/pagination-type';

@Component({
  selector: 'app-home',
  imports: [OurServiceComponent, FavoriteProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public favoriteProducts!: ProductType;
  public isSignInOpen!: boolean;
  public productsQuantity: PaginationType = {
    pageInd: 1,
    pageSize: 10
  }
  constructor(private productService: ProductsService) {
    this.getProducts()
  }
  getProducts() {
    this.productService.allProducts(this.productsQuantity).subscribe((data: any) => {
      this.favoriteProducts = data
    })
  }
}
