import { useState, useEffect } from "react";

export const useUserProfile = (fieldId: string, user: any) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (user && fieldId) {
      // Check for top-level fields (firstName) or profile-nested fields (CSV data)
      const value = user[fieldId] || user.profile?.[fieldId] || "N/A";
      setData(value);
    }
  }, [fieldId, user]);

  return { data };
};
