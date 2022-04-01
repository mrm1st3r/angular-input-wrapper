import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements ControlValueAccessor {


    // this directive is bound to the native `input` element when attaching a `formControl` property
    @ViewChild(FormControlDirective, {static: true})
    formControlDirective: FormControlDirective;

    @Input()
    formControl: FormControl;

    @Input()
    formControlName: string;

    constructor(@Optional() private readonly controlContainer: ControlContainer) {
    }

    /* Get hold of FormControl instance no matter formControl or formControlName is given.
       If formControlName is given, then this.controlContainer.control is the parent FormGroup (or FormArray) instance.
       TODO: Check how this works with template-driven forms
     */
    get control(): FormControl {
        return this.formControl || !!this.formControlName && this.controlContainer?.control.get(this.formControlName) as FormControl;
    }

    get disabled(): boolean {
        return this.control?.disabled;
    }

    get required(): boolean {
      return false;
        //return this.control?.hasValidator(Validators.required);
    }

    get errorState(): boolean {
        return errorState(this.control, this.controlContainer);
    }


    // actual ControlValueAccessor methods that directly call the `FormControlDirective` on the native element.

    registerOnChange(fn: any): void {
        this.formControlDirective.valueAccessor.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }

    writeValue(obj: any): void {
        this.formControlDirective.valueAccessor.writeValue(obj);
    }

    setDisabledState(isDisabled: boolean): void {
        this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }
}

function errorState(control: AbstractControl, controlContainer: ControlContainer): boolean {
  let form: NgForm | FormGroupDirective = null;
  // Both, NgForm and FormGroupDirective extend ControlContainer
  if (controlContainer instanceof NgForm || controlContainer instanceof FormGroupDirective) {
      form = controlContainer;
  }
  // taken from @angular/material ErrorStateMatcher
  return !!(control && control.invalid && (control.touched || (form && form.submitted)));
}
