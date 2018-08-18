/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import "nativescript-tslib";

import * as permissions from "nativescript-permissions";
import * as application from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/ui/page/page";
import "./bundle-config";

if (isAndroid) {
  application.on(application.launchEvent, async () => {
    // tslint:disable-next-line:no-console
    console.log(application.getNativeApplication());
    try {
      // tslint:disable-next-line:no-string-literal
      const res = await permissions.requestPermission(android.Manifest.permission["BODY_SENSORS"], "Reasons");
      // tslint:disable-next-line:no-console
      console.log(res);
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
  });
}

application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
