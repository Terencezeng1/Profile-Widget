import { useState, useEffect } from "react";

/**
 * Hook to extract a specific field from the Staffbase User object.
 * @param fieldId The internal ID of the field (e.g., 'firstName' or 'department')
 * @param user The user object provided by the Staffbase Widget SDK
 */
export const useUserProfile = (fieldId: string, user: any) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (user && fieldId) {
      // Staffbase stores standard fields at the top level (e.g., firstName)
      // and custom CSV-uploaded data inside the 'profile' object.
      const value = user[fieldId] || user.profile?.[fieldId] || "N/A";
      setData(value);
    } else if (!fieldId) {
      setData(null);
    }
  }, [fieldId, user]);

  return { data };
};
