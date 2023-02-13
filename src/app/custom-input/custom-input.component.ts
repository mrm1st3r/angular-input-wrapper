import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorConnector } from '../control-value-accessor-connector';

let uid = 0;

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomInputComponent), multi: true}
  ]
})
export class CustomInputComponent extends ControlValueAccessorConnector {

  @Input()
  label: string;

  readonly id = 'custom-input-' + uid++;
}
