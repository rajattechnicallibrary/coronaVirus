import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocalServiceService {

  IndiaLevelData: any;
  WorldLevelData: any;
  loading: any
  limitCounter: number;
  clearTimeSet
  version:any = '1.2.0'
  constructor(
    // private http: HTTP,
    public http: HttpClient,
    public loadingController: LoadingController
  ) {
    // this.presentLoading();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 80000
    });
    await this.loading.present();
  }


  getIndiaData() {
    return this.IndiaLevelData;
  }

  setIndiaData(data) {
    this.IndiaLevelData = data;
  }

  setclearTimeSet(data) {
    this.clearTimeSet = data;
  }

  getWorldData() {
    return this.WorldLevelData;
  }

  setWorldData(data) {

    this.WorldLevelData = data;
  }



  covidDataIndia(urlAction) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
      })
    };

    return this.http
      .get(urlAction, httpOptions)
      .pipe();
  }

  autoTimer() {
    let res: boolean = false
    var counter = 360;
    let self = this
    var i = setInterval(function () {
      let finalval = Math.round(counter / 60)
      counter--;
      self.limitCounter = finalval;
      console.log(finalval);

      if (finalval == 0) {
        clearInterval(i);
        return "true";
      }
    }, 14);
    return "false";
  }
}
