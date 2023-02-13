import {AbstractControl, ControlContainer, FormGroupDirective, NgForm} from '@angular/forms';

/**
 * Determine if an input should be in error-state.
 *
 * @param control the inputs form control
 * @param controlContainer the parent form
 */
export function errorState(control: AbstractControl, controlContainer: ControlContainer): boolean {
    let form: NgForm | FormGroupDirective = null;
    // Both, NgForm and FormGroupDirective extend ControlContainer
    if (controlContainer instanceof NgForm || controlContainer instanceof FormGroupDirective) {
        form = controlContainer;
    }
    // taken from @angular/material ErrorStateMatcher:
    // Only mark as error, if the control has been interacted with.
    return !!(control && control.invalid && (control.touched || (form && form.submitted)));
}
