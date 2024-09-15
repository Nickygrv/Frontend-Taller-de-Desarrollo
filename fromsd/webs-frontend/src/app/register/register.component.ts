import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    nombre: '',
    apellido: '',
    ci: '',
    email: '',
  };

  onRegister() {
    // Aquí podrías implementar la lógica para registrar al usuario
    console.log('Registro completado', this.user);
  }
}
