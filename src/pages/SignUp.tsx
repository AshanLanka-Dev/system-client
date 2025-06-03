import React, { useState, useEffect } from 'react';
import {
    User,
    Phone,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    PawPrint
} from 'lucide-react';
import {Link} from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        hasMinLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    // Check password strength
    useEffect(() => {
        const password = formData.password;
        setPasswordStrength({
            hasMinLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    }, [formData.password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!Object.values(passwordStrength).every(Boolean)) {
            setError('Password does not meet all requirements.');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            console.log('Registration data:', formData);
            setIsLoading(false);
            // Handle success or error here
        }, 2000);
    };

    const formatMobileNumber = (value) => {
        const numbers = value.replace(/\D/g, '');

        if (numbers.length <= 2) {
            return numbers;
        } else if (numbers.length <= 5) {
            return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
        } else if (numbers.length <= 8) {
            return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5)}`;
        } else {
            return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5, 9)}`;
        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        const formatted = formatMobileNumber(value);
        setFormData({ ...formData, mobile: formatted });
    };

    const getStrengthColor = (isValid) => {
        return isValid ? 'text-green-600' : 'text-gray-400';
    };

    return (
        <div className="h-full flex bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
            {/* Left Side - Form Container */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
                <div className="w-full max-w-md h-full max-h-[800px] flex flex-col">
                    {/* Header - Fixed */}
                    <div className="text-center mb-6 flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01818E] to-[#20B2AA] rounded-full mb-4">
                            <PawPrint size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600 text-sm lg:text-base">
                            Join our community of pet owners
                        </p>
                    </div>

                    {/* Fixed Height Form Container */}
                    <div className="flex-1 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-0">
                        {/* Error Message - Fixed at top */}
                        {error && (
                            <div className="flex-shrink-0 m-6 mb-0 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Scrollable Form Content */}
                        <div
                            className="flex-1 overflow-y-auto px-6 py-6 min-h-0"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#01818E #f1f5f9'
                            }}
                        >
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                    .form-scroll::-webkit-scrollbar {
                                        width: 6px;
                                    }
                                    .form-scroll::-webkit-scrollbar-track {
                                        background: #f1f5f9;
                                        border-radius: 3px;
                                    }
                                    .form-scroll::-webkit-scrollbar-thumb {
                                        background: linear-gradient(to bottom, #01818E, #20B2AA);
                                        border-radius: 3px;
                                    }
                                    .form-scroll::-webkit-scrollbar-thumb:hover {
                                        background: linear-gradient(to bottom, #016d77, #1a9a95);
                                    }
                                    @keyframes fadeIn {
                                        from {
                                            opacity: 0;
                                            transform: translateY(-10px);
                                        }
                                        to {
                                            opacity: 1;
                                            transform: translateY(0);
                                        }
                                    }
                                    .animate-fadeIn {
                                        animation: fadeIn 0.3s ease-out;
                                    }
                                `
                            }} />

                            <div onSubmit={handleSubmit} className="space-y-5">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="pl-10 w-full p-3 lg:p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="pl-10 w-full p-3 lg:p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Mobile Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                                            <Phone className="text-gray-400 mr-2" size={18} />
                                            <span className="text-gray-500 text-sm">+94</span>
                                        </div>
                                        <input
                                            type="tel"
                                            value={formData.mobile}
                                            onChange={handleMobileChange}
                                            className="pl-16 w-full p-3 lg:p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                                            placeholder="77 123 4567"
                                            required
                                            maxLength={12}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Enter your mobile number without +94</p>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-10 pr-12 w-full p-3 lg:p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                                            placeholder="Create password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>

                                    {/* Password Strength Indicator */}
                                    {formData.password && (
                                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100 animate-fadeIn">
                                            <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                                            <div className="grid grid-cols-1 gap-1 text-xs">
                                                <div className={`flex items-center transition-colors duration-200 ${getStrengthColor(passwordStrength.hasMinLength)}`}>
                                                    <CheckCircle2 size={12} className="mr-2 flex-shrink-0" />
                                                    <span>At least 8 characters</span>
                                                </div>
                                                <div className={`flex items-center transition-colors duration-200 ${getStrengthColor(passwordStrength.hasUpperCase)}`}>
                                                    <CheckCircle2 size={12} className="mr-2 flex-shrink-0" />
                                                    <span>One uppercase letter</span>
                                                </div>
                                                <div className={`flex items-center transition-colors duration-200 ${getStrengthColor(passwordStrength.hasLowerCase)}`}>
                                                    <CheckCircle2 size={12} className="mr-2 flex-shrink-0" />
                                                    <span>One lowercase letter</span>
                                                </div>
                                                <div className={`flex items-center transition-colors duration-200 ${getStrengthColor(passwordStrength.hasNumber)}`}>
                                                    <CheckCircle2 size={12} className="mr-2 flex-shrink-0" />
                                                    <span>One number</span>
                                                </div>
                                                <div className={`flex items-center transition-colors duration-200 ${getStrengthColor(passwordStrength.hasSpecialChar)}`}>
                                                    <CheckCircle2 size={12} className="mr-2 flex-shrink-0" />
                                                    <span>One special character</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className="pl-10 pr-12 w-full p-3 lg:p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                                            placeholder="Confirm password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                        <p className="text-xs text-red-600 mt-1 animate-fadeIn">Passwords do not match</p>
                                    )}
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading || !Object.values(passwordStrength).every(Boolean) || formData.password !== formData.confirmPassword}
                                        className="w-full bg-gradient-to-r from-[#01818E] to-[#20B2AA] text-white p-3 lg:p-4 rounded-xl hover:from-[#016d77] hover:to-[#1a9a95] transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm lg:text-base"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                Creating Account...
                                            </div>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </button>
                                </div>

                                {/* Sign In Link */}
                                <div className="text-center pt-2 pb-4">
                                    <p className="text-gray-600 text-sm">
                                        Already have an account?{' '}
                                        <Link to="/login" className="text-[#01818E] hover:text-[#016d77] font-semibold transition-colors cursor-pointer">
                                            Sign in here
                                        </Link>

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Professional Image with Gradient */}
            <div className="hidden lg:flex flex-1 relative overflow-hidden">
                <div className="relative w-full h-full">
                    {/* Background Image */}
                    <img
                        className="absolute inset-0 object-cover w-full h-full"
                        src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=2000&h=2000"
                        alt="Pet Care Professional"
                    />

                    {/* Main Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#01818E]/90 via-[#20B2AA]/80 to-[#01818E]/95"></div>

                    {/* Secondary Gradient for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col justify-center items-center w-full h-full px-12">
                        <div className="flex-1 flex flex-col justify-center items-center space-y-12">
                            {/* Logo Container */}
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                                <PawPrint size={40} className="text-white" />
                            </div>

                            {/* Main Content */}
                            <div className="text-center space-y-6">
                                <h1 className="text-5xl font-bold text-white tracking-wide leading-tight">
                                    Pet Care
                                    <span className="block text-4xl font-light text-white/90 mt-2">
                                        Excellence
                                    </span>
                                </h1>
                                <div className="w-20 h-px bg-white/40 mx-auto"></div>
                                <p className="text-white/80 text-lg max-w-md leading-relaxed">
                                    Professional veterinary care and pet wellness services for your beloved companions
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="w-full h-20 flex justify-center items-center">
                            <span className="text-white/60 text-xs tracking-widest font-medium">
                                TRUSTED • PROFESSIONAL • CARING
                            </span>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-32 right-8 w-px h-16 bg-gradient-to-t from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute top-32 left-8 w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;