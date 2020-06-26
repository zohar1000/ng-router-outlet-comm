import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

enum EventInitiator {
  Child = 'Child',
  Parent = 'Parent'
}

@Directive({
  selector: '[ngRouterOutletComm]'
})
export class NgRouterOutletCommDirective implements AfterViewInit, OnDestroy {
  @Input('ngRouterOutletComm') directiveParams;
  type;
  routerOutlet;
  senderSubscription: Subscription;
  onReceiverEventRef;

  constructor(private elementRef: ElementRef) {
    this.onReceiverEventRef = this.onReceiverEvent.bind(this);
  }

  ngAfterViewInit() {
    this.type = this.directiveParams.type.toLowerCase();
    switch(this.type) {
      case 'child':
        this.routerOutlet = this.elementRef.nativeElement.parentNode.parentNode.getElementsByTagName('router-outlet')[0];
        this.setCommunication();
        break;
      case 'parent':
        this.routerOutlet = this.elementRef.nativeElement.getElementsByTagName('router-outlet')[0];
        this.setCommunication();
    }
  }

  setCommunication() {
    if (this.directiveParams.sender) this.senderSubscription = this.directiveParams.sender.subscribe(data => this.dispatchEvent(data));
    if (this.directiveParams.receiver) this.routerOutlet.addEventListener(this.getEventListenerType(), this.onReceiverEventRef);
  }

  dispatchEvent(data) {
    const eventInitiator = this.type === 'child' ? EventInitiator.Child : EventInitiator.Parent;
    const event = new CustomEvent(eventInitiator, { bubbles: false, cancelable: true, detail: data });
    this.routerOutlet.dispatchEvent(event);
  }

  onReceiverEvent(e: CustomEvent) {
    this.directiveParams.receiver(e.detail);
  }

  getEventListenerType() {
    return this.type === 'child' ? EventInitiator.Parent : EventInitiator.Child;
  }

  ngOnDestroy() {
    if (this.senderSubscription && !this.senderSubscription.closed) this.senderSubscription.unsubscribe();
    if (this.routerOutlet) this.routerOutlet.removeEventListener(this.getEventListenerType(), this.onReceiverEventRef);
  }
}
