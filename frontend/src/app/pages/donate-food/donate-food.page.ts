import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-donate-food',
  templateUrl: './donate-food.page.html',
  styleUrls: ['./donate-food.page.scss'],
  standalone: false
})
export class DonateFoodPage implements OnInit {
  bakeItem = {
    name: '',
    description: '',
    quantity: 1,
    expiryDate: ''
  };

  selectedFile: File | null = null;

  availableItems: any[] = [];

  constructor(
    private foodService: FoodService,
    private toastController: ToastController,
    private authService: AuthService // ✅ ADD THIS
  ) {}
  

  ngOnInit() {
    this.loadBakeryItems();
  }

  submitBakeryItem() {
    const user = this.authService.getUser();
  
    const formData = new FormData();
    formData.append('name', this.bakeItem.name);
    formData.append('description', this.bakeItem.description);
    formData.append('quantity', this.bakeItem.quantity.toString());
    formData.append('expiryDate', this.bakeItem.expiryDate);
    formData.append('donorType', 'bakery');
    formData.append('donated', 'true');
    formData.append('booked', 'false');
    formData.append('bookedBy', '');
    formData.append('createdBy', user.username);
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    this.foodService.addFoodWithImage(formData).subscribe({
      next: () => {
        this.showToast('Baked item listed!');
        this.bakeItem = { name: '', description: '', quantity: 1, expiryDate: '' };
        this.selectedFile = null;
        this.loadBakeryItems();
      },
      error: () => this.showToast('Error submitting item')
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  

  loadBakeryItems() {
    this.foodService.getFoods().subscribe(data => {
      this.availableItems = data.filter((item: any) =>
        item.donorType === 'bakery' && !item.booked
      );
    });
  }

  bookItem(id: string) {
    const user = this.authService.getUser();
    // You can pass user info (e.g., userId) here later
    this.foodService.bookFood(id,user.username).subscribe({
      next: () => {
        this.showToast('Item booked successfully!');
        this.loadBakeryItems();
      },
      error: () => this.showToast('Error booking item')
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

}
