import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.page.html',
  styleUrls: ['./exercise-list.page.scss'],
})
export class ExerciseListPage implements OnInit {

  mediaFiles = [];

  constructor(public dataService: DataService, private router: Router, 
    public alertController: AlertController) {  }

  ngOnInit() {

  }

  reorderItems(event)
  {
    console.log(event);
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const itemMove = this.dataService.exerciseList.splice(event.detail.from, 1)[0];
    this.dataService.exerciseList.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }

  addExercise(){
    this.router.navigateByUrl('master-list');
  }

  removeExercise(event, listNumber: number){
    console.log("Removing: " + listNumber);
    console.log(JSON.stringify(this.dataService.exerciseList));

    for(let current of this.dataService.exerciseList){
      if(current["id"] === listNumber){
        let index = this.dataService.exerciseList.indexOf(current); 
        this.dataService.exerciseList.splice(index, 1);    
      }
    }
    console.log(JSON.stringify(this.dataService.exerciseList));
  }

  gotoSettings(){
    this.router.navigateByUrl('settings');
  }

  start(){
    if(this.dataService.exerciseList.length < 1){
      this.presentAlert();
    }
    else{
      this.router.navigateByUrl('hiit-timer');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'UH-OH!',
      subHeader: 'A slight problem...',
      message: 'You must add exercises before beginning your workout. Tap the \'+\' button.',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

}
