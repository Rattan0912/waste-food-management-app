import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private baseUrl = 'http://localhost:5000/api/food'; // backend URL

  constructor(private http: HttpClient) {}

  addFood(food: any): Observable<any> {
    return this.http.post(this.baseUrl, food);
  }

  getFoods(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  donateFood(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/donate/${id}`, {});
  }

  bookFood(id: string, username?: string) {
    const body: any = { booked: true };
  
    if (username) {
      body.bookedBy = username;
    }
  
    return this.http.put(`http://localhost:5000/api/food/${id}`, body);
  }
  

  deleteFood(id: string) {
    return this.http.delete(`http://localhost:5000/api/food/${id}`);
  }
  
  updateFood(id: string, data: any) {
    return this.http.put(`http://localhost:5000/api/food/${id}`, data);
  }

  addFoodWithImage(formData: FormData) {
    return this.http.post('http://localhost:5000/api/food/upload', formData);
  }
  
}
