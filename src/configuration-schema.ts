import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

export const configurationSchema: JSONSchema7 = {
  type: "object",
  properties: {
    fieldlabel: {
      type: "string",
      title: "Table Title",
      default: "Employee Details",
    },
    accentcolor: {
      type: "string",
      title: "Accent Color",
      format: "color",
      default: "#00A1DF",
    },
    // The "Add Item" list logic starts here
    items: {
      type: "array",
      title: "Data Rows",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            title: "Display Label (e.g., Hire Date)",
          },
          fieldid: {
            type: "string",
            title: "Staffbase Field ID (e.g., hiredate)",
          },
        },
      },
      default: [
        { label: "First Name", fieldid: "firstName" },
        { label: "Date Joined", fieldid: "hiredate" },
      ],
    },
  },
};

export const uiSchema: UiSchema = {
  "ui:order": ["fieldlabel", "items", "accentcolor"],
  items: {
    items: {
      "ui:order": ["label", "fieldid"],
    },
  },
};
