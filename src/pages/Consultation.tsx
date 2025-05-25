import React, { useState } from 'react';
import { Send, ImagePlus, X } from 'lucide-react';

interface Pet {
    id: number;
    name: string;
    type: string;
    breed: string;
}

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    experience: string;
    image: string;
    status: 'online' | 'offline';
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'doctor';
    timestamp: string;
    image?: string;
}

function Consultation() {
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Mock data
    const pets: Pet[] = [
        { id: 1, name: 'Max', type: 'Dog', breed: 'Golden Retriever' },
        { id: 2, name: 'Bella', type: 'Cat', breed: 'Persian' },
    ];

    const doctors: Doctor[] = [
        {
            id: 1,
            name: 'Dr. Sarah Wilson',
            specialization: 'Small Animal Medicine',
            experience: '8 years',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
            status: 'online',
        },
        {
            id: 2,
            name: 'Dr. Ashan Lanka',
            specialization: 'Emergency Medicine',
            experience: '12 years',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
            status: 'offline',
        },
    ];

    const [messages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! How can I help you today?",
            sender: 'doctor',
            timestamp: '10:30 AM',
        },
        {
            id: 2,
            text: "My pet has been showing signs of lethargy",
            sender: 'user',
            timestamp: '10:32 AM',
        },
    ]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = () => {
        if (message.trim() || selectedImage) {
            // Implement message sending logic here
            console.log('Sending message:', { message, image: selectedImage });
            setMessage('');
            setSelectedImage(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto ">
            <h1 className="text-3xl font-bold text-secondary mb-6">Online Consultation</h1>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Left Sidebar - Pet Selection and Doctor List */}
                <div className="space-y-6">
                    {/* Pet Selection */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-4">Select Pet</h2>
                        <select
                            className="w-full p-2 border rounded-lg bg-white"
                            onChange={(e) => setSelectedPet(pets.find(p => p.id === Number(e.target.value)) || null)}
                            value={selectedPet?.id || ''}
                        >
                            <option value="">Choose a pet</option>
                            {pets.map(pet => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.name} ({pet.type})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Doctor List */}
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-lg font-semibold mb-4">Available Doctors</h2>
                        <div className="space-y-4">
                            {doctors.map(doctor => (
                                <div
                                    key={doctor.id}
                                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                                        selectedDoctor?.id === doctor.id
                                            ? 'border-primary bg-primary/5'
                                            : 'border-gray-200 hover:border-primary'
                                    }`}
                                    onClick={() => setSelectedDoctor(doctor)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{doctor.name}</h3>
                                            <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                            <p className="text-xs text-gray-500">{doctor.experience} experience</p>
                                        </div>
                                        <span
                                            className={`ml-auto px-2 py-1 rounded-full text-xs ${
                                                doctor.status === 'online'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                        >
                      {doctor.status}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Section */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-md">
                    {/* Chat Header */}
                    <div className="p-4 border-b">
                        {selectedDoctor ? (
                            <div className="flex items-center space-x-3">
                                <img
                                    src={selectedDoctor.image}
                                    alt={selectedDoctor.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold">{selectedDoctor.name}</h3>
                                    <p className="text-sm text-gray-600">{selectedDoctor.specialization}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">Select a doctor to start consultation</p>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${
                                        msg.sender === 'user'
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    <p>{msg.text}</p>
                                    {msg.image && (
                                        <img
                                            src={msg.image}
                                            alt="Attached"
                                            className="mt-2 rounded-lg max-w-full"
                                        />
                                    )}
                                    <p className="text-xs mt-1 opacity-70">{msg.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t">
                        {selectedImage && (
                            <div className="mb-2 relative inline-block">
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    className="h-20 w-20 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            <label className="cursor-pointer text-primary hover:text-[#016d77]">
                                <ImagePlus size={24} />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-primary"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-primary text-white p-2 rounded-lg hover:bg-[#016d77] transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Consultation;