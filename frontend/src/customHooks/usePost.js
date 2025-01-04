import { useState } from "react";
import axios from "axios";

const BASE_URL = "http//localhost:3000/api";

const usePost = (endpoint) => {
    const [data, setData] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState(null);
    const postData = async (payload) => {
        setLoading(true); setError(null);
        try {
            const response = await axios(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: payload,
            });

            setData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : err.message || "An error occurred while posting data.");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postData };
};

export default usePost;
