import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, role }) {

    const { user } = useAuth();
    console.log(user);
    const rolePath = window.location.pathname.split('/')[2];

    if (role && role !== rolePath) {

        return <h1>You are not Autherized to see this page</h1>;
    }

    // if (!user) {
    //     return <Navigate to='/login' />;
    // }

    return (
        <div className=''>
            {children}
        </div>
    )
}
