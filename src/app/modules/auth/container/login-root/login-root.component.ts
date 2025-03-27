import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, finalize } from 'rxjs';
import { showToastError } from '../../../../shared/utils/form.utils';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../services/auth.service';
import { LoginFormDto } from '../../types/LoginFormDto';

@Component({
  selector: 'app-login-root',
  imports: [LoginFormComponent],
  providers: [AuthService, Router, MessageService],
  templateUrl: './login-root.component.html',
  styleUrl: './login-root.component.scss',
})
export class LoginRootComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  loginLoading = false;

  handleLoginSubmit(loginForm: LoginFormDto) {
    this.loginLoading = true;
    this.authService
      .login(loginForm)
      .pipe(
        catchError((err) => {
          console.error(err);
          showToastError(err.message || err.error.message, this.messageService);
          return err;
        }),
        finalize(() => {
          this.loginLoading = false;
        })
      )
      .subscribe((res: any) => {
        if (res.data.token) {
          localStorage.setItem('access', res.data.token);
          this.router.navigate(['devis']).then(() => {
            this.cdr.detectChanges();
          });
        }
      });
  }
}
