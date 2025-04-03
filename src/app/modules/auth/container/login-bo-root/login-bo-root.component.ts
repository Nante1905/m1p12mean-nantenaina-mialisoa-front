import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize } from 'rxjs';
import { RoleType } from '../../../../shared/types/Auth';
import { showToastError } from '../../../../shared/utils/form.utils';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { AuthService } from '../../services/auth.service';
import { LoginFormDto } from '../../types/LoginFormDto';

@Component({
  selector: 'app-login-bo-root',
  imports: [LoginFormComponent, ToastModule],
  templateUrl: './login-bo-root.component.html',
  styleUrl: './login-bo-root.component.scss',
})
export class LoginBoRootComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  loginLoading = false;
  defaultLogin: LoginFormDto = {
    email: 'nantemino15@gmail.com',
    password: 'admin123',
  };

  handleLoginSubmit(loginForm: LoginFormDto) {
    this.loginLoading = true;
    this.authService
      .loginBO(loginForm)
      .pipe(
        catchError((err) => {
          console.error(err);
          showToastError(err.error.message, this.messageService);
          return err;
        }),
        finalize(() => {
          this.loginLoading = false;
        })
      )
      .subscribe((res: any) => {
        const token = res.data?.token;
        if (token) {
          const user = this.authService.decodeToken(res.data.token);
          console.log(user);
          if (user) {
            this.authService.setToken(token);
            this.authService.setCurrentUser(user);

            if (user.role == RoleType.MANAGER) {
              this.router.navigateByUrl('/app/rdv');
            } else if (user.role == RoleType.MECANICIEN) {
              this.router.navigateByUrl('/app/interventions');
            }
          }
        }
      });
  }
}
