import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); setError(null);
      try {
        const response = await axios(`${BASE_URL}${endpoint}`, {
          method: 'GET', headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token') || '',
          },
        });

        setData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);
  return { data, loading, error };
};

export default useFetch;
