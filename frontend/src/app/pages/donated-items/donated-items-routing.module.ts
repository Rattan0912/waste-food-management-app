import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonatedItemsPage } from './donated-items.page';

const routes: Routes = [
  {
    path: '',
    component: DonatedItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatedItemsPageRoutingModule {}
