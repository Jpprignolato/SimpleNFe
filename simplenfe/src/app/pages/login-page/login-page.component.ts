import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RegisterPageComponent } from '../register-page/register-page.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // 👈 novo import

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

  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private router: Router,
    private authService: AuthService // 👈 injeção
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const loginData = {
        email: this.validateForm.value.userName,
        password: this.validateForm.value.password
      };

      this.http.post('http://localhost:8080/auth/login', loginData).subscribe({
        next: (response: any) => {
          this.notification.success('Login realizado', `Bem-vindo, ${response.name}!`);

          this.authService.setToken(response.token);
          localStorage.setItem('username', response.name);

          const userId = this.authService.getUserId();

          if (userId) {
            this.router.navigate([`/app/${userId}`], { replaceUrl: true });
          } else {
            this.notification.warning('Erro', 'Não foi possível identificar o usuário.');
          }
        },
        error: () => {
          this.notification.error('Erro de login', 'E-mail ou senha incorretos.');
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  openRegisterModal(): void {
    this.modal.create({
      nzTitle: 'Crie sua conta',
      nzContent: RegisterPageComponent,
      nzCentered: true,
      nzWidth: 600,
      nzFooter: null,
      nzClosable: true,
      nzBodyStyle: { padding: '24px 24px 8px 24px' }
    });
  }
}
