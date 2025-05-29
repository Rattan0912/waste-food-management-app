import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonatedItemsPageRoutingModule } from './donated-items-routing.module';

import { DonatedItemsPage } from './donated-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonatedItemsPageRoutingModule
  ],
  declarations: [DonatedItemsPage]
})
export class DonatedItemsPageModule {}
