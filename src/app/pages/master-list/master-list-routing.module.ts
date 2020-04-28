import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterListPage } from './master-list.page';

const routes: Routes = [
  {
    path: '',
    component: MasterListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterListPageRoutingModule {}
