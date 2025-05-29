import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'add-food',
    loadChildren: () => import('./pages/add-food/add-food.module').then( m => m.AddFoodPageModule)
  },
  {
    path: 'view-food',
    loadChildren: () => import('./pages/view-food/view-food.module').then( m => m.ViewFoodPageModule),
    canActivate: [AuthGuard]
    
  },
  {
    path: 'donate-food',
    loadChildren: () => import('./pages/donate-food/donate-food.module').then( m => m.DonateFoodPageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule),
    
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'donated-items',
    loadChildren: () => import('./pages/donated-items/donated-items.module').then( m => m.DonatedItemsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booked-items',
    loadChildren: () => import('./pages/booked-items/booked-items.module').then( m => m.BookedItemsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
