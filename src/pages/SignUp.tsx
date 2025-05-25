import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, PawPrint } from 'lucide-react';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-full grid md:grid-cols-2 bg-white rounded-lg">
            {/* Left Side - Image */}
            <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-[#01818E] mix-blend-multiply"></div>
                <img
                    src="https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&q=80&w=2000&h=2000"
                    alt="Veterinary Care"
                    className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex flex-col items-left justify-center text-white p-12">
                    <PawPrint size={64} className="mb-10 text-primary " />
                    <h1 className="text-4xl font-bold text-left mb-4 ">
                        Dr.AshanLanka
                    </h1>
                    <h1 className="text-4xl font-bold text-left mb-4">
                        <span className={"text-primary"}>Veterinary</span> Hospital
                    </h1>
                    <p className="text-sm text-left max-w-md text-white/50">
                        Join our community of pet owners and provide the best care for your beloved companions
                    </p>
                </div>
            </div>

            {/* Right Side - Sign Up Form */}
            <div className="flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-left mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-600">
                            Register as a pet owner to access our services
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#01818E] text-white p-3 rounded-lg hover:bg-[#016d77] transition-colors flex items-center justify-center space-x-2"
                        >
                            <span>Create Account</span>
                        </button>

                        <p className="text-center text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-[#01818E] hover:text-[#016d77] font-medium">
                                LogIn
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;