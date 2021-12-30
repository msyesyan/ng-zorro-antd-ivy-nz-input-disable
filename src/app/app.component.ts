import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "my-app",
  template: `
   <form [formGroup]="formGroup">
      <button nz-button nzType="primary" (click)="toggle()">
        Enable
      </button>

      <textarea nz-input [disabled]="!enable.value" formControlName="text"></textarea>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  formGroup = new FormGroup({
    enable: new FormControl(false),
    text: new FormControl(null)
  })

  get enable(): FormControl {
    return this.formGroup.get('enable') as FormControl;
  }

  get disabled() {
    return !this.formGroup.get('enable').value
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  toggle() {
    this.cdr.markForCheck();
    const disabled = this.disabled;

    if (this.enable.value) {
      this.formGroup.patchValue({enable: false});
    } else {
      this.formGroup.patchValue({enable: true});
    }
  }
}
