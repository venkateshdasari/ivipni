import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from "@ionic/angular";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Products } from "../../../providers/commerce/products";
import { Logger } from "../../../providers/logger/logger";
import { SellerInfoDetailsPage } from "../seller-info-details/seller-info-details.page";


@Component({
  selector: 'app-seller-info',
  templateUrl: './seller-info.page.html',
  styleUrls: ['./seller-info.page.scss'],
})
export class SellerInfoPage implements OnInit {

  public sellerinfo = [];

  constructor(
    public navCtrl: NavController,
    public productServices: Products,
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
      _this.sellerinfo = [];
      _this.productServices.getSellerDetails(function(data) {
        _this.logger.debug("checking my order Details" + data);
        if (data.status == 1) {
          _this.sellerinfo = data.seller_details;
          _this.logger.debug("myorder " + JSON.stringify(_this.sellerinfo));
          loading.dismiss();
        } else {
          loading.dismiss();
        }
      });
    }
  }

  orderdetail(seller) {
    var _this = this;
    _this.logger.debug("seller info " + JSON.stringify(seller));
    _this.navCtrl.push(SellerInfoDetailsPage, seller);
  }

  ngOnInit() {
  }

}
