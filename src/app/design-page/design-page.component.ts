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
  
  @ContentChild(TemplateRef, { static: true }) itemTemplate : TemplateRef<any>;

  constructor(
    public designPageService: DesignPageService
  ) { }

  ngOnInit(): void {
    this.designPageService.setPageElement(this.pageElement);
  }

  @HostListener('window:mousedown', ['$event.target'])
  onClick(targetElement: HTMLButtonElement) {
    this.designPageService.onClick(targetElement);
  }

  dragStart(item: ItemInfo) {
    this.designPageService.dragStart(item);
  }

  dragEnd() {
    this.designPageService.dragEnd();
  }

  dragOver(event: DragEvent) {
    this.designPageService.dragOver(event);
  }

  dragEnter(event: DragEvent) {
    this.designPageService.dragEnter(event);
  }

  dragLeave() {
    this.designPageService.dragLeave();
  }

  drop() {
    this.designPageService.drop();
  }

  mouseUp() {
    this.designPageService.mouseUp();
  }

  mouseDown(event: MouseEvent, item: ItemInfo) {
    this.designPageService.mouseDown(event, item);
  }

  mouseMove(event: MouseEvent) {
    this.designPageService.mouseMove(event);
  }

  resizeN(event: MouseEvent, item: ItemInfo) {

  }

  resizeNE(event: MouseEvent, item: ItemInfo) {

  }
  resizeE(event: MouseEvent, item: ItemInfo) {

  }

  resizeSE(event: MouseEvent, item: ItemInfo) {

  }

  resizeS(event: MouseEvent, item: ItemInfo) {

  }

  resizeSW(event: MouseEvent, item: ItemInfo) {

  }

  resizeW(event: MouseEvent, item: ItemInfo) {

  }

  resizeNW(event: MouseEvent, item: ItemInfo) {

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