import { Player } from "../entities/player";
import { UIWidget, TextWidget, ButtonWidget } from "./widgets";
import { ParseUI } from "./helpers";

abstract class UIWidgetBuilder<TBuilder extends UIWidgetBuilder<TBuilder, TWidget>, TWidget extends UIWidget> {
  protected params: any = {};
  protected children: UIWidgetBuilder<any, any>[] = [];

  constructor(name: string) {
    this.params.name = name;

    // Default parent
    this.params.parent = mod.GetUIRoot();
  }

  public position(pos: mod.Vector): TBuilder {
    this.params.position = pos;
    return this as unknown as TBuilder;
  }

  public size(size: mod.Vector): TBuilder {
    this.params.size = size;
    return this as unknown as TBuilder;
  }

  public anchor(anchor: mod.UIAnchor): TBuilder {
    this.params.anchor = anchor;
    return this as unknown as TBuilder;
  }

  public parent(parent: UIWidget): TBuilder {
    this.params.parent = parent.native;
    return this as unknown as TBuilder;
  }

  public visible(visible: boolean): TBuilder {
    this.params.visible = visible;
    return this as unknown as TBuilder;
  }

  public restrictTo(target: Player | mod.Team): TBuilder {
    if (target instanceof Player) {
      this.params.playerId = target.native;
    } else {
      this.params.teamId = target;
    }

    return this as unknown as TBuilder;
  }

  public addChild(childBuilder: UIWidgetBuilder<any, any>): TBuilder {
    this.children.push(childBuilder);
    return this as unknown as TBuilder;
  }

  protected abstract buildInternal(): TWidget;

  public build(): TWidget {
    const widget = this.buildInternal();

    this.children.forEach(childBuilder => {
      childBuilder.params.parent = widget.native;
      childBuilder.build();
    });

    return widget;
  }
}

export class TextBuilder extends UIWidgetBuilder<TextBuilder, TextWidget> {
  constructor(name: string) {
    super(name);

    this.params.type = 'Text';
  }

  public text(text: string | mod.Message): TextBuilder {
    this.params.textLabel = typeof text === 'string' ? mod.Message(text) : text;
    return this;
  }

  public textSize(size: number): TextBuilder {
    this.params.textSize = size;
    return this;
  }

  public textColor(color: mod.Vector): TextBuilder {
    this.params.textColor = color;
    return this;
  }

  protected buildInternal(): TextWidget {
    ParseUI(this.params);
    return new TextWidget(this.params.name);
  }
}

export class ButtonBuilder extends UIWidgetBuilder<ButtonBuilder, ButtonWidget> {
  constructor(name: string) {
    super(name);

    this.params.type = 'Button';
  }

  public enabled(isEnabled: boolean): ButtonBuilder {
    this.params.buttonEnabled = isEnabled;
    return this;
  }

  protected buildInternal(): ButtonWidget {
    ParseUI(this.params);
    return new ButtonWidget(this.params.name);
  }
}
