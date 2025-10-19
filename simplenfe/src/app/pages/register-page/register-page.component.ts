import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient } from '@angular/common/http'; // 👈 Import HTTP

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  validateForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    name: FormControl<string>;
    agree: FormControl<boolean>;
  }>;

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  constructor(
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService,
    private http: HttpClient // 👈 Injetar aqui
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      name: ['', [Validators.required]],
      agree: [false],
    });
  }

  // 👇 Atualize o método de envio
  submitForm(): void {
    if (!this.validateForm.value.agree) {
      this.notification.warning(
        'Aviso!',
        'Você precisa aceitar os termos para continuar'
      );
      return;
    }

    if (this.validateForm.valid) {
      const userData = {
        name: this.validateForm.value.name,
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        acceptTerms: this.validateForm.value.agree,
      };

      this.http
        .post('http://localhost:8080/auth/register', userData)
        .subscribe({
          next: () => {
            this.notification.success(
              'Sucesso!',
              'Usuário cadastrado com sucesso.'
            );
            this.validateForm.reset();
          },
          error: (err) => {
            console.error(err);
            this.notification.error(
              'Erro!',
              'Não foi possível realizar o cadastro.'
            );
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm?.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
