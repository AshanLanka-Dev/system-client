import { useState } from 'react';
import { Trash2, ArrowRight, Activity, Syringe, Stethoscope, Plus, ArrowLeft, Heart, Calendar, User, Weight, MapPin, AlertTriangle } from 'lucide-react';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  image: string;
  gender: 'male' | 'female';
  allergies: string;
  medicalReports: MedicalReport[];
  surgeries: Surgery[];
  vaccinations: Vaccination[];
}

interface MedicalReport {
  id: number;
  date: string;
  diagnosis: string;
  treatment: string;
  nextVisit?: string;
}

interface Surgery {
  id: number;
  date: string;
  procedure: string;
  surgeon: string;
  notes: string;
}

interface Vaccination {
  id: number;
  name: string;
  date: string;
  nextDue: string;
  veterinarian: string;
}

interface NewPet {
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  image: string;
  gender: string;
  allergies: string;
}

function Pets() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isAddPetDialogOpen, setIsAddPetDialogOpen] = useState(false);
  const [newPet, setNewPet] = useState<NewPet>({
    name: '',
    type: 'dog',
    breed: '',
    age: '',
    weight: '',
    image: '',
    gender: 'male',
    allergies: '',
  });

  const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'other'];

  const pets: Pet[] = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '3 years',
      weight: '30 kg',
      gender: 'male',
      allergies: 'None',
      image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&q=80&w=800&h=800',
      medicalReports: [
        {
          id: 1,
          date: '2024-02-15',
          diagnosis: 'Annual Checkup',
          treatment: 'No issues found',
          nextVisit: '2025-02-15',
        },
        {
          id: 2,
          date: '2023-11-10',
          diagnosis: 'Ear Infection',
          treatment: 'Prescribed ear drops',
          nextVisit: '2023-11-24',
        },
      ],
      surgeries: [
        {
          id: 1,
          date: '2023-05-20',
          procedure: 'Dental Cleaning',
          surgeon: 'Dr. Smith',
          notes: 'Removed tartar buildup, no complications',
        },
      ],
      vaccinations: [
        {
          id: 1,
          name: 'Rabies',
          date: '2023-12-01',
          nextDue: '2024-12-01',
          veterinarian: 'Dr. Johnson',
        },
        {
          id: 2,
          name: 'DHPP',
          date: '2023-11-15',
          nextDue: '2024-11-15',
          veterinarian: 'Dr. Johnson',
        },
      ],
    },
    {
      id: 2,
      name: 'Bella',
      type: 'Cat',
      breed: 'Persian',
      age: '2 years',
      weight: '4.5 kg',
      gender: 'female',
      allergies: 'Chicken',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800&h=800',
      medicalReports: [
        {
          id: 1,
          date: '2024-01-20',
          diagnosis: 'Routine Checkup',
          treatment: 'Deworming medication prescribed',
          nextVisit: '2024-07-20',
        },
      ],
      surgeries: [],
      vaccinations: [
        {
          id: 1,
          name: 'FVRCP',
          date: '2023-12-15',
          nextDue: '2024-12-15',
          veterinarian: 'Dr. Wilson',
        },
      ],
    },
  ];

  const handleDelete = (petId: number) => {
    console.log('Delete pet:', petId);
  };

  const handleAddPet = () => {
    if (!newPet.name || !newPet.breed || !newPet.age || !newPet.weight) {
      alert('Please fill in all required fields');
      return;
    }
    console.log('New pet:', newPet);
    setIsAddPetDialogOpen(false);
    setNewPet({
      name: '',
      type: 'dog',
      breed: '',
      age: '',
      weight: '',
      image: '',
      gender: 'male',
      allergies: '',
    });
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'male' ? '♂' : '♀';
  };

  const getGenderColor = (gender: string) => {
    return gender === 'male' ? 'text-blue-600 bg-blue-50' : 'text-pink-600 bg-pink-50';
  };

  const PetProfile = ({ pet }: { pet: Pet }) => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
          <button
              onClick={() => setSelectedPet(null)}
              className="group flex items-center space-x-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-4 py-2 rounded-xl transition-all duration-300"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Back to Pets</span>
          </button>

          {/* Pet Header Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative">
                <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGenderColor(pet.gender)}`}>
                  {getGenderIcon(pet.gender)} {pet.gender}
                </span>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-slate-800 mb-2">{pet.name}</h1>
                  <p className="text-xl text-slate-600">{pet.breed} • {pet.type}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-slate-600" />
                      <p className="text-slate-600 font-medium">Age</p>
                    </div>
                    <p className="text-xl font-bold text-slate-800">{pet.age}</p>
                  </div>
                  <div className="bg-slate-50/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Weight className="w-5 h-5 text-slate-600" />
                      <p className="text-slate-600 font-medium">Weight</p>
                    </div>
                    <p className="text-xl font-bold text-slate-800">{pet.weight}</p>
                  </div>
                </div>

                {pet.allergies && pet.allergies !== 'None' && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <p className="text-amber-800 font-semibold">Allergies</p>
                      </div>
                      <p className="text-amber-700">{pet.allergies}</p>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Medical Information Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Medical Reports */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Medical Reports</h3>
              </div>
              <div className="space-y-4">
                {pet.medicalReports.map((report) => (
                    <div
                        key={report.id}
                        className="group bg-slate-50/50 hover:bg-white rounded-xl p-4 border border-slate-200/50 hover:border-emerald-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                    >
                      <h4 className="font-bold text-slate-800 mb-2">{report.diagnosis}</h4>
                      <p className="text-sm text-slate-600 mb-1">{report.treatment}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">{report.date}</span>
                        {report.nextVisit && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                        Next: {report.nextVisit}
                      </span>
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Surgery History */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Surgery History</h3>
              </div>
              <div className="space-y-4">
                {pet.surgeries.length > 0 ? (
                    pet.surgeries.map((surgery) => (
                        <div key={surgery.id} className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/50">
                          <h4 className="font-bold text-slate-800 mb-2">{surgery.procedure}</h4>
                          <p className="text-sm text-slate-600 mb-1">By {surgery.surgeon}</p>
                          <p className="text-sm text-slate-600 mb-2">{surgery.notes}</p>
                          <span className="text-xs text-slate-500">{surgery.date}</span>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8">
                      <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                      <p className="text-slate-500">No surgery history</p>
                    </div>
                )}
              </div>
            </div>

            {/* Vaccinations */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-xl">
                  <Syringe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Vaccinations</h3>
              </div>
              <div className="space-y-4">
                {pet.vaccinations.map((vaccination) => (
                    <div key={vaccination.id} className="bg-slate-50/50 rounded-xl p-4 border border-slate-200/50">
                      <h4 className="font-bold text-slate-800 mb-2">{vaccination.name}</h4>
                      <p className="text-sm text-slate-600 mb-1">Given: {vaccination.date}</p>
                      <p className="text-sm text-slate-600 mb-2">By {vaccination.veterinarian}</p>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    Next due: {vaccination.nextDue}
                  </span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  const PetsList = () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-rose-50 rounded-2xl">
                  <Heart className="w-8 h-8 text-rose-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-800">My Pets</h1>
                  <p className="text-slate-600 text-lg">Manage your beloved companions</p>
                </div>
              </div>
              <button
                  onClick={() => setIsAddPetDialogOpen(true)}
                  className="group bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Plus size={20} className="group-hover:rotate-180 transition-transform duration-300" />
                <span className="font-semibold">Add New Pet</span>
              </button>
            </div>
          </div>

          {/* Pets Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pets.map((pet) => (
                <div key={pet.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <img
                        src={pet.image}
                        alt={pet.name}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGenderColor(pet.gender)}`}>
                    {getGenderIcon(pet.gender)}
                  </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-1">{pet.name}</h2>
                      <p className="text-slate-600 font-medium">{pet.breed}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Type</p>
                        <p className="font-semibold text-slate-800">{pet.type}</p>
                      </div>
                      <div className="bg-slate-50/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">Age</p>
                        <p className="font-semibold text-slate-800">{pet.age}</p>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">Weight</p>
                      <p className="font-semibold text-slate-800">{pet.weight}</p>
                    </div>

                    {pet.allergies && pet.allergies !== 'None' && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                          <div className="flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <p className="text-xs text-amber-700 font-medium">Allergies: {pet.allergies}</p>
                          </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-4 border-t border-slate-200/50">
                      <button
                          onClick={() => handleDelete(pet.id)}
                          className="group flex items-center space-x-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-300"
                      >
                        <Trash2 size={16} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                      <button
                          onClick={() => setSelectedPet(pet)}
                          className="group flex items-center space-x-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-2 rounded-lg transition-all duration-300"
                      >
                        <span className="text-sm font-medium">View Profile</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          {/* Add Pet Dialog */}
          {isAddPetDialogOpen && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Add New Pet</h2>
                      <button
                          onClick={() => setIsAddPetDialogOpen(false)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-300"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Pet Name *
                        </label>
                        <input
                            type="text"
                            value={newPet.name}
                            onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                            className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter pet name"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Type *
                          </label>
                          <select
                              value={newPet.type}
                              onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                              className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition-all duration-300"
                          >
                            {petTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Gender *
                          </label>
                          <select
                              value={newPet.gender}
                              onChange={(e) => setNewPet({ ...newPet, gender: e.target.value })}
                              className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition-all duration-300"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Breed *
                        </label>
                        <input
                            type="text"
                            value={newPet.breed}
                            onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                            className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter breed"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Age *
                          </label>
                          <input
                              type="text"
                              value={newPet.age}
                              onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                              className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                              placeholder="e.g., 2 years"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Weight *
                          </label>
                          <input
                              type="text"
                              value={newPet.weight}
                              onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                              className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                              placeholder="e.g., 5 kg"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Image URL
                        </label>
                        <input
                            type="text"
                            value={newPet.image}
                            onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
                            className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter image URL"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Allergies
                        </label>
                        <textarea
                            value={newPet.allergies}
                            onChange={(e) => setNewPet({ ...newPet, allergies: e.target.value })}
                            className="w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                            placeholder="List any allergies"
                            rows={3}
                        />
                      </div>

                      <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                        <button
                            onClick={() => setIsAddPetDialogOpen(false)}
                            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                            onClick={handleAddPet}
                            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg"
                        >
                          Add Pet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );

  return selectedPet ? <PetProfile pet={selectedPet} /> : <PetsList />;
}

export default Pets;