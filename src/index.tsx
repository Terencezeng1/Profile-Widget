import React from "react";
import ReactDOM from "react-dom/client";
import {
  BlockFactory,
  BlockDefinition,
  ExternalBlockDefinition,
  BaseBlock,
} from "widget-sdk";
import { ProfileWidgetProps, ProfileWidget } from "./profile-widget";
import { configurationSchema, uiSchema } from "./configuration-schema";
import icon from "../resources/profile-widget.svg";
import pkg from "../package.json";

// attributes must be lowercase to ensure saving works in Staffbase Studio
const widgetAttributes: string[] = [
  "fieldlabel",
  "profilefieldid",
  "accentcolor",
];

const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {
  return class ProfileWidgetBlock extends BaseBlockClass implements BaseBlock {
    private _root: ReactDOM.Root | null = null;

    public constructor() {
      super();
    }

    private get props(): ProfileWidgetProps {
      const attrs = this.parseAttributes<ProfileWidgetProps>();
      return { ...attrs, contentLanguage: this.contentLanguage };
    }

    public async renderBlock(container: HTMLElement): Promise<void> {
      const user = await _widgetApi.getUserInformation();
      this._root ??= ReactDOM.createRoot(container);
      this._root.render(<ProfileWidget {...this.props} user={user} />);
    }

    public static get observedAttributes(): string[] {
      return widgetAttributes;
    }

    public attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string,
    ): void {
      super.attributeChangedCallback.apply(this, [name, oldValue, newValue]);
      // The saving fix: force re-render on change
      if (oldValue !== newValue) {
        this.renderBlock(this);
      }
    }
  };
};

const blockDefinition: BlockDefinition = {
  name: "profile-widget",
  factory: factory,
  attributes: widgetAttributes,
  blockLevel: "block",
  configurationSchema,
  uiSchema,
  label: "Profile Widget",
  iconUrl: icon,
};

window.defineBlock({
  blockDefinition,
  author: pkg.author,
  version: pkg.version,
});
