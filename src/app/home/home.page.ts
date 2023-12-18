import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IsKeptAwakeResult,
  IsSupportedResult,
  KeepAwake,
} from '@capacitor-community/keep-awake';
import { BatteryInfo, Device } from '@capacitor/device';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  batteryInfo?: BatteryInfo;
  isKeptAwake?: IsKeptAwakeResult;
  keepAwakeSupported?: IsSupportedResult;

  testnumber = 0;

  interval: any;

  constructor() {}

  ngOnInit() {
    this.interval = setInterval(() => {
      this.checkInfo();
      this.testnumber += 1;
    }, 5000);
  }

  checkInfo() {
    Device.getBatteryInfo().then((info) => (this.batteryInfo = info));
    KeepAwake.isSupported().then((x) => (this.keepAwakeSupported = x));
    KeepAwake.isKeptAwake().then((x) => (this.isKeptAwake = x));
    console.log(this.batteryInfo, this.isKeptAwake, this.keepAwakeSupported);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
