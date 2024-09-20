import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
cancelDeleteAndGoToProfile() {
throw new Error('Method not implemented.');
}
  user: any={};
  showDeleteConfirmation: boolean = false;
  showDeleteReason: boolean = false;
  deleteReasonForm!: FormGroup;

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.createDeleteReasonForm();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(data => {
      console.log('User data:', data); // Esto ayudará a verificar si los datos llegan correctamente
      this.user = {
        profilePictureUrl: 'default-profile.png',
        name: 'John',
        surname: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        cell: '123456789'
      };
      
    }, error => {
      console.error('Error fetching user profile', error);
    });
  }
  
  goToEditProfile(): void {
    this.router.navigate(['/editar-perfil']);
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.authService.updateProfilePicture(formData).subscribe(() => {
        this.loadUserProfile(); // Refresh profile picture
      }, error => {
        console.error('Error updating profile picture', error);
      });
    }
  }

  showDeleteConfirmationDialog(): void {
    console.log('Botón presionado');
    this.showDeleteConfirmation = true;
    console.log('showDeleteConfirmation:', this.showDeleteConfirmation);
  }
  
  confirmDelete(): void {
    console.log('Confirmación de eliminación de cuenta');
    this.showDeleteConfirmation = false;
    this.showDeleteReason = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
  }

  createDeleteReasonForm(): void {
    this.deleteReasonForm = this.fb.group({
      reason1: [false],
      reason2: [false],
      reason3: [false]
      // Agrega más razones según sea necesario
    });
  }

  submitDeleteReason(): void {
    if (this.deleteReasonForm.valid) {
      const reasons = Object.keys(this.deleteReasonForm.value)
        .filter(key => this.deleteReasonForm.value[key])
        .join(', ');

      this.authService.deleteUserAccount({ reasons }).subscribe(() => {
        this.router.navigate(['/login']); // Redirige al login después de eliminar la cuenta
      }, error => {
        console.error('Error deleting account', error);
      });
    }
  }
  
} 