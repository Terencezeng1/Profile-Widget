import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

export const configurationSchema: JSONSchema7 = {
  type: "object",
  required: ["profilefieldid"],
  properties: {
    fieldlabel: {
      type: "string",
      title: "Table Header / Label",
      default: "Employee Details",
    },
    profilefieldid: {
      type: "string",
      title: "Staffbase Profile Field IDs",
      description:
        "Enter field IDs separated by commas (e.g., 'firstName,hiredate,department')",
      default: "firstName,hiredate",
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
