import { Injectable, Inject } from '@angular/core';
import { DragType, DragSession } from '../models/session';
import { DND_GRID_OPTIONS } from '../models/option';
import { DndGridOptions} from '../models/option';
import { Box } from '../models/grid';
import { Widget } from '../models/Widget';
import { WidgetType } from '../models/widget-type';
import { BoxUtil } from '../utils/box.util';
import { OffsetUtil } from '../utils/offset.util';
import { CellMoveUtil } from '../utils/cell-move.util';
import { ValidationUtil } from '../utils/validation.util';

import { StateService } from './state.service';

@Injectable()
export abstract class BaseWidgetService<T extends DragSession> {

  protected get session(): T {
    return this.state.session as T;
  }

  /**
   * Get widgets on the grid excluding the active one.
   */
  protected abstract get otherWidgets(): Widget[];

  constructor(
    protected options: DndGridOptions,
    protected state: StateService
  ) {}

  public onDragOver(event: DragEvent, grid: Element): void {
    if (this.session == null) {
      return;
    }
    const dropZone = this.calculateDropZone(event, grid);
    const isDropZoneValid = this.isDropZoneValid(dropZone);
    
    if (isDropZoneValid) {
      event.preventDefault();
    }
    this.state.dropZone = dropZone;
    this.state.isDropZoneInvalid = !isDropZoneValid;
  }

  public onDragLeave(event: DragEvent): void {
    this.state.dropZone = null;
    this.state.isDropZoneInvalid = false;
  }

  public onDrop(event: DragEvent, grid: Element): void {
    event.preventDefault();
    const widget = {
      type: { ...this.session.widgetType } as WidgetType,
      box: this.state.dropZone
    } as Widget;
    this.state.widgets = [ ...this.otherWidgets, widget ];
    this.endDrag();
  }

  protected endDrag(): void {
    this.state.session = null;
    this.state.dropZone = null;
    this.state.isDropZoneInvalid = false;
  }

  protected abstract calculateDropZone(event: DragEvent, grid: Element): Box;

  protected isDropZoneValid(dropZone: Box): boolean {
    const isDropZoneValid = ValidationUtil.isDropZoneValid(this.options, dropZone, this.otherWidgets);
    return isDropZoneValid;
  }
}