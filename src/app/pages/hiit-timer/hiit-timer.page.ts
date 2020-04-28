import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-hiit-timer',
  templateUrl: './hiit-timer.page.html',
  styleUrls: ['./hiit-timer.page.scss'],
})
export class HiitTimerPage implements OnInit {

  public timeLeft: number;
  public exerciseCounter: number;
  public setsCounter: number;
  public interval: any;

  public workoutPaused: boolean;
  public restPeriod: boolean;
  public complete: boolean;

  constructor(private router: Router, public dataService: DataService, private audioService: AudioService) { 

    this.timeLeft = this.dataService.exerciseTime;
    this.exerciseCounter = 0;
    this.setsCounter = 0;
    this.workoutPaused = false;
    this.restPeriod = false;
    this.complete = false;
  }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.workoutPaused = false;
    //console.log("Total Rounds: " + this.dataService.numberOfSets);
    
    this.audioService.play('begin');
    this.interval = setInterval(() => {

      if(this.setsCounter == this.dataService.numberOfSets){
        this.stopTimer();
        this.complete = true;
        return;
      }

      if(this.timeLeft > 0) {

        if(this.restPeriod){
          switch(this.timeLeft) { 
            case 10: { 
              this.audioService.play('upnext');
                break; 
            } 
            case 8: { 
              //console.log("Playing Audio for: " + this.dataService.getNextExercise(this.setsCounter,this.exerciseCounter));
              this.audioService.play(this.dataService.getNextExercise(this.setsCounter,this.exerciseCounter));
                break; 
            } 
            case 6: { 
              this.audioService.play('getready');
                break; 
            } 
            case 4: { 
              this.audioService.play('321go');
                break; 
            } 
          }
 
        }
        else{
            if(this.timeLeft == 1)
              this.audioService.play('stopandrest');
        }
        this.timeLeft--;
      } 
      else 
      {  
        if(!this.restPeriod){   
          //console.log("BEGIN REST PERIOD");
          //console.log("Exercise Counter: " + this.exerciseCounter);
          this.exerciseCounter++;
          //console.log("Exercise Counter: " + this.exerciseCounter);
        }
        
        if(this.restPeriod){
          this.timeLeft = this.dataService.exerciseTime;
          this.restPeriod = false;
        }
        else if(!this.restPeriod && this.exerciseCounter < this.dataService.exerciseList.length){
          this.timeLeft = this.dataService.restPeriod;
          this.restPeriod = true;
        }
        else{
          this.setsCounter++;
          this.timeLeft = this.dataService.restPeriod;
          this.exerciseCounter = 0;
          this.restPeriod = true;
        }
      }
    },1000)
  }

  pauseTimer() {
    //console.log("Timer Paused.");
    this.workoutPaused = true;
    clearInterval(this.interval);
  }

  stopTimer() {
    //console.log("Timer Stopped.");
    this.workoutPaused = false;
    clearInterval(this.interval);
  }

  gotoExercises() {
    this.router.navigateByUrl('exercise-list');
  }

  getCurrentExercise() {
    let currentExercise = this.dataService.exerciseList[this.exerciseCounter];
    return currentExercise["name"];
  }

  restartWorkout() {
    this.timeLeft = this.dataService.exerciseTime;
    this.exerciseCounter = 0;
    this.setsCounter = 0;
    this.workoutPaused = false;
    this.restPeriod = false;
    this.complete = false;

    this.startTimer();
  }

  outputProperTime(){

    let strHours = '';
    let strMinutes = '';
    let strSeconds = '';

    let hours = Math.floor(this.timeLeft/3600);
    let minutes = Math.floor(this.timeLeft%3600/60);
    let seconds = Math.floor(this.timeLeft%3600%60);

    if(hours < 10) strHours = '0' + hours.toString();
    else strHours = hours.toString();

    if(minutes < 10) strMinutes = '0' + minutes.toString();
    else strMinutes = minutes.toString();

    if(seconds < 10) strSeconds = '0' + seconds.toString();
    else strSeconds = seconds.toString();

    return strHours +':' + strMinutes + ':' + strSeconds;
  }

}
