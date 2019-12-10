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
      element: 'input',
      name: 'name 1',
      style: {
        width: '100px',
        height: '20px'
      }
    },
    {
      name: 'name 2',
      style: {
        width: '200px',
        height: '20px'
      }
    },
    {
      name: 'name 3',
      style: {
        width: '20px',
        height: '40px'
      }
    },
    {
      name: 'name 4',
      style: {
        width: '300px',
        height: '200px'
      }
    }
  ];

  items: ItemInfo[] = [];

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
