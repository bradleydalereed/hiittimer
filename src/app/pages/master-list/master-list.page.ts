import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.page.html',
  styleUrls: ['./master-list.page.scss'],
})
export class MasterListPage implements OnInit {

  constructor(private router: Router, public dataService: DataService, public alertController: AlertController) { }

  ngOnInit() {
  }

  addExercise(exercise: string)
  {
    let newExercise = { "id":this.dataService.exerciseList.length + 1,  "name":exercise };
    //console.log(exercise);
    this.dataService.exerciseList.push(newExercise);
  }

  removeExercise(exercise: string){
    for(let current of this.dataService.exerciseList){
      if(current["name"] === exercise){
        let index = this.dataService.exerciseList.indexOf(current); 
        this.dataService.exerciseList.splice(index, 1);    
      }
    }
  }

  showComponent(name, description)
  {
    this.showDescription(name, description);
  }

  gotoExerciseList() {
    this.router.navigateByUrl('exercise-list');
  }

  toggleExercise(event) {
    if(event.detail.checked){
      this.addExercise(event.detail.value);
    }
    else{
      this.removeExercise(event.detail.value);
    }  
  }

  async showDescription(name, description) {

    const alert = await this.alertController.create({
      header: name,
      subHeader: '',
      message: description,
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    //console.log(result);
  }

  isExerciseInList(exercise: string): boolean {
    
    let listed: boolean = false;

    //console.log(JSON.stringify(this.dataService.exerciseList));
    for(let current of this.dataService.exerciseList){
      //console.log("Current: " + current["name"]);
      //console.log("Exercise: " + exercise);
      if(current["name"] === exercise){
        listed = true; 
      }
    }
    return listed;
  }

}
