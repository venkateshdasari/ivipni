// all clear
import { Component, OnInit } from '@angular/core';
import { NavController } from "ionic-angular";
import { FormBuilder, Validators } from "@angular/forms";
import { Users } from "../../../providers/commerce/users";
import { ToastController } from "ionic-angular";
import { AccountPage } from "../account/account.page";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Logger } from "../../../providers/logger/logger";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-my-password',
  templateUrl: './my-password.page.html',
  styleUrls: ['./my-password.page.scss'],
})
export class MyPasswordPage implements OnInit {

  oldPasswd;
  newPasswd;
  rePasswd;
  public passwordForm: any;
  constructor(
    public navCtrl: NavController,
    public users: Users,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public networkService: NetworkService,
    public logger: Logger,
     public storage: Storage
  ) {
    this.passwordForm = formBuilder.group({
      oldpassword: ["", Validators.required],
      newpassword: [
        "",
        Validators.compose([Validators.required, Validators.minLength(4)])
      ],
      repassword: ["", Validators.required]
    });
  }
  submit() {
    let _this = this;
    if (!this.passwordForm.valid) {
      let toast = this.toastCtrl.create({
        message: "Enter all required feilds"
      });
      toast.present();
    } else {
      let changeDetails = _this.passwordForm.value;
      console.log(changeDetails);
      console.log(changeDetails.newpassword);
      console.log(changeDetails.reenterpassword);

      let passwordDetail = {
        oldpassword: changeDetails.oldpassword,
        password: changeDetails.newpassword
      };

      if (changeDetails.newpassword == changeDetails.repassword) {
        console.log(changeDetails.newpassword);
        if (changeDetails.oldpassword != changeDetails.newpassword) {
          this.users.changePassword(passwordDetail, function(result, data) {
            if (result == "1") {
               _this.storage.set("passwd",changeDetails.repassword);
              _this.networkService.showSuccessAlert(
                "sucess " + data.toString()
              );
              _this.navCtrl.push(AccountPage, {});
            } else {
              _this.networkService.showSuccessAlert(" Old password is wrong");
            }
          });
        } else {
          _this.networkService.showSuccessAlert(
            "failure call for old and new "
          );
        }
      } else {
        changeDetails.repassword;
        _this.networkService.showSuccessAlert("password mismatch please check");
      }
    }
  }

  ngOnInit() {
  }

}
