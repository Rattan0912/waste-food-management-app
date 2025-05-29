import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.authService.saveSession(res.token, res.user);
        this.router.navigate(['/home']);
        this.showToast('Login successful!');
      },
      error: () => this.showToast('Invalid credentials')
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
