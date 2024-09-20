import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  emailExistsMessage: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, name, lastname,phone, password } = this.form;

    this.authService.register(username, email, name, lastname, phone, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
    this.authService.verificarCorreo(this.form.email).subscribe(
      (data) => {
        if (data.registrado) {
          this.emailExistsMessage = 'Este correo ya está registrado.';
        } else {
          this.emailExistsMessage = '';
          console.log('Registrar nuevo usuario');
        }
      },
      (error) => {
        console.error('Error en la verificación de correo', error);
      }
    );
  }
}
