import { DomSanitizer } from '@angular/platform-browser';
import { Component, HostListener, ViewChild, ElementRef, OnInit, Output, Input, ContentChild, TemplateRef } from '@angular/core';
import { Position } from './model/position.component';
import { ItemInfo } from './model/item-info.component';
import { DesignPageService } from './services/design-page.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.scss'],
})
export class DesignPageComponent implements OnInit {
  @ViewChild('page', { static: true }) pageElement: ElementRef;
  @Input('items')
  set items(value: ItemInfo[]) {
    this.designPageService.items = value;
  };
  @Output() itemsChange = new EventEmitter();
  @Input() itemDrags: ItemInfo[];
  @Output() onActiveItem: EventEmitter<ItemInfo> = new EventEmitter<ItemInfo>();
  constructor(
    public designPageService: DesignPageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.designPageService.setPageElement(this.pageElement);
  }

  @HostListener('window:mousedown', ['$event.target'])
  onClick(targetElement: HTMLButtonElement) {
    this.designPageService.onClick(targetElement, this.onActiveItem);
  }

  createElement(element: string): string {
    const el = document.createElement(element);
    return el.outerHTML;
  }

  dragStart(event: DragEvent, item: ItemInfo) {
    this.designPageService.dragStart(event, item);
  }

  dragEnd(event: DragEvent) {
    this.designPageService.dragEnd(event);
  }

  dragOver(event: DragEvent) {
    this.designPageService.dragOver(event);
  }

  dragEnter(event: DragEvent) {
    this.designPageService.dragEnter(event);
  }

  dragLeave(event: DragEvent) {
    this.designPageService.dragLeave(event);
  }

  drop(event: DragEvent) {
    this.designPageService.drop(event);
  }

  mouseUp(event: DragEvent) {
    this.designPageService.mouseUp(event);
  }

  mouseDown(event: MouseEvent, item: ItemInfo) {
    this.designPageService.mouseDown(event, item, this.onActiveItem);
  }

  mouseMove(event: MouseEvent) {
    this.designPageService.mouseMove(event);
  }

  resizeTop(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeTop(event, item);
  }

  resizeTopRight(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeTopRight(event, item);
  }

  resizeRight(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeRight(event, item);
  }

  resizeBottomRight(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeBottomRight(event, item);
  }

  resizeBottom(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeBottom(event, item);
  }

  resizeBottomLeft(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeBottomLeft(event, item);
  }

  resizeLeft(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeLeft(event, item);
  }

  resizeTopLeft(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resizeTopLeft(event, item);
  }

  displayedColumns = ['position', 'name', 'weight', 'symbol', 'symbol1'];
  dataSource = ELEMENT_DATA;

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  symbol1: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'C', weight: 1.0079, symbol: 'H', symbol1: 'H'},
  {position: 2, name: 'C', weight: 4.0026, symbol: 'He', symbol1: 'H'},
  {position: 3, name: 'C', weight: 6.941, symbol: 'Li', symbol1: 'H'},
  {position: 4, name: 'C', weight: 9.0122, symbol: 'Be', symbol1: 'H'},
  {position: 5, name: 'C', weight: 10.811, symbol: 'B', symbol1: 'H'},
  {position: 6, name: 'C', weight: 12.0107, symbol: 'C', symbol1: 'H'},
  {position: 7, name: 'C', weight: 14.0067, symbol: 'N', symbol1: 'H'},
  {position: 8, name: 'C', weight: 15.9994, symbol: 'O', symbol1: 'H'},
  {position: 9, name: 'C', weight: 18.9984, symbol: 'F', symbol1: 'H'},
  {position: 10, name: 'C', weight: 20.1797, symbol: 'Ne', symbol1: 'H'},
  {position: 7, name: 'C', weight: 14.0067, symbol: 'N', symbol1: 'H'},
  {position: 8, name: 'C', weight: 15.9994, symbol: 'O', symbol1: 'H'},
  {position: 9, name: 'C', weight: 18.9984, symbol: 'F', symbol1: 'H'},
  {position: 10, name: 'C', weight: 20.1797, symbol: 'Ne', symbol1: 'H'},
  {position: 7, name: 'C', weight: 14.0067, symbol: 'N', symbol1: 'H'},
  {position: 8, name: 'C', weight: 15.9994, symbol: 'O', symbol1: 'H'},
  {position: 9, name: 'C', weight: 18.9984, symbol: 'F', symbol1: 'H'},
  {position: 10, name: 'C', weight: 20.1797, symbol: 'Ne', symbol1: 'H'},
  {position: 7, name: 'C', weight: 14.0067, symbol: 'N', symbol1: 'H'},
  {position: 8, name: 'C', weight: 15.9994, symbol: 'O', symbol1: 'H'},
  {position: 9, name: 'C', weight: 18.9984, symbol: 'F', symbol1: 'H'},
  {position: 10, name: 'C', weight: 20.1797, symbol: 'Ne', symbol1: 'H'},
  {position: 7, name: 'C', weight: 14.0067, symbol: 'N', symbol1: 'H'},
  {position: 8, name: 'C', weight: 15.9994, symbol: 'O', symbol1: 'H'},
  {position: 9, name: 'C', weight: 18.9984, symbol: 'F', symbol1: 'H'},
  {position: 10, name: 'C', weight: 20.1797, symbol: 'Ne', symbol1: 'H'},
];