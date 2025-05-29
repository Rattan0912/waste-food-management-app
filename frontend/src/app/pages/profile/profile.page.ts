import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  user: any;
  bookings: any[] = [];
  donations: any[] = [];

  constructor(
    private authService: AuthService,
    private foodService: FoodService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.loadData();
  }

  loadData() {
    this.foodService.getFoods().subscribe(data => {
      this.bookings = data.filter((item: any) => item.bookedBy === this.user.username);
      this.donations = data.filter((item: any) =>
        item.donorType === 'user' && item.bookedBy !== this.user.username && item.createdBy === this.user.username
      );
    });
  }

  logout() {
    this.authService.logout();
  }

}
