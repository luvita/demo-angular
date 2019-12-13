import { KeyCode } from './../model/key.component';
import { Attribute } from './../model/attribute.component';
import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { Position } from '../model/position.component';
import { ItemInfo, Resize } from '../model/item-info.component';
import { AttributeProperty } from '../model/attribute-property.component';

@Injectable()
export class DesignPageService {
  items: ItemInfo[] = [];

  itemSelect: ItemInfo = new ItemInfo();
  itemActive: ItemInfo = new ItemInfo();

  positionSelect: Position = new Position();
  positionOffset: Position = new Position();
  positionPage: Position;
  pageElement: ElementRef;

  showShadow: boolean = false;
  itemCount: number = 0;
  counterDragItem: number = 0;

  defaultUnit: number = 10;
  isPereview: boolean = false;

  dataSource: Attribute[] = [
    { name: 'Width', value: 0, prototype: 'width', unit: 'px' },
    { name: 'Height', value: 0, prototype: 'height', unit: 'px' },
    { name: 'border', value: 0, prototype: 'borderWidth', unit: 'px' },
    { name: 'background Color', prototype: 'background-color', value: '/d/abc.img', unit: '' },
  ];
  displayedColumns = ['name', 'value'];

  dataProperty: AttributeProperty[] = [
    {
      name: 'Text',
      type: {
        textbox: 'value',
        button: 'innerHTML',
        label: 'innerHTML'
      }
    },
  ];
  displayedColumnsProperty = ['name', 'value'];



  setPageElement(pageElement: ElementRef): void {
    this.pageElement = pageElement;
    this.positionPage = this.getBoundingClientRect(this.pageElement.nativeElement);
  }

  onClick(targetElement: HTMLButtonElement, onActiveItem: EventEmitter<ItemInfo>) {
    if (this.isPereview === false) {
      const activeElement = this.pageElement.nativeElement.querySelector('.active');
      if (activeElement) {
        const clickedInside = activeElement.contains(targetElement);
        if (!clickedInside) {
          this.items.forEach((item) => {
            if (item.active) {
              delete item.active;
            }
          });
          this.itemSelect = null;
          this.itemActive = new ItemInfo();
          onActiveItem.emit(null);
        }
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

  roundUnit(number: number) {
    return Math.round(number / this.defaultUnit) * this.defaultUnit;
  }

  dragStart(event: DragEvent, item: ItemInfo) {
    if (this.isPereview === false) {
      event.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
      this.itemSelect = item;
    }
  }

  dragEnd(event: DragEvent) {
    if (this.isPereview === false) {
      this.itemSelect = null;
      this.showShadow = false;
    }
  }

  dragOver(event: DragEvent) {
    if (this.isPereview === false) {
      if (this.itemSelect) {
        event.preventDefault();
        this.positionSelect.x = this.roundUnit(event.offsetX - parseInt(this.itemSelect.style.width) / 2);
        this.positionSelect.y = this.roundUnit(event.offsetY - parseInt(this.itemSelect.style.height) / 2);
      }
    }
  }

  dragEnter(event: DragEvent) {
    if (this.isPereview === false) {
      if (this.itemSelect) {
        event.preventDefault();
        this.counterDragItem++;
        this.showShadow = true;
      }
    }
  }

  dragLeave(event: DragEvent) {
    if (this.isPereview === false) {
      if (this.itemSelect) {
        this.counterDragItem--;
        if (this.counterDragItem === 0) {
          this.showShadow = false;
        }
      }
    }
  }

  drop(event: DragEvent) {
    if (this.isPereview === false) {
      let item: ItemInfo = Object.assign({}, this.itemSelect);
      item.id = ++this.itemCount;
      item.position = Object.assign({}, this.positionSelect);
      item.attribute = Object.assign({}, item.attribute);
      item.style = Object.assign({}, item.style);
      item.class = Object.assign({}, item.class);
      this.items.push(item);
      this.itemSelect = null;
    }
  }

  setActiveItem(item: ItemInfo, onActiveItem: EventEmitter<ItemInfo>) {
    if (this.isPereview === false) {
      this.items.forEach((item) => {
        if (item.active) {
          delete item.active;
        }
      });
      item.active = true;
      this.itemSelect = item;
      this.itemActive = item;
      onActiveItem.emit(item);
    }
  }

  mouseUp(event: DragEvent) {
    if (this.isPereview === false) {
      if (this.itemSelect) {
        delete this.itemSelect.move;
        delete this.itemSelect.resize;
      }
    }
  }

  mouseDown(event: MouseEvent, item: ItemInfo, onActiveItem: EventEmitter<ItemInfo>) {
    if (this.isPereview === false) {
      if (event.which === 1) {
        this.setActiveItem(item, onActiveItem);
        item.move = true;
        this.positionOffset = this.getPositionOffset(event, item.position);
      }
    }
  }

  mouseMove(event: MouseEvent) {
    if (this.isPereview === false) {
      if (event.which === 1 && this.itemSelect && this.itemSelect.active) {
        const position = this.getPosition(event);
        if (this.itemSelect.move) {
          this.itemSelect.position.x = this.roundUnit(position.x - this.positionOffset.x);
          this.itemSelect.position.y = this.roundUnit(position.y - this.positionOffset.y);
        } else if (this.itemSelect.resize) {
          const x = this.roundUnit(position.x);
          const y = this.roundUnit(position.y);
          const oldX = this.itemSelect.position.x;
          const oldY = this.itemSelect.position.y;
          let newX: number = 0;
          let newY: number = 0;
          let borderWidth: number = 0;
          if (this.itemSelect.element === 'input') {
            borderWidth = parseInt(this.itemSelect.style.borderWidth) | 0;
          }
          switch (this.itemSelect.resize) {
            case Resize.TOP:
              newY = parseInt(this.itemSelect.style.height) + oldY - y;
              if (newY >= this.defaultUnit) {
                this.itemSelect.position.y = y;
                this.itemSelect.style.height = newY + 'px';
              }
              break;
            case Resize.TOPRIGHT:
              newX = x - oldX;
              newY = parseInt(this.itemSelect.style.height) + oldY - y;
              if (newX >= this.defaultUnit && newY >= this.defaultUnit) {
                this.itemSelect.position.y = y;
                this.itemSelect.style.height = newY + 'px';
                this.itemSelect.style.width = newX - 2 * borderWidth + 'px';
              }
              break;
            case Resize.RIGHT:
              newX = x - oldX;
              if (newX >= this.defaultUnit) {
                this.itemSelect.style.width = newX - 2 * borderWidth + 'px';
              }
              break;
            case Resize.BOTTOMRIGHT:
              newX = x - oldX;
              newY = y - oldY;
              if (newX >= this.defaultUnit && newY >= this.defaultUnit) {
                this.itemSelect.style.width = newX - 2 * borderWidth + 'px';
                this.itemSelect.style.height = newY - 2 * borderWidth + 'px';
              }
              break;
            case Resize.BOTTOM:
              newY = y - oldY;
              if (newY >= this.defaultUnit) {
                this.itemSelect.style.height = newY - 2 * borderWidth + 'px';
              }
              break;
            case Resize.BOTTOMLEFT:
              newX = parseInt(this.itemSelect.style.width) + oldX - x;
              newY = y - oldY;
              if (newX >= this.defaultUnit && newY >= this.defaultUnit) {
                this.itemSelect.position.x = x;
                this.itemSelect.style.width = newX + 'px';
                this.itemSelect.style.height = newY - 2 * borderWidth + 'px';
              }
              break;
            case Resize.LEFT:
              newX = parseInt(this.itemSelect.style.width) + oldX - x;
              if (newX >= this.defaultUnit) {
                this.itemSelect.position.x = x;
                this.itemSelect.style.width = newX + 'px';
              }
              break;
            case Resize.TOPLEFT:
              newX = parseInt(this.itemSelect.style.width) + oldX - x;
              newY = parseInt(this.itemSelect.style.height) + oldY - y;
              if (newX >= this.defaultUnit && newY >= this.defaultUnit) {
                this.itemSelect.position.x = x;
                this.itemSelect.style.width = newX + 'px';
                this.itemSelect.position.y = y;
                this.itemSelect.style.height = newY + 'px';
              }
              break;
          }
        }
      }
    }
  }

  resize(event: MouseEvent, item: ItemInfo, type: Resize) {
    if (this.isPereview === false) {
      if (event.which === 1) {
        item.resize = type;
        this.itemSelect = item;
      }
    }
  }

  keyDown(event: KeyboardEvent) {
    if (this.isPereview === false) {
      if (this.itemSelect) {
        switch (event.keyCode) {
          case KeyCode.KEY_DELETE:
            this.items.splice(this.items.findIndex(item => item.id === this.itemSelect.id), 1);
            this.itemSelect = null;
            break;
          case KeyCode.KEY_UP:
            this.itemSelect.position.y = this.itemSelect.position.y - this.defaultUnit;
            break;
          case KeyCode.KEY_DOWN:
            this.itemSelect.position.y = this.itemSelect.position.y + this.defaultUnit;
            break;
          case KeyCode.KEY_LEFT:
            this.itemSelect.position.x = this.itemSelect.position.x - this.defaultUnit;
            break;
          case KeyCode.KEY_RIGHT:
            this.itemSelect.position.x = this.itemSelect.position.x + this.defaultUnit;
            break;
        }
      }
    }
  }
}
