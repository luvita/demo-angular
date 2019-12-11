import { Injectable, ElementRef, EventEmitter } from '@angular/core';
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
  itemCount: number = 0;
  counterDragItem: number = 0;

  setPageElement(pageElement: ElementRef): void {
    this.pageElement = pageElement;
    this.positionPage = this.getBoundingClientRect(this.pageElement.nativeElement);
  }

  onClick(targetElement: HTMLButtonElement, onActiveItem: EventEmitter<ItemInfo>) {
    const activeElement = this.pageElement.nativeElement.querySelector('.active');
    if (activeElement) {
      const clickedInside = activeElement.contains(targetElement);
      if (!clickedInside) {
        this.items.forEach((item) => {
          if (item.active) {
            delete item.active;
          }
        });
        onActiveItem.emit(null);
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
    if (this.itemSelect) {
      event.preventDefault();
      this.positionSelect.x = this.round10(event.offsetX - parseInt(this.itemSelect.style.width) / 2);
      this.positionSelect.y = this.round10(event.offsetY - parseInt(this.itemSelect.style.height) / 2);
    }
  }

  dragEnter(event: DragEvent) {
    if (this.itemSelect) {
      event.preventDefault();
      this.counterDragItem++;
      this.showShadow = true;
    }
  }

  dragLeave(event: DragEvent) {
    if (this.itemSelect) {
      this.counterDragItem--;
      if (this.counterDragItem === 0) {
        this.showShadow = false;
      }
    }
  }

  drop(event: DragEvent) {
    let item: ItemInfo = Object.assign({}, this.itemSelect);
    item.id = ++this.itemCount;
    item.position = Object.assign({}, this.positionSelect);
    item.style = Object.assign({}, item.style);
    item.class = Object.assign({}, item.class);
    this.items.push(item);
    this.itemSelect = null;
  }

  setActiveItem(item: ItemInfo, onActiveItem: EventEmitter<ItemInfo>) {
    this.items.forEach((item) => {
      if (item.active) {
        delete item.active;
      }
    });
    item.active = true;
    this.itemSelect = item;
    onActiveItem.emit(item);
  }

  mouseUp(event: DragEvent) {
    if (this.itemSelect) {
      delete this.itemSelect.move;
      delete this.itemSelect.resize;
    }
    this.itemSelect = null;
  }

  mouseDown(event: MouseEvent, item: ItemInfo, onActiveItem: EventEmitter<ItemInfo>) {
    if (event.which === 1) {
      this.setActiveItem(item, onActiveItem);
      item.move = true;
      this.positionOffset = this.getPositionOffset(event, item.position);
    }
  }

  mouseMove(event: MouseEvent) {
    if (event.which === 1 && this.itemSelect && this.itemSelect.active) {
      const position = this.getPosition(event);
      const x = this.round10(position.x);
      const y = this.round10(position.y);
      if (this.itemSelect.move) {
        this.itemSelect.position.x = this.round10(position.x - this.positionOffset.x);
        this.itemSelect.position.y = this.round10(position.y - this.positionOffset.y);
      } else if (this.itemSelect.resize === 'top') {
        const oldX = this.itemSelect.position.x;
        const oldY = this.itemSelect.position.y;
        const newY = parseInt(this.itemSelect.style.height) + oldY - y;
        if (newY > 10) {
          this.itemSelect.position.y = y;
          this.itemSelect.style.height = newY + 'px';
        }
      }
    }
  }

  resizeTop(event: MouseEvent, item: ItemInfo) {
    if (event.which === 1) {
      item.resize = 'top';
      this.itemSelect = item;
    }
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
