import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {

    const { user, token } = useAuth();
    const rolePath = window.location.pathname.split('/')[2];
    console.log(user, token, rolePath);

    // if (user?.role && user?.role !== rolePath) {

    //     return <h1>You are not Autherized to see this page</h1>;
    // }

    // if (token == null) {
    //     return <Navigate to='/login' />;
    // }

    return (
        <div className=''>
            {children}
        </div>
    )
}
