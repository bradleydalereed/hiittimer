import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HiitTimerPage } from './hiit-timer.page';

const routes: Routes = [
  {
    path: '',
    component: HiitTimerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiitTimerPageRoutingModule {}
