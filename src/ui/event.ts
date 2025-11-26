import { Event } from "../event";

export class UIEvent<T extends (...args: any[]) => any> extends Event<T> {
  private widget: mod.UIWidget;
  private eventType: mod.UIButtonEvent;
  private enabled = false;

  constructor(widget: mod.UIWidget, eventType: mod.UIButtonEvent) {
    super();

    this.widget = widget;
    this.eventType = eventType;
  }

  public subscribe(handler: T): { unsubscribe: () => void } {
    if (this.handlers.length === 0 && !this.enabled) {
      mod.EnableUIButtonEvent(this.widget, this.eventType, true);
      this.enabled = true;
    }

    return super.subscribe(handler);
  }

  public unsubscribe(handler: T): void {
    super.unsubscribe(handler);

    if (this.handlers.length === 0 && this.enabled) {
      mod.EnableUIButtonEvent(this.widget, this.eventType, false);
      this.enabled = false;
    }
  }
}
