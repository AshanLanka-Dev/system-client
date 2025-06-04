import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import AuthService from "../services/auth/AuthService.ts";

function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const { mobile, verificationToken } = location.state || {};

    const [formData, setFormData] = useState({
        newPassword: '',
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

    const authService = AuthService();

    // Redirect if no verification token
    useEffect(() => {
        if (!mobile || !verificationToken) {
            navigate('/forgot-password');
        }
    }, [mobile, verificationToken, navigate]);

    // Check password strength
    useEffect(() => {
        const password = formData.newPassword;
        setPasswordStrength({
            hasMinLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasLowerCase: /[a-z]/.test(password),
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        });
    }, [formData.newPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!Object.values(passwordStrength).every(Boolean)) {
            setError('Password does not meet all requirements.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await authService.resetPassword({
                mobile,
                verificationToken,
                newPassword: formData.newPassword,
            });

            if (response.status === 200) {
                // Show success message and redirect to login
                navigate('/login', {
                    state: {
                        message: 'Password reset successfully. Please login with your new password.'
                    }
                });
            } else {
                throw new Error("Failed to reset password");
            }
        } catch (error) {
            setError('Failed to reset password. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStrengthColor = (isValid: boolean) => {
        return isValid ? 'text-green-600' : 'text-gray-400';
    };

    if (!mobile || !verificationToken) {
        return null; // This will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <Link
                        to="/verify-otp"
                        state={{ mobile }}
                        className="inline-flex items-center text-[#01818E] hover:text-[#016d77] mb-8 font-medium transition-colors group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </Link>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#01818E] to-[#20B2AA] rounded-full mb-4">
                            <Lock size={32} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                        <p className="text-gray-600">
                            Create a strong new password for your account
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
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    className="pl-10 pr-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            <div className="mt-3 space-y-2">
                                <p className="text-xs font-medium text-gray-700">Password must contain:</p>
                                <div className="grid grid-cols-1 gap-1 text-xs">
                                    <div className={`flex items-center ${getStrengthColor(passwordStrength.hasMinLength)}`}>
                                        <CheckCircle2 size={12} className="mr-1" />
                                        At least 8 characters
                                    </div>
                                    <div className={`flex items-center ${getStrengthColor(passwordStrength.hasUpperCase)}`}>
                                        <CheckCircle2 size={12} className="mr-1" />
                                        One uppercase letter
                                    </div>
                                    <div className={`flex items-center ${getStrengthColor(passwordStrength.hasLowerCase)}`}>
                                        <CheckCircle2 size={12} className="mr-1" />
                                        One lowercase letter
                                    </div>
                                    <div className={`flex items-center ${getStrengthColor(passwordStrength.hasNumber)}`}>
                                        <CheckCircle2 size={12} className="mr-1" />
                                        One number
                                    </div>
                                    <div className={`flex items-center ${getStrengthColor(passwordStrength.hasSpecialChar)}`}>
                                        <CheckCircle2 size={12} className="mr-1" />
                                        One special character
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="pl-10 pr-12 w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#01818E] focus:border-transparent transition-all duration-200"
                                    placeholder="Confirm new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                                <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !Object.values(passwordStrength).every(Boolean) || formData.newPassword !== formData.confirmPassword}
                            className="w-full bg-gradient-to-r from-[#01818E] to-[#20B2AA] text-white p-4 rounded-xl hover:from-[#016d77] hover:to-[#1a9a95] transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Resetting Password...
                                </div>
                            ) : (
                                'Reset Password'
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

export default ResetPassword;