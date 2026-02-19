import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.css'
})
export class Navbar {
   menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }
}
