// all clear
import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { MyOrderPage } from "../my-order/my-order.page";
import { MyPasswordPage } from "../my-password/my-password.page";
import { MyProfilePage } from "../my-profile/my-profile.page";
import { NotificationPage } from "../notification/notification.page";
import { Logger } from "../../../providers/logger/logger";

import { PaymentSuccessFailurePage } from "../payment-success-failure/payment-success-failure.page";


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(public navCtrl: NavController, public logger: Logger) { }

  ngOnInit() {
  }

  myprofile() {
    this.logger.info("invoking MyProfilePage page");
    this.navCtrl.push(MyProfilePage, {});
  }
  myOrder() {
    this.logger.info("invoking myOrder page");
    this.navCtrl.push(MyOrderPage, {});
  }

  paymentSuccessFailure() {
    this.logger.info("invoking paymentSuccessFailure page");
    this.navCtrl.push(PaymentSuccessFailurePage, {});
  }

  changePasswd() {
    this.logger.info("invoking changePasswd page");
    this.navCtrl.push(MyPasswordPage, {});
  }

  notification() {
    this.navCtrl.push(NotificationPage, {});
  }

}
