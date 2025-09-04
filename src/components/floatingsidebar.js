import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, X } from 'lucide-react';

// sections contains id, label pairs
export const FloatingSectionNav = ({ sections, onSectionClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Improved scroll position tracking
    useEffect(() => {
        const handleScroll = () => {
            // Get the middle of the viewport
            const viewportHeight = window.innerHeight;
            const viewportMiddle = window.scrollY + (viewportHeight / 3);

            // Find which section contains this point
            let currentSection = '';
            sections.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect();
                    const elementTop = top + window.scrollY;
                    const elementBottom = bottom + window.scrollY;

                    if (viewportMiddle >= elementTop && viewportMiddle < elementBottom) {
                        currentSection = id;
                    }
                }
            });

            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Add resize listener to handle window size changes
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [sections]);

    // Smooth scroll to section
    const scrollToSection = (id) => {
        if (onSectionClick) {
            onSectionClick(id);
        } else {
            // Default scroll behavior
            const element = document.getElementById(id);
            if (element) {
                const headerHeight = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-8 left-8 z-50 p-3 rounded-lg shadow-lg transition-all duration-300 
                    ${isOpen ? 'bg-white text-blue-900' : 'bg-blue-900 text-white'}
                    hover:bg-opacity-90`}
            >
                {isOpen ? (
                    <X size={24} />
                ) : (
                    <ChevronRight size={24} />
                )}
            </button>

            {/* Navigation Panel */}
            <div
                className={`fixed left-8 bottom-24 z-40 bg-white rounded-lg shadow-xl transition-all duration-300 transform
                    ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}
            >
                <nav className="p-4 min-w-[200px]">
                    <ul className="space-y-2">
                        {sections.map(({ id, label }) => (
                            <li key={id}>
                                <button
                                    onClick={() => scrollToSection(id)}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors
                                        ${activeSection === id
                                            ? 'bg-blue-50 text-blue-900 font-medium'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};