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
    public navCtrl: NavController,
    public user: Users,
    public toastCtrl: ToastController,
    public platform: Platform,
    public logger: Logger,
    public holders: Holders,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad OtpPage");
    var permissions = cordova.plugins.permissions;
    var errorCallback = () => {
      this.holders.showSuccessAlert("READ_SMS permission is not turned on");
    };
    permissions.requestPermission(
      permissions.READ_SMS,
      (status) => {
        console.log("vidya1" + JSON.stringify(status));
        // if(!status.hasPermission) {
        //   console.log("vidya"+JSON.stringify(status));
        //   errorCallback();
        // }
        // else{
        //    console.log("vidya2"+JSON.stringify(status));
        //   this.getSMS();
        // }
      },
      errorCallback
    );
    console.log("permissions" + permissions);
  }

  generateOTP() {
    this.logger.info("invoking generateOTP FN");

    this.user.generateOTP(this.loginId, (result, data, id) => {
      if (result == "1") {
        this.logger.debug(
          "checking the data for generateotp " + JSON.stringify(data)
        );

        this.customer_id = id;

        this.logger.debug("checking the customerid " + this.customer_id);
        this.emailButton2 = false;
        this.emailButton1 = true;
        if (this.platform.is("android")) {
          // //setting the permission for android above 6.0
          this.holders.presentLoadingCustom();

          setTimeout(() => {
            this.holders.dissmissLoadingCustom();
            this.platform.ready().then(() => {
              var permissions = cordova.plugins.permissions;
              permissions.checkPermission(
                permissions.READ_SMS,
                checkPermissionCallback,
                null
              );
              this.getSMS();
              function checkPermissionCallback(status) {
                console.log("checking first " + JSON.stringify(status));
                if (!status.hasPermission) {
                  console.log("invoking the if state");
                  var errorCallback = () => {
                    this.holders.showSuccessAlert(
                      "READ_SMS permission is not turned on"
                    );
                  };
                  permissions.requestPermission(
                    permissions.READ_SMS,
                    (status) => {
                      console.log(status);
                      if (!status.hasPermission) {
                        errorCallback();
                      } else {
                        this.getSMS();
                      }
                    },

                    errorCallback
                  );
                }
              }
            });
          }, 10000);
        } else {
          console.log("it is not cordova");
        }
      } else {
        alert(data);
      }
    });
  }
  validateOTP() {
    this.user.validateOTP(this.otp, this.loginId, (result, data, id) => {
      if (result == "1") {
        this.access_token = id;
        this.email = false;
        this.emailButton2 = false;
        this.secondDiv = true;
        this.logger.debug("checking access tocken " + this.access_token);
      } else {
        this.logger.error("error of otp" + data);
        this.emailButton2 = true;
        this.emailButton1 = false;
        alert("Please enter correct OTP");
      }
    });
  }

  getSMS() {
    var filter = {
      box: "inbox", // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

      // following 4 filters should NOT be used together, they are OR relationship
      read: 0, // 0 for unread SMS, 1 for SMS already read
      // _id : 1234, // specify the msg id

      //address : 'IM-WAYSMS', // sender's phone number
      // body : 'This is a test SMS', // content to match

      // following 2 filters can be used to list page up/down
      indexFrom: 0, // start from index 0
      maxCount: 10, // count of SMS to return each time
    };

    this.logger.debug("getSms" + JSON.stringify(filter));

    if (window.SMS)
      window.SMS.listSMS(
        filter,
        (data) => {
          //Filterd Data
          this.logger.debug("checking the filter data " + JSON.stringify(data));

          for (var i = 0; i < data.length; i++) {
            this.logger.debug("checking");

            if (data[i].address.substr(3, 7) == "VIPNI") {
              this.logger.debug(
                "checking the text of adress " + data[i].address.substr(3, 7)
              );
              this.text = data[i].body;
              this.logger.debug("checking the text " + this.text);
              this.otpNumber = this.text.substring(
                Number(this.text.indexOf("'")) + Number(1),
                Number(this.text.lastIndexOf("'"))
              );
              this.logger.debug("checking the otpNumber " + this.otpNumber);
              break;
            }
            console.log("Vidya" + this.otpNumber);
          }

          if (this.otpNumber) {
            this.user.validateOTP(
              this.otpNumber,
              this.loginId,
              (result, data, id) => {
                if (result == "1") {
                  this.access_token = id;
                  this.email = false;
                  this.emailButton1 = false;
                  this.emailButton2 = false;
                  this.secondDiv = true;
                  this.logger.debug(
                    "checking access tocken " + this.access_token
                  );
                } else {
                  this.logger.error("error of otp" + data);
                  this.email = false;
                  this.emailButton2 = true;
                }
              }
            );
          } else {
            this.logger.info("no otpnumber");
            this.email = false;
            this.emailButton2 = true;
          }
        },
        (err) => {
          this.logger.debug("checking the err " + JSON.stringify(err));
        }
      );
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: 1000,
      position: "middle",
    });

    toast.onDidDismiss(() => {
      this.logger.info("Dismissed toast");
    });
    toast.present();
  }

  changePassword() {
    var _this = this;
    var newPassword = {
      user_id: _this.customer_id,
      access_token: _this.access_token,
      password: _this.newpassword,
    };
    _this.logger.debug("checking newPassword " + JSON.stringify(newPassword));
    if (_this.newpassword === _this.conformPassword) {
      //     let loading = _this.loadingCtrl.create({
      //  content: `<ion-spinner name="bubbles"></ion-spinner>`
      //  });
      this.user.newPassword(newPassword, (result, data) => {
        if (result == "1") {
          _this.logger.debug("success callback of the new password");

          _this.toastMessage = "Password changed successfully";
          // _this.holders.dissmissLoadingCustom();

          _this.presentToast();

          // loading.dismiss();
          _this.navCtrl.setRoot(LoginPage, {});
        } else {
          _this.logger.error("error of otp " + data);
        }
      });
    } else {
      _this.logger.debug("check your password");
      _this.toastMessage = "Password and re-enter password should be same";
      _this.presentToast();
    }
  }
}
