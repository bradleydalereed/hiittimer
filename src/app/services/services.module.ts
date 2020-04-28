import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { AudioService } from './audio.service'

@NgModule({
  declarations: [
  ],
  imports: [CommonModule],
  exports : [],
  providers: [
    DataService,
    AudioService,
  ],
})
export class ServicesModule { }
