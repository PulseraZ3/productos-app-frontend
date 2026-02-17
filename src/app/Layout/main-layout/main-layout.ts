import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

  private router = inject(Router);

  username = 'Leonardo Jimenez';
  rol = 'Admin';

  logout() {
    console.log('Cerrar sesión');
  }
}
