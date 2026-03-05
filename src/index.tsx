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
import pkg from "../package.json";

const widgetAttributes: string[] = ["fieldlabel", "items", "accentcolor"];

const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {
  return class ProfileWidgetBlock extends BaseBlockClass implements BaseBlock {
    private _root: ReactDOM.Root | null = null;

    private get props(): ProfileWidgetProps {
      const attrs = this.parseAttributes<any>();

      // CRITICAL FIX: Parse the 'items' string into a real list
      let parsedItems = [];
      try {
        parsedItems =
          typeof attrs.items === "string"
            ? JSON.parse(attrs.items)
            : attrs.items || [];
      } catch (e) {
        parsedItems = [];
      }

      return {
        ...attrs,
        items: parsedItems,
        contentLanguage: this.contentLanguage,
      };
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
      this.renderBlock(this);
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
  label: "Profile Table",
};

window.defineBlock({
  blockDefinition,
  author: pkg.author,
  version: pkg.version,
});
