import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

export const configurationSchema: JSONSchema7 = {
  type: "object",
  required: ["profilefieldid"],
  properties: {
    fieldlabel: {
      type: "string",
      title: "Display Label",
      default: "Profile Information",
    },
    profilefieldid: {
      type: "string",
      title: "Staffbase Profile Field ID",
      default: "firstName",
    },
    accentcolor: {
      type: "string",
      title: "Accent Color",
      format: "color",
      default: "#00A1DF",
    },
  },
};

export const uiSchema: UiSchema = {
  "ui:order": ["fieldlabel", "profilefieldid", "accentcolor"],
};
