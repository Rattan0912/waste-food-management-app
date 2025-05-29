import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from '../services/alerts.service';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  user: any;


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertsService: AlertsService,
    private foodService: FoodService, 
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  
    this.foodService.getFoods().subscribe(data => {
      const now = new Date();
const alerts = data.filter((item: any) => {
  const expiry = new Date(item.expiryDate);
  const hoursUntilExpire = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);

  return (
    hoursUntilExpire > 0 && // ✅ Only future items
    (
      (item.createdBy === this.user.username && hoursUntilExpire < 48) ||
      (item.bookedBy === this.user.username)
    )
  );
});
  
      this.alertsService.setAlerts(alerts);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // ✅ send user back to login page
  }

  hasUnseenAlerts(): boolean {
    return this.alertsService.hasUnseenAlerts();
  }

  getAlertIcon(): string {
    return this.hasUnseenAlerts() ? 'notifications' : 'notifications-outline';
  }

  
  

}
