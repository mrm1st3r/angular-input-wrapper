import { ControlContainer, ControlValueAccessor, DefaultValueAccessor, UntypedFormControl, NgControl, Validators } from '@angular/forms';
import { Directive, Host, Injector, Input, Optional, ViewChild } from '@angular/core';
import { errorState } from './error-state';

/*
 * The ControlValueAccessor implementation in this components in based on an idea from article,
 * but implemented slightly differently.
 *
 * https://medium.com/angular-in-depth/dont-reinvent-the-wheel-when-implementing-controlvalueaccessor-a0ed4ad0fafd
 */
@Directive()
// tslint:disable-next-line:directive-class-suffix
export class ControlValueAccessorConnector implements ControlValueAccessor {

    /**
     * Fetch the ControlValueAccessor from the element to connect to.
     * This property may be overridden in implementing components to connect to different types
     * of ControlValueAccessors.
     */
    @ViewChild(DefaultValueAccessor, {static: true})
    valueAccessor: ControlValueAccessor;

    @Input()
    set required(value: boolean) {
        this.isRequired = value;
    }

    get required(): boolean {
        return this.isRequired || this.control?.hasValidator(Validators.required);
    }

    private isRequired = false;

    constructor(
        @Optional() @Host() private readonly controlContainer: ControlContainer,
        private readonly injector: Injector
    ) {
    }

    /*
     * Get the appropriate FormControl from the form directive bound to the element.
     * Every directive for using either template-driven or reactive forms,
     * extends the `NgControl` class that holds a form control.
     *
     * It needs to be fetched manually via the injector to avoid a circular dependency error.
     */
    get control(): UntypedFormControl|null {
        const ngControl: NgControl = this.injector.get(NgControl, null);
        return ngControl?.control as UntypedFormControl;
    }

    get disabled(): boolean {
        return this.control?.disabled;
    }

    get errorState(): boolean {
        return errorState(this.control, this.controlContainer);
    }

    // actual ControlValueAccessor methods, directly forwarding to the view child.

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
