import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ProductType } from '../../types/product-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-cards',
  imports: [],
  templateUrl: './products-cards.component.html',
  styleUrl: './products-cards.component.css'
})
export class ProductsCardsComponent {
  @Input() productsData!: ProductType;
  @Input() isFilterUsed!: boolean;
  @Output() chosenProductId = new EventEmitter<string>();
  constructor(private router: Router) { }
  goToDetailsPage(productId: string) {
    this.router.navigate(['/product-details'], { queryParams: { id: productId } })
  }
  sendIdToParent(productId: string) {
    this.chosenProductId.emit(productId)
  }
}
