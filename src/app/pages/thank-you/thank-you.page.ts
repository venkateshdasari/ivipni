import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from "@ionic/angular";
import { HomePage } from "../../home/home.page";
import { PaymentPage } from "../payment/payment.page";


@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {

  pay;
  data;
  result;
  public orderSuccess: boolean = false;
  public orderFailure: boolean = false;
  name;
  order_id;
  date;
  cartTotal;
  paymentMethod;
  dataArray = [];
  allTotal = [];
  firstname;
  lastname;
  address_1;
  address_2;
  company;
  email;
  telephone;
  city;
  postcode;
  firsttermamount;
  totalamount;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var _this = this;
    _this.pay = _this.navParams.get("pay");
    _this.data = _this.navParams.get("data");

    var _dataObj = JSON.parse(_this.data);
    _this.date = new Date();
    _this.order_id = _dataObj.order_id;
    _this.cartTotal = _this.pay.cartTotal;
    _this.paymentMethod = _this.pay.paymentMethod;
    _this.firsttermamount = _this.pay.firsttermamount;
    _this.dataArray = _this.pay.dataArray;
    _this.allTotal = _this.pay.totals;
    if(_this.paymentMethod == "Bank Transfer"){
    _this.totalamount = (_this.pay.cartTotal),(_this.firstname =
      _this.pay.firstname);
    }else{
 _this.totalamount = (_this.pay.firsttermamount),(_this.firstname =
      _this.pay.firstname);
    }
     
    _this.lastname = _this.pay.lastname;
    _this.address_1 = _this.pay.address_1;
    _this.address_2 = _this.pay.address_2;
    _this.company = _this.pay.company;
    _this.postcode = _this.pay.postcode;
    _this.city = _this.pay.city;
    _this.name = _this.pay.name;
    _this.email = _this.pay.email;
    _this.telephone = _this.pay.telephone;

    if (_dataObj.order_id) {
      _this.orderSuccess = true;
    } else {
      _this.orderFailure = true;
    }
  }

  submit() {
    this.navCtrl.setRoot(HomePage, {});
  }
  notSubmit() {
    this.navCtrl.push(PaymentPage, {});
  }

  ngOnInit() {
  }

}
