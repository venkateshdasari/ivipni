// all clear
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from "ionic-angular";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Products } from "../../../providers/commerce/products";
import { Logger } from "../../../providers/logger/logger";
import {PaymentremaindetailsPage } from "../paymentremaindetails/paymentremaindetails.page";


@Component({
  selector: 'app-paymentremain',
  templateUrl: './paymentremain.page.html',
  styleUrls: ['./paymentremain.page.scss'],
})
export class PaymentremainPage implements OnInit {

  public amount = [];
  amountremain;
  amountRemainCount = false;

  constructor(
    public navCtrl: NavController,
    public productServices: Products,
    public loadingCtrl: LoadingController,
    public networkService: NetworkService,
    public logger: Logger
  ) {
    var _this = this;

    let loading = loadingCtrl.create({
      content: `<ion-spinner name="bubbles"></ion-spinner>`
    });

    if (_this.networkService.nullConnection()) {
      _this.networkService.showNetworkAlert();
    } else {
      loading.present();
      _this.amount = [];
      this.productServices.getamountremain(function(data) {
        _this.logger.debug("checking  Details" + JSON.stringify(data));
        if (data.status == 1) {
          _this.logger.debug("checking  Details" + JSON.stringify(data));

          _this.amount = data.remain_amount;
          _this.amountremain =
            data.remain_amount.amount - data.remain_amount.twentyfiveamount;

          _this.logger.debug("payment " + JSON.stringify(_this.amount));
          loading.dismiss();
        } else {
          _this.amountRemainCount = true;
          _this.amount = [];
          loading.dismiss();
        }
      });
    }
  }

  paymentdetail(amounts) {
    var _this = this;
    _this.logger.debug("paymentremain " + JSON.stringify(amounts));
    _this.navCtrl.push(PaymentremaindetailsPage, amounts);
  }
  ngOnInit() {
  }

}
