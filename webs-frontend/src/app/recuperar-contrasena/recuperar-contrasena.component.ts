import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service'; // Ajusta la ruta si es diferente


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  form: any = {
    username: null,
    email: null
  };
  successMessage: string = '';
  errorMessage: string = '';
  emailNotExistsMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.form.email && this.form.username) {
      this.successMessage = 'Correo enviado con éxito';
      this.errorMessage = '';
    } else {
      this.successMessage = '';
      this.errorMessage = 'ERROR AL ENVIAR EL CORREO';
    }

    this.authService.verificarCorreo(this.form.email).subscribe(
      (data) => {
        if (!data.registrado) {
          this.emailNotExistsMessage = 'Este correo no está vinculado a ninguna cuenta.';
        } else {
          this.emailNotExistsMessage = '';
          // Continuar con el proceso de recuperación
          console.log('Enviar correo de recuperación');
        }
      },
      (error) => {
        console.error('Error en la verificación de correo', error);
      }
    );
  }
}

