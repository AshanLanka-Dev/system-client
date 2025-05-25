import { useNavigate } from 'react-router-dom';
import { Star, Video, MessageSquare, Youtube, Facebook, Instagram, Twitter } from 'lucide-react';
import { format } from 'date-fns';
import {useEffect, useState} from "react";


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
}

interface Testimonial {
    id: number;
    name: string;
    image: string;
    rating: number;
    comment: string;
    date: string;
}

interface SocialVideo {
    id: number;
    title: string;
    thumbnail: string;
    platform: 'youtube' | 'tiktok';
    views: string;
    link: string;
}

function Veterinary() {
    const navigate = useNavigate();

    const [currentTestimonial, setCurrentTestimonial] = useState(0);



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
            description: 'Specialized in treating small animals with a focus on preventive care and internal medicine.',
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
            description: 'Expert in emergency and critical care with extensive experience in surgical procedures.',
        },
        // {
        //     id: 3,
        //     name: 'Dr. Emily Rodriguez',
        //     specialization: 'Dermatology',
        //     experience: '6 years',
        //     image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400',
        //     rating: 4.7,
        //     availability: 'Mon-Thu, 11AM-7PM',
        //     education: 'DVM from Texas A&M',
        //     description: 'Focused on pet dermatology and allergies, helping pets live more comfortable lives.',
        // },
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
            comment: 'Dr. Chen\'s emergency care saved my dog\'s life. Forever grateful for his expertise.',
            date: '2024-02-10',
        },
        {
            id: 3,
            name: 'David Lee',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200',
            rating: 4,
            comment: 'Dr. Rodriguez helped identify and treat my pet\'s skin condition quickly and effectively.',
            date: '2024-02-05',
        },
        {
            id: 4,
            name: 'David Lee',
            image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200',
            rating: 4,
            comment: 'Dr. Rodriguez helped identify and treat my pet\'s skin condition quickly and effectively.',
            date: '2024-02-05',
        },
    ];

    const socialVideos: SocialVideo[] = [
        {
            id: 1,
            title: 'Common Pet Health Myths Debunked',
            thumbnail: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600&h=800',
            platform: 'youtube',
            views: '15K',
            link: 'https://youtube.com',
        },
        {
            id: 2,
            title: 'Pet First Aid Tips Every Owner Should Know',
            thumbnail: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=600&h=800',
            platform: 'youtube',
            views: '12K',
            link: 'https://youtube.com',
        },
        {
            id: 3,
            title: 'Signs Your Pet Needs Emergency Care',
            thumbnail: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600&h=800',
            platform: 'youtube',
            views: '20K',
            link: 'https://youtube.com',
        },
    ];

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-secondary mb-4">Meet Our Veterinary Team</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Our experienced veterinarians are dedicated to providing the highest quality care for your beloved pets.
                    Schedule a consultation today or connect with us online.
                </p>
            </div>

            {/* Doctor Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="relative">
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                <div className="flex items-center text-white">
                                    <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4" />
                                    <span className="ml-1">{doctor.rating}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                            <p className="text-primary font-medium mb-2">{doctor.specialization}</p>
                            <p className="text-gray-600 text-sm mb-4">{doctor.description}</p>
                            <div className="space-y-2 text-sm text-gray-600 mb-6">
                                <p>✓ {doctor.experience} experience</p>
                                <p>✓ {doctor.education}</p>
                                <p>✓ Available: {doctor.availability}</p>
                            </div>
                            {/*<button*/}
                            {/*    onClick={() => navigate('/consultation')}*/}
                            {/*    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primaryHover transition-colors flex items-center justify-center space-x-2"*/}
                            {/*>*/}
                            {/*    <MessageSquare size={20} />*/}
                            {/*    <span>Consult Online</span>*/}
                            {/*</button>*/}
                        </div>
                    </div>
                ))}
            </div>

            {/* Social Media Videos */}
            <div className="mb-16">
                {/*<h2 className="text-2xl font-bold text-secondary mb-8 flex items-center text-center justify-center">*/}
                {/*    <Video className="mr-2" />*/}
                {/*    Educational Videos*/}
                {/*</h2>*/}
                <div className="elfsight-app-63abcd42-96d6-4470-bd0e-b8b6abd7b0d6" data-elfsight-app-lazy></div>

                {/*<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">*/}
                {/*    {socialVideos.map(video => (*/}
                {/*        <a*/}
                {/*            key={video.id}*/}
                {/*            href={video.link}*/}
                {/*            target="_blank"*/}
                {/*            rel="noopener noreferrer"*/}
                {/*            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"*/}
                {/*        >*/}
                {/*            <div className="relative">*/}
                {/*                <img*/}
                {/*                    src={video.thumbnail}*/}
                {/*                    alt={video.title}*/}
                {/*                    className="w-full h-96 object-cover"*/}
                {/*                />*/}
                {/*                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">*/}
                {/*                    {video.platform === 'youtube' && <Youtube className="w-12 h-12 text-white" />}*/}
                {/*                </div>*/}
                {/*                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">*/}
                {/*                    <p className="text-white font-medium">{video.title}</p>*/}
                {/*                    <p className="text-white/80 text-sm">{video.views} views</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </a>*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>



            {/* Testimonials Carousel */}
            {/*<div className="mb-16">*/}
            {/*    <h2 className="text-2xl font-bold text-secondary mb-8 text-center">Client Testimonials</h2>*/}

            {/*    <div className="relative overflow-hidden w-full max-w-3xl mx-auto">*/}
            {/*        <div*/}
            {/*            className="flex transition-transform duration-700 ease-in-out"*/}
            {/*            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}*/}
            {/*        >*/}
            {/*            {testimonials.map((testimonial) => (*/}
            {/*                <div*/}
            {/*                    key={testimonial.id}*/}
            {/*                    className="min-w-full px-6 py-8 bg-white rounded-xl shadow-md"*/}
            {/*                >*/}
            {/*                    <div className="flex items-center mb-4">*/}
            {/*                        <img*/}
            {/*                            src={testimonial.image}*/}
            {/*                            alt={testimonial.name}*/}
            {/*                            className="w-12 h-12 rounded-full object-cover mr-4"*/}
            {/*                        />*/}
            {/*                        <div>*/}
            {/*                            <h3 className="font-semibold">{testimonial.name}</h3>*/}
            {/*                            <div className="flex items-center">*/}
            {/*                                {[...Array(testimonial.rating)].map((_, i) => (*/}
            {/*                                    <Star*/}
            {/*                                        key={i}*/}
            {/*                                        className="w-4 h-4 fill-yellow-400 stroke-yellow-400"*/}
            {/*                                    />*/}
            {/*                                ))}*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <p className="text-gray-600 mb-2">{testimonial.comment}</p>*/}
            {/*                    <p className="text-sm text-gray-500">{testimonial.date}</p>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}

            {/*        /!* Dots *!/*/}
            {/*        <div className="flex justify-center mt-4 space-x-2">*/}
            {/*            {testimonials.map((_, idx) => (*/}
            {/*                <button*/}
            {/*                    key={idx}*/}
            {/*                    onClick={() => setCurrentTestimonial(idx)}*/}
            {/*                    className={`w-3 h-3 rounded-full ${idx === currentTestimonial ? 'bg-primary' : 'bg-gray-300'}`}*/}
            {/*                />*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}


            <div className="elfsight-app-cca66e83-d386-47f6-8fed-baec191a2d54" data-elfsight-app-lazy></div>


            {/* Social Media Links */}
            <div className="text-center mt-5">
                <h2 className="text-2xl font-bold text-secondary mb-6">Follow Us</h2>
                <div className="flex justify-center space-x-6">
                    <a href="#" className="text-primary hover:text-primaryHover">
                        <Youtube size={32} />
                    </a>
                    <a href="#" className="text-primary hover:text-primaryHover">
                        <Facebook size={32} />
                    </a>
                    <a href="#" className="text-primary hover:text-primaryHover">
                        <Instagram size={32} />
                    </a>
                    <a href="#" className="text-primary hover:text-primaryHover">
                        <Twitter size={32} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Veterinary;