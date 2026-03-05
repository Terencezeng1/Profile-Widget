import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

export const configurationSchema: JSONSchema7 = {
  type: "object",
  required: ["profileFieldId"],
  properties: {
    fieldLabel: {
      type: "string",
      title: "Display Label",
      default: "Profile Information",
    },
    profileFieldId: {
      type: "string",
      title: "Staffbase Profile Field ID",
      default: "firstName", // Changed from first_name
    },
    accentColor: {
      type: "string",
      title: "Accent Color",
      format: "color",
      default: "#00A1DF",
    },
  },
};

export const uiSchema: UiSchema = {
  "ui:order": ["fieldLabel", "profileFieldId", "accentColor"],
  profileFieldId: {
    "ui:help": "Enter 'firstName' or your CSV column ID (e.g. 'department').",
  },
};
