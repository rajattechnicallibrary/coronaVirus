import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalServiceService {

  constructor(private http: HTTP) {
    this.http.get('https://pomber.github.io/covid19/timeseries.json', {}, {})
      .then(data => {

        console.log(data)

      })
      .catch(error => {

        console.log(error);

      });
  }
}
