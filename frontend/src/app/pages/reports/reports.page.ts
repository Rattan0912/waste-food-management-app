import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false 
})
export class ReportsPage implements OnInit {
  alerts: any[] = [];
  user: any;

  constructor(
    private foodService: FoodService,
    private alertsService: AlertsService,
    private authService: AuthService
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

      this.alerts = alerts;
      this.alertsService.setAlerts(alerts);
      this.alertsService.markAlertsSeen(); // ✅ mark as seen once opened
    });
  }

}
