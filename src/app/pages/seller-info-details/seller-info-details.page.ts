import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from "@ionic/angular";
import { Users } from "../../../providers/commerce/users";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Logger } from "../../../providers/logger/logger";

@Component({
  selector: 'app-seller-info-details',
  templateUrl: './seller-info-details.page.html',
  styleUrls: ['./seller-info-details.page.scss'],
})
export class SellerInfoDetailsPage implements OnInit {

  firstname;
  lastname;
  company_name;
  email_id;
  phonenumber;
  profile_image;
  gst_image;
  pan_image;
  firstname1;
  lastname1;
  addressline1;
  addressline2;
  city1;
  state1;
  postcode1;
  toastMessage;
  sellerinfo = true;
  gstimagefile = false;
  pancardfile = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public users: Users,
    public toastCtrl: ToastController,
    public networkService: NetworkService,
    public logger: Logger
  ) {
    var _this = this;
    _this.firstname = _this.navParams.get("firstname");
    _this.lastname = _this.navParams.get("lastname");
    _this.company_name = _this.navParams.get("company_name");
    _this.email_id = _this.navParams.get("email_id");
    _this.phonenumber = _this.navParams.get("phonenumber");
    _this.profile_image = _this.navParams.get("profile_image");
    _this.gst_image = _this.navParams.get("gst_image");
    _this.pan_image = _this.navParams.get("pan_image");
    _this.firstname1 = _this.navParams.get("firstname1");
    _this.lastname1 = _this.navParams.get("lastname1");
    _this.addressline1 = _this.navParams.get("addressline1");
    _this.addressline2 = _this.navParams.get("addressline2");
    _this.state1 = _this.navParams.get("state1");
    _this.city1 = _this.navParams.get("city1");
    _this.postcode1 = _this.navParams.get("postcode1");
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: 1000,
      position: "middle"
    });

    toast.onDidDismiss(() => {
      this.logger.info("Dismissed toast");
    });

    toast.present();
  }

  ngOnInit() {
  }

}
