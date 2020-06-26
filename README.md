The directive provides communication between parent and child over router outlet

Angular does not support using @Input and @Output between parent and child if the child is a routed child.
This directive provides a simple way for communication:
    to send an event - use EventEmitter
    to receive an event - provide a function

The directive also supports the case of a parent with multiple children, where a different child is displayed via navigation. 


parent.component.ts

class ParentComponent {
  sendToChildEmitter = new EventEmitter();

  onChildEvent(data) {
    // your logic here
  }
parent.component.html

<div [ngRouterOutletComm]="{ type: 'parent', sender: sendToChildEmitter, receiver: onChildEvent }">


child.component.ts

class ChildComponent {
  sendToParentEmitter = new EventEmitter();

  onParentEvent(data) {
    // your logic here
  }
child.component.html

  <div [ngRouterOutletComm]="{ type: 'child', sender: sendToParentEmitter, receiver: onParentEvent }">

That's it.

example of sending data from child to parent:

this.sendToParentEmitter.emit({ name: 'Carrie' });
