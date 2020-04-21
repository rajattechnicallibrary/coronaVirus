import { Component, OnInit } from '@angular/core';
import { LocalServiceService } from '../local-service.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {

  constructor(
    private localservice: LocalServiceService
  ) { 
    clearInterval(this.localservice.clearTimeSet);

  }

  ngOnInit() {
  }

} 
