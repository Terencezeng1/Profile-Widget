import { useState, useEffect } from "react";

/**
 * Hook to extract a specific field from the Staffbase User object.
 */
export const useUserProfile = (fieldId: string, user: any) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (user && fieldId) {
      // Standard fields (firstName) or custom CSV data (profile.field)
      const value = user[fieldId] || user.profile?.[fieldId] || "N/A";
      setData(value);
    } else if (!fieldId) {
      setData(null);
    }
  }, [fieldId, user]);

  return { data };
};
