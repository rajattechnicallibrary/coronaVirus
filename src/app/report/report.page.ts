import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalServiceService } from '../local-service.service';
import * as moment from "moment";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {

  randomData;
  typeofChart = 'pie'
  bars: any;
  colorArray: any;
  countryData: any;
  getWorldData: any;
  limitCounter: number;
  defaultCountry;
  @ViewChild('barChartIndia', { static: true }) barChartIndia: any;

  constructor(private localservice: LocalServiceService) { }

  ngOnInit() {
    this.localservice.presentLoading()
    clearInterval(this.localservice.clearTimeSet);
    this.loadPage() 
  }

  loadPage() {
    this.localservice.covidDataIndia('https://api.covid19api.com/countries').subscribe((e: any) => {
      this.randomData = e;
      // this.localservice.loading.dismiss();

      console.log(e)
    })
    this.onChange('india')
  }

  onChange(val) {
    console.log(val);

    if (val == 'india') {
      this.defaultCountry = 'india';
    } else {
      this.defaultCountry = val.target.value;
    }
    // console.log(val.target.value)
    var latestDate = moment().subtract(1, 'd');
    var date = latestDate.utc().toISOString();
    this.localservice.covidDataIndia('https://api.covid19api.com/live/country/' + this.defaultCountry + '/status/confirmed/date/' + date).subscribe((e: any) => {
      this.countryData = e[e.length - 1]
      this.createBarChart();
      console.log(e.length - 1)
    })
  }



  createBarChart() {
    this.localservice.loading.dismiss();
    // this.autoTimer()
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
        labels: ["Confirmed - " + this.countryData.Confirmed, "Deaths - " + this.countryData.Deaths, "Recovered - " + this.countryData.Recovered],

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

  }



}
