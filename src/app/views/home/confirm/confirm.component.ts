import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

declare var $: any;


@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    dataConfirm: FormGroup;
    notiErr = '';
    submitted = false;


    constructor(
        private router      : Router,
        private formBuilder : FormBuilder,
    ) { }

    ngOnInit(): void {
        this.dataConfirm = this.formBuilder.group({
            'name'  : new FormControl('', [ Validators.required]),
            'phone'  : new FormControl('', [ Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]\d*$/)]),
            'address'  : new FormControl('', [ Validators.required]),
            'email'  : new FormControl('', [ Validators.required, Validators.email]),
        });
        this.dataConfirm.valueChanges.subscribe(data => this.notiErr = '');
    }
    get ckConfirm() {
        return this.dataConfirm.controls;
    }

    confirm () {
        this.submitted = true;
    }


}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
