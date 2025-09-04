import { useEffect, useRef, useState } from "react";

// Custom hook for scroll detection
const useInView = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !hasAnimated) {
                setIsVisible(true);
                setHasAnimated(true);
            }
        }, { threshold: options.threshold || 0.2 });

        const currentRef = elementRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.threshold]);

    return [elementRef, isVisible];
};

// Animated section component
export const AnimatedSection = ({ children, animation = 'fade', delay = 0 }) => {
    const [ref, isVisible] = useInView();

    const getAnimationClasses = () => {
        const baseClasses = 'transform transition-all duration-1000';
        const initial = {
            fade: 'opacity-0',
            slideUp: 'opacity-0 translate-y-8',
            slideRight: 'opacity-0 -translate-x-8',
            slideLeft: 'opacity-0 translate-x-8',
            scale: 'opacity-0 scale-95',
        }[animation] || 'opacity-0';

        const visible = {
            fade: 'opacity-100',
            slideUp: 'opacity-100 translate-y-0',
            slideRight: 'opacity-100 translate-x-0',
            slideLeft: 'opacity-100 translate-x-0',
            scale: 'opacity-100 scale-100',
        }[animation] || 'opacity-100';

        return `${baseClasses} ${isVisible ? visible : initial}`;
    };

    return (
        <div
            ref={ref}
            className={getAnimationClasses()}
            style={{ transitionDelay: `${delay}s` }}
        >
            {children}
        </div>
    );
};