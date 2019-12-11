import { WidgetType } from './widget-type';
import { Box } from './grid';

export interface Widget {
  type: WidgetType;
  box: Box;
  isActive: boolean;
}