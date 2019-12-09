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
}
