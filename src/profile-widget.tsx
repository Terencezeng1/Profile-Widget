import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import { useUserProfile } from "./hooks/use-user-profile";

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

  // Styling for the "Look Fix"
  const containerStyle: React.CSSProperties = {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "24px",
    width: "100%",
    maxWidth: "350px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    borderLeft: `5px solid ${accentColor || "#00A1DF"}`,
    transition: "all 0.3s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    color: "#94a3b8",
    marginBottom: "4px",
    display: "block",
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: 700,
    color: "#1e293b",
    margin: 0,
  };

  // Helper to show dummy data on localhost so you aren't stuck on "Loading"
  const isLocal = window.location.hostname === "localhost";
  const displayData = isLocal ? "Sample Data" : data;
  const isPending = isLocal ? false : loading;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <span style={labelStyle}>{fieldLabel || "User Data"}</span>
        {isPending ? (
          <p style={{ color: "#cbd5e1", fontSize: "14px", margin: 0 }}>
            Loading...
          </p>
        ) : error && !isLocal ? (
          <p style={{ color: "#ef4444", fontSize: "14px", margin: 0 }}>
            Data unavailable
          </p>
        ) : (
          <h2 style={valueStyle}>{displayData || "N/A"}</h2>
        )}
      </div>
    </div>
  );
};
