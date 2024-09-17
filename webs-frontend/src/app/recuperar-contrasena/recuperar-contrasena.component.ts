import { Component } from '@angular/core';

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

  onSubmit(): void {
    // Implementa la lógica para manejar el envío del correo de recuperación
    if (this.form.email && this.form.username) {
      // Simulación de envío exitoso
      this.successMessage = 'Correo enviado con éxito';
      this.errorMessage = '';
    } else {
      // Simulación de error
      this.successMessage = '';
      this.errorMessage = 'ERROR AL ENVIAR EL CORREO';
    }
  }
}

