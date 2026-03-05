import { useState, useEffect } from "react";

export const useUserProfile = (fieldId: string, user: any) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (user && fieldId) {
      // Logic: check user root, then user.profile, then return N/A
      const value = user[fieldId] || user.profile?.[fieldId] || "N/A";
      setData(value);
    }
  }, [fieldId, user]);

  return { data };
};
