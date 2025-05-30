import { useState } from "react";

export default function useLoadingAndError() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return {
    loading,
    setLoading,
    error,
    setError,
  };
}
