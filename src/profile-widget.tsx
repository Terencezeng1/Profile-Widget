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
  // Logic Fix: Split the IDs and create a list of labels and values
  const fieldIds = profilefieldid
    ? profilefieldid.split(",").map((id) => id.trim())
    : [];

  const tableStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    borderLeft: `6px solid ${accentcolor || "#00A1DF"}`,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    fontFamily: "sans-serif",
    margin: "10px",
    width: "100%",
    maxWidth: "450px",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f1f5f9",
  };

  return (
    <div style={tableStyle}>
      <h3
        style={{
          margin: "0 0 15px 0",
          color: "#64748b",
          fontSize: "12px",
          textTransform: "uppercase",
        }}
      >
        {fieldlabel || "Profile Data"}
      </h3>

      {!user ? (
        <p>Loading...</p>
      ) : (
        fieldIds.map((id) => {
          // Get value for each ID from the user object or profile sub-object
          const val = user[id] || user.profile?.[id] || "N/A";
          return (
            <div key={id} style={rowStyle}>
              <span
                style={{ fontWeight: 600, color: "#475569", fontSize: "14px" }}
              >
                {id}:
              </span>
              <span style={{ color: "#1e293b", fontSize: "14px" }}>{val}</span>
            </div>
          );
        })
      )}
    </div>
  );
};
