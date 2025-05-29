import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
  standalone: false
})
export class AddFoodPage implements OnInit {

  food = {
    name: '',
    quantity: 0,
    expiryDate: ''
  };

  selectedFile: File | null = null;

  constructor(
    private foodService: FoodService,
    private toastController: ToastController,
    private authService: AuthService // ✅ Add this
  ) {}
  

  submitFood() {
    const user = this.authService.getUser();
  
    const formData = new FormData();
    formData.append('name', this.food.name);
    formData.append('quantity', this.food.quantity.toString());
    formData.append('expiryDate', this.food.expiryDate);
    formData.append('donorType', 'user');
    formData.append('donated', 'false');
    formData.append('booked', 'false');
    formData.append('bookedBy', '');
    formData.append('createdBy', user.username);
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    // ✅ This log will confirm the file is inside FormData
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    this.foodService.addFoodWithImage(formData).subscribe({
      next: () => {
        this.showToast('Food added!');
        this.food = { name: '', quantity: 0, expiryDate: '' };
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Error uploading:', err);
        this.showToast('Error adding food');
      }
    });
  }
  

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
  }

}
