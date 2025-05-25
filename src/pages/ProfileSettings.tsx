import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Shield, AlertTriangle } from 'lucide-react';
import DialogBox from '../components/DialogBox';

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

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Profile Header */}
                <div className="relative h-32 bg-gradient-to-r from-[#01818E] to-[#016d77]">
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative">
                            <img
                                src={profile.image}
                                alt={`${profile.firstName} ${profile.lastName}`}
                                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                            />
                            <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50">
                                <Camera size={20} className="text-gray-600" />
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
                    {/* Verification Badge */}
                    <div className="flex items-center mb-6">
                        {profile.isVerified ? (
                            <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                <Shield size={16} className="mr-1" />
                                <span className="text-sm font-medium">Verified Account</span>
                            </div>
                        ) : (
                            <div className="flex items-center text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                                <AlertTriangle size={16} className="mr-1" />
                                <span className="text-sm font-medium">Unverified Account</span>
                            </div>
                        )}
                    </div>

                    {/* Profile Fields */}
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={profile.firstName}
                                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                        disabled={isEditing !== 'firstName'}
                                        className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E] disabled:bg-gray-50"
                                    />
                                    <button
                                        onClick={() => isEditing === 'firstName' ? handleSave() : handleEdit('firstName')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#01818E] hover:text-[#016d77]"
                                    >
                                        {isEditing === 'firstName' ? 'Save' : 'Edit'}
                                    </button>
                                </div>
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        value={profile.lastName}
                                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                        disabled={isEditing !== 'lastName'}
                                        className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E] disabled:bg-gray-50"
                                    />
                                    <button
                                        onClick={() => isEditing === 'lastName' ? handleSave() : handleEdit('lastName')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#01818E] hover:text-[#016d77]"
                                    >
                                        {isEditing === 'lastName' ? 'Save' : 'Edit'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    disabled={isEditing !== 'email'}
                                    className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E] disabled:bg-gray-50"
                                />
                                <button
                                    onClick={() => isEditing === 'email' ? handleSave() : handleEdit('email')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#01818E] hover:text-[#016d77]"
                                >
                                    {isEditing === 'email' ? 'Save' : 'Edit'}
                                </button>
                            </div>
                        </div>

                        {/* Mobile */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="tel"
                                    value={profile.mobile}
                                    onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                                    disabled={isEditing !== 'mobile'}
                                    className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E] disabled:bg-gray-50"
                                />
                                <button
                                    onClick={() => isEditing === 'mobile' ? handleSave() : handleEdit('mobile')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#01818E] hover:text-[#016d77]"
                                >
                                    {isEditing === 'mobile' ? 'Save' : 'Edit'}
                                </button>
                            </div>
                        </div>

                        {/* NIC */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                NIC Number
                            </label>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={profile.nic}
                                    onChange={(e) => setProfile({ ...profile, nic: e.target.value })}
                                    disabled={isEditing !== 'nic'}
                                    className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E] disabled:bg-gray-50"
                                />
                                <button
                                    onClick={() => isEditing === 'nic' ? handleSave() : handleEdit('nic')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#01818E] hover:text-[#016d77]"
                                >
                                    {isEditing === 'nic' ? 'Save' : 'Edit'}
                                </button>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                                <textarea
                                    value={profile.address}
                                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                    disabled={isEditing !== 'address'}
                                    rows={3}
                                    className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E] disabled:bg-gray-50"
                                />
                                <button
                                    onClick={() => isEditing === 'address' ? handleSave() : handleEdit('address')}
                                    className="absolute right-3 top-3 text-[#01818E] hover:text-[#016d77]"
                                >
                                    {isEditing === 'address' ? 'Save' : 'Edit'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Delete Account */}
                    <div className="mt-12 pt-6 border-t">
                        <button
                            onClick={() => setIsDeleteDialogOpen(true)}
                            className="text-red-600 hover:text-red-700 font-medium flex items-center"
                        >
                            <AlertTriangle size={20} className="mr-2" />
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Account Dialog */}
            <DialogBox
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                title="Delete Account"
            >
                <div className="space-y-4">
                    <div className="bg-red-50 text-red-800 p-4 rounded-lg">
                        <h3 className="font-semibold flex items-center">
                            <AlertTriangle className="mr-2" />
                            Warning: This action cannot be undone
                        </h3>
                        <p className="mt-2 text-sm">
                            Deleting your account will permanently remove all your data, including:
                        </p>
                        <ul className="mt-2 text-sm list-disc list-inside">
                            <li>Personal information</li>
                            <li>Pet profiles</li>
                            <li>Appointment history</li>
                            <li>Medical records</li>
                        </ul>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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