/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { UiSchema } from "@rjsf/utils";
import { JSONSchema7 } from "json-schema";

/**
 * schema used for generation of the configuration dialog
 * see https://rjsf-team.github.io/react-jsonschema-form/docs/ for documentation
 */
export const configurationSchema: JSONSchema7 = {
  type: "object",
  required: ["profileFieldId"],
  properties: {
    fieldLabel: {
      type: "string",
      title: "Display Label",
      description:
        "The text to show next to the data (e.g., 'Your Employee ID')",
      default: "Profile Information",
    },
    profileFieldId: {
      type: "string",
      title: "Staffbase Profile Field ID",
      description:
        "The internal ID of the field from Staffbase Studio (e.g., 'external_id' or 'custom_field_1')",
      default: "firstName",
    },
    accentColor: {
      type: "string",
      title: "Accent Color",
      format: "color",
      default: "#00A1DF",
    },
  },
};

/**
 * schema to add more customization to the form's look and feel
 * @see https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema
 */
export const uiSchema: UiSchema = {
  "ui:order": ["fieldLabel", "profileFieldId", "accentColor"],
  fieldLabel: {
    "ui:placeholder": "Enter label name...",
  },
  profileFieldId: {
    "ui:placeholder": "e.g. external_id",
    "ui:help":
      "Enter the exact ID of the profile field populated by your CSV upload.",
  },
  accentColor: {
    "ui:widget": "color",
  },
};
