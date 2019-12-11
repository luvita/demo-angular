import { Position } from './position.component';

export enum Resize {
  TOP = 1,
  TOPRIGHT = 2,
  RIGHT = 3,
  BOTTOMRIGHT = 4,
  BOTTOM = 5,
  BOTTOMLEFT = 6,
  LEFT = 7,
  TOPLEFT = 8
}

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
  resize?: Resize;
  position?: Position;
}
