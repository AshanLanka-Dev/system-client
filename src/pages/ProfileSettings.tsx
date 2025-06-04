import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Shield, AlertTriangle, CheckCircle, Edit3, Save, X } from 'lucide-react';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    mobile: string;
    nic: string;
    image: string;
    isVerified: boolean;
}

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function DialogBox({ isOpen, onClose, title, children }: DialogBoxProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ProfileSettings() {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState<keyof UserProfile | null>(null);
    const [profile, setProfile] = useState<UserProfile>({
        firstName: 'John',
        lastName: 'Anderson',
        email: 'john.anderson@example.com',
        address: '123 Pet Street, Animal City',
        mobile: '+94 71 234 5678',
        nic: '199912345678',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
        isVerified: true,
    });

    const handleEdit = (field: keyof UserProfile) => {
        setIsEditing(field);
    };

    const handleSave = () => {
        setIsEditing(null);
        // Save changes to backend
        console.log('Saving profile:', profile);
    };

    const handleCancel = () => {
        setIsEditing(null);
        // In a real app, you'd revert changes here
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, upload to storage and get URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile({ ...profile, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteAccount = () => {
        // Handle account deletion
        console.log('Deleting account');
        setIsDeleteDialogOpen(false);
    };

    const ProfileField = ({
                              field,
                              label,
                              type = 'text',
                              icon: Icon,
                              isTextarea = false
                          }: {
        field: keyof UserProfile;
        label: string;
        type?: string;
        icon: React.ComponentType<any>;
        isTextarea?: boolean;
    }) => {
        const isCurrentlyEditing = isEditing === field;
        const value = profile[field] as string;

        return (
            <div className="group">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                    {label}
                </label>
                <div className="relative">
                    <Icon className="absolute left-4 top-4 text-slate-400 group-focus-within:text-teal-600 transition-colors duration-200" size={20} />
                    {isTextarea ? (
                        <textarea
                            value={value}
                            onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                            disabled={!isCurrentlyEditing}
                            rows={3}
                            className={`pl-12 pr-20 w-full p-4 border rounded-xl transition-all duration-300 resize-none ${
                                isCurrentlyEditing
                                    ? 'border-teal-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-md'
                                    : 'border-slate-200 bg-slate-50/50 text-slate-700'
                            }`}
                        />
                    ) : (
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                            disabled={!isCurrentlyEditing}
                            className={`pl-12 pr-20 w-full p-4 border rounded-xl transition-all duration-300 ${
                                isCurrentlyEditing
                                    ? 'border-teal-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-md'
                                    : 'border-slate-200 bg-slate-50/50 text-slate-700'
                            }`}
                        />
                    )}
                    <div className="absolute right-4 top-4 flex space-x-2">
                        {isCurrentlyEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                                    title="Save changes"
                                >
                                    <Save size={16} />
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200"
                                    title="Cancel changes"
                                >
                                    <X size={16} />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => handleEdit(field)}
                                className="p-1.5 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                title="Edit field"
                            >
                                <Edit3 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen p-4 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Profile Settings</h1>
                    <p className="text-slate-600">Manage your personal information and account preferences</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Profile Header with Gradient Background */}
                    <div className="relative h-40 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative group">
                                <img
                                    src={profile.image}
                                    alt={`${profile.firstName} ${profile.lastName}`}
                                    className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-xl"
                                />
                                <label className="absolute bottom-2 right-2 bg-white p-3 rounded-xl shadow-lg cursor-pointer hover:bg-slate-50 transition-all duration-300 group-hover:scale-110">
                                    <Camera size={18} className="text-slate-600" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 px-8 pb-8">
                        {/* User Info and Verification */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                                    {profile.firstName} {profile.lastName}
                                </h2>
                                <p className="text-slate-600">{profile.email}</p>
                            </div>
                            <div className="mt-4 sm:mt-0">
                                {profile.isVerified ? (
                                    <div className="flex items-center text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                                        <CheckCircle size={18} className="mr-2" />
                                        <span className="font-semibold">Verified Account</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-200">
                                        <AlertTriangle size={18} className="mr-2" />
                                        <span className="font-semibold">Unverified Account</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Fields */}
                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <ProfileField
                                    field="firstName"
                                    label="First Name"
                                    icon={User}
                                />
                                <ProfileField
                                    field="lastName"
                                    label="Last Name"
                                    icon={User}
                                />
                            </div>

                            <ProfileField
                                field="email"
                                label="Email Address"
                                type="email"
                                icon={Mail}
                            />

                            <ProfileField
                                field="mobile"
                                label="Mobile Number"
                                type="tel"
                                icon={Phone}
                            />

                            <ProfileField
                                field="nic"
                                label="NIC Number"
                                icon={Shield}
                            />

                            <ProfileField
                                field="address"
                                label="Address"
                                icon={MapPin}
                                isTextarea={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 px-8 py-6 border-b border-red-100">
                        <h3 className="text-xl font-bold text-red-800 mb-1">Danger Zone</h3>
                        <p className="text-red-600 text-sm">Irreversible and destructive actions</p>
                    </div>
                    <div className="p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="mb-4 sm:mb-0">
                                <h4 className="font-semibold text-slate-800 mb-1">Delete Account</h4>
                                <p className="text-slate-600 text-sm">
                                    Permanently delete your account and all associated data
                                </p>
                            </div>
                            <button
                                onClick={() => setIsDeleteDialogOpen(true)}
                                className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                            >
                                <AlertTriangle size={18} />
                                <span>Delete Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Account Dialog */}
            <DialogBox
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                title="Delete Account"
            >
                <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl">
                        <h3 className="font-bold flex items-center text-lg mb-3">
                            <AlertTriangle className="mr-2" size={20} />
                            Warning: This action cannot be undone
                        </h3>
                        <p className="text-sm mb-4">
                            Deleting your account will permanently remove all your data, including:
                        </p>
                        <ul className="text-sm space-y-1 ml-4">
                            <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                                Personal information and profile data
                            </li>
                            <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                                Pet profiles and medical history
                            </li>
                            <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                                Appointment history and records
                            </li>
                            <li className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></div>
                                All associated veterinary records
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                        <button
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold transition-all duration-200 hover:shadow-lg"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </DialogBox>
        </div>
    );
}

export default ProfileSettings;