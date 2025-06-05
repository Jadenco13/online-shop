import { Component } from '@angular/core';
import { CartService } from '../../api-services/cart.service';
import { CartType, ChosenProductsInfo } from '../../types/cart-type';
import { ProductsService } from '../../api-services/products.service';
import { PaginationType } from '../../types/pagination-type';
import { ProductType } from '../../types/product-type';
import { Router } from '@angular/router';
import { UserInfo } from '../../types/auth-type';
import { AuthService } from '../../api-services/auth.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-right-canvas',
  imports: [],
  templateUrl: './right-canvas.component.html',
  styleUrl: './right-canvas.component.css'
})
export class RightCanvasComponent {
  public canvasCondition!: boolean;
  public cart!: CartType | null;
  public allProductData!: ProductType;
  public chosenProductsInfo: ChosenProductsInfo[] = [];
  public userData!: UserInfo | null;
  public chosenProductQuantity!: number;
  public paginationTypeObj: PaginationType = {
    pageInd: 1,
    pageSize: 38,
  }
  constructor(private cartService: CartService, private productService: ProductsService, private router: Router, private authService: AuthService) {
    authService._user$.
      pipe(
        filter((userInfo) => !!userInfo),
        tap((userInfo) => {
          this.userData = userInfo
        }),
        switchMap(() => {
          return cartService._cart$.pipe(
            filter((cart) => !!cart),
            tap((cart) => {
              this.cart = cart
              if (this.userData?.cartID) {
                this.getAllProducts()
              }
            })
          )
        })
      ).subscribe()

    this.authService.rightCanvasCondition.subscribe(data => {
      this.canvasCondition = data
    })
  }

  closeCanvas() {
    this.authService.rightCanvasCondition.next(false)
  }
  getAllProducts() {
    this.productService.allProducts(this.paginationTypeObj).subscribe(data => {
      this.allProductData = data
      this.getChosenProducts()
    })
  }
  getChosenProducts() {
    this.chosenProductsInfo = []
    if (this.cart) {
      console.log('enter')
      this.cart?.products.forEach(cartProduct => this.allProductData.products.find(allProductData => {
        if (cartProduct.productId === allProductData._id) {
          this.chosenProductsInfo.push(
            {
              productId: cartProduct.productId,
              quantity: cartProduct.quantity,
              currentPrice: allProductData.price.current,
              beforeDiscount: cartProduct.beforeDiscountPrice,
              brand: allProductData.brand,
              imgURL: allProductData.images[0]
            }
          )
        }
      }))
    }
  }
  goToProductDetails(productId: string) {
    this.router.navigate(['/product-details'], { queryParams: { id: productId } })
    this.closeCanvas()
  }
  growProduct(productId: string) {
    // this.chosenProductsInfo.find()
  }
  
  purchase() {
    // this.cartService.checkOutCart().subscribe()
  }
  deleteProdFromCart(productId: string) {
    this.cartService.deleteProductFromCart(productId).subscribe()
  }
  deleteCartFun() {
    this.cartService.deleteCart().subscribe()
  }
}