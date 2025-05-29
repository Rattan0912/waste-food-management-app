import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';  
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false
})
export class SignupPage implements OnInit {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router
  ) {}

  signup() {
    this.authService.signup(this.user).subscribe({
      next: (res: any) => {
        this.authService.saveSession(res.token, res.user);
        this.router.navigate(['/home']);
        this.showToast('Signup successful!');
      },
      error: () => this.showToast('Signup failed. Try again.')
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }

  ngOnInit() {
  }

}
