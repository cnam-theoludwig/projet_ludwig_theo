import type { ProductWithQuantity } from "./Product"
import type { PickStrict } from "./utils"

export interface Cart {
  products: ProductWithQuantity[]
}

export interface CartLight {
  products: Array<
    PickStrict<ProductWithQuantity, "id" | "priceCents" | "quantity">
  >
}

export const getCartTotalPriceCents = (cart: CartLight): number => {
  const { products } = cart
  return products.reduce((total, product) => {
    return total + product.priceCents * product.quantity
  }, 0)
}
