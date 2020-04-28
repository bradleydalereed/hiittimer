import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExerciseListPageRoutingModule } from './exercise-list-routing.module';

import { ExerciseListPage } from './exercise-list.page';
import { MaterialsModule } from '../../pages/materials.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseListPageRoutingModule,
    MaterialsModule
  ],
  declarations: [ExerciseListPage]
})
export class ExerciseListPageModule {}
