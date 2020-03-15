// all clear
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from "ionic-angular";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Products } from "../../../providers/commerce/products";
import { OrderDetailsPage } from "../order-details/order-details.page";
import { Logger } from "../../../providers/logger/logger";


@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  public myOrder = [];
  myOrderCount = false;

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
      _this.myOrder = [];
      this.productServices.getOrders(function(data) {
        _this.logger.debug("checking my order Details" + data);
        if (data.status == 1) {
          _this.myOrder = data.data.orders;
          _this.logger.debug("myorder " + JSON.stringify(_this.myOrder));
          loading.dismiss();
        } else {
          _this.myOrderCount = true;
          loading.dismiss();
        }
      });
    }
  }

  orderdetail(order) {
    var _this = this;
    _this.logger.debug("order " + JSON.stringify(order));
    console.log("orderdata"+ JSON.stringify(order));
    _this.navCtrl.push(OrderDetailsPage, order);
  }
  ngOnInit() {
  }

}
