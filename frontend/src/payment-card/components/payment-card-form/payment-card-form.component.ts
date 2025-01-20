import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import type { PaymentCard } from "@repo/shared/PaymentCard"
import { hasPaymentCardExpired } from "@repo/shared/PaymentCard"
import { PaymentCardService } from "../../services/payment-card.service"

@Component({
  selector: "app-payment-card-form",
  standalone: false,
  templateUrl: "./payment-card-form.component.html",
  styleUrl: "./payment-card-form.component.css",
})
export class PaymentCardFormComponent {
  public readonly paymentCardForm: FormGroup

  public constructor(
    private readonly paymentCardService: PaymentCardService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.paymentCardForm = this.formBuilder.group(
      {
        holderName: ["", Validators.required],
        numberCode: ["", [Validators.required]],
        ccv: ["", [Validators.required]],
        expirationMonth: [
          "",
          [Validators.required, Validators.min(1), Validators.max(12)],
        ],
        expirationYear: ["", [Validators.required]],
      },
      {
        validators: (formGroup) => {
          const expirationMonthControl = formGroup.get("expirationMonth")
          const expirationYearControl = formGroup.get("expirationYear")
          if (
            expirationMonthControl === null ||
            expirationYearControl === null ||
            !expirationYearControl.valid ||
            !expirationMonthControl.valid
          ) {
            return null
          }
          const expirationYear = expirationYearControl.value
          const expirationMonth = expirationMonthControl.value
          const expired = hasPaymentCardExpired({
            expirationMonth,
            expirationYear,
          })
          return expired ? { cardExpired: true } : null
        },
      },
    )
  }

  public onSubmit(): void {
    if (!this.paymentCardForm.valid) {
      return
    }
    const paymentCard = this.paymentCardForm.value as PaymentCard
    this.paymentCardService.addPaymentCard(paymentCard)
    this.paymentCardForm.reset()
  }
}
