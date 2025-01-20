import { Component, EventEmitter, Input, Output } from "@angular/core"
import {
  getPaymentCardCompany,
  hasPaymentCardExpired,
} from "@repo/shared/PaymentCard"
import type { PaymentCard } from "@repo/shared/PaymentCard"
import { PaymentCardService } from "../../services/payment-card.service"

@Component({
  selector: "app-payment-card-list",
  standalone: false,
  templateUrl: "./payment-card-list.component.html",
  styleUrl: "./payment-card-list.component.css",
})
export class PaymentCardListComponent {
  @Input()
  public selectedId: PaymentCard["id"] | null = null

  @Output()
  public handleSelected = new EventEmitter<PaymentCard["id"] | null>()

  public constructor(private readonly paymentCardService: PaymentCardService) {}

  public selectPaymentCard(id: PaymentCard["id"]): void {
    if (id === this.selectedId) {
      this.handleSelected.emit(null)
      return
    }
    this.handleSelected.emit(id)
  }

  public get paymentCards(): PaymentCard[] {
    return this.paymentCardService.paymentCards
  }

  public getPaymentCardImage(numberCode: string): string {
    const company = getPaymentCardCompany(numberCode)
    return `/payment-cards/${company.toLowerCase()}.webp`
  }

  public hasPaymentCardExpired(
    input: Pick<PaymentCard, "expirationMonth" | "expirationYear">,
  ): boolean {
    return hasPaymentCardExpired(input)
  }

  public deletePaymentCard(event: Event, id: PaymentCard["id"]): void {
    event.stopPropagation()
    this.paymentCardService.deletePaymentCard(id)
  }
}
