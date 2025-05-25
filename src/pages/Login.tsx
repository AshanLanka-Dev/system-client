
import  React,{useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Mail, Lock, ArrowRight, PawPrint, ArrowLeft, Send, KeyRound} from 'lucide-react';
import {useAppContext} from "../context/AppContext.tsx";
import AuthService from "../services/auth/AuthService.ts";


type FormState = 'login' | 'forgot' | 'otp' | 'reset';



function Login() {
    const {user,setUser} = useAppContext();
    const navigate = useNavigate();

    const [formState, setFormState] = useState<FormState>('login');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        otp: ['', '', '', ''],
        newPassword: '',
        confirmPassword: '',
    });

    const authService = AuthService();

    // Refs for OTP inputs
    const otpRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
        authService.login({email:formData.email, password:formData.password}).then(response => {
            if (response.status === 200 && response.data) {
                console.log(response.data);
                setUser(response.data.data.user);
                navigate('/');
            } else {
                throw Error("Invalid Credentials");
            }
        }).catch(error => {
            console.log(error);
        });
    };

    const handleForgotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('otp');
    };

    const handleOTPSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('reset');
    };

    const handleResetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password reset logic here
        console.log('Password reset:', formData);
        setFormState('login');
        setFormData({...formData, newPassword: '', confirmPassword: '', otp: ['', '', '', '']});
    };

    const handleOTPChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newOTP = [...formData.otp];
            newOTP[index] = value;
            setFormData({...formData, otp: newOTP});

            // Move to next input if value is entered
            if (value !== '' && index < 3) {
                otpRefs[index + 1].current?.focus();
            }
        }
    };

    const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && formData.otp[index] === '' && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const renderLoginForm = () => (
        <>
            <div className="text-center mb-8">
                <PawPrint size={48} className="text-[#01818E] mx-auto mb-4"/>
                <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                <p className="mt-2 text-gray-600">
                    Sign in to continue managing your pets' care
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <button
                            type="button"
                            onClick={() => setFormState('forgot')}
                            className="text-sm text-[#01818E] hover:text-[#016d77]"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#01818E] text-white p-3 rounded-lg hover:bg-[#016d77] transition-colors flex items-center justify-center space-x-2 group"
                >
                    <span>Log In</span>
                </button>

                <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-[#01818E] hover:text-[#016d77] font-medium">
                        Register here
                    </Link>
                </p>
            </form>
        </>
    );

    const renderForgotForm = () => (
        <>
            <button
                onClick={() => setFormState('login')}
                className="mb-8 text-[#01818E] hover:text-[#016d77] flex items-center"
            >
                <ArrowLeft size={20} className="mr-2"/>
                Back to Login
            </button>

            <div className="text-center mb-8">
                <KeyRound size={48} className="text-[#01818E] mx-auto mb-4"/>
                <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
                <p className="mt-2 text-gray-600">
                    Enter your email address to receive a verification code
                </p>
            </div>

            <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#01818E] text-white p-3 rounded-lg hover:bg-[#016d77] transition-colors flex items-center justify-center space-x-2 group"
                >
                    <span>Send Code</span>
                    <Send size={20} className="group-hover:translate-x-1 transition-transform"/>
                </button>
            </form>
        </>
    );

    const renderOTPForm = () => (
        <>
            <button
                onClick={() => setFormState('forgot')}
                className="mb-8 text-[#01818E] hover:text-[#016d77] flex items-center"
            >
                <ArrowLeft size={20} className="mr-2"/>
                Back
            </button>

            <div className="text-center mb-8">
                <KeyRound size={48} className="text-[#01818E] mx-auto mb-4"/>
                <h2 className="text-3xl font-bold text-gray-900">Enter OTP</h2>
                <p className="mt-2 text-gray-600">
                    We've sent a code to {formData.email}
                </p>
            </div>

            <form onSubmit={handleOTPSubmit} className="space-y-6">
                <div className="flex justify-center space-x-4">
                    {[0, 1, 2, 3].map((index) => (
                        <input
                            key={index}
                            ref={otpRefs[index]}
                            type="text"
                            maxLength={1}
                            value={formData.otp[index]}
                            onChange={(e) => handleOTPChange(index, e.target.value)}
                            onKeyDown={(e) => handleOTPKeyDown(index, e)}
                            className="w-14 h-14 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                            required
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#01818E] text-white p-3 rounded-lg hover:bg-[#016d77] transition-colors"
                >
                    Verify Code
                </button>
            </form>
        </>
    );

    const renderResetForm = () => (
        <>
            <button
                onClick={() => setFormState('otp')}
                className="mb-8 text-[#01818E] hover:text-[#016d77] flex items-center"
            >
                <ArrowLeft size={20} className="mr-2"/>
                Back
            </button>

            <div className="text-center mb-8">
                <Lock size={48} className="text-[#01818E] mx-auto mb-4"/>
                <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
                <p className="mt-2 text-gray-600">
                    Create a new password for your account
                </p>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                            className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#01818E] text-white p-3 rounded-lg hover:bg-[#016d77] transition-colors"
                >
                    Reset Password
                </button>
            </form>
        </>
    );

    return (
        <div className="min-h-full grid md:grid-cols-2 bg-white rounded-lg">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {formState === 'login' && renderLoginForm()}
                    {formState === 'forgot' && renderForgotForm()}
                    {formState === 'otp' && renderOTPForm()}
                    {formState === 'reset' && renderResetForm()}
                </div>
            </div>


            <div className="hidden md:block relative bg-[#01818E]">
                <div className="absolute inset-0 bg-[#01818E] mix-blend-multiply"></div>
                <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2000&h=2000"
                alt="Veterinary Care"
                className="object-cover w-full h-full mix-blend-overlay"
            />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                    <div className="max-w-xl text-center  text-white">
                        <h1 className="text-4xl font-bold text-right mb-4 ">
                            Dr.AshanLanka
                        </h1>
                        <h1 className="text-4xl font-bold text-right mb-4">
                            <span className={"text-primary"}>Veterinary</span> Hospital
                        </h1>
                        {/*<p className="text-3xl font-light text-white/90 mb-2">*/}
                        {/*    Veterinary Hospital*/}
                        {/*</p>*/}
                        <p className="text-sm text-right max-w-md text-white/50 ">
                            Join our community of pet owners and provide the best care for your beloved companions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;