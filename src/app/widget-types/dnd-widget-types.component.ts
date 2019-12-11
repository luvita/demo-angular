import { Component, ChangeDetectionStrategy, Input, ContentChild, TemplateRef } from '@angular/core';
import { WidgetType } from '../models/widget-type';
import { AddWidgetService } from '../services/add-widget.service';

@Component({
  selector: 'dnd-widget-types',
  templateUrl: './dnd-widget-types.component.html',
  styleUrls: [ './dnd-widget-types.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DndWidgetTypesComponent  {
  @Input()
  public widgetTypes: WidgetType[];

  @ContentChild(TemplateRef, {static: false})
  public widgetTypeTemplate: TemplateRef<any>;

  constructor( private addWidgetService: AddWidgetService ) {}

  public trackWidgetType(index: number, widgetType: WidgetType): string {
    return widgetType.id;
  }

  public onDragStart(event: DragEvent, widgetType: WidgetType): void {
    this.addWidgetService.onDragStart(event, widgetType);
  }

  public onDragEnd(event: DragEvent, widgetType: WidgetType): void {
    this.addWidgetService.onDragEnd(event, widgetType);
  }
}
