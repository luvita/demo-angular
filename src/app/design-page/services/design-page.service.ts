import { Injectable, ElementRef } from '@angular/core';
import { Position } from '../model/position.component';
import { ItemInfo } from '../model/item-info.component';

@Injectable()
export class DesignPageService {
  items: ItemInfo[] = [];

  itemSelect: ItemInfo = new ItemInfo();

  positionSelect: Position = new Position();
  positionOffset: Position = new Position();
  positionPage: Position;
  pageElement: ElementRef;

  showShadow: boolean = false;

  counterDragItem: number = 0;

  setPageElement(pageElement: ElementRef): void {
    this.pageElement = pageElement;
    this.positionPage = this.getBoundingClientRect(this.pageElement.nativeElement);
  }

  onClick(targetElement: HTMLButtonElement) {
    const activeElement = this.pageElement.nativeElement.querySelector('.active');
    if (activeElement) {
      const clickedInside = activeElement.contains(targetElement);
      if (!clickedInside) {
        this.items.forEach((item) => {
          if (item.active) {
            delete item.active;
          }
        });
      }
    }
  }

  getBoundingClientRect(element: HTMLElement): Position {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top
    }
  }

  getPosition(event: MouseEvent): Position {
    return {
      x: event.clientX - this.positionPage.x,
      y: event.clientY - this.positionPage.y
    };
  }

  getPositionOffset(event: MouseEvent, position: Position): Position {
    return {
      x: event.clientX - this.positionPage.x - position.x,
      y: event.clientY - this.positionPage.y - position.y
    };
  }

  round10(number: number) {
    return Math.round(number / 10) * 10;
  }

  dragStart(event: DragEvent, item: ItemInfo) {
    event.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
    this.itemSelect = item;
  }

  dragEnd(event: DragEvent) {
    this.itemSelect = null;
    this.showShadow = false;
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
    this.positionSelect.x = this.round10(event.offsetX - parseInt(this.itemSelect.style.width) / 2);
    this.positionSelect.y = this.round10(event.offsetY - parseInt(this.itemSelect.style.height) / 2);
  }

  dragEnter(event: DragEvent) {
    event.preventDefault();
    this.counterDragItem++;
    this.showShadow = true;
  }

  dragLeave(event: DragEvent) {
    this.counterDragItem--;
    if (this.counterDragItem === 0) {
      this.showShadow = false;
    }
  }

  drop(event: DragEvent) {
    let item: ItemInfo = Object.assign({}, this.itemSelect);
    item.position = Object.assign({}, this.positionSelect);
    item.style = Object.assign({}, item.style);
    this.items.push(item);
  }

  activeItem(item: ItemInfo) {
    this.items.forEach((item) => {
      if (item.active) {
        delete item.active;
      }
    });
    item.active = true;
    this.itemSelect = item;
  }

  mouseUp(event: DragEvent) {
    if (this.itemSelect) {
      delete this.itemSelect.move;
    }
  }

  mouseDown(event: MouseEvent, item: ItemInfo) {
    if (event.which === 1) {
      this.activeItem(item);
      item.move = true;
      this.positionOffset = this.getPositionOffset(event, item.position);
    }
  }

  mouseMove(event: MouseEvent) {
    if (event.which === 1 && this.itemSelect && this.itemSelect.active && this.itemSelect.move) {
      const position = this.getPosition(event);
      this.itemSelect.position.x = this.round10(position.x - this.positionOffset.x);
      this.itemSelect.position.y = this.round10(position.y - this.positionOffset.y);
    }
  }

  resizeTop(event: MouseEvent, item: ItemInfo) {
    console.log(item)
  }

  resizeTopRight(event: MouseEvent, item: ItemInfo) {

  }

  resizeRight(event: MouseEvent, item: ItemInfo) {

  }

  resizeBottomRight(event: MouseEvent, item: ItemInfo) {

  }

  resizeBottom(event: MouseEvent, item: ItemInfo) {

  }

  resizeBottomLeft(event: MouseEvent, item: ItemInfo) {

  }

  resizeLeft(event: MouseEvent, item: ItemInfo) {

  }

  resizeTopLeft(event: MouseEvent, item: ItemInfo) {

  }
}
