import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalServiceService } from '../local-service.service';
import { Chart } from 'chart.js';
import * as moment from "moment";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  @ViewChild('barChartIndia', { static: true }) barChartIndia: any;
  @ViewChild('barChartWorld', { static: true }) barChartWorld: any;

  typeofChart = 'pie'
  bars: any;
  colorArray: any;
  countryData: any;
  getWorldData: any;
  limitCounter: number;
  finalDate = moment().format('DD-MM-YYYY');
  clearTimeSet;
  constructor(private activatedRoute: ActivatedRoute, private localservice: LocalServiceService) { }

  ngOnInit() {
    this.loadPage()

  }

  loadPage() {
    this.localservice.presentLoading();
    var latestDate = moment().subtract(1, 'd');
    var date = latestDate.utc().toISOString();
    this.localservice.covidDataIndia('https://api.covid19api.com/live/country/india/status/confirmed/date/' + date).subscribe((e: any) => {
      this.localservice.setIndiaData(e[0]);
      console.log(e[0])
    })
    this.localservice.covidDataIndia('https://api.covid19api.com/summary').subscribe((e: any) => {
      this.localservice.setWorldData(e.Global)
    })
    setTimeout(() => {
      this.countryData = this.localservice.getIndiaData();
      this.getWorldData = this.localservice.getWorldData();
      this.createBarChart();
    }, 7000);


  }

  autoTimer() {
    var counter = 3600  ;
    let self = this
    this.localservice.clearTimeSet = setInterval(function () {
      let finalval = Math.round(counter / 60)
      counter--
      self.limitCounter = finalval;
      console.log(finalval);

      if (finalval === 0) {
        self.loadPage()
        clearInterval(self.localservice.clearTimeSet);
      }
    }, 14); 
  } 
  refresher() {
    this.createBarChart(); 
  }

  createBarChart() {
   
    this.localservice.loading.dismiss();
    this.autoTimer()
    this.bars = new Chart(this.barChartIndia.nativeElement, {
      type: this.typeofChart,
      options: {
        scales: {
          yAxes: [{
            stacked: true,
          }]
        },


      },

      data: {
        labels: ["Confirmed - "+this.countryData.Confirmed, "Deaths - "+this.countryData.Deaths, "Recovered - "+this.countryData.Recovered],

        datasets: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          label: 'Confirmed, Deaths, Recovered',
          data: [this.countryData.Confirmed, this.countryData.Deaths, this.countryData.Recovered],
          backgroundColor: ['#ff3399', 'black', '#8cff1a'], // array should have same number of elements as number of dataset
          borderColor: ['#ff3399', 'black', '#8cff1a'],// array should have same number of elements as number of dataset
          borderWidth: 5
        }]
      }
    });
    this.bars = new Chart(this.barChartWorld.nativeElement, {
      type: this.typeofChart,
      options: {
        scales: {
          yAxes: [{
            stacked: true
          }]
        },
        title: {
          display: true,
          //text: 'Custom Chart Title'
        }
      }, 

      data: {
        labels: ["TotalConfirmed - " +this.getWorldData.TotalConfirmed, "TotalDeaths - "+this.getWorldData.TotalDeaths, "TotalRecovered - " + this.getWorldData.TotalRecovered],
        datasets: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          label: 'Confirmed, Deaths, Recovered',
          data: [this.getWorldData.TotalConfirmed, this.getWorldData.TotalDeaths, this.getWorldData.TotalRecovered],
          backgroundColor: ['#ff3399', 'black', '#8cff1a'], // array should have same number of elements as number of dataset
          borderColor: ['#ff3399', 'black', '#8cff1a'],// array should have same number of elements as number of dataset
          borderWidth: 5
        }]
      }
    });
  }


}
