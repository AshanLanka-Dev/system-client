import { useState, useRef, useEffect } from 'react';
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
    User,
    Bell,
    Search
} from 'lucide-react';
import { useAppContext } from "../context/AppContext.tsx";

const userDetail = {
    userId: 10101,
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
    const { user, setUser } = useAppContext();

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { path: '/pets', icon: <Cat size={18} />, label: 'Pets' },
        { path: '/veterinary', icon: <User size={18} />, label: 'Veterinary Surgeon' },
    ];

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 10);
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
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md text-gray-800 shadow-lg border-b border-gray-100'
                    : 'bg-gradient-to-r from-primary via-primary to-blue-600 text-white shadow-sm'
            }`}
        >
            <nav className="container mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand Logo */}
                    <div className="flex items-center space-x-3 group">
                        <div className={`p-2 rounded-xl transition-all duration-300 ${
                            isScrolled
                                ? 'bg-primary/10 group-hover:bg-primary/20'
                                : 'bg-white/20 group-hover:bg-white/30'
                        }`}>
                            <PawPrint
                                size={28}
                                className={`transition-all duration-300 ${
                                    isScrolled ? 'text-primary' : 'text-white'
                                }`}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-tight">Dr.AshanLanka</span>
                            <span className={`text-xs font-medium ${
                                isScrolled ? 'text-gray-500' : 'text-white/80'
                            }`}>
                                Pet Care Excellence
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                                        isScrolled
                                            ? isActive
                                                ? 'bg-primary text-white shadow-md'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                                            : isActive
                                                ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                                                : 'text-white/90 hover:bg-white/20 hover:text-white'
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-3">
                        {/* Search Icon */}
                        <button className={`p-2.5 rounded-xl transition-all duration-300 ${
                            isScrolled
                                ? 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                                : 'text-white/90 hover:bg-white/20 hover:text-white'
                        }`}>
                            <Search size={18} />
                        </button>

                        {/* Notifications */}
                        <button className={`p-2.5 rounded-xl transition-all duration-300 relative ${
                            isScrolled
                                ? 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                                : 'text-white/90 hover:bg-white/20 hover:text-white'
                        }`}>
                            <Bell size={18} />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        </button>

                        {/* User Profile Dropdown */}
                        <div className="hidden md:block relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center space-x-3 rounded-xl px-4 py-2.5 transition-all duration-300 ${
                                    isScrolled
                                        ? 'hover:bg-gray-100 text-gray-700'
                                        : 'hover:bg-white/20 text-white'
                                }`}
                            >
                                <div className="relative">
                                    <img
                                        src={userDetail.image}
                                        alt={userDetail.name}
                                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white/50 shadow-md"
                                    />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="text-sm text-left hidden xl:block">
                                    <p className="font-semibold leading-tight">{userDetail.name}</p>
                                    <p className={`text-xs leading-tight ${
                                        isScrolled ? 'text-gray-500' : 'text-white/80'
                                    }`}>
                                        {userDetail.role}
                                    </p>
                                </div>
                                <ChevronDown
                                    size={16}
                                    className={`transition-all duration-300 ${
                                        isDropdownOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                                    {/* User Info Header */}
                                    <div className="px-6 py-4 border-b border-gray-50 bg-gradient-to-r from-primary to-blue-600 text-white rounded-t-2xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <img
                                                    src={userDetail.image}
                                                    alt={userDetail.name}
                                                    className="w-14 h-14 rounded-full object-cover ring-3 ring-white/30 shadow-lg"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-lg">{userDetail.name}</p>
                                                <p className="text-sm text-white/80 font-medium">{userDetail.role}</p>
                                                <p className="text-xs text-white/70">ID: {userDetail.userId}</p>
                                                <p className="text-xs text-white/70">{userDetail.joinedDate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <NavLink to={'/profile/settings'}>
                                            <button
                                                onClick={() => console.log('Navigate to settings')}
                                                className="w-full px-6 py-3 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-all duration-200 group"
                                            >
                                                <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-primary group-hover:text-white transition-all duration-200">
                                                    <Settings size={16} />
                                                </div>
                                                <div>
                                                    <span className="font-medium">Profile Settings</span>
                                                    <p className="text-xs text-gray-500">Manage your account</p>
                                                </div>
                                            </button>
                                        </NavLink>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-6 py-3 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-all duration-200 group"
                                        >
                                            <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-500 group-hover:text-white transition-all duration-200">
                                                <LogOut size={16} />
                                            </div>
                                            <div>
                                                <span className="font-medium">Logout</span>
                                                <p className="text-xs text-red-400">Sign out of your account</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden" ref={mobileMenuRef}>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2.5 rounded-xl transition-all duration-300 ${
                                    isScrolled
                                        ? 'text-gray-600 hover:bg-gray-100'
                                        : 'text-white hover:bg-white/20'
                                }`}
                            >
                                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>

                            {/* Mobile Menu Dropdown */}
                            {isMobileMenuOpen && (
                                <div className="absolute top-20 left-4 right-4 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 animate-in slide-in-from-top-2 duration-200">
                                    {/* Mobile User Info */}
                                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-primary to-blue-600 text-white">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative">
                                                <img
                                                    src={userDetail.image}
                                                    alt={userDetail.name}
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30 shadow-lg"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">{userDetail.name}</p>
                                                <p className="text-sm text-white/80">{userDetail.email}</p>
                                                <p className="text-xs text-white/70">ID: {userDetail.userId}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Navigation */}
                                    <div className="py-2">
                                        {navItems.map((item) => (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    `flex items-center space-x-4 px-6 py-4 transition-all duration-200 ${
                                                        isActive
                                                            ? 'text-primary bg-primary/5 font-semibold border-r-4 border-primary'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                    }`
                                                }
                                            >
                                                <div className={`p-2 rounded-lg ${
                                                    ({ isActive }) => isActive ? 'bg-primary text-white' : 'bg-gray-100'
                                                }`}>
                                                    {item.icon}
                                                </div>
                                                <span className="font-medium">{item.label}</span>
                                            </NavLink>
                                        ))}

                                        <hr className="my-2 mx-6" />

                                        <NavLink to={'/profile/settings'}>
                                            <button
                                                onClick={() => {
                                                    console.log('Navigate to settings');
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-4 transition-all duration-200"
                                            >
                                                <div className="p-2 rounded-lg bg-gray-100">
                                                    <Settings size={18} />
                                                </div>
                                                <span className="font-medium">Profile Settings</span>
                                            </button>
                                        </NavLink>

                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="w-full px-6 py-4 text-left text-red-600 hover:bg-red-50 flex items-center space-x-4 transition-all duration-200"
                                        >
                                            <div className="p-2 rounded-lg bg-red-100">
                                                <LogOut size={18} />
                                            </div>
                                            <span className="font-medium">Logout</span>
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