import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private authSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authSub = this.authService.user$.subscribe((user) => {
      const targetRoute = user ? '/home' : '/login';
      void this.router.navigateByUrl(targetRoute, { replaceUrl: true });
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
