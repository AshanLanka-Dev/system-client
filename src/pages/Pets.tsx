import { useState } from 'react';
import { Trash2, ArrowRight, Activity, Syringe, Stethoscope, Plus } from 'lucide-react';
import DialogBox from '../components/DialogBox';

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
  gender:string;
  allergies: string;
}

function Pets() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isAddPetDialogOpen, setIsAddPetDialogOpen] = useState(false);
  const [newPet, setNewPet] = useState<NewPet>({
    name: '',
    type: '',
    breed: '',
    age: '',
    weight: '',
    image: '',
    gender: '',
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
    // Implement delete functionality
    console.log('Delete pet:', petId);
  };

  const handleAddPet = () => {
    // Validate form
    if (!newPet.name || !newPet.breed || !newPet.age || !newPet.weight) {
      alert('Please fill in all required fields');
      return;
    }

    // Add pet logic here
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

  const PetProfile = ({ pet }: { pet: Pet }) => (
      <div className="space-y-6">
        <button
            onClick={() => setSelectedPet(null)}
            className="text-[#01818E] hover:text-[#016d77] flex items-center mb-4"
        >
          ← Back to Pets
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <img
                src={pet.image}
                alt={pet.name}
                // className="w-full h-[400px] object-cover rounded-lg"
                className="w-full  rounded-lg  "
            />
            <div className="space-y-4 ">
              <h2 className="text-3xl font-bold text-[#000000]">{pet.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Type</p>
                  <p className="font-semibold">{pet.type}</p>
                </div>
                <div>
                  <p className="text-gray-600">Breed</p>
                  <p className="font-semibold">{pet.breed}</p>
                </div>
                <div>
                  <p className="text-gray-600">Age</p>
                  <p className="font-semibold">{pet.age}</p>
                </div>
                <div>
                  <p className="text-gray-600">Weight</p>
                  <p className="font-semibold">{pet.weight}</p>
                </div>
                <div>
                  <p className="text-gray-600">Gender</p>
                  <p className="font-semibold capitalize">{pet.gender}</p>
                </div>
                <div>
                  <p className="text-gray-600">Allergies</p>
                  <p className="font-semibold">{pet.allergies || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Medical Reports */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#01818E]">Medical Reports</h3>
              <Activity className="text-[#01818E]" />
            </div>
            <div className="space-y-4">
              {pet.medicalReports.map((report) => (
                  <button
                      key={report.id}
                      className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <p className="font-semibold">{report.diagnosis}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </button>
              ))}
            </div>
          </div>

          {/* Surgeries */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#01818E]">Surgery History</h3>
              <Stethoscope className="text-[#01818E]" />
            </div>
            <div className="space-y-4">
              {pet.surgeries.length > 0 ? (
                  pet.surgeries.map((surgery) => (
                      <div key={surgery.id} className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold">{surgery.procedure}</p>
                        <p className="text-sm text-gray-600">{surgery.date}</p>
                        <p className="text-sm text-gray-600">By {surgery.surgeon}</p>
                      </div>
                  ))
              ) : (
                  <p className="text-gray-600">No surgery history</p>
              )}
            </div>
          </div>

          {/* Vaccinations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#01818E]">Vaccinations</h3>
              <Syringe className="text-[#01818E]" />
            </div>
            <div className="space-y-4">
              {pet.vaccinations.map((vaccination) => (
                  <div key={vaccination.id} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-semibold">{vaccination.name}</p>
                    <p className="text-sm text-gray-600">Given: {vaccination.date}</p>
                    <p className="text-sm text-gray-600">Next due: {vaccination.nextDue}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );

  const PetsList = () => (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#000000]">My Pets</h1>
          <button
              onClick={() => setIsAddPetDialogOpen(true)}
              className="bg-[#01818E] text-white px-4 py-2 rounded-lg hover:bg-[#016d77] transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Pet</span>
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Type:</span> {pet.type}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Breed:</span> {pet.breed}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Age:</span> {pet.age}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Weight:</span> {pet.weight}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button
                        onClick={() => handleDelete(pet.id)}
                        className="text-red-500 hover:text-red-700 flex items-center"
                    >
                      <Trash2 size={20} className="mr-1" />
                      Delete
                    </button>
                    <button
                        onClick={() => setSelectedPet(pet)}
                        className="text-[#01818E] hover:text-[#016d77] flex items-center"
                    >
                      Profile
                      <ArrowRight size={20} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Add Pet Dialog */}
        <DialogBox
            isOpen={isAddPetDialogOpen}
            onClose={() => setIsAddPetDialogOpen(false)}
            title="Add New Pet"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Name *
              </label>
              <input
                  type="text"
                  // value={newPet.name}
                  // onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                  placeholder="Enter pet name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                    value={newPet.type}
                    onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                    className="w-full bg-white p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                >
                  {petTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                    value={newPet.gender}
                    onChange={(e) => setNewPet({ ...newPet, gender: e.target.value as 'male' | 'female' })}
                    className="w-full bg-white p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Breed *
              </label>
              <input
                  type="text"
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                  placeholder="Enter breed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age *
                </label>
                <input
                    type="text"
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                    placeholder="e.g., 2 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight *
                </label>
                <input
                    type="text"
                    value={newPet.weight}
                    onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                    placeholder="e.g., 5 kg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                  type="text"
                  value={newPet.image}
                  onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                  placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Allergies
              </label>
              <textarea
                  value={newPet.allergies}
                  onChange={(e) => setNewPet({ ...newPet, allergies: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01818E]"
                  placeholder="List any allergies"
                  rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                  onClick={() => setIsAddPetDialogOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                  onClick={handleAddPet}
                  className="px-4 py-2 bg-[#01818E] text-white rounded-lg hover:bg-[#016d77]"
              >
                Add Pet
              </button>
            </div>
          </div>
        </DialogBox>
      </div>
  );

  return (
      <div className="container mx-auto px-4">
        {selectedPet ? <PetProfile pet={selectedPet} /> : <PetsList />}
      </div>
  );
}

export default Pets;