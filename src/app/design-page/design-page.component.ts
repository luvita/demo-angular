import { DomSanitizer } from '@angular/platform-browser';
import { Component, HostListener, ViewChild, ElementRef, OnInit, Output, Input, ContentChild, TemplateRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { Position } from './model/position.component';
import { ItemInfo, Resize } from './model/item-info.component';
import { DesignPageService } from './services/design-page.service';
import { EventEmitter } from '@angular/core';
import { ThemeService } from '../theme/theme.service';

@Component({
  selector: 'design-page',
  templateUrl: './design-page.component.html',
  styleUrls: ['./design-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    private themService: ThemeService,
    public designPageService: DesignPageService,
    private hostRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.designPageService.setPageElement(this.pageElement);
  }

  @HostListener('window:mousedown', ['$event.target'])
  onClick(targetElement: HTMLButtonElement) {
    this.designPageService.onClick(targetElement, this.onActiveItem);
  }

  getContentAttr(): string {
    const attrs = this.hostRef.nativeElement.attributes;
    for (let i = 0, l = attrs.length; i < l; i++) {
      if (attrs[i].name.startsWith('_nghost-')) {
        return `_ngcontent-${attrs[i].name.substring(8)}`;
      }
    }
  }

  getWidth(item: ItemInfo): number {
    const el = document.getElementById(`item-${item.id}`);
    if (el && el.firstChild) {
      return (el.firstChild as HTMLElement).offsetWidth;
    } else {
      return 0;
    }
  }

  getHeight(item: ItemInfo): number {
    const el = document.getElementById(`item-${item.id}`);
    if (el && el.firstChild) {
      return (el.firstChild as HTMLElement).offsetHeight;
    } else {
      return 0;
    }
  }

  createElement(item: ItemInfo): string {
    const el = document.createElement(item.element);
    if (item.style) {
      Object.keys(item.style).forEach(key => {
        this.renderer.setStyle(el, key, item.style[key]);
      });
    }
    if (item.attribute) {
      Object.keys(item.attribute).forEach(key => {
        if (key === 'innerHTML') {
          el.innerHTML = item.attribute[key];
        } else {
          this.renderer.setAttribute(el, key, item.attribute[key]);
        }
      });
    }
    // if (typeof (el as any).disabled !== 'undefined') {
    //   this.renderer.setAttribute(el, 'disabled', 'true');
    // }
    el.setAttribute(this.getContentAttr(), '');
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
  activeThem = 'oceanBlueThemProps';
  mouseDown(event: MouseEvent, item: ItemInfo) {
    if (this.activeThem !== 'deepPurpleThemProps') {
      this.themService.setActiveThem('deepPurpleThemProps');
      this.activeThem = 'deepPurpleThemProps';
    } else {
      this.themService.setActiveThem('oceanBlueThemProps');
      this.activeThem = 'oceanBlueThemProps';
    }
    this.designPageService.mouseDown(event, item, this.onActiveItem);
  }

  mouseMove(event: MouseEvent) {
    this.designPageService.mouseMove(event);
  }

  resizeTop(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.TOP);
  }

  resizeTopRight(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.TOPRIGHT);
  }

  resizeRight(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.RIGHT);
  }

  resizeBottomRight(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.BOTTOMRIGHT);
  }

  resizeBottom(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.BOTTOM);
  }

  resizeBottomLeft(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.BOTTOMLEFT);
  }

  resizeLeft(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.LEFT);
  }

  resizeTopLeft(event: MouseEvent, item: ItemInfo) {
    this.designPageService.resize(event, item, Resize.TOPLEFT);
  }
}
