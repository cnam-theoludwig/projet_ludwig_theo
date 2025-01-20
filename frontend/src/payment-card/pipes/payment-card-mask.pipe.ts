import { Pipe } from "@angular/core"
import type { PipeTransform } from "@angular/core"
import { getPaymentCardCompany } from "@repo/shared/PaymentCard"

@Pipe({
  name: "paymentCardMask",
  standalone: false,
})
export class PaymentCardMaskPipe implements PipeTransform {
  public transform(cardNumber: string): string {
    const cardCompany = getPaymentCardCompany(cardNumber)
    let result = ""
    if (cardCompany !== "Unknown") {
      result += cardCompany + " "
    }
    result += "**** **** **** " + cardNumber.slice(-4)
    return result
  }
}
