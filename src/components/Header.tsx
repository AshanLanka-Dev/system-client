import  { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
    PawPrint,
    Calendar,
    ChevronDown,
    LogOut,
    Settings,
    MessageSquare,
    Menu,
    X,
    Cat,
    LayoutDashboard,
    User
} from 'lucide-react';
import {useAppContext} from "../context/AppContext.tsx";

const userDetail = {
    userId:10101,
    name: "Hansaka Rathnayake",
    email: "hansaka.rathnayake@example.com",
    role: "Pet Owner",
    joinedDate: "Member since Jan 2024",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
};

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const {user,setUser} = useAppContext();

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard  size={20} />, label: 'Dashboard' },
        { path: '/pets', icon: <Cat  size={20} />, label: 'Pets' },
        { path: '/veterinary', icon: <User size={20} />, label: 'Veterinary Surgeon' },
        // { path: '/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
        // { path: '/consultation', icon: <MessageSquare size={20} />, label: 'Consultation' },
    ];

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        console.log('Logging out...');
        setUser(null);

    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
                isScrolled
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'bg-primary text-white'
            }`}
        >
            <nav className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <PawPrint size={32} className={isScrolled ? 'text-primary' : 'text-white'} />
                        <span className="text-xl font-bold">Dr.AshanLanka</span>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 transition-colors ${
                                        isScrolled
                                            ? isActive
                                                ? 'text-primary font-semibold'
                                                : 'text-gray-600 hover:text-primary'
                                            : isActive
                                                ? 'text-white font-semibold'
                                                : 'text-gray-100 hover:text-white'
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                                    isScrolled
                                        ? 'hover:bg-gray-100'
                                        : 'hover:bg-primaryHover'
                                }`}
                            >
                                <img
                                    src={userDetail.image}
                                    alt={userDetail.name}
                                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                                />
                                <div className="text-sm text-left">
                                    <p className="font-semibold">{userDetail.name}</p>
                                    <p className={isScrolled ? 'text-gray-600' : 'text-gray-200'} style={{ fontSize: '0.75rem' }}>{userDetail.email}</p>
                                </div>
                                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={userDetail.image}
                                                alt={userDetail.name}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{userDetail.name}</p>
                                                <p className="font-normal text-sm text-gray-400">Registration Id - {userDetail.userId}</p>
                                                <p className="text-sm text-gray-600">{userDetail.role}</p>
                                                <p className="text-xs text-gray-500">{userDetail.joinedDate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        <NavLink to={'/profile/settings'}>
                                        <button
                                            onClick={() => console.log('Navigate to settings')}
                                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                        >
                                            <Settings size={16} />
                                            <span>Profile Settings</span>
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                                        >
                                            <LogOut size={16} />
                                            <span>Logout</span>
                                        </button>
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden" ref={mobileMenuRef}>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-primaryHover transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            {/* Mobile Menu Dropdown */}
                            {isMobileMenuOpen && (
                                <div className="absolute top-16 left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden">
                                    <div className="p-4 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={userDetail.image}
                                                alt={userDetail.name}
                                                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{userDetail.name}</p>
                                                <p className="text-sm text-gray-600">{userDetail.email}</p>
                                                <p className="font-normal text-sm text-gray-400">Registration Id - {userDetail.userId}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="py-2">
                                        {navItems.map((item) => (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `flex items-center space-x-3 px-4 py-3 transition-colors ${
                                                        isActive
                                                            ? 'text-primary bg-gray-50 font-semibold'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                    }`
                                                }
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </NavLink>
                                        ))}

                                        <hr className="my-2" />

                                        <NavLink to={'/profile/settings'}>
                                        <button
                                            onClick={() => {
                                                console.log('Navigate to settings');
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
                                        >
                                            <Settings size={20} />
                                            <span>Profile Settings</span>

                                        </button>
                                        </NavLink>

                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-gray-50 flex items-center space-x-3"
                                        >
                                            <LogOut size={20} />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;