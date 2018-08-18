/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import 'nativescript-tslib';

import * as permissions from 'nativescript-permissions';
import * as application from 'tns-core-modules/application';
import { isAndroid } from 'tns-core-modules/ui/page/page';
import './bundle-config';

if (isAndroid) {
  class MyTriggerEventListener extends android.hardware['TriggerEventListener'] {
    public onTrigger(event) {
      console.log(event);
    }
  }

  application.on(application.launchEvent, async () => {
    // tslint:disable-next-line:no-console
    const sensorManager = application
      .getNativeApplication()
      .getSystemService(android.content.Context.SENSOR_SERVICE) as android.hardware.SensorManager;
    console.log(sensorManager);
    const sensor = sensorManager.getDefaultSensor(android.hardware.Sensor['TYPE_STEP_COUNTER']);
    try {
      Object.keys(android.Manifest.permission).forEach((key) => console.log(key, android.Manifest.permission[key]));

      // tslint:disable-next-line:no-string-literal
      const res = await permissions.requestPermissions([android.Manifest.permission['BODY_SENSORS']], 'Reasons');
      // tslint:disable-next-line:no-console
      console.log({ res });
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err);
    }
    (sensorManager as any).requestTriggerSensor(new MyTriggerEventListener(), sensor);
  });
}

application.run({ moduleName: 'app-root' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
