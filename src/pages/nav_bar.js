import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, Menu, X, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLang } from '../helpers/getLang';

export const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Dropdown state to activate submenu
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    let closeTimeout;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dropdown handlers
    const handleMouseEnter = (dropdownId) => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
        }
        setActiveDropdown(dropdownId);
    };

    const handleMouseLeave = () => {
        closeTimeout = setTimeout(() => {
            setActiveDropdown(null);
            setActiveSubmenu(null);
        }, 300);
    };

    const handleSubmenuEnter = (submenuId) => {
        setActiveSubmenu(submenuId);
    };

    const handleSubmenuLeave = () => {
        setActiveSubmenu(null);
    };

    // handles language change
    const handleLanguageChange = (language) => {
        navigate(`/${language}${location.pathname.slice(3)}`)
    }


    return (<>{/* Header */}
        <header className={`fixed w-full top-0 left-0 h-20 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent backdrop-blur-sm bg-white/30'
            }`}>
            <div className="container mx-auto h-full px-4">
                <div className="flex items-center justify-between h-full">
                    {/* Left side: Logo and Navigation */}
                    <div className="flex items-center space-x-8 hover:cursor-pointer">
                        <img
                            src="/logo.png"
                            alt="Colourful Egg Education Logo"
                            className="h-12 object-contain"
                            onClick={() => { navigate(`${getLang(location)}`) }}
                        />

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {/* Living in NZ Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter('NZ')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2"
                                    onClick={() => { navigate(`${getLang(location)}/LifeinNZ`) }}
                                >
                                    生活在新西兰
                                </button>
                                {activeDropdown === 'NZ' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href={`${getLang(location)}/LifeinNZ#cities`} className="block px-4 py-2 hover:bg-gray-50">城市</a>
                                        <a href={`${getLang(location)}/LifeinNZ#culture`} className="block px-4 py-2 hover:bg-gray-50">文化</a>
                                        <a
                                            href={`${getLang(location)}/LifeinNZ#transport`}
                                            className="relative px-4 py-2 hover:bg-gray-50 group/item flex items-center justify-between"
                                            onMouseEnter={() => handleSubmenuEnter('living')}
                                        >
                                            <span>生活</span>
                                            <ChevronRight size={16} />
                                            {activeSubmenu === 'living' && (
                                                <div className="absolute left-full top-0 w-64 bg-white shadow-lg rounded-lg py-2 -mt-2">
                                                    <div className="absolute left-0 top-0 w-2 h-full -ml-2"></div>
                                                    <a href={`${getLang(location)}/LifeinNZ#transport`} className="block px-4 py-2 hover:bg-gray-50">出行</a>
                                                    <a href={`${getLang(location)}/LifeinNZ#accommodation`} className="block px-4 py-2 hover:bg-gray-50">住宿</a>
                                                    <a href={`${getLang(location)}/LifeinNZ#eats`} className="block px-4 py-2 hover:bg-gray-50">饮食</a>
                                                </div>
                                            )}
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Colorful Study Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('study')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2"
                                    onClick={() => { navigate(`${getLang(location)}/colourfulstudy`) }}
                                >
                                    留学
                                </button>
                                {activeDropdown === 'study' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href={`${getLang(location)}/colourfulstudy/PriSecStudy`} className="block px-4 py-2 hover:bg-gray-50">中小学留学</a>
                                        <a href={`${getLang(location)}/colourfulstudy/FoundationStudy`} className="block px-4 py-2 hover:bg-gray-50">预科</a>
                                        <a href={`${getLang(location)}/colourfulstudy/BachelorStudy`} className="block px-4 py-2 hover:bg-gray-50">本科留学</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Placeholder</a>
                                    </div>
                                )}
                            </div>
                            {/* Visa Link */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('visa')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2">
                                    签证
                                </button>
                                {activeDropdown === 'visa' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Placeholder</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Placeholder</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Placeholder</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Placeholder</a>
                                    </div>
                                )}
                            </div>

                            {/* Immigration Link */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('immigration')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2"
                                    onClick={() => { navigate(`${getLang(location)}/immigration`) }}
                                >
                                    移民
                                </button>
                                {activeDropdown === 'immigration' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">技术移民</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">投资移民</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">创业移民</a>
                                    </div>
                                )}
                            </div>


                            {/* About Us Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('about')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2">
                                    关于纽蛋
                                </button>
                                {activeDropdown === 'about' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">我们能做到什么</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">服务</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">最新消息</a>
                                    </div>
                                )}
                            </div>

                            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                onClick={() => { navigate(`${getLang(location)}/connect`) }}
                            >
                                免费咨询
                            </button>
                        </nav>
                    </div>
                    {/* Right side: Language Selector */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('language')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Globe size={24} className="text-blue-900" />
                        </button>

                        {activeDropdown === 'language' && (
                            <div className="absolute top-full right-0 w-32 bg-white shadow-lg rounded-lg py-2 mt-1">
                                {/* Invisible buffer for smooth hover */}
                                <div className="absolute right-0 top-[-8px] w-full h-2" />

                                <button

                                    className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                                    onClick={() => handleLanguageChange("zh")}
                                >
                                    中文
                                </button>
                                <button

                                    className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                                    onClick={() => handleLanguageChange("en")}
                                >
                                    English
                                </button>
                            </div>
                        )}
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-blue-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t shadow-lg">
                    <div className="container mx-auto px-4 py-4">
                        <div className="space-y-4">
                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'living' ? null : 'living')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>生活在新西兰</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'living' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'living' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">城市</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">文化</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">出行</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">住宿</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">饮食</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'study' ? null : 'study')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>留学</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'study' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'study' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">中小学留学</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">预科</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">本科留学</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'visa' ? null : 'visa')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>签证</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'immigration' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'visa' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'immigration' ? null : 'immigration')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>移民</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'immigration' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'immigration' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">技术移民</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">投资移民</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">创业移民</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>关于纽蛋</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'about' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'about' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">我们能做到什么</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">服务</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">最新消息</a>
                                    </div>
                                )}
                            </div>

                            <button className="w-full bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                                免费咨询
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </header></>)
}


export const NavEN = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Dropdown state to activate submenu
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    let closeTimeout;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dropdown handlers
    const handleMouseEnter = (dropdownId) => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
        }
        setActiveDropdown(dropdownId);
    };

    const handleMouseLeave = () => {
        closeTimeout = setTimeout(() => {
            setActiveDropdown(null);
            setActiveSubmenu(null);
        }, 300);
    };

    const handleSubmenuEnter = (submenuId) => {
        setActiveSubmenu(submenuId);
    };

    const handleSubmenuLeave = () => {
        setActiveSubmenu(null);
    };

    // handles language change
    const handleLanguageChange = (language) => {
        navigate(`/${language}${location.pathname.slice(3)}`)
    }


    return (<>{/* Header */}
        <header className={`fixed w-full top-0 left-0 h-20 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent backdrop-blur-sm bg-white/30'
            }`}>
            <div className="container mx-auto h-full px-4">
                <div className="flex items-center justify-between h-full">
                    {/* Left side: Logo and Navigation */}
                    <div className="flex items-center space-x-8 hover:cursor-pointer">
                        <img
                            src="/logo.png"
                            alt="Colourful Egg Education Logo"
                            className="h-12 object-contain"
                            onClick={() => { navigate(`${getLang(location)}`) }}
                        />

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {/* Living in NZ Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter('NZ')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2"
                                    onClick={() => { navigate(`${getLang(location)}/LifeinNZ`) }}
                                >
                                    Life in New Zealand
                                </button>
                                {activeDropdown === 'NZ' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href={`${getLang(location)}/LifeinNZ#cities`} className="block px-4 py-2 hover:bg-gray-50">City</a>
                                        <a href={`${getLang(location)}/LifeinNZ#culture`} className="block px-4 py-2 hover:bg-gray-50">Culture</a>
                                        <a href={`${getLang(location)}/LifeinNZ#transport`} className="block px-4 py-2 hover:bg-gray-50">Living</a>
                                    </div>
                                )}
                            </div>

                            {/* Colorful Study Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('study')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2"
                                    onClick={() => { navigate(`${getLang(location)}/colourfulstudy`) }}
                                >
                                    Study Aboard
                                </button>
                                {activeDropdown === 'study' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href={`${getLang(location)}/colourfulstudy/PriSecStudy`} className="block px-4 py-2 hover:bg-gray-50">Primary & Secondary Education</a>
                                        <a href={`${getLang(location)}/colourfulstudy/FoundationStudy`} className="block px-4 py-2 hover:bg-gray-50">Foundation Studies</a>
                                        <a href={`${getLang(location)}/colourfulstudy/BachelorStudy`} className="block px-4 py-2 hover:bg-gray-50">Tertiary Education</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Placeholder</a>
                                    </div>
                                )}
                            </div>
                            {/* Visa Link */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('visa')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2">
                                    Visa
                                </button>
                                {activeDropdown === 'visa' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Student Visa</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Work Visa</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Visitor Visa</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Placeholder</a>
                                    </div>
                                )}
                            </div>

                            {/* Immigration Link */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('immigration')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2"
                                    onClick={() => { navigate(`${getLang(location)}/immigration`) }}
                                >
                                    Immigration
                                </button>
                                {activeDropdown === 'immigration' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Skilled Immigration</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Investor Immigration</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Entrepreneurial Immigration</a>
                                    </div>
                                )}
                            </div>


                            {/* About Us Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => handleMouseEnter('about')}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="text-blue-900 hover:text-blue-700 transition-colors py-2">
                                    About Us
                                </button>
                                {activeDropdown === 'about' && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg py-2 mt-1">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Our Work</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Services</a>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-50">Latest Articles</a>
                                    </div>
                                )}
                            </div>

                            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                                onClick={() => { navigate(`${getLang(location)}/connect`) }}
                            >
                                Consult Our Experts
                            </button>
                        </nav>
                    </div>
                    {/* Right side: Language Selector */}
                    <div
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('language')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Globe size={24} className="text-blue-900" />
                        </button>

                        {activeDropdown === 'language' && (
                            <div className="absolute top-full right-0 w-32 bg-white shadow-lg rounded-lg py-2 mt-1">
                                {/* Invisible buffer for smooth hover */}
                                <div className="absolute right-0 top-[-8px] w-full h-2" />

                                <button

                                    className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                                    onClick={() => handleLanguageChange("zh")}
                                >
                                    中文
                                </button>
                                <button

                                    className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                                    onClick={() => handleLanguageChange("en")}
                                >
                                    English
                                </button>
                            </div>
                        )}
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-blue-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t shadow-lg">
                    <div className="container mx-auto px-4 py-4">
                        <div className="space-y-4">
                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'living' ? null : 'living')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>Life in New Zealand</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'living' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'living' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">City</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Culture</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Living</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'study' ? null : 'study')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>Study Aboard</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'study' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'study' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Primary & Secondary Education</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Foundation Studies</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Tertiary Education</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'visa' ? null : 'visa')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>Visa</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'immigration' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'visa' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Placeholder</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'immigration' ? null : 'immigration')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>Immigration</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'immigration' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'immigration' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Skilled Immigration</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Investor Immigration</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Entrepreneurial Immigration</a>
                                    </div>
                                )}
                            </div>

                            <div className="border-b pb-2">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
                                    className="flex items-center justify-between w-full text-blue-900"
                                >
                                    <span>About Us</span>
                                    <ChevronRight
                                        size={16}
                                        className={`transform transition-transform ${activeDropdown === 'about' ? 'rotate-90' : ''}`}
                                    />
                                </button>
                                {activeDropdown === 'about' && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Our Work</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Services</a>
                                        <a href="#" className="block text-gray-600 hover:text-blue-700">Latest Articles</a>
                                    </div>
                                )}
                            </div>

                            <button className="w-full bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                                Consult Our Experts
                            </button>
                        </div>
                    </div>
                </nav>
            )}
        </header></>)
}