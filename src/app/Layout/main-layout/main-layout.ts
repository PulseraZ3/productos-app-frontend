import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../../Service/auth';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

  private router = inject(Router);
  private authService = inject(AuthService)
  username: string | null = '';
  rol: string | null = '';
  ngOnInit() {
    this.username = this.authService.getUsername();
    this.rol = this.authService.getRol();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
