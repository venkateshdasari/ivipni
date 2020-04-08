// all clear
import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Users } from "../../../providers/commerce/users";
import { Rest } from "../../../providers/network/rest";
import { HomePage } from "../../home/home.page";
import { ForgotPasswordPage } from "../forgot-password/forgot-password.page";
import { RegistrationPage } from "../registration/registration.page";
import { Holders } from "../../../providers/holders/holders";
import { Logger } from "../../../providers/logger/logger";
import { Router } from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: any;
  public loginMsg = "";
  public loginId = "";
  public passwd = "";
  deviceToken: string;
  myForm: FormGroup;

  constructor(
    // public navCtrl: NavController,
    // public rest: Rest,
    // public holders: Holders,
    // public loadingCtrl: LoadingController,
    // public user: Users,
    // public formBuilder: FormBuilder,
    // public logger: Logger,
    // public storage: Storage,
    public router : Router,
  ) { 
    // this.deviceToken = this.holders.getDeviceToken();

    
  }
  forgotPasswd() {
    return this.router.navigateByUrl("/forgot-password");
  }

  registration() {
    return this.router.navigateByUrl("/registration");
  }

  ngOnInit() {
  }

}
