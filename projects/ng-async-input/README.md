# Installation

```
npm install ng-async-input --save
```

# Usage

```
import { Component, Input } from '@angular/core';
import { AsyncInput } from 'ng-async-input';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnChanges {
  @Input() name: string;
  @AsyncInput() name$ = new BehaviorSubject('Default Name');

  constructor() {
    this.name$.subscribe(name => console.log('from async input', name));
  }
}
```
