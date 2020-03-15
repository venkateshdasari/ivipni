import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from "@ionic/angular";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Products } from "../../../providers/commerce/products";
import { PlaceOrderPage } from "../place-order/place-order.page"
import { CheckoutPage } from "../checkout/checkout.page";
import { Users } from "../../../providers/commerce/users";
import { Logger } from "../../../providers/logger/logger";


@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  public checkOutAddr = [];
  checkOutAddrss = [];

  cartArray = [];
  cartTotal;
  allTotal;

  firstIndex = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productServices: Products,
    public users: Users,
    public loadingCtrl: LoadingController,
    public networkService: NetworkService,
    public logger: Logger
  ) {
    var _this = this;
    _this.cartArray = _this.navParams.get("cartData");
    _this.cartTotal = _this.navParams.get("cartTotal");
    _this.allTotal = _this.navParams.get("allTotal");
    _this.logger.debug("cartTotal data " + _this.cartTotal);

    _this.logger.debug("cartArray data " + _this.cartArray);
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    var _this = this;
    _this.logger.info("invoking ionviewDidEnter for address");

    let loading = await _this.loadingCtrl.create({
      message:`<ion-spinner name="bubbles"></ion-spinner>`
    });

    if (_this.networkService.nullConnection()) {
      _this.networkService.showNetworkAlert();
    } else {
      loading.present();
      this.productServices.getAddress(function(data) {
        _this.logger.debug(
          "checking Array in check out address details" + JSON.stringify(data)
        );
        _this.checkOutAddrss = data.orders;

        if (_this.firstIndex.length == 0) {
          _this.firstIndex.push(data.orders[0]);
        }

        _this.logger.debug("firstIndex" + JSON.stringify(_this.firstIndex));

        if (_this.checkOutAddrss.length > 1) {
          for (var i = 1; i < _this.checkOutAddrss.length; i++) {
            _this.checkOutAddr.push(_this.checkOutAddrss[i]);
          }
        }

        _this.logger.debug(
          "remainingIndex:" + JSON.stringify(_this.checkOutAddr)
        );
        loading.dismiss();
      });
    }
  }


}
