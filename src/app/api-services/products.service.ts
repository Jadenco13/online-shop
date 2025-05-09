import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationType } from '../types/pagination-type';
import { FilterType } from '../types/filter-type';
import { Product, ProductType } from '../types/product-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public isFilterUsed = new BehaviorSubject<boolean>(false);
  constructor(public http: HttpClient) { }
  allProducts(paginationObj: PaginationType) {
    return this.http.get<ProductType>(`https://api.everrest.educata.dev/shop/products/all?page_index=${paginationObj.pageInd}&page_size=${paginationObj.pageSize}`)
  }
  product(productId: string) {
    return this.http.get<Product>(`https://api.everrest.educata.dev/shop/products/id/${productId}`)
  }
  productBrands() {
    return this.http.get<string[]>('https://api.everrest.educata.dev/shop/products/brands')
  }
  filtredProducts(filterObj: FilterType) {
    let params = new HttpParams();
    Object.entries(filterObj).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value).trim());
      }
    });
    return this.http.get<FilterType>('https://api.everrest.educata.dev/shop/products/search', { params });
  }
  favoriteProducts() {
    return this.http.get<ProductType>('https://api.everrest.educata.dev/shop/products/search?page_index=1&page_size=10&sort_by=rating&sort_direction=desc')
  }
}

