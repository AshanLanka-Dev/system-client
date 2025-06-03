import { Calendar, Clock, ArrowRight, Heart, Activity, Bell } from 'lucide-react';
import { useState, useEffect } from "react";

// Mock user data - in a real app, this would come from authentication
const user = {
    name: "Hansaka Rathnayake",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
};

function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const upcomingVaccinations = [
        {
            petName: 'Max',
            vaccineName: 'Rabies Vaccination',
            dueDate: '2024-03-25',
            status: 'Due Soon',
            priority: 'high'
        },
        {
            petName: 'Bella',
            vaccineName: 'DHPP Booster',
            dueDate: '2024-04-02',
            status: 'Scheduled',
            priority: 'medium'
        },
    ];

    const petProfiles = [
        {
            id: 1,
            name: 'Max',
            breed: 'Golden Retriever',
            age: '3 years',
            health: 'Excellent',
            image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&q=80&w=300&h=300',
        },
        {
            id: 2,
            name: 'Bella',
            breed: 'Persian Cat',
            age: '2 years',
            health: 'Good',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300&h=300',
        },
        {
            id: 3,
            name: 'Luna',
            breed: 'British Shorthair',
            age: '4 years',
            health: 'Excellent',
            image: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&q=80&w=300&h=300',
        }
    ];

    const upcomingAppointment = {
        number: 'APT-123456',
        date: '2024-03-25',
        time: '10:00 AM',
        pets: ['Max', 'Bella'],
        type: 'Regular Checkup',
        veterinarian: 'Dr. Sarah Johnson'
    };

    const stats = [
        { label: 'Total Pets', value: '5', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
        { label: 'Health Score', value: '98%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Due Vaccines', value: '2', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-50' }
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-green-100 text-green-800 border-green-200';
        }
    };

    const getHealthColor = (health) => {
        switch (health) {
            case 'Excellent': return 'text-emerald-600 bg-emerald-50';
            case 'Good': return 'text-blue-600 bg-blue-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="min-h-screen p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800 mb-1">
                                    {getGreeting()}, {user.name}!
                                </h1>
                                <p className="text-slate-600 text-lg">Welcome back to your pet care center</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-slate-500 mb-1">Today</p>
                            <p className="text-xl font-semibold text-slate-700">
                                {currentTime.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm font-medium mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${stat.bg}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Upcoming Vaccinations */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-teal-50 rounded-xl">
                                    <Calendar className="w-6 h-6 text-teal-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">Vaccination Schedule</h2>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {upcomingVaccinations.map((vaccination, index) => (
                                <div
                                    key={index}
                                    className="group bg-slate-50/50 hover:bg-white rounded-xl p-5 border border-slate-200/50 hover:border-teal-200 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-slate-800 text-lg mb-1">{vaccination.petName}</h3>
                                            <p className="text-slate-600 mb-2">{vaccination.vaccineName}</p>
                                            <p className="text-sm text-slate-500">Due: {vaccination.dueDate}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-xs font-semibold px-3 py-2 rounded-full border ${getPriorityColor(vaccination.priority)}`}>
                                                {vaccination.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Appointment */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-50 rounded-xl">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800">Next Appointment</h2>
                            </div>
                        </div>
                        {upcomingAppointment ? (
                            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800 mb-1">{upcomingAppointment.number}</h3>
                                        <p className="text-slate-600">{upcomingAppointment.type}</p>
                                    </div>
                                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">
                                        Confirmed
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-slate-500 mb-1">Date & Time</p>
                                        <p className="font-semibold text-slate-800">{upcomingAppointment.date}</p>
                                        <p className="font-semibold text-slate-800">{upcomingAppointment.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 mb-1">Veterinarian</p>
                                        <p className="font-semibold text-slate-800">{upcomingAppointment.veterinarian}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-slate-500 text-sm mb-2">Pets attending</p>
                                    <div className="flex flex-wrap gap-2">
                                        {upcomingAppointment.pets.map((pet, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-white text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                                                {pet}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-slate-600 text-center py-8">No upcoming appointments scheduled</p>
                        )}
                    </div>
                </div>

                {/* Pet Profiles */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-rose-50 rounded-xl">
                                <Heart className="w-6 h-6 text-rose-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800">Your Pets</h2>
                        </div>
                        <button className="group flex items-center space-x-2 px-4 py-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-all duration-300">
                            <span className="font-semibold">View All</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {petProfiles.map((pet) => (
                            <div key={pet.id} className="group bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-slate-200/50 hover:border-teal-200 hover:shadow-lg transition-all duration-300">
                                <div className="relative mb-4">
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="w-full h-48 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
                                    />
                                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${getHealthColor(pet.health)}`}>
                                        {pet.health}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl text-slate-800">{pet.name}</h3>
                                    <p className="text-slate-600 font-medium">{pet.breed}</p>
                                    <p className="text-slate-500">{pet.age}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;