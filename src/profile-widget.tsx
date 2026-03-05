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

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
// Updated import to match your hyphenated filename
import { useUserProfile } from "./hooks/use-user-profile";

/**
 * React Component
 */
export interface ProfileWidgetProps extends BlockAttributes {
  fieldLabel: string;
  profileFieldId: string;
  accentColor: string;
}

export const ProfileWidget = ({
  fieldLabel,
  profileFieldId,
  accentColor,
}: ProfileWidgetProps): ReactElement => {
  const { data, loading, error } = useUserProfile(profileFieldId);

  return (
    <div className="flex items-center justify-center p-4 antialiased">
      <div
        className="w-full max-w-md bg-white/95 backdrop-blur-3xl p-6 transition-all duration-500"
        style={{
          borderRadius: "24px",
          borderLeft: `6px solid ${accentColor || "#00A1DF"}`,
          boxShadow: "0 8px 30px -10px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-slate-800">
            {fieldLabel || "Profile Information"}
          </span>

          <div className="flex items-baseline gap-2">
            {loading ? (
              <div className="h-8 w-32 bg-slate-200 animate-pulse rounded-lg" />
            ) : error ? (
              <span className="text-red-400 text-sm font-medium">
                Error loading data
              </span>
            ) : (
              <h2 className="text-3xl font-bold tracking-tight text-slate-800 break-words leading-tight">
                {data}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
