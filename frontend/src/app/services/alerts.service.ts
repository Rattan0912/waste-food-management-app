import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alerts: any[] = [];
  private seen = false;

  constructor() { }

  getAlerts() {
    return this.alerts;
  }

  setAlerts(alertList: any[]) {
    const lastAlertIds = JSON.parse(localStorage.getItem('lastAlertIds') || '[]');
    const newAlertIds = alertList.map(a => a._id);

    const isNew = JSON.stringify(lastAlertIds) !== JSON.stringify(newAlertIds);

    this.alerts = alertList;

    if (isNew) {
      localStorage.setItem('seenAlerts', 'false');
      localStorage.setItem('lastAlertIds', JSON.stringify(newAlertIds));
    }
  }

  hasUnseenAlerts(): boolean {
    return localStorage.getItem('seenAlerts') !== 'true' && this.alerts.length > 0;
  }

  markAlertsSeen() {
    localStorage.setItem('seenAlerts', 'true');
  }
}
