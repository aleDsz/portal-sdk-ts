import * as WidgetsModule from "./widgets";
import * as EventModule from "./event";
import * as BuildersModule from "./builders";
import * as HelpersModule from "./helpers";

export namespace UI {
  // Event system
  export import UIEvent = EventModule.UIEvent;

  // Base widget object
  export import UIWidget = WidgetsModule.UIWidget;

  // Widgets
  export import ButtonWidget = WidgetsModule.ButtonWidget;
  export import TextWidget = WidgetsModule.TextWidget;

  // Builders
  export import ButtonBuilder = BuildersModule.ButtonBuilder;
  export import TextBuilder = BuildersModule.TextBuilder;
}
