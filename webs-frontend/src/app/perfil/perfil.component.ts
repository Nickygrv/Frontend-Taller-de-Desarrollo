import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
triggerFileInput() {
throw new Error('Method not implemented.');
}
  user: any;
  @ViewChild('fileInput') fileInput!: ElementRef;  // Usar el operador de aserción de inicialización

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getUserProfile().subscribe(data => {
      this.user = data;
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
}
