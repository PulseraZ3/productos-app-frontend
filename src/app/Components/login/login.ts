import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);


  form = {
    username: '',
    password: ''
  };

  login() {

    if (!this.form.username || !this.form.password) {
      alert("Completa los campos");
      return;
    }

    this.authService.login(this.form).subscribe({
      next: (res) => {

        this.authService.guardarSesion(res);

        // redireccion
        this.router.navigate(['/']);

      },
      error: () => {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }

}
