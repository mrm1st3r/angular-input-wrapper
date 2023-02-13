import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model: string;
  control = new UntypedFormControl({value: null, disabled: false}, [Validators.required]);

  foo = 'foo';
  bar = 'bar';

  radio: string;
  radioControl = new UntypedFormControl({value: 'foo', disabled: true}, [Validators.required]);
  wrapperControl = new UntypedFormControl('foo', [Validators.required]);

  updateValues(value: string): void {
    this.model = value;
    this.control.setValue(value);
  }

}
