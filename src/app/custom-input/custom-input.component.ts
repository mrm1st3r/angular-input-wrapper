import { Component, forwardRef, Host, Injector, Input, Optional, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, DefaultValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomInputComponent), multi: true}
  ]
})
export class CustomInputComponent implements ControlValueAccessor {


    @Input()
    label: string;

    @Input()
    set required(value: boolean) {
      this._required = value;
    }

    private _required = false;

    // this directive is bound to the native `input` element when attaching a `formControl` property
    @ViewChild(DefaultValueAccessor, {static: true})
    valueAccessor: DefaultValueAccessor;

    constructor(
      @Optional() @Host() private readonly controlContainer: ControlContainer,
      private readonly injector: Injector
      ) {
    }

    /* Get hold of FormControl instance from the accompanying NgControl directive.
     * An concrete instance of that abstract direcive will be created,
     * no matter if reactive or template-driven forms are used.
     * 
     * It needs to be fetched manually via the injector to avoid a circular dependency error.
     * 
     * TODO: Think about caching with a local variable
     * TODO: Make sure there's no memory leak with that.
     */
    get control(): FormControl {
        const ngControl = this.injector.get(NgControl);
        return ngControl.control as FormControl;
    }

    get disabled(): boolean {
        return this.control?.disabled;
    }

    get required(): boolean {
      return this._required || this.control?.hasValidator(Validators.required);
    }

    get errorState(): boolean {
        return errorState(this.control, this.controlContainer);
    }


    // actual ControlValueAccessor methods that directly call the `FormControlDirective` on the native element.

    registerOnChange(fn: any): void {
        this.valueAccessor.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this.valueAccessor.registerOnTouched(fn);
    }

    writeValue(obj: any): void {
        this.valueAccessor.writeValue(obj);
    }

    setDisabledState(isDisabled: boolean): void {
        this.valueAccessor.setDisabledState(isDisabled);
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
