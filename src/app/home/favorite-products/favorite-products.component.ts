import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductType } from '../../types/product-type';

@Component({
  selector: 'app-favorite-products',
  imports: [RouterModule],
  templateUrl: './favorite-products.component.html',
  styleUrl: './favorite-products.component.css'
})
export class FavoriteProductsComponent {
  @Input() productsData!: ProductType;
  constructor(private router: Router) { }
  goToDetailsPage(productId: string) {
    this.router.navigate(['/product-details'], { queryParams: { id: `${productId}` } })
  }
}
