import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Exercise } from '../data/exercise';

interface Sound {
  key: string;
  asset: string;
  isNative: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private sounds: Sound[] = [];
  private audioPlayer: HTMLAudioElement = new Audio();
  private forceWebAudio: boolean = true;
  
  constructor(private platform: Platform, private nativeAudio: NativeAudio){

  }

  preload(key: string, asset: string): void {

    if(this.platform.is('cordova') && !this.forceWebAudio){

      this.nativeAudio.preloadSimple(key, asset);

      this.sounds.push({
        key: key,
        asset: asset,
        isNative: true
      });

    } else {

      let audio = new Audio();
      audio.src = asset;

      this.sounds.push({
        key: key,
        asset: asset,
        isNative: false
      });

    }

  }

  preloadStaticAudioAssets() {
    //console.log("Preloading Audio Assets...");
    this.preload('one', 'assets/audio/one.wav');
    this.preload('two', 'assets/audio/two.wav');
    this.preload('three', 'assets/audio/three.wav');
    this.preload('go', 'assets/audio/go.wav');
    this.preload('rest', 'assets/audio/rest.wav');
    this.preload('321go', 'assets/audio/321go.wav');
    this.preload('getready', 'assets/audio/getready.wav');
    this.preload('stopandrest', 'assets/audio/stopandrest.wav');
    this.preload('upnext', 'assets/audio/upnext.wav');
    this.preload('begin', 'assets/audio/begin.wav');
  }

  loadExerciseAudioAssets(masterList: Exercise[]){
    for(let exercise of masterList){
        let audioName = exercise.name.replace(/\s/g, "");
        //console.log("Preloading: " + audioName);
        this.preload(audioName, exercise.audio);
    }
  }

  play(key: string): void {

    let soundToPlay = this.sounds.find((sound) => {
      return sound.key === key;
    });

    if(soundToPlay.isNative){

      this.nativeAudio.play(soundToPlay.asset).then((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });

    } else {

      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play();

    }

  }

}