import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { RegisterPageComponent } from '../register-page/register-page.component';

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

  @ViewChild('dynamicContainer', { read: ViewContainerRef})
  dynamicContainer!: ViewContainerRef;
  
  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      const loginData = {
        email: this.validateForm.value.userName, // backend espera "email"
        password: this.validateForm.value.password
      };

      this.http.post('http://localhost:8080/auth/login', loginData).subscribe({
        next: (response: any) => {
          console.log('Login bem-sucedido', response);

          // ✅ Salva o token JWT no localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.name);

          // Exibe uma notificação amigável
          this.notification.success('Login realizado', `Bem-vindo, ${response.name}!`);

          // Redireciona para a home (ou página de emissão de NFe, etc.)
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro no login', err);
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

  showRegisterForm(): void {
    // Limpa qualquer componente anterior
    this.dynamicContainer.clear();

    // Cria o formulário de registro dinamicamente
    
    this.dynamicContainer.createComponent(RegisterPageComponent);
  }
}
