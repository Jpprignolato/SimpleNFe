import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [...SHARED_IMPORTS], 
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})


export class LoginPageComponent {

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
    }> = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });

    submitForm(): void {
      if (this.validateForm.valid) {
        console.log('submit', this.validateForm.value);
      } else {
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
      });
    }
  }
    constructor(private fb: NonNullableFormBuilder) {}
}
