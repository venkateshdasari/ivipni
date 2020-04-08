import { Component, OnInit } from "@angular/core";
import {
  NavController,
  LoadingController,
  Platform,
  ToastController,
} from "ionic-angular";
import { Users } from "../../../providers/commerce/users";
import { LoginPage } from "../login/login.page";
import { Logger } from "../../../providers/logger/logger";
import { Holders } from "../../../providers/holders/holders";

declare var window;
declare var cordova;
@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"],
})
export class ForgotPasswordPage implements OnInit {
  public loginId = "";
  public otp = "";

  otpNumber: any;
  text;
  customer_id;
  access_token;
  email: boolean = true;
  emailButton1: boolean = true;
  emailButton2: boolean = false;
  newpassword;
  conformPassword;
  toastMessage: string;
  secondDiv: boolean = false;

  constructor(
    // public navCtrl: NavController,
    public user: Users,
  // public toastCtrl: ToastController,
  public platform: Platform,
  // public logger: Logger,
  // public holders: Holders,
  // public loadingCtrl: LoadingController
  )
  {}

  ngOnInit() {}

  validateOTP() {
    this.user.validateOTP(this.otp, this.loginId, (result, data, id) => {
      if (result == "1") {
        this.access_token = id;
        this.email = false;
        this.emailButton2 = false;
        this.secondDiv = true;
        // this.logger.debug("checking access tocken " + this.access_token);
      } else {
        // this.logger.error("error of otp" + data);
        this.emailButton2 = true;
        this.emailButton1 = false;
        alert("Please enter correct OTP");
      }
    });
  }
}
