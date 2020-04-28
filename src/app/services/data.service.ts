import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Exercise } from '../data/exercise';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  urlBase: string;
  masterList: Exercise[];
  exerciseList: object[];
  masterListLoaded: boolean;

  exerciseTime: number;
  restPeriod: number;
  numberOfSets: number;
  message: string;

  constructor(private httpClient: HttpClient, public router: Router, private audioService: AudioService) {
        this.exerciseList = [];
        this.masterList = [];
        this.exerciseTime = 60;
        this.restPeriod = 120;
        this.numberOfSets = 3;
    }

    loadExerciseList(){

        let url = '/assets/json/exercise-list.json';
        let params = new HttpParams();

        this.getJSONResponse(url, params).subscribe(response => {

        let responseBody = response['body'];
        
        if (responseBody === undefined) {
            this.message = 'Exercises not found.';
            return false;
        } 
        else {
            this.masterList = responseBody['exercises'] as Exercise[];
            //console.log("Exercises: " + JSON.stringify(this.masterList, null, 4));
            this.masterListLoaded = true;
            this.audioService.loadExerciseAudioAssets(this.masterList);
        }
        }, error => {
        //console.error(error['message']);
        this.message = error;
        });

    }

    getNextExercise(set:number, exercise:number):string {

        let nextExercise = '';
        let totalExercises = this.exerciseList.length;
        let totalSets = this.numberOfSets;

        //console.log("Total Exercises: " + totalExercises);
        //console.log("Current Exercises: " + exercise);
        //console.log("Total Sets: " + totalSets);
        //console.log("Current Sets: " + set);
        // If not last exercise return next
        
        if(exercise < totalExercises){
            nextExercise = this.exerciseList[exercise++]["name"];
        }
        else if(exercise === totalExercises && set < totalSets-1){
            nextExercise = this.exerciseList[0]["name"];
        }
        //console.log("Next Exercise: " + nextExercise);
        return nextExercise.replace(/\s/g, "");
    }

    getJSONResponse(url:string, httpParams:HttpParams): Observable<any> {
    
        return this.httpClient.get(url, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
                params: httpParams,
                observe: 'response'
            });
    }

    gotoExerciseSelection(){
        this.router.navigateByUrl('');
    }
}

