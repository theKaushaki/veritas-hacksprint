import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {

    const { user, token } = useAuth();
    const rolePath = window.location.pathname.split('/')[2];

    if (token == null) {
        return <Navigate to='/login' />;
    }

    return (
        <div className=''>
            {children}
        </div>
    )
}
