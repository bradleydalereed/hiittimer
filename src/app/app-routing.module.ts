import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'exercise-list',
    loadChildren: () => import('./pages/exercise-list/exercise-list.module').then( m => m.ExerciseListPageModule)
  },
  {
    path: 'hiit-timer',
    loadChildren: () => import('./pages/hiit-timer/hiit-timer.module').then( m => m.HiitTimerPageModule)
  },
  {
    path: 'master-list',
    loadChildren: () => import('./pages/master-list/master-list.module').then( m => m.MasterListPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
