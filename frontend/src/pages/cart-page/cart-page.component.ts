import { AsyncPipe, CurrencyPipe } from "@angular/common"
import { Component, inject } from "@angular/core"
import { Store } from "@ngxs/store"
import { Observable } from "rxjs"
import { CartEmptyComponent } from "../../components/cart-empty/cart-empty.component"
import type { ProductWithQuantity } from "@repo/shared/Product"
import { CartState } from "../../states/CartState"
import {
  CartAddProduct,
  CartEditProductQuantity,
  CartRemoveProduct,
} from "../../actions/CartActions"
import { PaymentCardModule } from "../../payment-card/payment-card.module"
import { CustomerService } from "../../services/customer.service"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-cart-page",
  standalone: true,
  imports: [
    CartEmptyComponent,
    AsyncPipe,
    CurrencyPipe,
    PaymentCardModule,
    RouterLink,
  ],
  templateUrl: "./cart-page.component.html",
  styleUrl: "./cart-page.component.css",
})
export class CartPageComponent {
  public products$: Observable<ProductWithQuantity[]> = inject(Store).select(
    CartState.getProducts,
  )

  public productsCount$: Observable<number> = inject(Store).select(
    CartState.getProductsCount,
  )

  public totalPriceCents$: Observable<number> = inject(Store).select(
    CartState.getTotalPriceCents,
  )

  public constructor(
    private readonly customerService: CustomerService,
    private readonly store: Store,
  ) {}

  public get customer(): CustomerService["customer"] {
    return this.customerService.customer
  }

  public addProduct(product: ProductWithQuantity): void {
    this.store.dispatch(new CartAddProduct(product))
  }

  public removeProduct(product: ProductWithQuantity): void {
    this.store.dispatch(new CartRemoveProduct(product))
  }

  public updateQuantity(product: ProductWithQuantity, event: Event): void {
    const target = event.target as HTMLInputElement
    let quantity = target.valueAsNumber
    if (Number.isNaN(quantity)) {
      quantity = 0
    }
    this.store.dispatch(new CartEditProductQuantity(product, quantity))
  }
}
