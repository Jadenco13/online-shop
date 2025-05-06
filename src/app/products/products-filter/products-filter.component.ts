import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationType } from '../../types/pagination-type';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterType } from '../../types/filter-type';

@Component({
  selector: 'app-products-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent {
  @Input() brandsArr!: string[];
  @Input() paginationInfo!: PaginationType;
  @Output() filterInfo = new EventEmitter<FilterType>();
  public filter!: FormGroup;
  ngOnInit() {
    this.filter = new FormGroup({
      page_index: new FormControl(this.paginationInfo.pageInd),
      page_size: new FormControl(this.paginationInfo.pageSize),
      keywords: new FormControl(),
      category_id: new FormControl(),
      brand: new FormControl(),
      rating: new FormControl(),
      price_min: new FormControl(),
      price_max: new FormControl(),
      sort_by: new FormControl(),
      sort_direction: new FormControl()
    })
    this.giveFilterToParent()
  }
  
  takeSelectedBrand(brandName: string) {
    this.filter.reset()
    this.filter.value.brand = brandName
    this.giveFilterToParent()
  }
  giveFilterToParent() {
    this.filterInfo.emit(this.filter.value)
  }
}
