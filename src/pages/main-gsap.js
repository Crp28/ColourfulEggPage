import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronRight, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const slidesContainerRef = useRef(null);

    const slides = [
        {
            id: 1,
            image: `${process.env.PUBLIC_URL}/Nzpic1.jpg`,
            alt: 'New Zealand Scene 1'
        },
        {
            id: 2,
            image: `${process.env.PUBLIC_URL}/Nzpic2.jpg`,
            alt: 'New Zealand Scene 2'
        },
        {
            id: 3,
            image: `${process.env.PUBLIC_URL}/Nzpic3.jpg`,
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
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        gsap.to(slidesContainerRef.current, {
            x: `-${currentSlide * 100}%`,
            duration: 0.5,
            ease: "power2.out"
        });
    }, [currentSlide]);

    return (
        <div ref={sliderRef} className="relative w-full rounded-lg shadow-xl overflow-hidden">
            <div className="relative w-full aspect-[16/9]">
                <div
                    ref={slidesContainerRef}
                    className="absolute inset-0 flex"
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

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);
    const navigate = useNavigate();

    // Refs for GSAP animations
    const heroContentRef = useRef(null);
    const dividerRef = useRef(null);
    const nzSectionRef = useRef(null);
    const teamSectionRef = useRef(null);
    const teamMembersRef = useRef(null);
    const storiesSectionRef = useRef(null);
    const storiesCardsRef = useRef(null);
    const contactSectionRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        // Divider fade animation - starts immediately on scroll, completes at viewport center
        gsap.fromTo(dividerRef.current,
            { opacity: 1 },
            {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: () => window.innerHeight / 2,
                    scrub: true,
                }
            }
        );

        // Hero content reveal animation
        gsap.from(heroContentRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power3.out"
        });

        // NZ Section animation
        gsap.from(nzSectionRef.current.children, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: nzSectionRef.current,
                start: "top 80%"
            }
        });

        // Team members animation
        const teamMembers = teamMembersRef.current.children;
        gsap.from(teamMembers, {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
                trigger: teamSectionRef.current,
                start: "top 70%"
            }
        });

        // Stories cards animation
        const storyCards = storiesCardsRef.current.children;
        gsap.from(storyCards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: storiesSectionRef.current,
                start: "top 70%"
            }
        });

        // Contact section animation
        gsap.from(contactSectionRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: contactSectionRef.current,
                start: "top 80%"
            }
        });

        // Footer animation
        const footerColumns = footerRef.current.querySelectorAll('.footer-column');
        gsap.from(footerColumns, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%"
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Modal handlers
    useEffect(() => {
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
        navigate('/nav');
    };

    return (
        <div className="min-h-screen">

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
                                <img alt='QuestionEgg' src={`${process.env.PUBLIC_URL}/QuestionEgg.gif`} className="w-128 h-128" />
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
                    <div className="absolute inset-0">
                        <img
                            src={`${process.env.PUBLIC_URL}/home_bg.jpg`}
                            alt="New Zealand Landscape"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0" />
                    </div>

                    <div
                        ref={heroContentRef}
                        className="relative h-full pt-20"
                    >
                        <div className="container mx-auto px-4 h-full">
                            <div className="flex items-center h-full">
                                <div className="max-w-2xl text-white">
                                    <h1 className="text-5xl font-bold mb-6">Your Journey to New Zealand Starts Here</h1>
                                    <p className="text-xl mb-8">Discover world-class education in a country known for its stunning landscapes, rich culture, and innovative spirit.</p>
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
                <div
                    ref={dividerRef}
                    className="relative -mt-36 h-36 overflow-hidden"
                >
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

                {/* Other sections with their refs */}
                {/* Fill in your existing section content here */}

            </main>
        </div>
    );
};

export default HomePage;