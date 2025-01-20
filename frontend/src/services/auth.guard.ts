import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import type { CanActivate } from "@angular/router"
import { CustomerService } from "./customer.service"

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
  ) {}

  public get customer(): CustomerService["customer"] {
    return this.customerService.customer
  }

  public async canActivate(): Promise<boolean> {
    if (this.customer != null) {
      return true
    }

    await this.router.navigate(["/sign-in"])
    return false
  }
}
