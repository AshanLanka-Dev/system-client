import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowLeft, Send, KeyRound } from 'lucide-react';
import AuthService from "../services/auth/AuthService.ts";

function ForgotPassword() {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const authService = AuthService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Call your API to send OTP
            const response = await authService.sendOTP({ mobile });

            if (response.status === 200) {
                // Navigate to OTP verification with mobile number
                navigate('/verify-otp', { state: { mobile } });
            } else {
                throw new Error("Failed to send OTP");
            }
        } catch (error) {
            setError('Failed to send verification code. Please check your mobile number and try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatMobileNumber = (value: string) => {
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

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formatted = formatMobileNumber(value);
        setMobile(formatted);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-[#01818E] hover:text-[#016d77] mb-8 font-medium transition-colors group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </Link>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01818E] to-[#20B2AA] rounded-full mb-4">
                            <KeyRound size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
                        <p className="text-gray-600">
                            Enter your mobile number to receive a verification code
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
                                    <Phone className="text-gray-400 mr-2" size={20} />
                                    <span className="text-gray-500 text-sm">+94</span>
                                </div>
                                <input
                                    type="tel"
                                    value={mobile}
                                    onChange={handleMobileChange}
                                    className="pl-16 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200"
                                    placeholder="77 123 4567"
                                    required
                                    maxLength={12}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Enter your registered mobile number</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#01818E] to-[#20B2AA] text-white p-4 rounded-xl hover:from-[#016d77] hover:to-[#1a9a95] transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] group"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Sending Code...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center">
                                    <span className="mr-2">Send Verification Code</span>
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-gray-600">
                                Remember your password?{' '}
                                <Link to="/login" className="text-[#01818E] hover:text-[#016d77] font-semibold transition-colors">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;