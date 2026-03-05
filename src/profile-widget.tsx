import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import { useUserProfile } from "./hooks/use-user-profile";

export interface ProfileWidgetProps extends BlockAttributes {
  fieldlabel: string;
  profilefieldid: string;
  accentcolor: string;
  user?: any;
}

export const ProfileWidget = ({
  fieldlabel,
  profilefieldid,
  accentcolor,
  user,
}: ProfileWidgetProps): ReactElement => {
  const { data } = useUserProfile(profilefieldid, user);

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    borderLeft: `6px solid ${accentcolor || "#00A1DF"}`,
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
        }}
      >
        {fieldlabel || "User Data"}
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
