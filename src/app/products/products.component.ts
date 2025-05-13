import { Component } from '@angular/core';
import { ProductsCardsComponent } from "./products-cards/products-cards.component";
import { ProductsService } from '../api-services/products.service';
import { ProductType } from '../types/product-type';
import { ProductsFilterComponent } from "./products-filter/products-filter.component";
import { PaginationType } from '../types/pagination-type';
import { FilterType } from '../types/filter-type';
import { FormsModule } from '@angular/forms';
import { CartService } from '../api-services/cart.service';
import { AuthService } from '../api-services/auth.service';

@Component({
  selector: 'app-products',
  imports: [ProductsCardsComponent, ProductsFilterComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  public products!: ProductType;
  public brands!: string[]
  public productsLimit!: number;
  public filterInfo!: FilterType;
  public isUserHaveBasket!: boolean;
  public isUserOnline!: boolean;
  public paginationObj: PaginationType = {
    pageInd: 1,
    pageSize: 10
  }
  constructor(private productsService: ProductsService, private cartService: CartService, private authService: AuthService) {
    this.getProducts(this.paginationObj)
    this.getBrands()
    this.getCartInfo()
    authService.userIsOnline.subscribe(data => this.isUserOnline = data)
  }
  ngOnInit() {
    if (this.products) {
      this.productsLimit = Math.ceil(this.products.total / this.products.limit)
    }
  }
  getCartInfo() {
    this.cartService.isUserHaveCart.subscribe(data => this.isUserHaveBasket = data)
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
    if (this.isUserOnline) {
      let productObj = {
        id: productId,
        quantity: 1
      }
      if (this.isUserHaveBasket) {
        this.cartService.patchCart(productObj).subscribe(el => console.log(el))
      } else {
        this.cartService.postCart(productObj).subscribe(el => console.log(el))
        this.cartService.isUserHaveCart.next(true)
      }
    } else {
      this.authService.userNotification.next(true)
    }
  }
}
