import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthStateService } from './shared/data-access/auth-state.service';
import LayoutCompoent from './shared/ui/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, LayoutCompoent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Angular_Firebase_Auth_Crud';

  constructor(
    public authStateService: AuthStateService,
    private router: Router) { }

  async logOut() {
    await this.authStateService.logOut()
    this.router.navigateByUrl('/auth/sign-in')

  }

}
