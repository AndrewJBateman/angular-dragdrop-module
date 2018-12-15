import { Component } from '@angular/core';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dragdrop-module';
  numbers: number[] = [];

  constructor() {
    for(let i=0; i<10000; i++) {
      this.numbers.push(i);

    }
  }
}
