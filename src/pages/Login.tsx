import React, { useState } from 'react';
import { Phone, Lock, PawPrint, Heart, Shield } from 'lucide-react';
import {Link, useLocation} from "react-router-dom";
import {useAppContext} from "../context/AppContext.tsx";

function Login() {
    const [formData, setFormData] = useState({
        mobile: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const {user, setUser} = useAppContext();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            if (formData.mobile && formData.password) {
                console.log('Login successful');
                setUser({
                    name:'Test User',
                    mobile:'077-5184848',
                    role:'PetOwner'
                })
                location.pathname = '/dashboard';
            } else {
                setError('Invalid mobile number or password. Please try again.');
            }
            setIsLoading(false);
        }, 1500);
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

    return (
            <div className="h-full flex bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden mt-20">
                {/* Left Side - Form Container */}
                <div className="flex-1 flex items-center justify-center p-4 lg:p-8 h-[45rem]">
                    <div className="w-full max-w-md  flex flex-col ">
                        {/* Header */}
                        <div className="text-center mb-6 flex-shrink-0">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01818E] to-[#20B2AA] rounded-full mb-4">
                                <PawPrint size={32} className="text-white" />
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-600 text-sm lg:text-base">
                                Sign in to continue your pet care journey
                            </p>
                        </div>

                        {/* Form Container */}
                        <div className="flex-1 rounded-2xl  overflow-hidden flex flex-col  ">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
                            {/* Error Message */}
                            {error && (
                                <div className="m-6 mb-0 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            {/* Form Content */}
                            <div className="p-6">
                                <div className="space-y-5">
                                    {/* Mobile Number */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Mobile Number
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
                                                <Phone className="text-gray-400 mr-2" size={18} />
                                                <span className="text-gray-500 text-sm">+94</span>
                                            </div>
                                            <input
                                                type="tel"
                                                value={formData.mobile}
                                                onChange={handleMobileChange}
                                                className="pl-20 w-full p-3 lg:p-4 lg:pl-16 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                                                placeholder="77 123 4567"
                                                required
                                                maxLength={12}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Enter your mobile number without +94</p>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Password
                                            </label>
                                            <button
                                                type="button"
                                                className="text-sm text-[#01818E] hover:text-[#016d77]  font-medium transition-colors hover:underline"
                                                onClick={() => console.log('Navigate to forgot password')}
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" size={18} />
                                            <input
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="pl-12 w-full p-3 lg:p-4 lg:pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200 text-sm lg:text-base"
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={handleSubmit}
                                            className="w-full bg-gradient-to-r from-[#01818E] to-[#20B2AA] text-white p-3 lg:p-4 rounded-xl hover:from-[#016d77] hover:to-[#1a9a95] transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm lg:text-base"
                                        >
                                            {isLoading ? (
                                                <div className="flex items-center justify-center">
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    Signing in...
                                                </div>
                                            ) : (
                                                <span className="flex items-center justify-center">
                                                <Shield size={18} className="mr-2" />
                                                Sign In Securely
                                            </span>
                                            )}
                                        </button>
                                    </div>

                                    {/* Sign Up Link */}
                                    <div className="text-center pt-2">
                                        <p className="text-gray-600 text-sm">
                                            Don't have an account?{' '}
                                            <Link to="/signup" className="text-[#01818E] hover:text-[#016d77] font-semibold transition-colors cursor-pointer">
                                                Create account
                                            </Link>
                                        </p>
                                    </div>
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
                            src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=2000&h=2000"
                            alt="Veterinary Care - Happy pets with veterinarian"
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
                                    <PawPrint size={32} className="text-white" />
                                </div>

                                {/* Main Content */}
                                <div className="text-center space-y-6">
                                    <h1 className="text-3xl font-bold text-white tracking-wide leading-tight">
                                        Dr.AshanLanka
                                        <span className="block text-4xl font-light text-white/90 mt-2">
                                        Veterinary Hospital
                                    </span>
                                    </h1>
                                    <div className="w-20 h-px bg-white/40 mx-auto"></div>
                                    <p className="text-white/80 text-sm max-w-md leading-relaxed">
                                        Providing compassionate care for your beloved companions with advanced medical expertise
                                    </p>
                                </div>

                                {/* Feature highlights */}
                                <div className="flex justify-center space-x-8 text-sm">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto border border-white/20">
                                            <PawPrint size={20} className="text-white" />
                                        </div>
                                        <span className="text-white/80 font-s">Expert Care</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto border border-white/20">
                                            <Heart size={20} className="text-white" />
                                        </div>
                                        <span className="text-white/80 font-s">With Love</span>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto border border-white/20">
                                            <Shield size={20} className="text-white" />
                                        </div>
                                        <span className="text-white/80 font-s">24/7 Support</span>
                                    </div>
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

export default Login;