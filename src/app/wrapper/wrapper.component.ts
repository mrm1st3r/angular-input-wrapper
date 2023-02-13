import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  @Input()
  foo: string;

  @Input()
  bar: string;

  @Input()
  radioControl: UntypedFormControl;

  constructor() { }

  ngOnInit(): void {
  }

  radio: string;


}
