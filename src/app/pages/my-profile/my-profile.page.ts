import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from "@ionic/angular";
import { Products } from "../../../providers/commerce/products";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Logger } from "../../../providers/logger/logger";



@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  userDetails = [];

  constructor(
    public navCtrl: NavController,
    public productServices: Products,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public networkService: NetworkService,
    public logger: Logger
  ) {
    var _this = this;

    let loading = loadingCtrl.create({
      message: `<ion-spinner name="bubbles"></ion-spinner>`
    });

    if (_this.networkService.nullConnection()) {
      _this.networkService.showNetworkAlert();
    } else {
      loading.present();
      _this.userDetails = [];
      this.productServices.getUserDetails(function(data) {
        _this.logger.debug("checking my user Details" + data);
        _this.userDetails.push(data.data);
        _this.logger.debug("userDetails " + _this.userDetails);
        loading.dismiss();
      });
    }
  }

  ngOnInit() {
  }

}
