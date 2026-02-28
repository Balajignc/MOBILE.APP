import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  async onRegister() {
    await this.runAuthAction(() =>
      this.authService.register(this.email.trim(), this.password),
    );
  }

  async onLogin() {
    await this.runAuthAction(() =>
      this.authService.login(this.email.trim(), this.password),
    );
  }

  async onGoogleLogin() {
    await this.runAuthAction(() => this.authService.googleLogin());
  }

  private async runAuthAction(action: () => Promise<unknown>) {
    this.errorMessage = '';
    this.loading = true;
    try {
      await action();
      await this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error: any) {
      this.errorMessage =
        error?.message ?? 'Authentication failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
