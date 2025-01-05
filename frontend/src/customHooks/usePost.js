import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api";

const usePost = (endpoint) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const postData = async (payload) => {
        setLoading(true);
        setError("");
        try {
            const url = `${BASE_URL}${endpoint}`;
            console.log(url);
            const response = await axios(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token') || '',
                },
                data: payload,
            });

            setData(response.data);
            toast.success(response.data.message || "Data posted successfully");
            setError("");
        } catch (err) {
            toast.error(err?.response?.data?.error || "An error occurred while posting data.");
            setError(err?.response?.data?.error, "An error occurred while posting data.");
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postData };
};

export default usePost;
