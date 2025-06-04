import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Header from "../components/Header.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Pets from "../pages/Pets.tsx";
import Veterinary from "../pages/Veterinary.tsx";
import Appointments from "../pages/Appointments.tsx";
import Consultation from "../pages/Consultation.tsx";
import SignUp from "../pages/SignUp.tsx";
import ProfileSettings from "../pages/ProfileSettings.tsx";
import {useAppContext} from "../context/AppContext.tsx";
import Login from "../pages/Login.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import VerifyOTP from "../pages/VerifyOTP.tsx";
import ResetPassword from "../pages/ResetPassword.tsx";
import AuthGuard from "../guard/AuthGuard.tsx";

const AppRoutes = () => {
    const { user } = useAppContext();

    return(
        <Router>
            <div className="min-h-full absolute left-0 right-0 top-0 bg-gradient-to-br from-slate-50 to-blue-50">
                {user ? <Header/> : <span></span>}
                <main className={`container mx-auto px-4 py-6 ${user ? 'mt-16' : ''}`}>
                    <Routes>
                        {/* Public Authentication Routes */}
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/forgot-password" element={<ForgotPassword/>}/>
                        <Route path="/verify-otp" element={<VerifyOTP/>}/>
                        <Route path="/reset-password" element={<ResetPassword/>}/>

                        {/* Root redirect */}
                        <Route path="/" element={<Navigate to="/dashboard"/>}/>

                        {/* Protected Routes */}
                        <Route element={<AuthGuard/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/pets" element={<Pets/>}/>
                            <Route path="/veterinary" element={<Veterinary/>}/>
                            <Route path="/appointments" element={<Appointments/>}/>
                            <Route path="/consultation" element={<Consultation/>}/>
                            <Route path="/profile/settings" element={<ProfileSettings/>}/>
                        </Route>

                        {/* Catch all route - redirect to login if not authenticated, dashboard if authenticated */}
                        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default AppRoutes;