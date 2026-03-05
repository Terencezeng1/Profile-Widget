// src/hooks/use-user-profile.ts
import { useState, useEffect } from "react";

export const useUserProfile = (fieldId: string) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Use a relative path so Staffbase handles the auth cookies automatically
        const response = await fetch("/api/users/me");
        if (!response.ok) throw new Error("Not logged in");

        const user = await response.json();

        // CSV data is usually nested in the 'profile' object
        const value = user.profile?.[fieldId] || user[fieldId] || "N/A";
        setData(value);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error");
      } finally {
        setLoading(false);
      }
    };

    if (fieldId) fetchProfile();
  }, [fieldId]);

  return { data, loading, error };
};
