import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, RotateCcw } from 'lucide-react';
import AuthService from "../services/auth/AuthService.ts";

function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();
    const mobile = location.state?.mobile;

    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const authService = AuthService();

    // Refs for OTP inputs
    const otpRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    // Redirect if no mobile number
    useEffect(() => {
        if (!mobile) {
            navigate('/forgot-password');
        }
    }, [mobile, navigate]);

    // Countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit verification code.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await authService.verifyOTP({ mobile, otp: otpCode });

            if (response.status === 200) {
                // Navigate to reset password with verification token
                navigate('/reset-password', {
                    state: {
                        mobile,
                        verificationToken: response.data.token
                    }
                });
            } else {
                throw new Error("Invalid verification code");
            }
        } catch (error) {
            setError('Invalid verification code. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);

            // Move to next input if value is entered
            if (value !== '' && index < 5) {
                otpRefs[index + 1].current?.focus();
            }

            // Clear error when user starts typing
            if (error) setError('');
        }
    };

    const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            otpRefs[index - 1].current?.focus();
        }
    };

    const handleResendOTP = async () => {
        if (!canResend) return;

        setIsLoading(true);
        setError('');

        try {
            await authService.sendOTP({ mobile });
            setCountdown(60);
            setCanResend(false);
            setOTP(['', '', '', '', '', '']);
            otpRefs[0].current?.focus();
        } catch (error) {
            setError('Failed to resend verification code. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!mobile) {
        return null; // This will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <Link
                        to="/forgot-password"
                        className="inline-flex items-center text-[#01818E] hover:text-[#016d77] mb-8 font-medium transition-colors group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01818E] to-[#20B2AA] rounded-full mb-4">
                            <Shield size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Number</h2>
                        <p className="text-gray-600 mb-2">
                            We've sent a 6-digit code to
                        </p>
                        <p className="font-semibold text-[#01818E]">+94 {mobile}</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
                                Enter Verification Code
                            </label>
                            <div className="flex justify-center space-x-3">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <input
                                        key={index}
                                        ref={otpRefs[index]}
                                        type="text"
                                        maxLength={1}
                                        value={otp[index]}
                                        onChange={(e) => handleOTPChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                                        className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || otp.join('').length !== 6}
                            className="w-full bg-gradient-to-r from-[#01818E] to-[#20B2AA] text-white p-4 rounded-xl hover:from-[#016d77] hover:to-[#1a9a95] transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Verifying...
                                </div>
                            ) : (
                                'Verify Code'
                            )}
                        </button>

                        <div className="text-center pt-4">
                            <p className="text-gray-600 mb-2">Didn't receive the code?</p>
                            {canResend ? (
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    className="inline-flex items-center text-[#01818E] hover:text-[#016d77] font-semibold transition-colors group"
                                >
                                    <RotateCcw size={16} className="mr-1 group-hover:rotate-180 transition-transform duration-300" />
                                    Resend Code
                                </button>
                            ) : (
                                <p className="text-gray-500">
                                    Resend code in {countdown}s
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VerifyOTP;