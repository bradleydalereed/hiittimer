import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  defaultInterval:number;
  defaultRest:number;
  defaultRounds:number;

  constructor(private router: Router, public dataService: DataService, public alertController: AlertController) { 
    this.defaultInterval = 120;
    this.defaultRest = 60;
    this.defaultRounds = 3;
  }

  ngOnInit() {
  }

  submitForm() {

    console.log("Exercise Interval: " + this.dataService.exerciseTime);
    console.log("Rest Period: " + this.dataService.restPeriod);
    console.log("Number of Rounds: " + this.dataService.numberOfSets);

    if(Number.isInteger(+this.dataService.exerciseTime) 
        && Number.isInteger(+this.dataService.restPeriod) 
        && Number.isInteger(+this.dataService.numberOfSets)){
      this.router.navigateByUrl('exercise-list');
    }
    else{
      this.presentAlert();
    }

  }

  resetValues() {
    this.dataService.exerciseTime = this.defaultInterval;
    this.dataService.restPeriod = this.defaultRest;
    this.dataService.numberOfSets = this.defaultRounds;
    this.router.navigateByUrl('exercise-list');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'UH-OH!',
      subHeader: 'A slight problem...',
      message: 'You must provide all values in round numbers.',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

}
