import React, { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from '../components/animatedsection';
import { FloatingSectionNav } from '../components/floatingsidebar';
import "../styles/studentpage.css"
import { useLocation, useNavigate } from 'react-router-dom';
import UniversityBook from '../components/book'
import { ChevronRight, BookOpen, GraduationCap, School, Briefcase, PlaneLanding, ChevronDown, Clock, Coins, Calendar, ArrowRight, ArrowBigDown, Heart, Users, CalendarDays, Globe, Music, Palette, ScrollText } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { getLang } from '../helpers/getLang';



gsap.registerPlugin(ScrollTrigger);

// Helper Components

const PageWrapper = ({ children }) => {
    return (
        <div className="relative bg-white">
            {/* Continuous Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-32 overflow-hidden pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-75" />
                <div className="absolute inset-0" style={{ transform: 'translateX(-1px)' }}>
                    <svg
                        preserveAspectRatio="none"
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 100 1000"
                    >
                        <pattern
                            id={`dots-${Math.random()}`}
                            x="0"
                            y="0"
                            width="16"
                            height="16"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(-15)"
                        >
                            <circle cx="8" cy="8" r="1" fill="#1E3A8A" />
                        </pattern>
                        <rect width="100" height="1000" fill={`url(#dots-${Math.random()})`} opacity="0.3" />
                    </svg>
                </div>
            </div>

            {/* Continuous Right Border */}
            <div className="absolute right-0 top-0 bottom-0 w-32 overflow-hidden pointer-events-none z-10">
                <div className="absolute inset-0 bg-gradient-to-l from-blue-100 to-transparent opacity-75" />
                <div className="absolute inset-0" style={{ transform: 'translateX(1px)' }}>
                    <svg
                        preserveAspectRatio="none"
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 100 1000"
                    >
                        <pattern
                            id={`dots2-${Math.random()}`}
                            x="0"
                            y="0"
                            width="16"
                            height="16"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(15)"
                        >
                            <circle cx="8" cy="8" r="1" fill="#1E3A8A" />
                        </pattern>
                        <rect width="100" height="1000" fill={`url(#dots2-${Math.random()})`} opacity="0.3" />
                    </svg>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative">
                {children}
            </div>
        </div>
    );
};

const EducationSystem = ({ title, description, features }) => (
    <div className="bg-white p-8 border-l-4 border-blue-900">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <ul className="space-y-3">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                    {feature}
                </li>
            ))}
        </ul>
    </div>
);

const Card = ({ icon: Icon, title, description, className = "" }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow ${className}`}>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-blue-900" />
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const TimelineItem = ({ year, content, isRight = false }) => (
    <div className={`flex items-center ${isRight ? 'flex-row-reverse' : ''}`}>
        <div className="w-1/2 px-4">
            <div className={`bg-white p-6 rounded-xl shadow-md ${isRight ? 'mr-8' : 'ml-8'}`}>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Year {year}</h3>
                <p className="text-gray-600">{content}</p>
            </div>
        </div>
        <div className="w-4 h-4 bg-orange-500 rounded-full z-10" />
        <div className="w-1/2" />
    </div>
);

const ScrollConfetti = () => {
    const canvasRef = useRef(null);
    const confettiPieces = useRef([]);

    useGSAP(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        for (let i = 0; i < 50; i++) {
            confettiPieces.current.push({
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 20,
                width: Math.random() * 10 + 5,
                height: (Math.random() * 10 + 5) * 1.5,
                rotation: Math.random() * 360,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                progress: 0
            });
        }

        const drawConfetti = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiPieces.current.forEach(piece => {
                ctx.save();

                const finalY = -50;
                const currentY = window.innerHeight + 20 + (finalY - (window.innerHeight + 20)) * piece.progress;
                const drift = Math.sin(piece.progress * Math.PI) * 50;
                const currentX = piece.x + drift;

                ctx.translate(currentX, currentY);
                ctx.rotate((piece.rotation + piece.progress * 360) * Math.PI / 180);
                ctx.globalAlpha = piece.progress < 0.1 ? piece.progress * 10 :
                    piece.progress > 0.9 ? (1 - piece.progress) * 10 :
                        1;

                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
                ctx.restore();
            });
        };

        gsap.ticker.add(drawConfetti);

        gsap.timeline({
            scrollTrigger: {
                trigger: ".min-h-screen",
                start: "top top",
                end: "+=150%",
                scrub: 1,
                onUpdate: (self) => {
                    const rawProgress = self.progress;
                    if (rawProgress >= 0.4 && rawProgress <= 0.8) {
                        const normalizedProgress = (rawProgress - 0.4) / 0.4;
                        confettiPieces.current.forEach((piece, index) => {
                            const staggeredProgress = Math.max(0, Math.min(1,
                                (normalizedProgress - (index * 0.02)) * 1.5
                            ));
                            piece.progress = staggeredProgress;
                        });
                    } else {
                        confettiPieces.current.forEach(piece => {
                            piece.progress = 0;
                        });
                    }
                }
            }
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            gsap.ticker.remove(drawConfetti);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, { scope: canvasRef });

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-40"
        />
    );
};

const CustomAccordion = ({ title, icon: Icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0';
        }
    }, [isOpen]);

    return (
        <div className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
            <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="flex items-center text-lg font-semibold text-blue-900">
                    <Icon className="w-5 h-5 mr-2" />
                    {title}
                </div>
                <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                ref={contentRef}
                className="transition-all duration-200 ease-out"
                style={{ maxHeight: 0 }}
            >
                <div className="px-6 pb-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

const TimelineCard = ({ title, content, isHighlighted = false, className = "" }) => (
    <div
        className={`rounded-lg transition-all duration-300 w-5/6 ${isHighlighted
            ? 'bg-orange-50/70'
            : 'bg-gray-50'
            } ${className}`}
    >
        <h3 className="font-bold text-blue-900">{title}</h3>
        <p className="text-sm text-gray-600">{content}</p>
    </div>
);


// pages

export const ColourfulStudyCN = () => {
    // sections used by the sidebar
    const sections = [
        { id: "CStop", label: "回顶部" },
        { id: "education-systems", label: "教育体系" },
        { id: "teaching-approach", label: "教育方式" },
        { id: "student-development", label: "全面发展" },
        { id: "fees-intro", label: "留学成本" },
        { id: "students-voices", label: "留学生说" }
    ]
    const navigate = useNavigate();
    const location = useLocation();

    return (<>

        {/* Title Section */}
        <section id="CStop" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 opacity-0"
                style={{
                    backgroundImage: `url('${process.env.PUBLIC_URL}/Lincoln.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: 'fadeIn 1s ease-out forwards'
                }}
            />

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 opacity-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
                    animation: 'fadeIn 1.5s ease-out 1s forwards'
                }}
            />

            {/* Main Content */}
            <div className="relative container mx-auto px-4 z-10">
                <AnimatedSection animation="slideUp">
                    <div className="max-w-4xl mx-auto text-center opacity-0" style={{
                        animation: 'fadeIn 1s ease-out 2.5s forwards'
                    }}>
                        {/* Title Content */}
                        <div className="text-center mb-16">
                            {/* Orange Bar */}
                            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mb-8" />

                            <h1 className="text-6xl font-bold text-white mb-8 tracking-tight">
                                多彩学习
                            </h1>

                            <div className="text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
                                开启你的新西兰学习之旅，
                                <span className="text-orange-400">探索无限可能</span>
                            </div>
                        </div>

                        {/* Feature Points */}
                        <div className="flex justify-center space-x-24">
                            {[
                                { text: '多元化教育选择', section: 'education-systems' },
                                { text: '全面的能力培养', section: 'teaching-approach' },
                                { text: '个性化成长规划', section: 'student-development' }
                            ].map(({ text, section }, index) => (
                                <div
                                    key={index}
                                    className="text-center group"
                                    onClick={() => {
                                        document.getElementById(section)?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }}
                                    style={{
                                        animation: `fadeUp 1s ease-out ${3 + index * 0.2}s both`
                                    }}
                                >
                                    <div className="relative w-16 h-16 mx-auto mb-4 cursor-pointer transition-transform hover:scale-105">
                                        {/* Outer circle */}
                                        <div
                                            className="absolute inset-0 bg-white rounded-full transition-all duration-300
                               group-hover:opacity-30 group-hover:scale-100"
                                            style={{
                                                animation: 'breathe 2s infinite',
                                            }}
                                        />
                                        {/* Middle circle */}
                                        <div
                                            className="absolute inset-2 bg-white rounded-full transition-all duration-300
                               group-hover:opacity-25 group-hover:scale-100"
                                            style={{
                                                animation: 'breatheScale 2s infinite',
                                            }}
                                        />
                                        {/* Inner circle */}
                                        <div
                                            className="absolute inset-4 bg-orange-500 rounded-full transition-all duration-300
                               group-hover:opacity-30 group-hover:scale-100"
                                            style={{
                                                animation: 'breathe 2s infinite 1s',
                                            }}
                                        />
                                    </div>
                                    <p className="text-white text-lg font-medium cursor-pointer">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>

        <PageWrapper>
            <div className="min-h-screen bg-gray-50">
                {/* Education Systems Section */}
                <section id="education-systems" className="relative py-16 md:py-24 bg-gray-50 overflow-hidden">

                    <div className="container mx-auto px-4">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                多元化教育体系
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="space-y-8">
                            <AnimatedSection animation="slideRight" delay={0.2}>
                                <EducationSystem
                                    title="新西兰国家教育体系 (NCEA)"
                                    description="新西兰官方认可的中学教育体系，为学生提供灵活的学习路径和广泛的课程选择。"
                                    features={[
                                        "灵活的课程选择",
                                        "国际认可的学历证书",
                                        "持续性评估体系",
                                        "实用技能培养"
                                    ]}
                                />
                            </AnimatedSection>

                            <AnimatedSection animation="slideRight" delay={0.3}>
                                <EducationSystem
                                    title="剑桥国际考试 (CIE)"
                                    description="源自英国的国际教育体系，注重培养学生的学术能力和批判性思维。"
                                    features={[
                                        "严谨的学术训练",
                                        "国际化教学标准",
                                        "系统的知识体系",
                                        "全球认可的资质"
                                    ]}
                                />
                            </AnimatedSection>

                            <AnimatedSection animation="slideRight" delay={0.4}>
                                <EducationSystem
                                    title="IB国际文凭课程"
                                    description="全面的国际教育项目，培养具有国际视野的终身学习者。"
                                    features={[
                                        "跨学科学习方法",
                                        "研究性学习能力",
                                        "国际文化视野",
                                        "批判性思维培养"
                                    ]}
                                />
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Teaching Approach Section */}
                <section id="teaching-approach" className="relative overflow-hidden py-16 md:py-24">

                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <AnimatedSection animation="slideRight">
                                <div>
                                    <h2 className="text-3xl font-bold text-blue-900 mb-8">
                                        面向未来的教育方式
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="p-6 bg-blue-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-3">传统课堂教学</h3>
                                            <p className="text-gray-600">
                                                系统化的知识传授，培养学生的学科基础和学术能力
                                            </p>
                                        </div>
                                        <div className="p-6 bg-orange-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-3">实践教学</h3>
                                            <p className="text-gray-600">
                                                通过项目实践、小组讨论等形式，培养问题解决能力
                                            </p>
                                        </div>
                                        <div className="p-6 bg-green-50 rounded-lg">
                                            <h3 className="text-xl font-semibold text-blue-900 mb-3">个性化辅导</h3>
                                            <p className="text-gray-600">
                                                根据学生特点提供针对性指导，促进个人发展
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="slideLeft">
                                <div className="grid grid-cols-2 gap-4">
                                    <img
                                        src="/api/placeholder/300/400"
                                        alt="Teaching approach 1"
                                        className="rounded-lg shadow-lg w-full h-full object-cover"
                                    />
                                    <img
                                        src="/api/placeholder/300/400"
                                        alt="Teaching approach 2"
                                        className="rounded-lg shadow-lg w-full h-full object-cover mt-8"
                                    />
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Student Development Section */}
                <section id="student-development" className="relative overflow-hidden py-16 md:py-24">

                    <div className="container mx-auto px-4">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                注重身心全面发展
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: '学术能力',
                                    items: ['批判性思维', '研究方法', '学科知识', '创新思维']
                                },
                                {
                                    title: '个人发展',
                                    items: ['自主学习', '时间管理', '压力调节', '目标规划']
                                },
                                {
                                    title: '社交技能',
                                    items: ['团队协作', '跨文化交流', '领导才能', '沟通表达']
                                }
                            ].map((category, index) => (
                                <AnimatedSection
                                    key={index}
                                    animation="slideUp"
                                    delay={0.2 * index}
                                >
                                    <div className="bg-white p-8">
                                        <h3 className="text-xl font-bold text-blue-900 mb-6 pb-4 border-b">
                                            {category.title}
                                        </h3>
                                        <ul className="space-y-4">
                                            {category.items.map((item, idx) => (
                                                <li key={idx} className="flex items-center text-gray-700">
                                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cost Section */}
                <section id="fees-intro" className="relative overflow-hidden py-16 md:py-24">

                    <div className="container mx-auto px-4">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                可负担的留学成本
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        title: '学费优势',
                                        features: [
                                            '相比其他国家更低的学费',
                                            '3年制本科课程',
                                            '多样化奖学金机会'
                                        ]
                                    },
                                    {
                                        title: '生活成本',
                                        features: [
                                            '合理的住宿费用',
                                            '便利的公共交通',
                                            '学生优惠政策'
                                        ]
                                    },
                                    {
                                        title: '灵活支持',
                                        features: [
                                            '弹性付款方案',
                                            '多种资金证明方式',
                                            '专业财务规划建议'
                                        ]
                                    }
                                ].map((category, index) => (
                                    <AnimatedSection
                                        key={index}
                                        animation="slideUp"
                                        delay={0.2 * index}
                                    >
                                        <div className="p-8 bg-gray-50 rounded-lg">
                                            <h3 className="text-xl font-bold text-blue-900 mb-6">
                                                {category.title}
                                            </h3>
                                            <ul className="space-y-4">
                                                {category.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center text-gray-700">
                                                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                            <AnimatedSection
                                animation="fade"
                            >
                                <img src={`${process.env.PUBLIC_URL}/Timeline.png`} alt="timeline" className="mx-auto size-2/3"></img>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Students Voice Section */}
                <section id="students-voices" className="relative overflow-hidden py-16 md:py-24 bg-white">
                    <div className="container mx-auto px-4">
                        {/* Redesigned Title Section */}
                        <AnimatedSection animation="fade">
                            <div className="relative text-center mb-20">
                                {/* Background decorative elements */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-32 bg-blue-50 rounded-full opacity-50 blur-xl" />
                                <div className="absolute left-1/2 -translate-x-1/2 top-4 w-24 h-24 bg-orange-50 rounded-full opacity-50 blur-xl" />

                                {/* Main Title with Subtitle */}
                                <div className="relative">
                                    <h2 className="text-4xl font-bold text-blue-900 mb-4">
                                        留学生说
                                    </h2>
                                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                        听听他们在新西兰的学习经历
                                    </p>
                                </div>

                                {/* Decorative Elements */}
                                <div className="flex justify-center gap-4 mt-6">
                                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                                </div>

                                {/* Side Decorative Lines */}
                                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />
                                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-32 h-px bg-gradient-to-l from-transparent via-orange-200 to-transparent" />
                            </div>
                        </AnimatedSection>

                        {/* Testimonials Container */}
                        <div className="max-w-5xl mx-auto">
                            {[
                                {
                                    name: "Student A",
                                    program: "本科 - X专业",
                                    image: `${process.env.PUBLIC_URL}/student1.jpg`,
                                    testimonial: "Placeholder"
                                },
                                {
                                    name: "Student B",
                                    program: "研究生 - Y专业",
                                    image: `${process.env.PUBLIC_URL}/student2.jpg`,
                                    testimonial: "Placeholder"
                                },
                                {
                                    name: "Student C",
                                    program: "中学 - Year 9",
                                    image: `${process.env.PUBLIC_URL}/student3.jpg`,
                                    testimonial: "Placeholder"
                                }
                            ].map((student, index) => (
                                <AnimatedSection
                                    key={index}
                                    animation={index % 2 === 0 ? "slideRight" : "slideLeft"}
                                    delay={0.2 * index}
                                >
                                    <div className="flex items-center gap-8 mb-16">
                                        {index % 2 === 0 && (
                                            <div className="w-1/4 flex-shrink-0">
                                                <div className="aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                                                    <img
                                                        src={student.image}
                                                        alt={student.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className={`flex-1 p-6 bg-gray-50 rounded-xl shadow-lg relative
          ${index % 2 === 0 ? 'rounded-l-none' : 'rounded-r-none'}`}>
                                            <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-50 transform rotate-45
            ${index % 2 === 0 ? '-left-2' : '-right-2'}`}
                                            />

                                            <h3 className="text-2xl font-bold text-blue-900 mb-2">{student.name}</h3>
                                            <p className="text-gray-600 italic mb-4">{student.program}</p>
                                            <p className="text-gray-700 leading-relaxed">{student.testimonial}</p>
                                        </div>

                                        {index % 2 === 1 && (
                                            <div className="w-1/4 flex-shrink-0">
                                                <div className="aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                                                    <img
                                                        src={student.image}
                                                        alt={student.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

        </PageWrapper >
        {/* CTA Section */}
        <section className="bg-blue-900 py-16">
            <div className="container mx-auto px-4">
                <AnimatedSection animation="fade">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            想要了解更多有关新西兰的留学生活？
                        </h2>
                        <p className="text-blue-100 mb-8">
                            跟随纽蛋留学规划官的引导一起深入了解
                        </p>
                        <button className="bg-orange-500 text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center text-lg"
                            onClick={() => { navigate(`${getLang(location)}/guide`) }}>
                            选择你的引导者 <ChevronRight className="ml-2" />
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>

        {/* Floating sidebar */}
        <div className="fixed bottom-8 left-8 z-50">
            <FloatingSectionNav sections={sections} />
        </div>
    </>
    );
};



export const PriSecStudyCN = () => {
    // 中小学留学
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const heroRef = useRef(null);

    const sections = [
        { id: "PSTop", label: "回顶部" },
        { id: "education-system", label: "教育系统" },
        { id: "school-life", label: "校园生活" },
        { id: "subjects", label: "课程介绍" },
        { id: "activities", label: "课外活动" },
        { id: "costs", label: "留学费用" },
        { id: "support", label: "学生支持" }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const heroBottom = heroRef.current?.getBoundingClientRect().bottom;
            setShowNav(heroBottom < 180); // shows siderbar after hero section
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen">
            <div className="relative bg-gradient-to-b from-sky-100 to-white">
                {/* Decorative Elements for continuous background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Hero area circles */}
                    <div className="absolute top-20 left-20 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                    <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                    <div className="absolute top-96 left-40 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

                    {/* Education system area circles */}
                    <div className="absolute top-[800px] right-64 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob" />
                    <div className="absolute top-[900px] left-32 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-75 animate-blob animation-delay-2000" />
                    <div className="absolute top-[1100px] right-16 w-56 h-56 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-65 animate-blob animation-delay-4000" />

                    {/* School life area circles */}
                    <div className="absolute top-[1600px] left-48 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                    <div className="absolute top-[1800px] right-40 w-52 h-52 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-65 animate-blob animation-delay-2000" />
                    <div className="absolute top-[1900px] left-16 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-75 animate-blob animation-delay-4000" />

                    {/* Subjects area circles */}
                    <div className="absolute top-[2400px] right-24 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob" />
                    <div className="absolute top-[2600px] left-56 w-44 h-44 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-75 animate-blob animation-delay-2000" />
                    <div className="absolute top-[2800px] right-48 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-65 animate-blob animation-delay-4000" />

                    {/* Activities area circles */}
                    <div className="absolute top-[3200px] left-24 w-56 h-56 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                    <div className="absolute top-[3400px] right-32 w-68 h-68 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-65 animate-blob animation-delay-2000" />

                </div>
                {/* Hero Section */}
                <section ref={heroRef} id="PSTop" className="relative min-h-screen flex items-center overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl">
                            <h1 className="text-6xl font-bold text-blue-900 mb-8">
                                在新西兰开启你的求学之旅
                            </h1>
                            <p className="text-xl text-gray-700 mb-12">
                                探索新西兰优质的中小学教育，体验独特的学习方式，培养全球视野
                            </p>
                            <div className="grid grid-cols-3 gap-8">
                                <Card
                                    icon={Heart}
                                    title="关怀备至"
                                    description="温暖友善的学习环境，帮助国际学生快速适应新环境"
                                />
                                <Card
                                    icon={School}
                                    title="优质教育"
                                    description="课内外的鼓励式教育，树立自信并培养批判性和创造性的思维"
                                />
                                <Card
                                    icon={Users}
                                    title="多元文化"
                                    description="来自世界各地的同学，开拓国际视野"
                                />
                            </div>
                        </div>
                    </div>
                </section>


                {/* Education System Section */}
                <section id="education-system" className="relative py-20">
                    <div className="container mx-auto px-4 relative z-10">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                新西兰教育系统
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="max-w-5xl mx-auto space-y-12">
                            <TimelineItem
                                year="1-6"
                                content="小学阶段：培养基础能力，激发学习兴趣。课程包括英语、数学、科学、艺术、体育等。采用互动式教学，让学习充满乐趣。"
                            />
                            <TimelineItem
                                year="7-8"
                                content="初中阶段：过渡阶段，逐步接触更专业的学科。开始培养独立学习能力，为中学学习做准备。"
                                isRight
                            />
                            <TimelineItem
                                year="9-13"
                                content="高中阶段：根据兴趣和能力选择不同细化专业课程，如多媒体，视觉艺术，木工，语言学，生物，计算机科学等。为大学学习和未来发展打下坚实基础。"
                            />
                        </div>
                    </div>
                    <div className="max-w-5xl mx-auto mt-20 px-4">
                        <div className="grid grid-cols-3 gap-8">
                            <AnimatedSection animation="slideRight" delay={0.2}>
                                <img src={`${process.env.PUBLIC_URL}/NCEA.png`} alt="NCEA"></img>
                            </AnimatedSection>

                            <AnimatedSection animation="slideRight" delay={0.3}>
                                <img src={`${process.env.PUBLIC_URL}/CIE.png`} alt="CIE" ></img>
                            </AnimatedSection>

                            <AnimatedSection animation="slideRight" delay={0.4}>
                                <img src={`${process.env.PUBLIC_URL}/IB.png`} alt="IB" ></img>
                            </AnimatedSection>
                        </div>
                        <div className='text-center mt-10 text-2xl'>选择心仪的学习体系。所有课程为全球公认的资格证书，高中毕业后可进入全球名校！</div>
                    </div>
                </section>

                {/* School Life Section */}
                <section id="school-life" className="relative py-20">
                    <div className="container mx-auto px-4 relative z-10">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                丰富多彩的校园生活
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-12">
                            <AnimatedSection animation="slideRight">
                                <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                                    <img
                                        src="/api/placeholder/600/400"
                                        alt="School Life"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="slideLeft">
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-xl shadow-md">
                                        <div className="flex items-center mb-2">
                                            <Clock className="w-6 h-6 text-orange-500 mr-3" />
                                            <h3 className="text-xl font-bold text-blue-900">教育特点</h3>
                                        </div>
                                        <h2 className='text-center text-red-400'>想成为花 就可以成为花</h2>
                                        <h2 className='text-center text-green-600/80 mb-2'>想成为树 就可以成为树</h2>
                                        <p className="text-gray-600">新西兰的教育以「尊重、好客和慷慨」的概念为基础，以提升他人为目标，促进交流和互惠。

                                            在新西兰，学业成就只是学校培养学生的其中一个方面，生存技能、艺术素养、体育活动、领导力、独立自主能力、快乐成长、特长发展等等方面都是学校教育的重要关注点。
                                        </p>
                                    </div>

                                    <div className="bg-white p-6 rounded-xl shadow-md">
                                        <div className="flex items-center mb-4">
                                            <CalendarDays className="w-6 h-6 text-orange-500 mr-3" />
                                            <h3 className="text-xl font-bold text-blue-900">学期安排</h3>
                                        </div>
                                        <p className="text-gray-600">
                                            新西兰学校分为四个学期，每个学期约10周，其间设有假期。你可以选择在任何学期开始你的学习之旅。
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Subjects Section */}
                <section id="subjects" className="relative py-20">
                    <div className="container mx-auto px-4 relative z-10">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900  text-center">
                                多样化课程选择
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                            <h4 className="text-center mt-4 mb-12 text-orange-500/80">学生可以根据兴趣能力选课，并获得学分来满足升学的要求，避免了一门偏科就惨遭淘汰的现象</h4>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {[
                                { icon: BookOpen, title: "国家课程", desc: "基础必修课程，包括语文、数学、理化、社会科学等，提供了丰富的课程内容，帮助学生培养基本学习技能和素养。" },
                                { icon: GraduationCap, title: "选修课程", desc: "特色选修课程，提供多样化的学习选择，如艺术、音乐、体育、商业等，可以根据自己的兴趣和需求选择。" },
                                { icon: Globe, title: "国际课程", desc: "针对国际学生的选修课程，提供了国际化的学习方法，帮助学生提高英语水平，增强国际视野。" },
                                { icon: Palette, title: "特殊课程", desc: "根据学生的特殊需求定制的课程，如特殊教育课程、特殊技能课程等，帮助学生提高特殊技能。" },
                                { icon: Music, title: "其他课程", desc: "包含职业培训课程、预备课程、技术课程等，帮助学生进行未来发展准备，精进相关知识。" }
                            ].map((item, index) => (
                                <AnimatedSection
                                    key={index}
                                    animation="slideUp"
                                    delay={0.1 * index}
                                >
                                    <div className="h-64 flex">
                                        <Card
                                            icon={item.icon}
                                            title={item.title}
                                            description={item.desc}
                                            className="flex-1 flex flex-col"
                                        />
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>


                {/* Activities Section */}
                <section id="activities" className="relative py-20">
                    <div className="container mx-auto px-4 relative z-10">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                课外活动
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-3 gap-8">
                            <AnimatedSection animation="slideRight">
                                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-6">运动俱乐部</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            足球、篮球、网球等团队运动
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            游泳、田径等个人项目
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            校际比赛机会
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="slideUp">
                                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-6">艺术活动</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            音乐乐团
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            戏剧表演
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            美术创作
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="slideLeft">
                                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-6">文化活动</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            国际文化节
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            学生俱乐部
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            社区服务
                                        </li>
                                    </ul>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
            </div>

            {/* Cost Section */}
            <section id="costs" className="relative py-20 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection animation="fade">
                        <div className="border-blue-800/70 border-4 text-blue-900 text-center py-4 px-8 rounded-full max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold">
                                留学费用
                            </h2>
                        </div>
                    </AnimatedSection>

                    <div className="max-w-4xl mx-auto space-y-12">
                        <AnimatedSection animation="slideRight">
                            <div className="space-y-6">
                                <div className="bg-orange-500/90 text-white text-xl font-bold py-3 px-8 rounded-full inline-block">
                                    学费
                                </div>
                                <div className="space-y-4 pl-4">
                                    <div className="flex flex-wrap items-center gap-x-4">
                                        <span className="text-lg">公立学校：一般在NZD$17,500 - $25,250左右</span>
                                        <span className="text-blue-600/80 font-semibold">约人民币¥75,250-¥108,575</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4">
                                        <span className="text-lg">私立学校：一般在NZD$27,650 - $58,328左右</span>
                                        <span className="text-blue-600/80 font-semibold">约人民币¥118,895-¥250,810</span>
                                    </div>
                                    <div className="text-gray-500 text-sm">(参考汇率：1纽币=4.3人民币)</div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideLeft">
                            <div className="space-y-6">
                                <div className="bg-orange-500/90 text-white text-xl font-bold py-3 px-8 rounded-full inline-block">
                                    生活费
                                </div>
                                <div className="space-y-2 pl-4">
                                    <div className="flex flex-wrap items-center gap-x-4">
                                        <span className="text-lg">新西兰移民局国际学生签证资金证明要求在NZD$17,000-$20,000以上</span>
                                        <span className="text-blue-600/80 font-semibold">约人民币¥73,000-¥86,000</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideRight">
                            <div className="space-y-6">
                                <div className="bg-orange-500/90 text-white text-xl font-bold py-3 px-8 rounded-full inline-block">
                                    其他费用
                                </div>
                                <div className="space-y-2 pl-4">
                                    <div className="flex flex-wrap items-center gap-x-4">
                                        <span className="text-lg">注册费、保险费、校服费等其他杂费在NZD$3,000-$6,000</span>
                                        <span className="text-blue-600/80 font-semibold">约人民币¥12,000-¥24,000</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Support Section */}
            <section id="support" className="py-20 bg-blue-50">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                            全方位的学生支持
                            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                        </h2>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-12">
                        <AnimatedSection animation="slideRight">
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold text-blue-900 mb-4">学习支持</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            专业的英语语言辅导
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            一对一学业指导
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            课后补习项目
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-md">
                                    <h3 className="text-xl font-bold text-blue-900 mb-4">生活关怀</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            寄宿家庭安排
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            文化适应辅导
                                        </li>
                                        <li className="flex items-center text-gray-600">
                                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                                            24小时紧急支援
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideLeft">
                            <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-xl">
                                <img
                                    src="/api/placeholder/600/400"
                                    alt="Student Support"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent">
                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <h3 className="text-2xl font-bold mb-4">我们随时在你身边</h3>
                                        <p className="text-lg">从入学准备到学习生活的方方面面，新西兰的老师和纽蛋教育都会为你提供完善的支持。</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Floating Navigation */}
            <div className={`fixed bottom-8 left-8 z-50 transition-all duration-500 ${showNav ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
                }`}>
                <FloatingSectionNav sections={sections} />
            </div>
        </div>

    );
};





export const FoundationStudyCN = () => {
    return (
        <div className="pt-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto">
                {/* Mobile View */}
                <div className="md:hidden">
                    {/* Title and Description */}
                    <div className="px-4 mb-8">
                        <h1 className="text-2xl font-bold text-blue-900 mb-6">预科简介</h1>
                        <div className="prose text-gray-600">
                            <p className="text-lg">预科是专门为计划就读新西兰大学的国际留学生开设的衔接性课程。它能帮助学生：</p>
                            <ul className="list-disc pl-5 mt-4 space-y-2">
                                <li>提升学术英语水平</li>
                                <li>熟悉新西兰的教育体系和学习方式</li>
                                <li>掌握必要的学术技能</li>
                                <li>为顺利进入理想大学打下坚实基础</li>
                            </ul>
                        </div>
                        <div className="mt-6 text-gray-600 text-lg">不仅如此，预科学习能帮助新留学生快速熟悉新环境，参与多元文化社交 </div>
                    </div>

                    {/* Mobile Accordions */}
                    <div className="px-4">
                        <CustomAccordion title="预科时长" icon={Clock}>
                            <div className="space-y-2">
                                {["4个月课程", "8个月课程", "1年课程", "1.5年课程", "2年课程"].map((duration, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-blue-900 rounded-full mr-3" />
                                        <span>{duration}</span>
                                    </div>
                                ))}
                                <p className="mt-4 text-sm text-gray-600">
                                    根据孩子的年级、英文（预科内部考试）成绩和国内中学成绩单水平来确定读多长时间的预科。
                                </p>
                            </div>
                        </CustomAccordion>

                        <CustomAccordion title="预科费用" icon={Coins}>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-blue-900">预科的学费</h3>
                                    <p>根据时长、学校不同，费用也不同，大约是6万-15万人民币左右</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-900">1年的生活费</h3>
                                    <p>要求是8万左右的人民币</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">
                                        上述学费+生活费合计，如果学生家长可以负担1年14万-23万左右的费用，就可以结合自己的经济条件来选择预科，然后进入世界名校读本科。
                                    </p>
                                </div>
                            </div>
                        </CustomAccordion>

                        <CustomAccordion title="时间线对比" icon={Calendar}>
                            <div className="space-y-4">
                                <div className="border-l-4 border-gray-200 pl-4">
                                    <h3 className="font-bold text-blue-900 mb-2">国内学习路线 (总计：10年)</h3>
                                    <div className="space-y-2">
                                        <TimelineCard title="高中" content="3年" className="py-2 px-4 text-center" />
                                        <TimelineCard title="本科" content="4年" className="py-2 px-4 text-center" />
                                        <TimelineCard title="硕士" content="3年" className="py-2 px-4 text-center" />
                                    </div>
                                </div>

                                <div className="border-l-4 border-orange-400 pl-4">
                                    <h3 className="font-bold text-blue-900 mb-2">新西兰学习路线 (总计：6-6.5年)</h3>
                                    <div className="space-y-2">
                                        <TimelineCard title="预科" content="2年" isHighlighted className="py-2 px-4 text-center" />
                                        <TimelineCard title="本科" content="3年" isHighlighted className="py-2 px-4 text-center" />
                                        <TimelineCard title="硕士" content="1-1.5年" isHighlighted className="py-2 px-4 text-center" />
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-orange-600/80 font-semibold text-center">
                                        选择新西兰预科路线可以节省约4年时间！
                                    </p>
                                </div>
                            </div>
                        </CustomAccordion>
                    </div>
                </div>

                {/* Desktop View - Two Column Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 px-4 mt-6">
                    {/* Left Column */}
                    <div>
                        {/* Title and Description */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold text-blue-900 mb-6">预科简介</h1>
                            <div className="prose text-gray-600">
                                <p className="text-lg">预科是专门为计划就读新西兰大学的国际留学生开设的衔接性课程。它能帮助学生：</p>
                                <ul className="list-disc pl-5 mt-4 space-y-2">
                                    <li>提升学术英语水平</li>
                                    <li>熟悉新西兰的教育体系和学习方式</li>
                                    <li>掌握必要的学术技能</li>
                                </ul>
                            </div>
                            <div className="mt-6 text-gray-600 text-lg">不仅如此，预科学习能帮助新留学生快速熟悉新环境，参与多元文化社交，为顺利融入新西兰打下坚实基础。 </div>
                        </div>

                        {/* Fees Card */}
                        <div className="bg-white p-8 rounded-xl shadow">
                            <h2 className="text-2xl font-bold text-blue-900 mb-8 flex items-center">
                                <Coins className="w-6 h-6 mr-2" />
                                预科费用
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-semibold text-blue-900 text-lg mb-4">学费</h3>
                                    <p className="text-lg">根据时长、学校不同，费用也不同，大约是6万-15万人民币左右</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-blue-900 text-lg mb-4">生活费</h3>
                                    <p className="text-lg">一年8万人民币左右</p>
                                </div>
                                <div className="mt-12">
                                    <p className="text-gray-600 text-lg">
                                        上述学费+生活费合计，如果学生家长可以负担1年14万-23万左右的费用，就可以结合自己的经济条件来选择预科，然后进入世界名校读本科。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Duration Card */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                                <Clock className="w-6 h-6 mr-2" />
                                预科时长
                            </h2>
                            <div className="space-y-2">
                                {["4个月课程", "8个月课程", "1年课程", "1.5年课程", "2年课程"].map((duration, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-3 h-3 bg-blue-900 rounded-full mr-3" />
                                        <span>{duration}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-600">
                                根据孩子的年级、英文（预科内部考试）成绩和国内中学成绩单水平来确定读多长时间的预科。
                            </p>
                        </div>

                        {/* Timeline Card */}
                        <div className="pb-4">
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                                <Calendar className="w-6 h-6 mr-2" />
                                时间线对比
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                                {/* Left Column - China Route */}
                                <div>
                                    <h3 className="font-bold text-blue-900 mb-2 pb-2 border-b-2 border-gray-200">
                                        国内学习路线 (总计：10年)
                                    </h3>
                                    <div className="space-y-2 justify-items-center">
                                        <TimelineCard title="高中" content="3年" className="py-2 px-4 text-center" />
                                        <TimelineCard title="本科" content="4年" className="py-2 px-4 text-center" />
                                        <TimelineCard title="硕士" content="3年" className="py-2 px-4 text-center" />
                                    </div>
                                </div>

                                {/* Timeline Arrow */}
                                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 mt-10">
                                    <div className="h-full flex flex-col items-center relative">
                                        <div className="w-[10px] h-[90%] bg-gradient-to-b from-white/70 to-blue-700/20 relative">
                                            <div className="absolute -bottom-[20px] left-1/2 transform -translate-x-1/2 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-blue-700/20" />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - NZ Route */}
                                <div>
                                    <h3 className="font-bold text-blue-900 mb-2 pb-2 border-b-2 border-orange-400 text-nowrap">
                                        新西兰学习路线 (总计：6-6.5年)
                                    </h3>
                                    <div className="space-y-2 justify-items-center">
                                        <TimelineCard title="预科" content="2年" isHighlighted className="py-2 px-4 text-center" />
                                        <TimelineCard title="本科" content="3年" isHighlighted className="py-2 px-4 text-center" />
                                        <TimelineCard title="硕士" content="1-1.5年" isHighlighted className="py-2 px-4 text-center" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg mt-8">
                                <p className="text-orange-600/80 font-semibold text-center">
                                    选择新西兰预科路线可以节省约4年时间！
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const BachelorStudyCN = () => {
    // （目标）本科留学 -- 包括现高中生上预科 + 直升大学）

    const [showNav, setShowNav] = useState(false);
    const containerRef = useRef(null);
    const gateRef = useRef(null);
    const scrollTriggerRef = useRef(null);
    const gateOverlayRef = useRef(null);
    const campusRef = useRef(null);
    const contentRef = useRef(null);
    const level7Ref = useRef(null);
    const scrollTextRef = useRef(null);
    const introContentRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const sections = [
        { id: "BachelorTop", label: "回顶部" },
        { id: "Pathway", label: "升学路径规划" },
        { id: "uni-intro", label: "大学介绍" },
        { id: "study-life", label: "学习与生活" },
        { id: "bachelor-fee", label: "学费和留学生活费" },
        { id: "bachelor-pathways", label: "升学途径" },
        { id: "bachelor-graduate-planning", label: "毕业后规划" }
    ]

    useGSAP(() => {
        // Initial states
        gsap.set([campusRef.current, introContentRef.current], { opacity: 0 });
        gsap.set(introContentRef.current, { y: 30 });

        // Main timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                onUpdate: (self) => {
                    setShowNav(self.progress >= 0.9);
                },
                onLeaveBack: () => {
                    setShowNav(false);
                }
            }
        });

        // Animation sequence
        tl.to(gateRef.current, {
            scale: 1.5,
            duration: 0.4
        })
            .to(gateOverlayRef.current, {
                opacity: 0,
                duration: 0.3
            }, "-=0.4")
            .to([contentRef.current, level7Ref.current, scrollTextRef.current], {
                opacity: 0,
                duration: 0.3
            }, "-=0.4")
            .to(level7Ref.current, {
                scale: 1.2,
                duration: 0.3
            }, "-=0.3")
            .to(campusRef.current, {
                opacity: 1,
                duration: 0.3
            })
            .to(introContentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.3
            });

    }, { scope: containerRef }); // Scope all animations to container

    const handleNavigation = (id) => {
        if (id === 'BachelorTop') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.getElementById(id);
        if (targetElement === "Pathway") {
            const offHeight = 80 + window.innerheight - 10 // for 路径规划
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = window.pageYOffset + elementPosition - offHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        else if (targetElement) {
            const headerHeight = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <div className="min-h-screen" ref={containerRef}>
                <ScrollConfetti />

                {/* Hero Section */}
                <section id="BachelorTop" className="relative h-screen overflow-hidden">
                    {/* Gate Image */}
                    <div ref={gateRef} className="absolute inset-0">

                        <div
                            ref={gateOverlayRef}
                            className="absolute inset-0 bg-gradient-to-b from-blue-800/60 via-blue-700/50 to-blue-400/60"
                        />
                    </div>

                    {/* Campus Background */}
                    <div ref={campusRef} className="absolute inset-0 opacity-0">
                        <img
                            src={`${process.env.PUBLIC_URL}/UniBackground.jpeg`}
                            alt="Campus Interior"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-white/70 " />
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="relative container mx-auto px-4 h-full flex flex-col justify-center ">
                        <div className="max-w-3xl space-y-8">
                            <h1 className="text-8xl font-bold text-white tracking-tight select-none">
                                本科留学
                            </h1>
                            <div className="w-24 h-0.5 bg-orange-500/80" />
                        </div>
                    </div>

                    {/* Level 7 Watermark */}
                    <div ref={level7Ref} className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-10">
                        <div
                            className="absolute right-0 top-0 text-[15vw] font-bold leading-none mt-20 mr-20 select-none"
                            style={{
                                color: 'rgba(255, 255, 255, 0.15)',
                                textShadow: '0 4px 30px rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(5px)',
                            }}
                        >
                            LEVEL 7
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div ref={scrollTextRef} className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center z-30">
                        <div className="text-lg font-light tracking-wider text-white/90 mb-6 text-center select-none">
                            向下滑动踏入新西兰大学校园
                        </div>
                        <ChevronDown className="w-8 h-8 text-white/90 animate-bounce" />
                    </div>

                    {/* Introduction Content */}
                    <div id="Pathway" ref={introContentRef} className="absolute inset-0">
                        <div className="max-w-3xl mx-auto text-center pt-28">
                            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                                新西兰大学
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                新西兰的本科教育被划分为7级学历(LEVEL 7)，通常需要3年完成学业。
                                本科教育采用英联邦教育体系，以小班教学、注重实践和研究为特色。
                                新西兰共有8所公立大学，均在世界大学排名前500位。
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                根据个人情况，您可以直接升入大学，或在大学指定的预科学校学习从而为大学做好准备。
                            </p>
                            <img src={`${process.env.PUBLIC_URL}/bluedivider.svg`} alt="divider" className='md:mb-20' />
                        </div>
                        <h2 className="text-3xl font-bold text-blue-900 md:mb-6 ml-36">
                            新西兰升学路径
                        </h2>
                        <img src={`${process.env.PUBLIC_URL}/bachelorPathway.png`} alt="Bachelor Pathway" className="mx-auto md:max-w-max max-w-sm" />
                        {/* dialog box */}
                        <div className="pointer-events-auto hover:cursor-pointer" onClick={() => { navigate(`${getLang(location)}/colourfulstudy/FoundationStudy`) }}>
                            <div className="absolute md:bottom-20 md:right-48 bottom-5 right-24 bg-white shadow-lg rounded-xl">
                                <div className="absolute right-[-10px] bottom-6 w-0 h-0 border-t-[10px] border-t-transparent border-l-[10px] border-l-white border-b-[10px] border-b-transparent shadow-md" />
                                <div className="p-4 border border-blue-100 rounded-xl">
                                    <div className="text-blue-900 text-sm font-medium mb-1">
                                        <b className='text-orange-600'>预科</b>是什么？点我前往了解！
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-4 right-4">
                                <img src={`${process.env.PUBLIC_URL}/QuestionEgg.gif`} alt="Foundation Navigator" className="md:h-48 h-20" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* University Introduction Section */}
                <section id="uni-intro" className="py-20 [background:radial-gradient(circle_at_top,_var(--tw-gradient-from),_var(--tw-gradient-to))] from-white to-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="mb-16">
                            <UniversityBook />
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/QSCompare.png`} alt="ranking" className="md:w-2/3 mx-auto mb-16" />
                        <div className="flex flex-wrap gap-16 max-w-6xl mx-auto">
                            <div className="flex-[2]">
                                <AnimatedSection animation="slideUp" delay={0.1}>
                                    <div className="bg-white border border-blue-100 hover:border-blue-300 p-6 rounded-lg shadow-[0_4px_20px_-5px_rgba(59,130,246,0.1)] hover:shadow-lg hover:shadow-blue-200/30 transition-all">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-400 hover:text-blue-500 hover:bg-blue-100/50 transition-all rounded-full flex items-center justify-center mr-4">
                                                <School className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-blue-900">录取要求</h3>
                                        </div>
                                        <div className="text-gray-600 ml-12">学校按学生的学术背景、语言能力水平、专业特别条件三方面进行评价。</div>
                                        <div className="text-gray-600 ml-12">多数本科专业要求学生达到雅思<span className="text-orange-600/70"><b>6分</b></span>或同等水平。</div>
                                    </div>
                                </AnimatedSection>
                            </div>
                            <div className="flex-1">
                                <AnimatedSection animation="slideUp" delay={0.2}>
                                    <div className="bg-white border border-blue-100 hover:border-blue-300 p-6 rounded-lg shadow-[0_4px_20px_-5px_rgba(59,130,246,0.1)] hover:shadow-lg hover:shadow-blue-200/30 transition-all">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-400 hover:text-blue-500 hover:bg-blue-100/50 transition-all rounded-full flex items-center justify-center mr-4">
                                                <ScrollText className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-blue-900">留学申请优势</h3>
                                        </div>
                                        <div className="text-gray-600 ml-12">可以先通过学术成绩申请并获得<span className="text-orange-600/70"><b>有条件录取通知书</b></span>后考取雅思成绩。</div>
                                    </div>
                                </AnimatedSection>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Study and Life Section */}
                <section id="study-life" className="py-20 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-[30%] pointer-events-none -z-10">
                        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            {/* Main background curve*/}
                            <path
                                d="M 0,0 
                   L 60,0 
                   Q 90,50 60,100
                   L 0,100 Z"
                                className="fill-blue-50"
                            />
                            {/* Decorative curves*/}
                            <path d="M 55,10 Q 85,50 55,90" className="stroke-blue-100/40 fill-none stroke-[0.5]" />
                            <path d="M 55,20 Q 75,50 55,80" className="stroke-blue-100/40 fill-none stroke-[0.5]" />
                            <path d="M 55,30 Q 65,50 55,70" className="stroke-blue-100/40 fill-none stroke-[0.5]" />
                        </svg>
                    </div>

                    <div className="container mx-auto px-4 relative">
                        <div className="flex items-center">
                            {/* Title */}
                            <div className="w-48 flex-shrink-0 mr-24 relative z-10">
                                <div className="md:text-2xl lg:text-4xl font-bold text-blue-900">
                                    学习与生活
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-grow relative ml-14 z-10">
                                <div className="grid grid-cols-2 gap-8">
                                    {/* Feature cards */}
                                    <div className="bg-white p-8 rounded-xl shadow-lg ">
                                        <div className="relative overflow-hidden mb-6">
                                            <img
                                                src="/api/placeholder/400/300"
                                                alt="Classroom"
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-blue-900 mb-4">学校</h3>
                                    </div>

                                    {/* Support points */}
                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                                <div className="w-6 h-6 bg-orange-500 rounded-full" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-blue-900 mb-2">多途径的学习帮助</h3>
                                                <p className="text-gray-600">从教授问答到学习小组，给你全方位的学术支持。</p>
                                                <p className="text-gray-600">纽蛋学长学姐助力分享学习经验。</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                                <div className="w-6 h-6 bg-blue-500 rounded-full" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-blue-900 mb-2">专业课程丰富全面</h3>
                                                <p className="text-gray-600">多所世界知名大学带来不同领域的高质量教学。</p>
                                                <p className="text-gray-600">纽蛋专家细致规划，助你无忧追求心仪专业。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom features */}
                                <div className="mt-12 grid grid-cols-3 gap-8">
                                    {[
                                        { title: "工作兼职", desc: "大学生每周最高20小时兼职打工，打满最低每周收入$463！" },
                                        { title: "健康保障", desc: "学生保险提供充足的旅途中和健康保障，更有验光牙医等福利项！" },
                                        { title: "社会活动", desc: "学校社团，运动健身，文化交流，旅游探索......无论是结交朋友还是追寻爱好，你喜欢的这里都有！" }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-gray-50 p-6 rounded-lg ">
                                            <h3 className="text-lg font-bold text-blue-900 mb-2">{item.title}</h3>
                                            <div className="text-gray-600">{item.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Costs Section */}
                <section id="bachelor-fee" className="py-20 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent" />
                    <div className="container mx-auto px-4 relative">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                学费和留学生活费
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-2 gap-12">
                            <AnimatedSection animation="slideRight">
                                <div className="bg-white p-8 rounded-lg shadow-lg">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-6">学费概览</h3>
                                    <div className="space-y-4">
                                        {Object.entries({ "商科": "NZD$32,000", "工程": "$39,000", "建筑": "$35,000", "教育": "$30,000", "艺术": "$33,000", "法律": "$32,000", "医学": "$55,000", "设计": "$33,000", "农业": "$33,000" }).map(([k, v], i) => (
                                            <div key={i} className="flex items-center justify-between p-4 border-b">
                                                <span className="text-gray-600">{k}</span>
                                                <span className="text-blue-900 font-semibold">{v}</span>
                                            </div>
                                        ))
                                        }
                                        <div className="text-right text-sm">此处给出学费为平均每年费用，仅作参考</div>
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="slideLeft">
                                <div className="bg-white p-8 rounded-lg shadow-lg">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-6">生活费用</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border-b">
                                            <span className="text-gray-600">移民局申请学生签证审批要求</span>
                                            <span className="text-blue-900 font-semibold">NZD$20,000/年</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    Placeholder text
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>

                {/* Future Planning Section */}
                <section id="bachelor-graduate-planning" className="py-20">
                    <div className="container mx-auto px-4">
                        <AnimatedSection animation="fade">
                            <h2 className="text-3xl font-bold text-blue-900 mb-16 text-center">
                                毕业后规划
                                <div className="w-24 h-1 bg-orange-500 mx-auto mt-4" />
                            </h2>
                        </AnimatedSection>

                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <AnimatedSection animation="slideUp" delay={0.1}>
                                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <GraduationCap className="w-8 h-8 text-blue-900" />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-900 mb-4">进修</h3>
                                    <p className="text-gray-600">继续深造攻读硕士学位，提升学术水平和专业能力。</p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="slideUp" delay={0.2}>
                                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Briefcase className="w-8 h-8 text-blue-900" />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-900 mb-4">工作</h3>
                                    <p className="text-gray-600">利用毕业工作签证在新西兰就业，积累工作经验。</p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection animation="slideUp" delay={0.3}>
                                <div className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <PlaneLanding className="w-8 h-8 text-blue-900" />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-900 mb-4">移民</h3>
                                    <p className="text-gray-600">符合条件可申请居留签证，在新西兰长期发展。</p>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </section>
            </div>
            {/* Floating sidebar */}
            <div className={`fixed bottom-8 left-8 z-50 transition-all duration-500 ${showNav
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-full pointer-events-none'
                }`}>
                <FloatingSectionNav sections={sections} onSectionClick={handleNavigation} />
            </div>
        </>
    );
};

export const MasterStudy = () => {

}

export const DoctoralStudy = () => {

}

export const PostUni = () => {

}

// English template versions with key headings translated
// These are simplified templates - detailed content to be added based on CN versions

export const ColourfulStudyEN = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Study Abroad in New Zealand</h1>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <p className="text-gray-700 text-lg">
                        <strong>Template Note:</strong> This is a template page. Content to be added covering:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                        <li>Overview of New Zealand education system</li>
                        <li>Primary and secondary education options</li>
                        <li>Tertiary education (Bachelor's, Master's, PhD)</li>
                        <li>Foundation and pathway programs</li>
                        <li>Application process and requirements</li>
                        <li>Student visa information</li>
                        <li>Cost of living and tuition fees</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const PriSecStudyEN = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Primary & Secondary Education</h1>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <p className="text-gray-700 text-lg">
                        <strong>Template Note:</strong> This is a template page. Content to be added covering:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                        <li>New Zealand school system overview</li>
                        <li>Year levels and curriculum (NCEA, CIE, IB)</li>
                        <li>School types (state, integrated, private)</li>
                        <li>Application process for international students</li>
                        <li>Accommodation options (homestay, boarding)</li>
                        <li>Extracurricular activities and school life</li>
                        <li>Pathway to university</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const FoundationStudyEN = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Foundation Studies</h1>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <p className="text-gray-700 text-lg">
                        <strong>Template Note:</strong> This is a template page. Content to be added covering:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                        <li>What is a Foundation program?</li>
                        <li>Benefits of Foundation studies</li>
                        <li>Entry requirements</li>
                        <li>Program duration and structure</li>
                        <li>Available subjects and streams</li>
                        <li>University partnerships and guaranteed pathways</li>
                        <li>Application process and timeline</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const BachelorStudyEN = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-blue-900 mb-8">Bachelor's Degree Studies</h1>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <p className="text-gray-700 text-lg">
                        <strong>Template Note:</strong> This is a template page. Content to be added covering:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2">
                        <li>New Zealand university system overview</li>
                        <li>All 8 universities and their rankings</li>
                        <li>Popular programs and majors</li>
                        <li>Entry requirements (academic and English)</li>
                        <li>Direct entry vs Foundation/Diploma pathways</li>
                        <li>Application process and deadlines</li>
                        <li>Tuition fees and scholarships</li>
                        <li>Post-study work visa options</li>
                        <li>Pathway to permanent residence</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Backward compatibility exports
export const ColourfulStudy = ColourfulStudyCN;
export const PriSecStudy = PriSecStudyCN;
export const FoundationStudy = FoundationStudyCN;
export const BachelorStudy = BachelorStudyCN;
