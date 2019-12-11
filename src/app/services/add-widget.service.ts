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
import { BaseWidgetService } from './base-widget.service';

@Injectable()
export class AddWidgetService extends BaseWidgetService<DragSession> {

  protected get otherWidgets(): Widget[] {
    return this.state.widgets;
  }

  constructor(
    @Inject(DND_GRID_OPTIONS) options: DndGridOptions,
    state: StateService
  ) {
    super(options, state);
  }

  public onDragStart(event: DragEvent, widgetType: WidgetType): void {
    widgetType.isActive = true;
    const { offsetX, offsetY } = OffsetUtil.calculateOffsetFromWidgetCenter(event);
    const session = {
      type: DragType.create,
      widgetType,
      widgetHandleOffsetCenterX: offsetX,
      widgetHandleOffsetCenterY: offsetY
    } as DragSession;
    this.state.session = session;
  }

  public onDragEnd(event: DragEvent, widgetType: WidgetType): void {
    widgetType.isActive = false;
    this.endDrag();
  }

  protected calculateDropZone(event: DragEvent, grid: Element): Box {
    const colSpan = this.state.session.widgetType.minColSpan || 1;
    const rowSpan = this.state.session.widgetType.minRowSpan || 1;
    return CellMoveUtil.calculateDropZone(this.options, this.state.session, event, grid, rowSpan, colSpan);
  }
}