import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks";

const RequireAuth = () => {
    const { auth } = useAuth();
    const { location } = useLocation();

    if(auth) return <Outlet/>
    return (
            <Navigate to={"/login"} state={{from:location}} replace/>
    )
}

export default RequireAuth;