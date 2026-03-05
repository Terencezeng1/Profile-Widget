import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";

export interface ProfileWidgetProps extends BlockAttributes {
  fieldlabel: string;
  items: Array<{ label: string; fieldid: string }>;
  accentcolor: string;
  user?: any;
}

export const ProfileWidget = ({
  fieldlabel,
  items,
  accentcolor,
  user,
}: ProfileWidgetProps): ReactElement => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    borderLeft: `6px solid ${accentcolor || "#00A1DF"}`,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    fontFamily: "sans-serif",
    margin: "10px",
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f1f5f9",
  };

  return (
    <div style={cardStyle}>
      <h3
        style={{
          margin: "0 0 16px 0",
          color: "#64748b",
          fontSize: "13px",
          textTransform: "uppercase",
        }}
      >
        {fieldlabel || "Profile Information"}
      </h3>

      {!user ? (
        <p>Loading...</p>
      ) : (
        items.map((item, index) => {
          const value =
            user[item.fieldid] || user.profile?.[item.fieldid] || "N/A";
          return (
            <div key={index} style={rowStyle}>
              <span
                style={{ fontWeight: 600, color: "#475569", fontSize: "14px" }}
              >
                {item.label}
              </span>
              <span style={{ color: "#1e293b", fontSize: "14px" }}>
                {value}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};
