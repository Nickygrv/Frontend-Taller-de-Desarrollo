import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  userForm: FormGroup;
  showConfirmation: boolean = false;
  previewImage: string | ArrayBuffer | null = null;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
user: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inicializa el formulario aquí
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]{6,}')
      ]],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', Validators.required],
      password: ['', [Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }
  ngOnInit(): void {
    this.createForm();
    this.loadUserProfile();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z0-9]{6,}')
      ]],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', Validators.required],
      password: ['', [Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(data => {
      this.userForm.patchValue(data);
    }, error => {
      console.error('Error fetching user profile', error);
    });
  }

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasDigit = /\d/.test(value);
    const minLength = value.length >= 8;

    if (hasUpperCase && hasLowerCase && hasDigit && minLength) {
      return null;
    } else {
      return { 'passwordStrength': true };
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.showConfirmation = true;  // Usar la propiedad aquí
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  showConfirmationDialog(): void {
    this.showConfirmation = true;
  }

  confirmSaveChanges(): void {
    if (this.userForm.valid) {
      this.authService.updateUserProfile(this.userForm.value).subscribe(response => {
        console.log('Profile updated successfully');
        this.router.navigate(['/perfil']);
      }, error => {
        console.error('Error updating profile', error);
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/perfil']);
  }

  
}
