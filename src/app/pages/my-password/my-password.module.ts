import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPasswordPageRoutingModule } from './my-password-routing.module';

import { MyPasswordPage } from './my-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPasswordPageRoutingModule
  ],
  declarations: [MyPasswordPage]
})
export class MyPasswordPageModule {}
