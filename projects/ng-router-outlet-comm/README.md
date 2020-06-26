The directive provides communication between parent and child over router outlet<br/><br/>

Angular does not support using @Input and @Output between parent and child if the child is a routed child.<br/>
This directive provides a simple way for communication:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;to send an event - use EventEmitter<br/>
&nbsp;&nbsp;&nbsp;&nbsp;to receive an event - provide a function<br/><br/>
The directive also supports the case of navigating between children when there are multiple routes.
<br/><br/>

parent.component.ts
```
class ParentComponent {
  sendToChildEmitter = new EventEmitter();

  onChildEvent(data) {
    // your logic here
  }
```

parent.component.html
```
<div [ngRouterOutletComm]="{ type: 'parent', sender: sendToChildEmitter, receiver: onChildEvent }">
```
<br/><br/>
child.component.ts
```
class ChildComponent {
  sendToParentEmitter = new EventEmitter();

  onParentEvent(data) {
    // your logic here
  }
```

child.component.html
```
  <div [ngRouterOutletComm]="{ type: 'child', sender: sendToParentEmitter, receiver: onParentEvent }">
```
<br/>
That's it.<br/><br/>

example of sending data from child to parent:
```
this.sendToParentEmitter.emit({ name: 'Tom' });
```
