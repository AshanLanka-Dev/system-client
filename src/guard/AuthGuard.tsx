import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAppContext} from "../context/AppContext.tsx";
import {useEffect} from "react";
import AuthService from "../services/auth/AuthService.ts";

const AuthGuard = () => {
    const { user,setUser } = useAppContext();
    const authService = AuthService();

    const location = useLocation(); // Get the current route location

    useEffect(() => {
        authService.validate().then(response => {
            if (response.status !== 200) {
                setUser(null);
            }
        })

    }, [location]); // The effect now runs whenever the location changes

    return (user ? <Outlet /> : <Navigate to="/login" />);
};

export default AuthGuard;