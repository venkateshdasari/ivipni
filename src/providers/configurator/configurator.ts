import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

/*
  Generated class for the Configurator provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Configurator {
  constructor() {}

  public logLevel = 1; // 1 - Errors, 2- Errors/Info , 3 - Error/Info/Debug
// public restServerBaseUrl = "http://paniniwin.cloudapp.net/ivipniQA/index.php?";
 public restServerBaseUrl = "http://kmartprod1298.cloudapp.net/ivipni/index.php?";
  public restServerControllerUrl = "route=restapi/restapi";
}
