import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { ReactiveFormsModule } from "@angular/forms"
import { ButtonDirective } from "../directives/button/button.directive"
import { InputDirective } from "../directives/input/input.directive"
import { LabelDirective } from "../directives/label/label.directive"
import { PaymentCardFormComponent } from "./components/payment-card-form/payment-card-form.component"
import { PaymentCardListComponent } from "./components/payment-card-list/payment-card-list.component"
import { PaymentCardManagementComponent } from "./components/payment-card-management/payment-card-management.component"
import { MaxInputCharactersDirective } from "./directives/max-input-characters.directive"
import { PaymentCardNumberCodeDirective } from "./directives/payment-card-number-code.directive"
import { PaymentCardMaskPipe } from "./pipes/payment-card-mask.pipe"
import { ZeroPadPipe } from "./pipes/zero-pad.pipe"

@NgModule({
  declarations: [
    PaymentCardFormComponent,
    PaymentCardListComponent,
    PaymentCardManagementComponent,
    MaxInputCharactersDirective,
    PaymentCardNumberCodeDirective,
    PaymentCardMaskPipe,
    ZeroPadPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonDirective,
    InputDirective,
    LabelDirective,
  ],
  exports: [PaymentCardManagementComponent],
})
export class PaymentCardModule {}
