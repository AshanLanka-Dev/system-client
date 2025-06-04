import { Star, MessageSquare, Youtube, Facebook, Instagram, Twitter, Award, Clock, MapPin, User, Mail, Phone, GraduationCap, Calendar, X, Stethoscope, Heart, Users } from 'lucide-react';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    experience: string;
    image: string;
    rating: number;
    availability: string;
    education: string;
    description: string;
    email: string;
    phone: string;
    languages: string[];
    certifications: string[];
    interests: string[];
    consultationFee: string;
    emergencyContact: boolean;
}

interface Testimonial {
    id: number;
    name: string;
    image: string;
    rating: number;
    comment: string;
    date: string;
}

function Veterinary() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    const handleBookConsultation = () => {
        alert('Consultation booking feature would navigate to booking page');
    };

    const doctors: Doctor[] = [
        {
            id: 1,
            name: 'Dr. Sarah Wilson',
            specialization: 'Small Animal Medicine',
            experience: '8 years',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
            rating: 4.9,
            availability: 'Mon-Fri, 9AM-5PM',
            education: 'DVM from Cornell University',
            description: 'Specialized in treating small animals with a focus on preventive care and internal medicine. Dr. Wilson brings compassionate care and cutting-edge medical expertise to ensure your pets receive the best possible treatment.',
            email: 'sarah.wilson@vetclinic.com',
            phone: '+1 (555) 123-4567',
            languages: ['English', 'Spanish'],
            certifications: ['American Board of Veterinary Practitioners', 'Fear Free Certified Professional'],
            interests: ['Internal Medicine', 'Preventive Care', 'Geriatric Care'],
            consultationFee: '$85',
            emergencyContact: false,
        },
        {
            id: 2,
            name: 'Dr. Ashan Lanka',
            specialization: 'Emergency Medicine',
            experience: '12 years',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
            rating: 4.8,
            availability: 'Wed-Sun, 10AM-6PM',
            education: 'DVM from UC Davis',
            description: 'Expert in emergency and critical care with extensive experience in surgical procedures. Dr. Lanka is dedicated to providing life-saving treatments and has successfully handled numerous complex emergency cases.',
            email: 'ashan.lanka@vetclinic.com',
            phone: '+1 (555) 987-6543',
            languages: ['English', 'Sinhala'],
            certifications: ['Emergency and Critical Care Specialist', 'Advanced Cardiac Life Support'],
            interests: ['Emergency Medicine', 'Critical Care', 'Surgical Procedures'],
            consultationFee: '$120',
            emergencyContact: true,
        },
    ];

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'John Smith',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
            rating: 5,
            comment: 'Dr. Wilson was amazing with my anxious cat. Her gentle approach made the visit stress-free.',
            date: '2024-02-15',
        },
        {
            id: 2,
            name: 'Maria Garcia',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
            rating: 5,
            comment: 'Dr. Lanka\'s emergency care saved my dog\'s life. Forever grateful for his expertise.',
            date: '2024-02-10',
        },
        {
            id: 3,
            name: 'David Lee',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200',
            rating: 4,
            comment: 'Professional service and excellent care for my pet\'s treatment.',
            date: '2024-02-05',
        },
    ];

    const handleViewProfile = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setIsProfileOpen(true);
    };

    const handleCloseProfile = () => {
        setIsProfileOpen(false);
        setSelectedDoctor(null);
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="min-h-screen p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="p-3 bg-teal-50 rounded-xl">
                                <Stethoscope className="w-8 h-8 text-teal-600" />
                            </div>
                            <h1 className="text-4xl font-bold text-slate-800">Meet Our Veterinary Team</h1>
                        </div>
                        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                            Our experienced veterinarians are dedicated to providing the highest quality care for your beloved pets.
                            Schedule a consultation today or connect with us online.
                        </p>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Available Doctors</p>
                                <p className="text-3xl font-bold text-slate-800">{doctors.length}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Average Rating</p>
                                <p className="text-3xl font-bold text-slate-800">4.9</p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-xl">
                                <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-600 text-sm font-medium mb-1">Happy Clients</p>
                                <p className="text-3xl font-bold text-slate-800">1,200+</p>
                            </div>
                            <div className="p-3 bg-rose-50 rounded-xl">
                                <Heart className="w-6 h-6 text-rose-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Cards */}
                <div className="space-y-8">
                    {doctors.map((doctor, index) => (
                        <div key={doctor.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                            <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Doctor Image */}
                                <div className="lg:w-2/5 relative">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="w-full h-80 lg:h-full object-cover rounded-t-2xl lg:rounded-none lg:rounded-l-2xl"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 flex items-center shadow-lg">
                                        <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4 mr-1" />
                                        <span className="text-sm font-semibold text-slate-800">{doctor.rating}</span>
                                    </div>
                                    {doctor.emergencyContact && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            Emergency Available
                                        </div>
                                    )}
                                </div>

                                {/* Doctor Details */}
                                <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold text-slate-800 mb-2">{doctor.name}</h3>
                                        <div className="flex items-center mb-4">
                                            <div className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-lg font-semibold border border-teal-200">
                                                {doctor.specialization}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                            {doctor.description}
                                        </p>
                                    </div>

                                    {/* Professional Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                                            <Award className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-slate-500 font-medium">Experience</p>
                                                <p className="text-slate-800 font-semibold">{doctor.experience}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50">
                                            <GraduationCap className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-slate-500 font-medium">Education</p>
                                                <p className="text-slate-800 font-semibold">{doctor.education}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200/50 md:col-span-2">
                                            <Clock className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-slate-500 font-medium">Availability</p>
                                                <p className="text-slate-800 font-semibold">{doctor.availability}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handleBookConsultation}
                                            className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl"
                                        >
                                            <MessageSquare size={20} />
                                            <span>Book Consultation</span>
                                        </button>
                                        <button
                                            onClick={() => handleViewProfile(doctor)}
                                            className="px-6 py-3 border-2 border-teal-600 text-teal-600 rounded-xl hover:bg-teal-600 hover:text-white transition-colors font-semibold"
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Social Feeds</h2>
                        <p className="text-slate-600">Join us on a journey through real pet stories, expert treatment tips, and fun animal facts</p>
                    </div>

                    {/* Social feeds Section */}
                    <div className="elfsight-app-63abcd42-96d6-4470-bd0e-b8b6abd7b0d6" data-elfsight-app-lazy></div>
                    {/*<div className="relative overflow-hidden">*/}
                    {/*    <div*/}
                    {/*        className="flex transition-transform duration-500 ease-in-out"*/}
                    {/*        style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}*/}
                    {/*    >*/}
                    {/*        {testimonials.map((testimonial, index) => (*/}
                    {/*            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">*/}
                    {/*                <div className="max-w-2xl mx-auto text-center">*/}
                    {/*                    <div className="flex justify-center mb-4">*/}
                    {/*                        {[...Array(testimonial.rating)].map((_, i) => (*/}
                    {/*                            <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />*/}
                    {/*                        ))}*/}
                    {/*                    </div>*/}
                    {/*                    <p className="text-slate-700 text-lg mb-6 italic">"{testimonial.comment}"</p>*/}
                    {/*                    <div className="flex items-center justify-center space-x-3">*/}
                    {/*                        <img*/}
                    {/*                            src={testimonial.image}*/}
                    {/*                            alt={testimonial.name}*/}
                    {/*                            className="w-12 h-12 rounded-full object-cover"*/}
                    {/*                        />*/}
                    {/*                        <div className="text-left">*/}
                    {/*                            <p className="font-semibold text-slate-800">{testimonial.name}</p>*/}
                    {/*                            <p className="text-sm text-slate-500">{testimonial.date}</p>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="flex justify-center mt-6 space-x-2">*/}
                    {/*    {testimonials.map((_, index) => (*/}
                    {/*        <button*/}
                    {/*            key={index}*/}
                    {/*            onClick={() => setCurrentTestimonial(index)}*/}
                    {/*            className={`w-2 h-2 rounded-full transition-colors ${*/}
                    {/*                index === currentTestimonial ? 'bg-teal-600' : 'bg-slate-300'*/}
                    {/*            }`}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">What Our Clients Say</h2>
                        <p className="text-slate-600">Real experiences from pet owners who trust us with their beloved companions</p>
                    </div>

                    {/* Testimonials Section */}
                    <div className="elfsight-app-cca66e83-d386-47f6-8fed-baec191a2d54" data-elfsight-app-lazy></div>
                    {/*<div className="relative overflow-hidden">*/}
                    {/*    <div*/}
                    {/*        className="flex transition-transform duration-500 ease-in-out"*/}
                    {/*        style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}*/}
                    {/*    >*/}
                    {/*        {testimonials.map((testimonial, index) => (*/}
                    {/*            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">*/}
                    {/*                <div className="max-w-2xl mx-auto text-center">*/}
                    {/*                    <div className="flex justify-center mb-4">*/}
                    {/*                        {[...Array(testimonial.rating)].map((_, i) => (*/}
                    {/*                            <Star key={i} className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />*/}
                    {/*                        ))}*/}
                    {/*                    </div>*/}
                    {/*                    <p className="text-slate-700 text-lg mb-6 italic">"{testimonial.comment}"</p>*/}
                    {/*                    <div className="flex items-center justify-center space-x-3">*/}
                    {/*                        <img*/}
                    {/*                            src={testimonial.image}*/}
                    {/*                            alt={testimonial.name}*/}
                    {/*                            className="w-12 h-12 rounded-full object-cover"*/}
                    {/*                        />*/}
                    {/*                        <div className="text-left">*/}
                    {/*                            <p className="font-semibold text-slate-800">{testimonial.name}</p>*/}
                    {/*                            <p className="text-sm text-slate-500">{testimonial.date}</p>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="flex justify-center mt-6 space-x-2">*/}
                    {/*    {testimonials.map((_, index) => (*/}
                    {/*        <button*/}
                    {/*            key={index}*/}
                    {/*            onClick={() => setCurrentTestimonial(index)}*/}
                    {/*            className={`w-2 h-2 rounded-full transition-colors ${*/}
                    {/*                index === currentTestimonial ? 'bg-teal-600' : 'bg-slate-300'*/}
                    {/*            }`}*/}
                    {/*        />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>

                {/* Social Media Links */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Follow Us</h2>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="p-3 bg-red-50 rounded-xl text-red-600 hover:bg-red-100 transition-colors">
                            <Youtube size={24} />
                        </a>
                        <a href="#" className="p-3 bg-blue-50 rounded-xl text-blue-600 hover:bg-blue-100 transition-colors">
                            <Facebook size={24} />
                        </a>
                        <a href="#" className="p-3 bg-pink-50 rounded-xl text-pink-600 hover:bg-pink-100 transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="p-3 bg-sky-50 rounded-xl text-sky-600 hover:bg-sky-100 transition-colors">
                            <Twitter size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Profile Dialog */}
            {isProfileOpen && selectedDoctor && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="relative p-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-t-2xl border-b">
                            <button
                                onClick={handleCloseProfile}
                                className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-full transition-colors"
                            >
                                <X size={24} className="text-slate-600" />
                            </button>

                            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                                <img
                                    src={selectedDoctor.image}
                                    alt={selectedDoctor.name}
                                    className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                                />
                                <div className="text-center lg:text-left">
                                    <h2 className="text-3xl font-bold text-slate-800 mb-2">{selectedDoctor.name}</h2>
                                    <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-lg font-semibold inline-block mb-2">
                                        {selectedDoctor.specialization}
                                    </div>
                                    <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-slate-600">
                                        <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                                            <span>{selectedDoctor.rating} Rating</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Award className="w-4 h-4" />
                                            <span>{selectedDoctor.experience} Experience</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                            {/* About */}
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                                    <User className="w-5 h-5 text-teal-600" />
                                    <span>About Dr. {selectedDoctor.name.split(' ')[1]}</span>
                                </h3>
                                <p className="text-slate-600 leading-relaxed">{selectedDoctor.description}</p>
                            </div>

                            {/* Contact & Basic Info */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">Contact Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                            <Mail className="w-5 h-5 text-teal-600" />
                                            <div>
                                                <p className="text-sm text-slate-500">Email</p>
                                                <p className="text-slate-800 font-medium">{selectedDoctor.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                            <Phone className="w-5 h-5 text-teal-600" />
                                            <div>
                                                <p className="text-sm text-slate-500">Phone</p>
                                                <p className="text-slate-800 font-medium">{selectedDoctor.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                                            <Clock className="w-5 h-5 text-teal-600" />
                                            <div>
                                                <p className="text-sm text-slate-500">Availability</p>
                                                <p className="text-slate-800 font-medium">{selectedDoctor.availability}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">Professional Details</h3>
                                    <div className="space-y-4">
                                        <div className="p-3 bg-slate-50 rounded-lg">
                                            <p className="text-sm text-slate-500 mb-1">Education</p>
                                            <p className="text-slate-800 font-medium">{selectedDoctor.education}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-lg">
                                            <p className="text-sm text-slate-500 mb-1">Consultation Fee</p>
                                            <p className="text-slate-800 font-medium">{selectedDoctor.consultationFee}</p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-lg">
                                            <p className="text-sm text-slate-500 mb-2">Languages</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedDoctor.languages.map((lang, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                        {lang}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certifications & Specialties */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">Certifications</h3>
                                    <div className="space-y-2">
                                        {selectedDoctor.certifications.map((cert, idx) => (
                                            <div key={idx} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                                <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <p className="text-green-800 font-medium">{cert}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-4">Areas of Interest</h3>
                                    <div className="space-y-2">
                                        {selectedDoctor.interests.map((interest, idx) => (
                                            <div key={idx} className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                                                <Stethoscope className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                                <p className="text-teal-800 font-medium">{interest}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                                <button
                                    onClick={() => {
                                        handleCloseProfile();
                                        navigate('/consultation');
                                    }}
                                    className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 font-semibold"
                                >
                                    <Calendar size={20} />
                                    <span>Book Consultation</span>
                                </button>
                                <button
                                    onClick={handleCloseProfile}
                                    className="flex-1 border-2 border-slate-300 text-slate-700 py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors font-semibold"
                                >
                                    Close Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Veterinary;