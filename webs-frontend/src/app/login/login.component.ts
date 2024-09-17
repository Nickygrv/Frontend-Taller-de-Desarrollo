import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  emailNotExistsMessage: string = '';
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
    this.authService.verificarCorreo(this.form.email).subscribe(
      (data) => {
        if (!data.registrado) {
          this.emailNotExistsMessage = 'Este correo no está vinculado a ninguna cuenta.';
        } else {
          this.emailNotExistsMessage = '';
          // Continuar con el inicio de sesión
          console.log('Iniciar sesión exitosamente');
        }
      },
      (error) => {
        console.error('Error en la verificación de correo', error);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
