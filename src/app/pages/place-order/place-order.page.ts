import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from "@ionic/angular";
import { PaymentPage } from "../payment/payment.page";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.page.html',
  styleUrls: ['./place-order.page.scss'],
})
export class PlaceOrderPage implements OnInit {

  dataArray = [];
  email;
  telephone;
  address_id;
  customer_id;
  firstname;
  lastname;
  company;
  address_1;
  address_2;
  city;
  postcode;
  zone_id;
  name;
  cartTotal;
  allTotal = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.email = this.navParams.get("email");
    this.telephone = this.navParams.get("telephone");
    this.address_id = this.navParams.get("address_id");
    this.customer_id = this.navParams.get("customer_id");
    this.firstname = this.navParams.get("firstname");
    this.lastname = this.navParams.get("lastname");
    this.company = this.navParams.get("company");
    this.address_1 = this.navParams.get("address_1");
    this.address_2 = this.navParams.get("address_2");
    this.city = this.navParams.get("city");
    this.postcode = this.navParams.get("postcode");
    this.zone_id = this.navParams.get("zone_id");
    this.name = this.navParams.get("name");
    this.dataArray = this.navParams.get("dataArray");
    this.cartTotal = this.navParams.get("cartTotal");
    this.allTotal = this.navParams.get("allTotal");
  }

  pay() {
    console.log("vidyaplaceObj"+JSON.stringify(this.dataArray));
    let placeObj = {
      dataArray: this.dataArray,
      email: this.email,
      telephone: this.telephone,
      address_id: this.address_id,
      customer_id: this.customer_id,
      firstname: this.firstname,
      lastname: this.lastname,
      company: this.company,
      address_1: this.address_1,
      address_2: this.address_2,
      city: this.city,
      postcode: this.postcode,
      zone_id: this.zone_id,
      name: this.name,
      cartTotal: this.cartTotal,
      allTotal: this.allTotal
    };

    this.navCtrl.push(PaymentPage, placeObj);
    
  }

  ngOnInit() {
  }

}
