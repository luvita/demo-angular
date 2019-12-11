import { Position } from './position.component';

export class ItemInfo {
  id?: number = 0;
  element?: string = '';
  attribute?: any = {};
  icon?: string = '';
  name?: string = '';
  style?: any = {
    width: '0px',
    height: '0px'
  };
  class?: any = {};
  active?: boolean = false;
  move?: boolean = false;
  resize?: string = '';
  position?: Position;
}
