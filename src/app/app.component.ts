import { Component } from '@angular/core';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-dragdrop-module';
  numbers: number[] = [];
  otherNumbers: number[] = [];

  // create list of numbers
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.numbers.push(i);
    }
  }
  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.numbers, event.previousIndex, event.currentIndex);
    }

  }
}
