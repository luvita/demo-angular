import { Position } from './position.component';

export class ItemInfo {
  type?: string = '';
  name?: string = '';
  style?: any = {
    width: '0px',
    height: '0px'
  };
  active?: boolean = false;
  move?: boolean = false;
  position?: Position;
}
