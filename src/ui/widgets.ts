import { Player } from "../entities/player";
import { UIEvent } from "./event";

export abstract class UIWidget {
  protected _native: mod.UIWidget;
  protected static widgetMap = new Map<string, UIWidget>();
  public readonly name: string;

  protected constructor(name: string, findNative: boolean = true) {
    this.name = name;

    if (findNative) {
      const native = mod.FindUIWidgetWithName(name);
      if (!native) throw new Error(`UIWidget with name "${name}" not found.`);

      this._native = native as mod.UIWidget;
    } else {
      // The native object will be set by the builder
      this._native = null as any;
    }

    UIWidget.widgetMap.set(name, this);
  }

  public static fromNative(native: mod.UIWidget): UIWidget | undefined {
    const name = mod.GetUIWidgetName(native);
    return UIWidget.widgetMap.get(name);
  }

  public static find(name: string): UIWidget | undefined {
    return UIWidget.widgetMap.get(name);
  }

  public get native(): mod.UIWidget {
    return this._native;
  }

  public set visible(value: boolean) {
    mod.SetUIWidgetVisible(this._native, value);
  }

  public get visible(): boolean {
    return mod.GetUIWidgetVisible(this._native);
  }

  public destroy(): void {
    mod.DeleteUIWidget(this._native);
    UIWidget.widgetMap.delete(this.name);
  }
}

export class ButtonWidget extends UIWidget {
  constructor(name: string) {
    super(name);

    this.onButtonDown = new UIEvent(this._native, mod.UIButtonEvent.ButtonDown);
    this.onButtonUp = new UIEvent(this._native, mod.UIButtonEvent.ButtonUp);
    this.onFocusIn = new UIEvent(this._native, mod.UIButtonEvent.FocusIn);
    this.onFocusOut = new UIEvent(this._native, mod.UIButtonEvent.FocusOut);
    this.onHoverIn = new UIEvent(this._native, mod.UIButtonEvent.HoverIn);
    this.onHoverOut = new UIEvent(this._native, mod.UIButtonEvent.HoverOut);
  }

  public onButtonDown: UIEvent<(player: Player) => Promise<void>>;
  public onButtonUp: UIEvent<(player: Player) => Promise<void>>;
  public onFocusIn: UIEvent<(player: Player) => Promise<void>>;
  public onFocusOut: UIEvent<(player: Player) => Promise<void>>;
  public onHoverIn: UIEvent<(player: Player) => Promise<void>>;
  public onHoverOut: UIEvent<(player: Player) => Promise<void>>;

  public set enabled(value: boolean) {
    mod.SetUIButtonEnabled(this._native, value);
  }

  public get enabled(): boolean {
    return mod.GetUIButtonEnabled(this._native);
  }
}

export class TextWidget extends UIWidget {
  constructor(name: string) {
    super(name);
  }

  public get text(): mod.Message {
    // The API does not provide a getter for the text label
    throw new Error("Getting text from a TextWidget is not supported by the API.");
  }

  public set text(value: string | mod.Message) {
    mod.SetUITextLabel(this._native, typeof value === 'string' ? mod.Message(value) : value);
  }
}
