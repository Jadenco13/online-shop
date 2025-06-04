import { Component, inject } from '@angular/core';
import { ProductsCardsComponent } from "./products-cards/products-cards.component";
import { ProductsService } from '../api-services/products.service';
import { ProductType } from '../types/product-type';
import { ProductsFilterComponent } from "./products-filter/products-filter.component";
import { PaginationType } from '../types/pagination-type';
import { FilterType } from '../types/filter-type';
import { FormsModule } from '@angular/forms';
import { CartService } from '../api-services/cart.service';
import { AuthService } from '../api-services/auth.service';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [ProductsCardsComponent, ProductsFilterComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService)
  public products!: ProductType;
  public brands!: string[]
  public productsLimit!: number;
  public filterInfo!: FilterType;
  public userHaveBasket$ = this.authService._user$.pipe(
    filter(user => !!user),
    map((user) => !!user.cartID)
  );
  public isUserOnline$ = this.authService._isUserOnline$;
  public paginationObj: PaginationType = {
    pageInd: 1,
    pageSize: 10
  }
  constructor(private productsService: ProductsService) {
    this.getProducts(this.paginationObj)
    this.getBrands()
  }
  ngOnInit() {
    if (this.products) {
      this.productsLimit = Math.ceil(this.products.total / this.products.limit)
    }
  }
  get range() {
    return Array(this.productsLimit).fill(0).map((_, i) => i);
  }
  paginationFun(pageInd?: number) {
    if (pageInd) {
      this.paginationObj.pageInd = pageInd
      this.filterInfo.page_index = this.paginationObj.pageInd
      this.productsService.filtredProducts(this.filterInfo).subscribe((data: any) => { this.products = data, this.ngOnInit() })
    } else {
      this.filterInfo.page_size = this.paginationObj.pageSize
      this.productsService.filtredProducts(this.filterInfo).subscribe((data: any) => { this.products = data, this.ngOnInit() })
    }
  }
  paginationSecondBtnFun(isUserWantNextPage: boolean) {
    let pageIndex = this.paginationObj.pageInd
    if (isUserWantNextPage) {
      pageIndex++;
      this.paginationFun(pageIndex)
    } else {
      pageIndex--;
      this.paginationFun(pageIndex)
    }
    console.log(this.paginationObj.pageInd)
  }
  getProducts(paginationObj: PaginationType) {
    this.productsService.allProducts(paginationObj).subscribe((data: any) => {
      this.products = data
      this.ngOnInit()
    })
  }
  getBrands() {
    this.productsService.productBrands().subscribe((data: any) => this.brands = data)
  }
  getProductsByFilter(filterObj: FilterType) {
    this.productsService.filtredProducts(filterObj).subscribe((data: any) => { this.products = data, this.ngOnInit() })
  }
  getFilter(filterObj: FilterType) {
    this.filterInfo = filterObj
    this.getProductsByFilter(filterObj)
  }
  addProductInCart(productId: string) {
    this.isUserOnline$.pipe(
      filter(isOnline => !!isOnline),
      switchMap(() => this.userHaveBasket$),
      switchMap(userHasBasket => {
        console.log(userHasBasket); // ახლა იმუშავებს
        const productObj = {
          id: productId,
          quantity: 1
        };
        if (userHasBasket) {
          return this.cartService.patchCart(productObj);
        } else {
          return this.cartService.postCart(productObj);
        }
      })
    ).subscribe();
  }

}

