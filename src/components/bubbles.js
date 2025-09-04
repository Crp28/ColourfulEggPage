import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Bubbles = () => {
    const [activeIndex, setActiveIndex] = useState(3);
    const [animatingIndex, setAnimatingIndex] = useState(null);
    const containerRef = useRef(null);
    const circleRefs = useRef([]);
    const titleRefs = useRef([]);
    const overlayRefs = useRef([]);

    const circles = [
        { title: "社会氛围", content: "新西兰是世界上最友善的国家之一：在全球幸福指数调查中，新西兰一直排名前列。人民以友好、热情和乐于助人闻名。在校园和工作场所，新西兰人普遍愿意帮助国际学生适应生活，不同背景的学生可以自由表达自己的观点和文化。这里提倡健康的生活方式，强调家庭、社交和个人成长的重要性，工作生活平衡世界第一。" },
        { title: "社会环境", content: "新西兰拥有世界前列的安全保障。在全球治安排名中，新西兰长期位列最安全国家之一，2024年《全球和平指数》排名第4。新西兰政治环境稳定，不受极端政策或社会动荡影响，且与中国有着稳定友好的关系。新西兰是第一个承认中国市场经济地位的发达国家；第一个与中国签订自由贸易协定的发达国家；第一个与中国正式签署“一带一路”相关协议的西方发达国家；第一个与中国开始自贸升级谈判的国家。" },
        { title: "Title 3", content: "Test place holder content for title 3" },
        { title: "Title 4", content: "Test place holder content for title 4" }
    ];

    const getSmallCirclePosition = (index) => {
        const centerX = 400;
        const centerY = 350;
        const radius = 400;
        const startAngle = 200 * (Math.PI / 180);
        const endAngle = 110 * (Math.PI / 180);
        const totalAngle = endAngle - startAngle;
        const angleStep = totalAngle / 2;
        const angle = startAngle + (index * angleStep);

        return {
            x: centerX + (radius * Math.cos(angle)),
            y: centerY + (radius * Math.sin(angle))
        };
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.killTweensOf([...circleRefs.current, ...titleRefs.current]);

        circleRefs.current.forEach((circle, index) => {
            const overlay = overlayRefs.current[index];
            const title = titleRefs.current[index];

            if (index === activeIndex) {
                gsap.set(circle, {
                    width: 600,
                    height: 600,
                    xPercent: -50,
                    yPercent: -50,
                    x: 400,
                    y: 350,
                    scale: 1,
                    zIndex: 2
                });

                gsap.set(title, { fontSize: '1.875rem' }); // text-3xl

                gsap.set(overlay, {
                    backgroundImage: 'linear-gradient(140deg, rgba(251,207,232,0.9), rgba(219,234,254,0.9))',
                    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.6)'
                });
            } else {
                const smallIndex = (index - activeIndex - 1 + circles.length) % circles.length;
                const position = getSmallCirclePosition(smallIndex);

                gsap.set(circle, {
                    width: 120,
                    height: 120,
                    xPercent: -50,
                    yPercent: -50,
                    ...position,
                    scale: 1,
                    zIndex: 1
                });

                gsap.set(title, { fontSize: '1.25rem' }); // text-xl

                gsap.set(overlay, {
                    backgroundImage: 'linear-gradient(140deg, rgba(252,231,243,0.8), rgba(219,234,254,0.8))',
                    boxShadow: 'inset 0 0 5px rgba(255,255,255,0.3)'
                });
            }
        });
    }, []);

    const handleCircleClick = (clickedIndex) => {
        if (clickedIndex === activeIndex || animatingIndex !== null) return;

        setAnimatingIndex(activeIndex);

        const currentActive = circleRefs.current[activeIndex];
        const newActive = circleRefs.current[clickedIndex];
        const currentTitle = titleRefs.current[activeIndex];
        const newTitle = titleRefs.current[clickedIndex];
        const currentOverlay = overlayRefs.current[activeIndex];
        const newOverlay = overlayRefs.current[clickedIndex];

        const smallIndex = (activeIndex - clickedIndex - 1 + circles.length) % circles.length;
        const newSmallPosition = getSmallCirclePosition(smallIndex);

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveIndex(clickedIndex);
                setAnimatingIndex(null);
            }
        });

        // Animate current active to small
        tl.to(currentActive, {
            ...newSmallPosition,
            width: 120,
            height: 120,
            duration: 0.5,
            ease: "power2.inOut"
        });

        // Animate current title to small
        tl.to(currentTitle, {
            fontSize: '1.25rem', // text-xl
            duration: 0.5,
            ease: "power2.inOut"
        }, '<');

        // Animate current overlay
        tl.to(currentOverlay, {
            backgroundImage: 'linear-gradient(140deg, rgba(252,231,243,0.8), rgba(219,234,254,0.8))',
            boxShadow: 'inset 0 0 5px rgba(255,255,255,0.3)',
            duration: 0.5,
            ease: "power2.inOut"
        }, '<');

        // Animate new active to large
        tl.to(newActive, {
            x: 400,
            y: 350,
            width: 600,
            height: 600,
            scale: 1,
            zIndex: 2,
            duration: 0.5,
            ease: "power2.inOut"
        }, '-=0.4');

        // Animate new title to large
        tl.to(newTitle, {
            fontSize: '1.875rem', // text-3xl
            duration: 0.5,
            ease: "power2.inOut"
        }, '<');

        // Animate new overlay
        tl.to(newOverlay, {
            backgroundImage: 'linear-gradient(140deg, rgba(251,207,232,0.9), rgba(219,234,254,0.9))',
            boxShadow: 'inset 0 0 20px rgba(255,255,255,0.6)',
            duration: 0.5,
            ease: "power2.inOut"
        }, '<');

        // Update other small circles
        circleRefs.current.forEach((circle, index) => {
            if (index !== clickedIndex && index !== activeIndex) {
                const relIndex = (index - clickedIndex - 1 + circles.length) % circles.length;
                const position = getSmallCirclePosition(relIndex);

                tl.to(circle, {
                    ...position,
                    duration: 0.5,
                    ease: "power2.inOut"
                }, "-=0.5");
            }
        });
    };

    return (
        <div className="relative w-full bg-gray-50">
            <div ref={containerRef} className="relative w-[800px] h-[800px] mx-auto">
                {circles.map((circle, index) => {
                    const isActive = index === activeIndex;
                    const isAnimating = index === animatingIndex;
                    return (
                        <div
                            key={index}
                            ref={el => circleRefs.current[index] = el}
                            onClick={() => !isActive && handleCircleClick(index)}
                            className={`absolute overflow-hidden rounded-full bg-white ${!isActive ? 'cursor-pointer' : ''}`}
                        >
                            {/* Gradient overlay with animation */}
                            <div
                                ref={el => overlayRefs.current[index] = el}
                                className="absolute inset-0 rounded-full backdrop-blur-sm"
                            />

                            <div className={`relative w-full h-full flex items-center justify-center origin-center ${isActive && !isAnimating ? 'p-16' : 'p-3'}`}>
                                <div className="text-center">
                                    <h2
                                        ref={el => titleRefs.current[index] = el}
                                        className={`font-bold ${isActive ? 'mb-4' : ''} text-gray-800/80`}
                                    >
                                        {circle.title}
                                    </h2>
                                    {isActive && !isAnimating && (
                                        <div className="text-lg mt-2 text-gray-700/90">
                                            {circle.content}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Bubbles;