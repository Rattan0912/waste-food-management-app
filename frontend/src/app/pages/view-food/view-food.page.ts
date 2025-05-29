import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.page.html',
  styleUrls: ['./view-food.page.scss'],
  standalone: false
})
export class ViewFoodPage implements OnInit {
  user: any;
  foodItems: any[] = [];
  editingItem: any = null;

  constructor(
    private foodService: FoodService,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadFoods();
  }

  loadFoods() {
    this.foodService.getFoods().subscribe(data => {
      this.foodItems = data.filter((item: any) =>
        item.createdBy === this.user.username && item.donated === false
      );
    });
  }

  async confirmDelete(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Item',
      message: 'Are you sure you want to delete this food item?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.foodService.deleteFood(id).subscribe(() => {
              this.showToast('Item deleted');
              this.loadFoods();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  startEdit(item: any) {
    this.editingItem = { ...item }; // clone the item to avoid modifying list directly
  }

  saveEditedItem() {
    this.foodService.updateFood(this.editingItem._id, this.editingItem).subscribe(() => {
      this.showToast('Item updated');
      this.editingItem = null;
      this.loadFoods();
    });
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
