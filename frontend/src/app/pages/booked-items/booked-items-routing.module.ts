import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedItemsPage } from './booked-items.page';

const routes: Routes = [
  {
    path: '',
    component: BookedItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedItemsPageRoutingModule {}
