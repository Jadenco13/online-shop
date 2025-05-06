import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PaginationType } from '../types/pagination-type';
import { FilterType } from '../types/filter-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public isFilterUsed = new BehaviorSubject<boolean>(false);
  constructor(public http: HttpClient) { }
  allProducts(paginationObj: PaginationType) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/all?page_index=${paginationObj.pageInd}&page_size=${paginationObj.pageSize}`)
  }
  product(productId: string | null) {
    return this.http.get(`https://api.everrest.educata.dev/shop/products/id/${productId}`)
  }
  productBrands() {
    return this.http.get('https://api.everrest.educata.dev/shop/products/brands')
  }
  filtredProducts(filterObj: FilterType) {
    let params = new HttpParams();
    Object.entries(filterObj).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value).trim());
      }
    });
    return this.http.get('https://api.everrest.educata.dev/shop/products/search', { params });
  }
}

