import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Service/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontEnd-Almacen');
  constructor(private authService: AuthService){}
  ngOnInit(){
    this.authService.checkSessionExpiration();
    this.authService.startAutoLogout();

  }
}