import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  model: string;
  control = new FormControl(null, [Validators.required]);

  foo = 'foo';
  bar = 'bar';

  radio: string;
  radioControl = new FormControl('foo', [Validators.required]);
  wrapperControl = new FormControl('foo', [Validators.required]);

  updateValues(value: string): void {
    this.model = value;
    this.control.setValue(value);
  }

}
