import { Component, effect } from "@angular/core"
import type { PaymentCard } from "@repo/shared/PaymentCard"
import { PaymentCardService } from "../../services/payment-card.service"

@Component({
  selector: "app-payment-card-management",
  standalone: false,
  templateUrl: "./payment-card-management.component.html",
  styleUrl: "./payment-card-management.component.css",
})
export class PaymentCardManagementComponent {
  public selectedPaymentCardId: PaymentCard["id"] | null = null

  public constructor(private readonly paymentCardService: PaymentCardService) {
    effect(() => {
      const paymentCard = this.paymentCardService.paymentCards.find(
        (paymentCard) => {
          return paymentCard.id === this.selectedPaymentCardId
        },
      )
      if (paymentCard == null) {
        this.selectedPaymentCardId = null
      }
    })
  }

  public selectPaymentCard(id: PaymentCard["id"] | null): void {
    this.selectedPaymentCardId = id
  }

  public get paymentCards(): PaymentCard[] {
    return this.paymentCardService.paymentCards
  }
}
