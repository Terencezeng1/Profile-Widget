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

const widgetAttributes: string[] = [
  "fieldLabel",
  "profileFieldId",
  "accentColor",
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
      // Official way to get authenticated user data in Staffbase
      const user = await _widgetApi.getUserInformation();

      this._root ??= ReactDOM.createRoot(container);
      this._root.render(<ProfileWidget {...this.props} user={user} />);
    }

    public static get observedAttributes(): string[] {
      return widgetAttributes;
    }

    public attributeChangedCallback(
      ...args: [string, string | undefined, string | undefined]
    ): void {
      super.attributeChangedCallback.apply(this, args);
      // Ensures the widget updates the moment you click 'OK' in Studio
      this.renderBlock(this);
    }
  };
};

const blockDefinition: BlockDefinition = {
  name: "profile-widget",
  factory: factory,
  attributes: widgetAttributes,
  blockLevel: "block",
  configurationSchema: configurationSchema,
  uiSchema: uiSchema,
  label: "Profile Widget",
  iconUrl: icon,
};

const externalBlockDefinition: ExternalBlockDefinition = {
  blockDefinition,
  author: pkg.author,
  version: pkg.version,
};

window.defineBlock(externalBlockDefinition);
