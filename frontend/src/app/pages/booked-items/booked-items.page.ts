import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-booked-items',
  templateUrl: './booked-items.page.html',
  styleUrls: ['./booked-items.page.scss'],
  standalone: false
})
export class BookedItemsPage implements OnInit {
  user: any;
  bookedItems: any[] = [];

  constructor(
    private foodService: FoodService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadBookedItems();
  }

  loadBookedItems() {
    this.foodService.getFoods().subscribe(data => {
      this.bookedItems = data.filter((item: any) =>
        item.booked === true && item.bookedBy === this.user.username
      );
    });
  }

}
