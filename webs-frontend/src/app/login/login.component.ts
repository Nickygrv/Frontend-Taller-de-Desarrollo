import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    username: '',
    password: '',
  };

  onLogin() {
    // Aquí podrías implementar la lógica para autenticar al usuario
    console.log('Login realizado con éxito', this.user);
  }
}
