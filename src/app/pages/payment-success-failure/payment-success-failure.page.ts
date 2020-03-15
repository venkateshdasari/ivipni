import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from "@ionic/angular";
import { Products } from "../../../providers/commerce/products";
import { NetworkService } from "../../../providers/network-service/network-service";
import { PaymentDetailsPage } from "../payment-details/payment-details.page";
import { Logger } from "../../../providers/logger/logger";


@Component({
  selector: 'app-payment-success-failure',
  templateUrl: './payment-success-failure.page.html',
  styleUrls: ['./payment-success-failure.page.scss'],
})
export class PaymentSuccessFailurePage implements OnInit {

  public paymentSuccessFailure = [];
  public paymentSuccess: boolean;
  public paymentFailure: boolean;
  paymentSuccessFailureCount = false;

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
      this.productServices.getPayment(function(data) {
        _this.paymentSuccessFailure = data.data.orders;

        _this.logger.info(
          "payment object" + JSON.stringify(_this.paymentSuccessFailure)
        );
        if (data.status == "1") {
          _this.paymentSuccess = true;
          _this.paymentFailure = false;
          loading.dismiss();
        } else {
          _this.paymentSuccessFailureCount = true;
          _this.paymentSuccess = false;
          _this.paymentFailure = true;
          loading.dismiss();
        }
      });
    }
  }
  paymentdetail(payment) {
    var _this = this;
    _this.navCtrl.push(PaymentDetailsPage, payment);
  }

  ngOnInit() {
  }

}
