import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import LayoutCompoent from './shared/ui/layout.component';
import { AuthStateService } from './shared/data-access/auth-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutCompoent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    public authStateService: AuthStateService,
    private router: Router) { }

  async logOut() {

    await this.authStateService.logOut()
    this.router.navigateByUrl('/auth/sign-in')

  }

}
