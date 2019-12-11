import { Injectable, Inject } from '@angular/core';
import { DragType, DragSession, MoveDragSession } from '../models/session';
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
import { BaseWidgetService } from './base-widget.service';

@Injectable()
export class MoveWidgetService extends BaseWidgetService<MoveDragSession> {

  protected get otherWidgets(): Widget[] {
    const widget = {
      type: this.session.widgetType,
      box: this.session.box
    } as Widget;
    return this.state.widgetsExcluding(widget);
  }

  constructor(
    @Inject(DND_GRID_OPTIONS) options: DndGridOptions,
    state: StateService
  ) {
    super(options, state);
  }

  public onDragStart(event: DragEvent, widget: Widget): void {
    widget.isActive = true;
    
    // because you can drag by an inner element
    const target = (event.target as Element).closest('[draggable=true]');
    const { left, top } = target.getBoundingClientRect();
    const relativeEventX = event.pageX - (window.pageXOffset + left);
    const relativeEventY = event.pageY - (window.pageYOffset + top);
    // we have to do this to avoid the weird text and child selection bug
    event.dataTransfer.setDragImage(target, relativeEventX, relativeEventY);

    const { offsetX, offsetY } = OffsetUtil.calculateOffsetFromWidgetCenter(event);
    const session = {
      type: DragType.move,
      widgetType: widget.type,
      widgetHandleOffsetCenterX: offsetX,
      widgetHandleOffsetCenterY: offsetY,
      box: widget.box
    } as MoveDragSession;
    this.state.session = session;
  }

  public onDragEnd(event: DragEvent, widget: Widget): void {
    widget.isActive = false;
    this.endDrag();
  }

  protected calculateDropZone(event: DragEvent, grid: Element): Box {
    const { colSpan, rowSpan } = this.session.box;
    return CellMoveUtil.calculateDropZone(this.options, this.state.session, event, grid, rowSpan, colSpan);
  }
}