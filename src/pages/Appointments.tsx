// import { useState } from 'react';
// import { Calendar, Clock, Users } from 'lucide-react';
// import DialogBox from '../components/DialogBox';
//
// interface Pet {
//     id: number;
//     name: string;
//     type: string;
// }
//
// interface TimeSlot {
//     id: number;
//     time: string;
//     available: boolean;
// }
//
// function Appointments() {
//     const [selectedDate, setSelectedDate] = useState<string>('');
//     const [selectedTime, setSelectedTime] = useState<string>('');
//     const [selectedPets, setSelectedPets] = useState<number[]>([]);
//     const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
//     const [appointmentNumber, setAppointmentNumber] = useState<string>('');
//
//     // Mock data
//     const pets: Pet[] = [
//         { id: 1, name: 'Max', type: 'Dog' },
//         { id: 2, name: 'Bella', type: 'Cat' },
//         { id: 3, name: 'Charlie', type: 'Dog' },
//     ];
//
//     const timeSlots: TimeSlot[] = [
//         { id: 1, time: '09:00 AM', available: true },
//         { id: 2, time: '10:00 AM', available: true },
//         { id: 3, time: '11:00 AM', available: false },
//         { id: 4, time: '02:00 PM', available: true },
//         { id: 5, time: '03:00 PM', available: true },
//         { id: 6, time: '04:00 PM', available: true },
//     ];
//
//     const handlePetSelection = (petId: number) => {
//         setSelectedPets(prev =>
//             prev.includes(petId)
//                 ? prev.filter(id => id !== petId)
//                 : [...prev, petId]
//         );
//     };
//
//     const handleBookAppointment = () => {
//         if (!selectedDate || !selectedTime || selectedPets.length === 0) {
//             alert('Please select date, time and at least one pet');
//             return;
//         }
//         setIsConfirmDialogOpen(true);
//     };
//
//     const confirmAppointment = () => {
//         // Generate appointment number
//         const appointmentNum = `APT-${Date.now().toString().slice(-6)}`;
//         setAppointmentNumber(appointmentNum);
//         setIsConfirmDialogOpen(false);
//
//         // Show success dialog
//         setSuccessDialogOpen(true);
//     };
//
//     const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
//
//     return (
//         <div className="max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold text-[#000000] mb-8">Book an Appointment</h1>
//
//             <div className="grid md:grid-cols-2 gap-8">
//                 {/* Date Selection */}
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                     <div className="flex items-center space-x-2 mb-4">
//                         <Calendar className="text-[#01818E]" />
//                         <h2 className="text-xl font-semibold">Select Date</h2>
//                     </div>
//                     <input
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                         min={new Date().toISOString().split('T')[0]}
//                         className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
//                     />
//                 </div>
//
//                 {/* Time Selection */}
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                     <div className="flex items-center space-x-2 mb-4">
//                         <Clock className="text-[#01818E]" />
//                         <h2 className="text-xl font-semibold">Select Time</h2>
//                     </div>
//                     <div className="grid grid-cols-2 gap-3">
//                         {timeSlots.map((slot) => (
//                             <button
//                                 key={slot.id}
//                                 onClick={() => setSelectedTime(slot.time)}
//                                 disabled={!slot.available}
//                                 className={`p-3 rounded-lg text-center transition-colors ${
//                                     selectedTime === slot.time
//                                         ? 'bg-[#01818E] text-white'
//                                         : slot.available
//                                             ? 'bg-gray-100 hover:bg-gray-200'
//                                             : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                                 }`}
//                             >
//                                 {slot.time}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//
//             {/* Pet Selection */}
//             <div className="mt-8 bg-white rounded-lg shadow-md p-6">
//                 <div className="flex items-center space-x-2 mb-4">
//                     <Users className="text-[#01818E]" />
//                     <h2 className="text-xl font-semibold">Select Pets</h2>
//                 </div>
//                 <div className="grid md:grid-cols-3 gap-4">
//                     {pets.map((pet) => (
//                         <button
//                             key={pet.id}
//                             onClick={() => handlePetSelection(pet.id)}
//                             className={`p-4 rounded-lg border-2 transition-colors ${
//                                 selectedPets.includes(pet.id)
//                                     ? 'border-[#01818E] bg-[#01818E]/5'
//                                     : 'border-gray-200 hover:border-[#01818E]'
//                             }`}
//                         >
//                             <h3 className="font-semibold">{pet.name}</h3>
//                             <p className="text-sm text-gray-600">{pet.type}</p>
//                         </button>
//                     ))}
//                 </div>
//             </div>
//
//             {/* Book Button */}
//             <div className="mt-8 flex justify-end">
//                 <button
//                     onClick={handleBookAppointment}
//                     className="bg-[#01818E] text-white px-6 py-3 rounded-lg hover:bg-[#016d77] transition-colors"
//                 >
//                     Book Appointment
//                 </button>
//             </div>
//
//             {/* Confirmation Dialog */}
//             <DialogBox
//                 isOpen={isConfirmDialogOpen}
//                 onClose={() => setIsConfirmDialogOpen(false)}
//                 title="Confirm Appointment"
//             >
//                 <div className="space-y-4">
//                     <p className="text-gray-600">Please confirm your appointment details:</p>
//                     <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//                         <p><strong>Date:</strong> {selectedDate}</p>
//                         <p><strong>Time:</strong> {selectedTime}</p>
//                         <p><strong>Pets:</strong> {selectedPets.map(id =>
//                             pets.find(p => p.id === id)?.name
//                         ).join(', ')}</p>
//                     </div>
//                     <div className="flex justify-end space-x-3">
//                         <button
//                             onClick={() => setIsConfirmDialogOpen(false)}
//                             className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={confirmAppointment}
//                             className="px-4 py-2 bg-[#01818E] text-white rounded-lg hover:bg-[#016d77]"
//                         >
//                             Confirm Booking
//                         </button>
//                     </div>
//                 </div>
//             </DialogBox>
//
//             {/* Success Dialog */}
//             <DialogBox
//                 isOpen={isSuccessDialogOpen}
//                 onClose={() => setSuccessDialogOpen(false)}
//                 title="Appointment Booked!"
//             >
//                 <div className="space-y-4">
//                     <div className="bg-green-50 text-green-800 p-4 rounded-lg">
//                         <p className="font-semibold">Your appointment has been confirmed!</p>
//                         <p className="text-sm mt-2">Appointment Number: {appointmentNumber}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//                         <p><strong>Date:</strong> {selectedDate}</p>
//                         <p><strong>Time:</strong> {selectedTime}</p>
//                         <p><strong>Pets:</strong> {selectedPets.map(id =>
//                             pets.find(p => p.id === id)?.name
//                         ).join(', ')}</p>
//                     </div>
//                     <div className="flex justify-end">
//                         <button
//                             onClick={() => setSuccessDialogOpen(false)}
//                             className="px-4 py-2 bg-[#01818E] text-white rounded-lg hover:bg-[#016d77]"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </DialogBox>
//         </div>
//     );
// }
//
// export default Appointments;

import { useState } from 'react';
import { Calendar, Users, Clock } from 'lucide-react';
import DialogBox from '../components/DialogBox';

interface Pet {
    id: number;
    name: string;
    type: string;
}

interface QueueInfo {
    currentNumber: number;
    totalInQueue: number;
    lastUpdated: string;
}

function Appointments() {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedPets, setSelectedPets] = useState<number[]>([]);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [queueNumber, setQueueNumber] = useState<number | null>(null);

    // Mock data
    const pets: Pet[] = [
        { id: 1, name: 'Max', type: 'Dog' },
        { id: 2, name: 'Bella', type: 'Cat' },
        { id: 3, name: 'Charlie', type: 'Dog' },
    ];

    // Mock queue information
    const queueInfo: QueueInfo = {
        currentNumber: 5,
        totalInQueue: 12,
        lastUpdated: '11:30 AM',
    };

    const handlePetSelection = (petId: number) => {
        setSelectedPets(prev =>
            prev.includes(petId)
                ? prev.filter(id => id !== petId)
                : [...prev, petId]
        );
    };

    const handleBookAppointment = () => {
        if (!selectedDate || selectedPets.length === 0) {
            alert('Please select date and at least one pet');
            return;
        }
        setIsConfirmDialogOpen(true);
    };

    const confirmAppointment = () => {
        // Generate queue number (in a real app, this would come from the backend)
        const newQueueNumber = queueInfo.totalInQueue + 1;
        setQueueNumber(newQueueNumber);
        setIsConfirmDialogOpen(false);
        setSuccessDialogOpen(true);
    };

    const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-[#000000] mb-8">Appointment Booking</h1>

            {/* Current Queue Status */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#01818E] flex items-center">
                        Current Queue Status
                    </h2>
                    <p className="text-sm text-gray-500">Last updated: {queueInfo.lastUpdated}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#01818E]/5 rounded-lg p-6 text-center">
                        <p className="text-lg text-gray-600 mb-2">Now Serving</p>
                        <h3 className="text-4xl font-bold text-[#01818E]">#{queueInfo.currentNumber}</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                        <p className="text-lg text-gray-600 mb-2">Total in Queue</p>
                        <h3 className="text-4xl font-bold text-gray-700">{queueInfo.totalInQueue}</h3>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Date Selection */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Calendar className="text-[#01818E]" />
                        <h2 className="text-xl font-semibold">Select Date</h2>
                    </div>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                    />
                </div>

                {/* Estimated Wait Time */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-2 mb-4">
                        <Clock className="text-[#01818E]" />
                        <h2 className="text-xl font-semibold">Estimated Wait Time</h2>
                    </div>
                    <div className="text-center py-4">
                        <p className="text-gray-600 mb-2">Average wait time per patient</p>
                        <p className="text-3xl font-bold text-[#01818E]">~20 minutes</p>
                    </div>
                </div>
            </div>

            {/* Pet Selection */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <Users className="text-[#01818E]" />
                    <h2 className="text-xl font-semibold">Select Pets</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {pets.map((pet) => (
                        <button
                            key={pet.id}
                            onClick={() => handlePetSelection(pet.id)}
                            className={`p-4 rounded-lg border-2 transition-colors ${
                                selectedPets.includes(pet.id)
                                    ? 'border-[#01818E] bg-[#01818E]/5'
                                    : 'border-gray-200 hover:border-[#01818E]'
                            }`}
                        >
                            <h3 className="font-semibold">{pet.name}</h3>
                            <p className="text-sm text-gray-600">{pet.type}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Join Queue Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleBookAppointment}
                    className="bg-[#01818E] text-white px-6 py-3 rounded-lg hover:bg-[#016d77] transition-colors"
                >
                    Join Queue
                </button>
            </div>

            {/* Confirmation Dialog */}
            <DialogBox
                isOpen={isConfirmDialogOpen}
                onClose={() => setIsConfirmDialogOpen(false)}
                title="Confirm Queue Entry"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">Please confirm your queue entry details:</p>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p><strong>Date:</strong> {selectedDate}</p>
                        <p><strong>Pets:</strong> {selectedPets.map(id =>
                            pets.find(p => p.id === id)?.name
                        ).join(', ')}</p>
                        <p><strong>Expected Queue Number:</strong> #{queueInfo.totalInQueue + 1}</p>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setIsConfirmDialogOpen(false)}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmAppointment}
                            className="px-4 py-2 bg-[#01818E] text-white rounded-lg hover:bg-[#016d77]"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </DialogBox>

            {/* Success Dialog */}
            <DialogBox
                isOpen={isSuccessDialogOpen}
                onClose={() => setSuccessDialogOpen(false)}
                title="Queue Entry Confirmed!"
            >
                <div className="space-y-4">
                    <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center">
                        <p className="font-semibold">Your queue number is:</p>
                        <p className="text-4xl font-bold my-4">#{queueNumber}</p>
                        <p className="text-sm">Please wait for your number to be called</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p><strong>Date:</strong> {selectedDate}</p>
                        <p><strong>Pets:</strong> {selectedPets.map(id =>
                            pets.find(p => p.id === id)?.name
                        ).join(', ')}</p>
                        <p><strong>Current Number:</strong> #{queueInfo.currentNumber}</p>
                        <p><strong>Estimated Wait Time:</strong> {(queueNumber! - queueInfo.currentNumber) * 20} minutes</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setSuccessDialogOpen(false)}
                            className="px-4 py-2 bg-[#01818E] text-white rounded-lg hover:bg-[#016d77]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </DialogBox>
        </div>
    );
}

export default Appointments;