import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragEnter,
  CdkDragExit,
  CdkDrag,
  CdkDropList,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "angular drag & drop";
  numbers: number[] = [];
  otherNumbers: number[] = [];

  newItems = ["Item 0", "Item 1", "Item 2", "Item 3", "item 8"];
  activeItems = ["Item 4"];
  doneItems = ["Item 5", "Item 6", "Item 7"];

  // create list of numbers
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.numbers.push(i);
    }
  }
  // custom drop event, using the transferArrayItem and moveItemInArray methods
  // previousContainer = Container from which the item got dragged.
  // transferArrayItem is an imported utility function
  drop(event: CdkDragDrop<number[]>) {
    console.log(event.previousContainer.data); // initially returns array (10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(event.container.data); // initially returns []

    if (event.previousContainer !== event.container) {
      // check to see if moved across lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // move within the same array and change index
      moveItemInArray(this.numbers, event.previousIndex, event.currentIndex);
    }
  }
  // function to deal with drag and drop of strings
  dropped(event: CdkDragDrop<string[]>) {
    if (event.item.data === "Try to move me") {
      console.log("this isn't happening today");
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  entered(event: CdkDragEnter<string[]>) {
    console.log("Add to New list: ", event.item.data);
  }

  exited(event: CdkDragExit<string[]>) {
    console.log("Exited", event.item.data);
  }

  // applies some restrictions on what can be moved between columns
  specialUseCase(dragList?: CdkDrag, dropList?: CdkDropList) {
    if (dropList.data.length <= 2) {
      console.log(
        "Can't drop you because there aren't enough items in 'Active'"
      );
      return false;
    }

    const allowedItems = ["Item 2", "Item 5", "Item 6", "Item 7", "item 8"];
    console.log(
      "The index of the allowed item is: ",
      allowedItems.indexOf(dragList.data)
    );
    if (allowedItems.indexOf(dragList.data) === -1) {
      console.log(
        "Can't drop you because only Items 2, 5, 6, 7 & 8 are allowed here"
      );
      return false;
    }

    return true;
  }
}
