import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedItemsPageRoutingModule } from './booked-items-routing.module';

import { BookedItemsPage } from './booked-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookedItemsPageRoutingModule
  ],
  declarations: [BookedItemsPage]
})
export class BookedItemsPageModule {}
