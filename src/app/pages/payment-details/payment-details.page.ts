import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from "@ionic/angular";
import { Users } from "../../../providers/commerce/users";


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {

  public myOrderDeliver = [];
  order_id;
  total;
  date_added;
  status;
  payment_method;
  twentyfiveamount;
  twentyfivetransaction_id;
  seventyfiveamount;
  seventyfivetransaction_id;
  seventyfivepayment_method;
  date;
  date_twentyfive;
  constructor(
    public navCtrl: NavController,
    public users: Users,
    public toastCtrl: ToastController,
    public navParams: NavParams
  ) {
    var _this = this;

    _this.order_id = _this.navParams.get("order_id");
    _this.date_added = _this.navParams.get("date_added");
    _this.total = _this.navParams.get("total");
    _this.status = _this.navParams.get("status");
    _this.twentyfiveamount = _this.navParams.get("twentyfiveamount");
    _this.payment_method = _this.navParams.get("payment_method");
    _this.twentyfivetransaction_id = _this.navParams.get(
      "twentyfivetransaction_id"
    );
    _this.seventyfiveamount = _this.navParams.get("seventyfiveamount");
    _this.seventyfivetransaction_id = _this.navParams.get(
      "seventyfivetransaction_id"
    );
    _this.seventyfivepayment_method = _this.navParams.get(
      "seventyfivepayment_method"
    );
    _this.date_twentyfive = _this.navParams.get("date_twentyfive");
    _this.date = _this.navParams.get("date");
  }
  ngOnInit() {
  }

}
