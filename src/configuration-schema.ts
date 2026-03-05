import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

export const configurationSchema: JSONSchema7 = {
  type: "object",
  properties: {
    fieldlabel: {
      type: "string",
      title: "Table Header",
      default: "Employee Details",
    },
    accentcolor: {
      type: "string",
      title: "Accent Color",
      format: "color",
      default: "#00A1DF",
    },
    // This creates the dynamic 'Add Item' list
    items: {
      type: "array",
      title: "Profile Data Rows",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            title: "Row Label (e.g., Hire Date)",
          },
          fieldid: {
            type: "string",
            title: "Staffbase Field ID (e.g., hiredate)",
          },
        },
      },
      // Set defaults so you see data immediately
      default: [
        { label: "First Name", fieldid: "firstName" },
        { label: "Hire Date", fieldid: "hiredate" },
      ],
    },
  },
};

export const uiSchema: UiSchema = {
  "ui:order": ["fieldlabel", "items", "accentcolor"],
};
