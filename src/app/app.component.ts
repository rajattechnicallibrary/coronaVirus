import { Component, OnInit } from '@angular/core';

import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
// import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Dashboard',
      url: 'folder/Inbox',
      icon: 'nuclear'
    },
    {
      title: 'Country Wise',
      url: 'report',
      icon: 'paper-plane' 
    }
    ,
    // {
    //   title: 'Assessment',
    //   url: 'assessment',
    //   icon: 'analytics'
    // },
    
    {
      title: 'About Us',
      url: 'aboutus',
      icon: 'information-circle'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public navCtrl: NavController,
    public toastController: ToastController,
    // private oneSignal: OneSignal



  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };
      // this.oneSignal.startInit('d7c3c07c-c88a-426e-89a3-ed6dbc20085e', '653410139399');
      // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);


      // window["plugins"].OneSignal
      //   .startInit("d7c3c07c-c88a-426e-89a3-ed6dbc20085e", "653410139399")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();

      this.statusBar.backgroundColorByHexString("#ff3399");
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
    this.backButtonEvent();
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logOut() {
    navigator['app'].exitApp();
  }

  backButtonEvent() {
    var dualCounter = 0;
    this.platform.backButton.subscribe(async () => {
      dualCounter++;
      const toast = await this.toastController.create({
        message: 'Press again to exit app.',
        duration: 2222
      });
      toast.present();
      console.log(dualCounter);
      if (dualCounter == 2) {
        navigator['app'].exitApp();
      }
    });

  }

}
