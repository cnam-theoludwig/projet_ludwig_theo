import { Pipe } from "@angular/core"
import type { PipeTransform } from "@angular/core"

@Pipe({
  name: "zeroPad",
  standalone: false,
})
export class ZeroPadPipe implements PipeTransform {
  public transform(value: number, places: number = 2): string {
    return value.toString().padStart(places, "0")
  }
}
