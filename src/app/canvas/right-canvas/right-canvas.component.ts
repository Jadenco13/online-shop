import { Component } from '@angular/core';
import { CartService } from '../../api-services/cart.service';
import { CartType, ChosenProductsInfo } from '../../types/cart-type';
import { ProductsService } from '../../api-services/products.service';
import { PaginationType } from '../../types/pagination-type';
import { ProductType } from '../../types/product-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right-canvas',
  imports: [],
  templateUrl: './right-canvas.component.html',
  styleUrl: './right-canvas.component.css'
})
export class RightCanvasComponent {
  public canvasCondition!: boolean;
  public cart!: CartType;
  public allProductData!: ProductType;
  public chosenProductsInfo: ChosenProductsInfo[] = [];
  // ChosenProductsInfo[]
  public paginationTypeObj: PaginationType = {
    pageInd: 1,
    pageSize: 38,
  }
  constructor(private cartService: CartService, private productService: ProductsService, private router: Router) {
    this.seeCanvasCondition()
    this.seeCart()
  }
  seeCanvasCondition() {
    this.cartService.rightCanvasCondition.subscribe(data => this.canvasCondition = data)
  }
  closeCanvas() {
    this.cartService.rightCanvasCondition.next(false)
  }
  seeCart() {
    this.cartService.getCart().subscribe(data => {
      this.cart = data
      this.getAllProducts()
    })
  }
  getAllProducts() {
    this.productService.allProducts(this.paginationTypeObj).subscribe(data => {
      this.allProductData = data
      this.getChosenProducts()
    })
  }
  getChosenProducts() {
    if (this.allProductData) {
      this.cart.products.forEach(cartProduct => this.allProductData.products.forEach(allProductData => {
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
      console.log(this.chosenProductsInfo)
    }
  }
  goToProductDetails(productId: string){
    this.router.navigate(['/product-details'], { queryParams: { id: productId } })
    this.closeCanvas()
  }
  purchase() {
    // this.cartService.checkOutCart().subscribe()
  }
  deleteCartFun() {
    this.cartService.deleteCart().subscribe()
    this.cartService.isUserHaveCart.next(false)
  }
}
