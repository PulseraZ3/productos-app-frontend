import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../Service/auth'
import { Rol } from '../../Models/rol.model'
import { Distrito } from '../../Models/distrito.model'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {

  private authService = inject(AuthService)
  roles: Rol[] = [];
  distritos: Distrito[] = [];
  form = {
    username: '',
    password: '',
    idRol: 1,
    idDistrito: 1
  }

  ngOnInit() {
    this.cargarRoles();
    this.cargarDistritos();
  }
  cargarRoles() {
    this.authService.getRoles().subscribe({
      next: data => this.roles = data,
      error: err => console.error(err)
    });
  }
  cargarDistritos() {
    this.authService.getDistritos().subscribe({
      next: (resp) => {
        this.distritos = resp.response
      },
      error: err => console.error(err)
    });
  }

  register() {

    this.authService.register(this.form).subscribe({

      next: () => alert("Usuario creado"),
      error: () => alert("Error al registrar")
    })

  }
}