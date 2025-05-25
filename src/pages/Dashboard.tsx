import { Calendar, Clock, ArrowRight } from 'lucide-react';
import {useState, useEffect, useContext} from "react";
import {useAppContext} from "../context/AppContext.tsx";

// Mock user data - in a real app, this would come from authentication
const user = {
    name: "Hansaka Rathnayake",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
};

function Dashboard() {

    const {user, setUser} = useAppContext();


    useEffect(() => {

    },[])

    const upcomingVaccinations = [
        {
            petName: 'Max',
            vaccineName: 'Rabies',
            dueDate: '2024-03-25',
            status: 'Upcoming',
        },
        {
            petName: 'Bella',
            vaccineName: 'DHPP',
            dueDate: '2024-04-02',
            status: 'Upcoming',
        },
    ];

    const petProfiles = [
        {
            id: 1,
            name: 'Max',
            breed: 'Golden Retriever',
            age: '3 years',
            image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&q=80&w=300&h=300',
        },
        {
            id: 2,
            name: 'Bella',
            breed: 'Persian Cat',
            age: '2 years',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300&h=300',
        },
        {
            id: 3,
            name: 'Bella',
            breed: 'Persian Cat',
            age: '2 years',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300&h=300',
        },
        {
            id: 4,
            name: 'Bella',
            breed: 'Persian Cat',
            age: '2 years',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300&h=300',
        },
        {
            id: 5,
            name: 'Bella',
            breed: 'Persian Cat',
            age: '2 years',
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300&h=300',
        },
    ];

    // Mock appointment data
    const upcomingAppointment = {
        number: 'APT-123456',
        date: '2024-03-25',
        time: '10:00 AM',
        pets: ['Max', 'Bella'],
    };

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 font-">
                <div className="flex items-center space-x-4">
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-[#01818E]"
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-[#000000]">
                            {getGreeting()}, {user.name}!
                        </h2>
                        <p className="text-gray-600">Welcome to your pet management dashboard</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Upcoming Vaccinations */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[#01818E]">
                            Upcoming Vaccinations
                        </h2>
                        <Calendar className="text-[#01818E]" />
                    </div>
                    <div className="space-y-4">
                        {upcomingVaccinations.map((vaccination, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                            >
                                <div>
                                    <h3 className="font-semibold">{vaccination.petName}</h3>
                                    <p className="text-sm text-gray-600">{vaccination.vaccineName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{vaccination.dueDate}</p>
                                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    {vaccination.status}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointment */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-[#01818E]">
                            Next Appointment
                        </h2>
                        <Clock className="text-[#01818E]" />
                    </div>
                    {upcomingAppointment ? (
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-semibold text-lg">{upcomingAppointment.number}</h3>
                                <span className="px-3 py-1 bg-[#01818E]/10 text-[#01818E] rounded-full text-sm">
                  Upcoming
                </span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium">Date:</span> {upcomingAppointment.date}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Time:</span> {upcomingAppointment.time}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium">Pets:</span> {upcomingAppointment.pets.join(', ')}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600">No upcoming appointments</p>
                    )}
                </div>
            </div>

            {/* Pet Profiles */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-[#01818E]">Pet Profiles</h2>
                    <button className="text-[#01818E] hover:text-[#016d77] flex items-center">
                        View All <ArrowRight size={16} className="ml-1" />
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {petProfiles.map((pet) => (
                        <div key={pet.id} className="bg-gray-50 rounded-lg p-4">
                            <img
                                src={pet.image}
                                alt={pet.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-semibold text-lg">{pet.name}</h3>
                            <p className="text-gray-600">{pet.breed}</p>
                            <p className="text-gray-600">{pet.age}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;