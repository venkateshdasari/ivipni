import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from "@ionic/angular";
import { Users } from "../../../providers/commerce/users";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  public myOrderDeliver = [];
  productsArray = [];
  order_id;
  total;
  date_added;
  name;
  model;
  firstname;
  lastname;
  payment_address_2;
  payment_city;
  payment_country;
  payment_zone;
  payment_method;
  payment_address_1;
  payment_postcode;
  payment_company;
  email;
  telephone;
  toastMessage;
  postcode;
  orderTotals = [];
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
    _this.payment_method = _this.navParams.get("payment_method");
    _this.productsArray = _this.navParams.get("products");
    _this.firstname = _this.navParams.get("firstname");
    _this.lastname = _this.navParams.get("lastname");
    _this.payment_address_2 = _this.navParams.get("payment_address_2");
    _this.payment_city = _this.navParams.get("payment_city");
    _this.payment_zone = _this.navParams.get("payment_zone");
    _this.payment_country = _this.navParams.get("payment_country");
    _this.payment_method = _this.navParams.get("payment_method");
    _this.payment_address_1 = _this.navParams.get("payment_address_1");
    _this.payment_company = _this.navParams.get("payment_company");
    _this.email = _this.navParams.get("email");
    _this.telephone = _this.navParams.get("telephone");
    _this.payment_postcode = _this.navParams.get("payment_postcode");
    _this.name = _this.navParams.get("name");
    _this.postcode = _this.navParams.get("postcode");
    _this.orderTotals = _this.navParams.get("totals");
  }
  
  addToCart(order_id) {
    var _this = this;
    let addProduct;

    addProduct = {
      order_id: this.order_id
    };

    _this.users.orderToCart(addProduct, function(result, data) {
      if (result == "1") {
        _this.toastMessage = "Products added to cart";
        _this.presentToast();
      } else {
        this.networkService.showErrorAlert();
      }
    });
  }

 async presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: 1000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
    });

   (await toast).present();
  }

  ngOnInit() {
  }

}
