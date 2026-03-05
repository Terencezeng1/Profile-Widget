import { useState, useEffect } from "react";

export const useUserProfile = (fieldId: string) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetches only the signed-in user's data
        const response = await fetch("/api/users/me");
        if (!response.ok) throw new Error("Failed to fetch profile");

        const user = await response.json();

        // Extract the field (e.g., 'external_id' or 'department')
        const value = user[fieldId] || user.profile?.[fieldId] || "N/A";
        setData(value);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (fieldId) {
      fetchProfile();
    }
  }, [fieldId]);

  return { data, loading, error };
};
