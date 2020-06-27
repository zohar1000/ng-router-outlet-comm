The directive provides communication between parent and child over router outlet.<br/>

Angular does not support using @Input and @Output between parent and child if the child is a routed child.<br/>
This directive provides a simple way for communication:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;to send an event - use EventEmitter<br/>
&nbsp;&nbsp;&nbsp;&nbsp;to receive an event - provide a function<br/><br/>

**parent.component.ts** - provide event emitter and a function
```
class ParentComponent {
  sendToChildEmitter = new EventEmitter();

  onChildEvent(data) {
    // your logic here
  }
```

**parent.component.html** - place the directive in the router-outlet element (router-outlet can be used since it is a regular dom element)
```
<router-outlet [ngRouterOutletComm]="{ type: 'parent', sender: sendToChildEmitter, receiver: onChildEvent }"></router-outlet>
```
<br/><br/>
**child.component.ts** - provide event emitter and a function
```
class ChildComponent {
  sendToParentEmitter = new EventEmitter();

  onParentEvent(data) {
    // your logic here
  }
```

**child.component.html** - place the directive somewhere in your child template
```
  <ng-container [ngRouterOutletComm]="{ type: 'child', sender: sendToParentEmitter, receiver: onParentEvent }"></ng-container>
```
<br/>
That's it.<br/><br/><br/>

To declare the directive in your project, import 'NgRouterOutletCommModule' either in the SharedModule or in the module you use it.<br/><br/>
example of sending data from child to parent:
```
this.sendToParentEmitter.emit({ name: 'John' });
```
