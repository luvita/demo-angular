import { Component } from '@angular/core';
import 'hammerjs';
import { ItemInfo } from './design-page/model/item-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  itemDrags: ItemInfo[] = [
    {
      name: 'textbox',
      element: 'input',
      icon: 'crop_7_5',
      attribute: {
        type: 'text',
        innerHTML: 'Text',
        value: 'demo'
      },
      style: {
        width: '98px',
        height: '18px',
        padding: '0px',
        borderStyle: 'solid',
        borderWidth: '1px'
      },
      class: {}
    },
    {
      name: 'button',
      element: 'button',
      icon: 'add_box',
      attribute: {
        innerHTML: 'button'
      },
      style: {
        width: '100px',
        height: '20px',
        borderStyle: 'solid',
        borderWidth: '1px'
      }
    },
    {
      name: 'label',
      element: 'div',
      icon: 'text_format',
      attribute: {
        innerHTML: 'text'
      },
      style: {
        width: '100px',
        height: '20px'
      }
    }
  ];

  items: ItemInfo[] = [];

  onActiveItem(item: ItemInfo) {
    console.log('active', item);
  }

  syntaxHighlight(obj: Object) {
    let json = JSON.stringify(obj, undefined, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}
