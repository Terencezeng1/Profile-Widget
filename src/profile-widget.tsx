import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import { useUserProfile } from "./hooks/use-user-profile";

export interface ProfileWidgetProps extends BlockAttributes {
  fieldLabel: string;
  profileFieldId: string;
  accentColor: string;
  user?: any;
}

export const ProfileWidget = ({
  fieldLabel,
  profileFieldId,
  accentColor,
  user,
}: ProfileWidgetProps): ReactElement => {
  const { data } = useUserProfile(profileFieldId, user);

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    borderLeft: `6px solid ${accentColor || "#00A1DF"}`,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    fontFamily: "sans-serif",
    margin: "10px",
  };

  return (
    <div style={cardStyle}>
      <span
        style={{
          fontSize: "10px",
          fontWeight: "bold",
          color: "#94a3b8",
          textTransform: "uppercase",
          display: "block",
          letterSpacing: "0.05em",
        }}
      >
        {fieldLabel || "User Data"}
      </span>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1e293b",
          margin: "4px 0 0 0",
        }}
      >
        {user ? data || "N/A" : "Loading..."}
      </h2>
    </div>
  );
};
