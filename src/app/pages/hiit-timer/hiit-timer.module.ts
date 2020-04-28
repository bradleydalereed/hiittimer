import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HiitTimerPageRoutingModule } from './hiit-timer-routing.module';

import { HiitTimerPage } from './hiit-timer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HiitTimerPageRoutingModule
  ],
  declarations: [HiitTimerPage]
})
export class HiitTimerPageModule {}
