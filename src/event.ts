/**
 * A simple event dispatcher class.
 */
export class Event<T extends (...args: any[]) => any> {
  protected handlers: T[] = [];

  public subscribe(handler: T): { unsubscribe: () => void } {
    if (!this.handlers.includes(handler)) {
      this.handlers.push(handler);
    }
    return { unsubscribe: () => this.unsubscribe(handler) };
  }

  public unsubscribe(handler: T): void {
    const index = this.handlers.indexOf(handler);
    if (index > -1) {
      this.handlers.splice(index, 1);
    }
  }

  public dispatch(...args: Parameters<T>): void {
    for (const handler of this.handlers) {
      try {
        handler(...args);
      } catch (error: any) {
        mod.SendErrorReport(mod.Message(mod.stringkeys.SDK_EVENT_HANDLER_ERROR, error.message));
      }
    }
  }
}
