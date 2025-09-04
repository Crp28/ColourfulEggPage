import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronRight, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../components/animatedsection';
import { getLang } from '../helpers/getLang';


const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            image: 'Nzpic1.jpg',
            alt: 'New Zealand Scene 1'
        },
        {
            id: 2,
            image: 'Nzpic2.jpg',
            alt: 'New Zealand Scene 2'
        },
        {
            id: 3,
            image: 'Nzpic3.jpg',
            alt: 'New Zealand Scene 3'
        },
        {
            id: 4,
            image: '/api/placeholder/800/600',
            alt: 'New Zealand Scene 4'
        },
        {
            id: 5,
            image: '/api/placeholder/800/600',
            alt: 'New Zealand Scene 5'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full rounded-lg shadow-xl overflow-hidden">
            {/* Fixed aspect ratio container */}
            <div className="relative w-full aspect-[16/9]">
                {/* Slides container */}
                <div
                    className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                >
                    {slides.map((slide) => (
                        <div
                            key={slide.id}
                            className="w-full h-full flex-shrink-0 relative"
                        >
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* image page */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-4' : 'bg-white/60'
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export const HomePageZH = () => {
    const [showModal, setShowModal] = useState(false);
    const [dividerOpacity, setDividerOpacity] = useState(1);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const [showQR, setShowQR] = useState(false);
    const nzSectionRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            // Header scroll handling

            // Divider opacity handling
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            // Calculate where we want the fade to complete
            // This should be when NZ section hits center of viewport
            const fadeEndPosition = viewportHeight / 2;

            // Start fade as soon as we begin scrolling
            if (scrollY > 0) {
                // Calculate opacity based on viewport-relative position
                const opacity = Math.max(0, 1 - (scrollY / fadeEndPosition));
                setDividerOpacity(opacity);
            } else {
                setDividerOpacity(1);
            }
        };

        // Add throttling for performance
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    useEffect(() => {
        // modal handling
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        if (!hasVisited) {
            setShowModal(true);
        }
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        if (dontShowAgain) {
            localStorage.setItem('hasVisitedBefore', 'true');
        }
    };

    const handleGo = () => {
        handleCloseModal();
        navigate(`${getLang(location)}/guide`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Welcome Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    {/* Modal Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={handleCloseModal}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg w-full max-w-4xl mx-auto shadow-xl">
                        <div className="relative p-6">
                            {/* Egg Circle */}
                            <div className="absolute -top-48 -left-48 w-160 h-160 flex items-center justify-center">
                                <img alt='QuestionEgg' src='QuestionEgg.gif' className="md:w-128 md:h-128" />
                            </div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-12 gap-4">
                                {/* Spacing for egg */}
                                <div className="col-span-3" />

                                {/* Main content */}
                                <div className="col-span-8">
                                    <h2 className="text-3xl font-bold text-blue-900 mb-4">WELCOME TITLE</h2>
                                    <p className="text-gray-700 mb-6">
                                        Description<br />
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                    </p>

                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Point 1</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Point 2</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>Point 3</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={dontShowAgain}
                                        onChange={(e) => setDontShowAgain(e.target.checked)}
                                        className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                                    />
                                    <span className="text-gray-700">Don't show this again</span>
                                </label>

                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="px-6 py-2 min-w-[100px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        SKIP
                                    </button>
                                    <button
                                        onClick={handleGo}
                                        className="px-6 py-2 min-w-[100px] bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
                                    >
                                        GO!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Main Content */}
            <main className="relative">
                {/* Hero Section */}
                <section className="relative h-screen">
                    {/* Background Image and Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src="home_bg.jpg"
                            alt="New Zealand Landscape"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative h-full pt-10">
                        <div className="container mx-auto px-4 h-full">
                            <div className="flex items-center h-full">
                                <div className="max-w-2xl text-white">
                                    <h1 className="text-5xl font-bold mb-6">您的新西兰生活由此开始</h1>
                                    <p className="text-xl mb-8">Placeholder text.</p>
                                    <button className="inline-flex items-center bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
                                        Learn More
                                        <ChevronRight className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Curved transition element */}
                <div className="relative -mt-36 h-36 overflow-hidden transition-opacity duration-300"
                    style={{ opacity: dividerOpacity }}>
                    <svg
                        className="absolute bottom-0 w-full h-full"
                        viewBox="0 0 1440 100"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="rgb(248, 250, 252)"
                            d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"
                        />
                    </svg>
                </div>

                {/* About New Zealand Section */}
                <section ref={nzSectionRef} className="relative  bg-gray-50">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="md:w-1/2 p-8 flex flex-col items-start text-left">
                                <h2 className="text-4xl font-bold text-blue-900 mb-8">为何选择新西兰？</h2>
                                <div className="text-gray-600 mb-6 leading-relaxed">新西兰以其安全友好的社会环境、高质量的教育机构、协作式的学习方式和友善的多元文化氛围，成为出国留学的绝佳选择。</div>
                                <div className="text-gray-600 mb-6 leading-relaxed">在这里，您可以提升英语语言能力，也可以进一步深造并且获得国际化的职业体验。学习之余，还能抓住机会探索新西兰令人震撼的魅力与精彩。</div>
                                <div className="text-gray-600 mb-6 leading-relaxed"></div>
                                <button className="mx-auto md:mx-0 text-orange-500 font-semibold flex items-center hover:text-orange-600 transition-colors">
                                    了解新西兰
                                    <ChevronRight className="ml-2" />
                                </button>
                            </div>
                            <div className="md:w-1/2 p-8">
                                <ImageSlider />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 bg-gray-100">
                    <div className="container flex justify-center mx-auto">
                        <div className="md:w-1/2 basis-1/2">
                            <AnimatedSection
                                animation="scale"
                                delay={0.2}
                            >
                                <div className="transform hover:scale-105 transition-transform duration-300 max-w-72">
                                    <img
                                        src="TeamLeader.jpg"
                                        alt={`Leader`}
                                        className="w-full rounded-full shadow-lg"
                                    />
                                </div>
                            </AnimatedSection>
                        </div>
                        <AnimatedSection animation="slideRight" delay={0.2} className="justify-self-end">
                            <div className=" p-8 flex flex-col items-end text-right">
                                <h2 className="text-4xl font-bold text-blue-900 mb-6 text-nowrap">Expert Consultant Team</h2>
                                <p className="text-gray-600 mb-6 max-w-2xl">Placeholder text for brief member description. Default shows team member 1.</p>
                                <button className="mx-auto md:mx-0 text-orange-500 font-semibold flex items-center hover:text-orange-600 transition-colors">
                                    Meet Our Team
                                    <ChevronRight className="ml-2" />
                                </button>
                            </div>
                        </AnimatedSection>
                    </div>

                </section>

                {/* Student Stories Section */}
                <section className="py-20 bg-gradient-to-b from-white to-sky-50">
                    <div className="container mx-auto px-4">
                        <AnimatedSection animation="slideUp" delay={0.2}>
                            <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Our Students</h2>
                        </AnimatedSection>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((video, index) => (
                                <AnimatedSection
                                    key={video}
                                    animation="slideUp"
                                    delay={0.2 * (index + 1)}
                                >
                                    <div className="relative group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-lg shadow-xl">
                                            <img
                                                src="/api/placeholder/400/300"
                                                alt={`Student ${video}`}
                                                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex items-center justify-center">
                                                <Play className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        <div className="mt-4 p-4 text-center">
                                            <h3 className="text-xl font-bold text-blue-900 mb-2">学生名 {video}</h3>
                                            <p className="text-gray-600">项目</p>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20 bg-blue-900 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 transform -skew-y-6" />
                    <AnimatedSection animation="fade" delay={0.2}>
                        <div className="container mx-auto px-4 text-center relative z-10">
                            <div className="max-w-3xl mx-auto">
                                <img
                                    src="OriginalEgg.gif"
                                    alt="Colourful Egg Education Logo"
                                    className="mx-auto mb-2 h-60 object-contain"
                                />
                                <h2 className="text-4xl font-bold text-white mb-6">想要出发了吗？</h2>
                                <p className="text-gray-100 text-xl mb-8">让纽蛋实现你的新西兰留学梦想。</p>
                                <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center">
                                    咨询我们
                                    <ChevronRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </AnimatedSection>
                </section>
            </main>
        </div >
    );
};
