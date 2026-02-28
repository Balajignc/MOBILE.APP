import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  userEmail = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.user$.subscribe((user) => {
      this.userEmail = user?.email ?? '';
    });
  }

  async onLogout() {
    await this.authService.logout();
    await this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
