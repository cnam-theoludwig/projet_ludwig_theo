export interface PaymentCard {
  id: string
  holderName: string
  numberCode: string
  ccv: string
  expirationMonth: number
  expirationYear: number
}

const PAYMENT_CARD_COMPANIES = [
  { code: "4", name: "Visa" },
  { code: "5", name: "Mastercard" },
] as const

export type PaymentCardCompany =
  | (typeof PAYMENT_CARD_COMPANIES)[number]["name"]
  | "Unknown"

export const getPaymentCardCompany = (
  numberCode: string,
): PaymentCardCompany => {
  return (
    PAYMENT_CARD_COMPANIES.find(({ code }) => {
      return numberCode.startsWith(code)
    })?.name ?? "Unknown"
  )
}

export const hasPaymentCardExpired = (
  input: Pick<PaymentCard, "expirationMonth" | "expirationYear">,
): boolean => {
  const { expirationMonth, expirationYear } = input
  const currentDate = new Date()
  return (
    expirationYear < currentDate.getFullYear() ||
    (expirationYear === currentDate.getFullYear() &&
      expirationMonth < currentDate.getMonth() + 1)
  )
}
