import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Home, UtensilsCrossed } from 'lucide-react';
import { AnimatedSection } from '../components/animatedsection';
import Bubbles from '../components/bubbles';
import { FloatingSectionNav } from '../components/floatingsidebar';
import { useLocation } from 'react-router-dom';

// Define animation keyframes outside the component to ensure they're only added once
if (typeof window !== 'undefined') {
    // Ensure we're running in browser environment
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes citySlideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      @keyframes citySlideInLeft {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
      @keyframes citySlideOutRight {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
      }
      @keyframes citySlideOutLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-100%); }
      }
    `;
    // Only append if it hasn't been added yet
    if (!document.querySelector('style[data-city-carousel-animations]')) {
        style.setAttribute('data-city-carousel-animations', 'true');
        document.head.appendChild(style);
    }
}

export const Cities = () => {

    const cities = [
        {
            id: 1,
            name: '奥克兰',
            englishName: 'Auckland',
            image: `${process.env.PUBLIC_URL}/Auckland.jpg`, // Replace with actual image path
            description: '奥克兰是新西兰最大的城市，拥有超过160万人口。这座城市横跨两个港口，以其美丽的海滩、多元文化和高质量的生活而闻名于世。奥克兰大学、奥克兰理工大学等知名高校坐落于此，也是新西兰华人最多的城市。是留学生的热门选择。'
        },
        {
            id: 2,
            name: '惠灵顿',
            englishName: 'Wellington',
            image: '/api/placeholder/800/600', // Replace with actual image path
            description: '惠灵顿是新西兰的首都及文化政治中心，位于新西兰北岛最南端，拥有40万人口。以其活跃的艺术文化、咖啡和餐饮闻名。这座城市坐落在风景如画的港湾周围，拥有众多博物馆、艺术馆和文化场所。“惠莱坞”有着先进的电影制作产业，《指环王》、《阿凡达》系列曾在惠灵顿维塔工作室进行后期制作。惠灵顿维多利亚大学为众多国际留学生提供高质量的教育。'
        },
        {
            id: 3,
            name: '基督城',
            englishName: 'Christchurch',
            image: '/api/placeholder/800/600', // Replace with actual image path
            description: '基督城是新西兰南岛最大的城市，被称为"花园城市"。这里有美丽的英式花园、平坦的地形和历史建筑。坎特伯雷大学和林肯大学为留学生提供了广泛的学术机会，尤其在农业和工程领域享有盛誉。'
        },
        {
            id: 4,
            name: '汉密尔顿',
            englishName: 'Hamilton',
            image: `${process.env.PUBLIC_URL}/Hamilton.jpg`, // Replace with actual image path
            description: '汉密尔顿位于北岛的怀卡托地区，是新西兰增长最快的城市之一。怀卡托河流经城市，为城市增添了自然美景。怀卡托大学提供高质量的教育，尤其在农业、管理和教育领域享有很高声誉。'
        }
    ];

    // Define state variables with initial values
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState('next');
    const [displayIndex, setDisplayIndex] = useState(0); // For controlled text animation

    // Navigation with animation state
    const goToSlide = (index) => {
        if (isAnimating) return;
        setDirection(index > currentIndex ? 'next' : 'prev');
        setPrevIndex(currentIndex);
        setIsAnimating(true);
        setCurrentIndex(index);
    };

    const goToPrevious = () => {
        if (isAnimating) return;
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? cities.length - 1 : currentIndex - 1;
        setDirection('prev');
        setPrevIndex(currentIndex);
        setIsAnimating(true);
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        if (isAnimating) return;
        const isLastSlide = currentIndex === cities.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setDirection('next');
        setPrevIndex(currentIndex);
        setIsAnimating(true);
        setCurrentIndex(newIndex);
    };

    // Reset animation state after animation completes
    useEffect(() => {
        if (isAnimating) {
            // First half of animation - keep old content during fade out
            const contentSwitchTimer = setTimeout(() => {
                // Update displayed content sooner
                setDisplayIndex(currentIndex);
            }, 150);

            // Full animation completion time
            const animationTimer = setTimeout(() => {
                setIsAnimating(false);
            }, 400);

            return () => {
                clearTimeout(contentSwitchTimer);
                clearTimeout(animationTimer);
            };
        } else {
            // When not animating, make sure display index matches current index
            setDisplayIndex(currentIndex);
        }
    }, [isAnimating, currentIndex]);

    // Ensure we have valid cities for all indices
    const currentCity = cities[currentIndex] || cities[0];
    const prevCity = cities[prevIndex] || cities[0];
    const displayCity = cities[displayIndex] || cities[0];

    // Define animation styles based on state
    const getImageStyle = () => {
        // Default style
        const defaultStyle = {
            transition: 'all 500ms ease-out',
        };

        // Add animation only if we're animating
        if (isAnimating) {
            return {
                ...defaultStyle,
                animation: `${direction === 'next' ? 'citySlideInRight' : 'citySlideInLeft'} 500ms forwards`
            };
        }

        return defaultStyle;
    };

    // Define content style
    const getContentStyle = () => {
        return {
            transition: 'opacity 400ms ease-out',
            opacity: isAnimating ? 0 : 1
        };
    };

    return (
        <div>
            {/* City showcase */}
            <div className="flex flex-col md:flex-row rounded-lg overflow-hidden shadow-xl bg-white">
                {/* Left side - Image carousel */}
                <div className="relative w-full md:w-1/2 bg-gray-100">
                    {/* Fixed aspect ratio container */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                        {/* Current (new) image - slides IN */}
                        <div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                zIndex: 10,
                                animation: isAnimating
                                    ? direction === 'next'
                                        ? 'citySlideInRight 400ms forwards'
                                        : 'citySlideInLeft 400ms forwards'
                                    : 'none'
                            }}
                        >
                            <img
                                src={currentCity.image}
                                alt={`${currentCity.englishName} city view`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Previous image - slides OUT */}
                        {isAnimating && (
                            <div
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    zIndex: 5,
                                    animation: direction === 'next'
                                        ? 'citySlideOutLeft 400ms forwards'
                                        : 'citySlideOutRight 400ms forwards'
                                }}
                            >
                                <img
                                    src={prevCity.image}
                                    alt={`${prevCity.englishName} city view`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Navigation arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 flex items-center justify-center shadow-md transition-all duration-200 z-20"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6 text-blue-900" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-white/90 flex items-center justify-center shadow-md transition-all duration-200 z-20"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6 text-blue-900" />
                    </button>

                    {/* Pagination dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                        {cities.map((city, index) => (
                            <button
                                key={city.id}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 ${currentIndex === index
                                    ? 'bg-white w-4'
                                    : 'bg-white/60 hover:bg-white/80'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right side - Content */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="transition-opacity duration-200 ease-out" style={{ opacity: isAnimating ? 0 : 1 }}>
                        <div className="mb-4">
                            <h3 className="text-3xl font-bold text-blue-900 mb-1">{displayCity.name}</h3>
                            <p className="text-xl text-blue-700">{displayCity.englishName}</p>
                        </div>


                        <p className="text-gray-700 leading-relaxed">
                            {displayCity.description}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export const NZLifeCN = () => {
    // Define sections for the floating navigation
    const location = useLocation;
    const sections = [
        { id: "top", label: "回顶部" },
        { id: "cities", label: "城市" },
        { id: "culture", label: "文化" },
        { id: "transport", label: "出行" },
        { id: "accommodation", label: "住宿" },
        { id: "eats", label: "饮食" }
    ];

    useEffect(() => {
        // Check if location has a hash
        if (location.hash) {
            // Remove the # symbol
            console.log(location.hash)
            const id = location.hash.replace('#', '');

            // Find the element with this id
            const element = document.getElementById(id);

            // If the element exists, scroll to it with a small delay to ensure page is fully loaded
            if (element) {
                setTimeout(() => {
                    const headerHeight = 80; // Adjust based on your header height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <section id="top" className="relative bg-blue-900 overflow-hidden" style={{ height: 'calc(100vh - 5rem)' }}>
                <img src={`${process.env.PUBLIC_URL}/NZLifeEgg.png`} alt="EggLogo" className="absolute right-0 md:h-48 h-32" />
                <div className="absolute inset-0">
                    <img
                        src={`${process.env.PUBLIC_URL}/campus_night.jpg`}
                        alt="New Zealand Landscape"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center z-10">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">“世界最后一片净土”</h1>
                        <div className="w-20 h-1 bg-orange-500 mb-6"></div>
                        <p className="text-xl mb-8">
                            探索这个美丽的南太平洋岛国，感受宜人的气候，友好的文化，壮观的自然风光和高品质的生活方式。在这里，您将体验到安全、包容且充满活力的生活。
                        </p>
                    </div>
                </div>
            </section>

            {/* Cities Section */}
            <section id="cities" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
                            新西兰城市概览
                            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection animation="slideUp" delay={0.2}>
                        <div className="mb-12">
                            <Cities />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slideUp" delay={0.3}>
                        <div className="max-w-4xl mx-auto bg-blue-50 p-8 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">小知识</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-800 mb-2">官方语言</h4>
                                        <p className="text-gray-600">英语，毛利语，新西兰手语</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-800 mb-2">气候</h4>
                                        <div className="flex flex-row gap-6">
                                            <p className="text-gray-600">夏季：平均24°C</p>
                                            <p className="text-gray-600">冬季：平均16°C</p>

                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Culture Section */}
            <section id="culture" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="slideUp" delay={0.4}>
                        <div className="mt-16 mb-8">

                            <h2 className="text-4xl font-bold text-blue-900 text-right">新西兰独特的多元文化</h2>

                            <div className=" h-[0.125rem] bg-gray-200 mt-4"></div>
                            <Bubbles />
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Transportation Section */}
            <section id="transport" className="py-16 bg-blue-50/90" >
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <div className="flex items-center justify-start mb-4">
                            <h2 className="text-5xl font-bold text-blue-900">
                                交通出行
                                <div className="w-32 h-1 bg-blue-300 mx-auto mt-5 mb-12"></div>
                            </h2>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 mb-10">
                        {/* 公共交通 Column */}
                        <AnimatedSection animation="slideUp" delay={0.1}>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-10">公共交通</h3>
                                    <div className="relative h-48 mb-10 rounded-lg overflow-hidden">
                                        <img
                                            src="/api/placeholder/400/300"
                                            alt="Public Transportation"
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black/10 to-transparent"></div>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        新西兰的公共交通系统完善，主要城市都有公交车服务。奥克兰和惠灵顿拥有完善的火车网络，惠灵顿还有缆车系统。留学生可以申请学生卡，享受票价折扣。
                                    </p>
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            大城市的公共交通更为发达，郊区可能班次较少
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            各城市都有交通卡系统，充值使用非常便利
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            公交APP可实时查看班次和路线规划
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-blue-800 font-semibold">便利程度</span>
                                            <div className="flex">
                                                <span className="text-orange-500">★★★⯪</span>
                                                <span className="text-gray-300">★</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* 驾车 */}
                        <AnimatedSection animation="slideUp" delay={0.2}>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-10">驾车</h3>
                                    <div className="relative h-48 mb-10 rounded-lg overflow-hidden">
                                        <img
                                            src="/api/placeholder/400/300"
                                            alt="Driving in New Zealand"
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black/10 to-transparent"></div>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        在新西兰，国际学生可使用本国有效驾照（配合认证翻译）最长12个月。新西兰靠左行驶，道路标识清晰，高速公路较少，适合喜欢自驾游览的学生。
                                    </p>
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            二手车市场价格合理，是长期留学生的常见选择
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            保险费用年均约$500-800，视车型和个人情况而定
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            加油站分布广泛，但市中心停车价位较高
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-blue-800 font-semibold">便利程度</span>
                                            <div className="flex">
                                                <span className="text-orange-500">★★★★★</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* 骑行 */}
                        <AnimatedSection animation="slideUp" delay={0.3}>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-blue-900 mb-10">骑行</h3>
                                    <div className="relative h-48 mb-10 rounded-lg overflow-hidden">
                                        <img
                                            src="/api/placeholder/400/300"
                                            alt="Cycling in New Zealand"
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                        <div className="absolute bottom-0 left-0 w-full h-1/6 bg-gradient-to-t from-black/10 to-transparent"></div>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        新西兰大多数城市都有完善的自行车道网络和步行道，特别是基督城被誉为"自行车城市"。许多本地年轻人热衷滑板。如今，许多人也选择购买或租赁电动滑板车轻松出行。
                                    </p>
                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            骑行是既经济又环保的出行方式
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            新西兰城市绿化良好，骑行环境优美
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-3 h-3 rounded-full bg-blue-900 mr-2"></div>
                                            城市主要设施在骑行范围内，且提供停靠位
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-blue-800 font-semibold">便利程度</span>
                                            <div className="flex">
                                                <span className="text-orange-500">★★★★</span>
                                                <span className="text-gray-300">★</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                </div>
            </section>

            {/* Accommodation Section */}
            <section id="accommodation" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <div className="flex items-center justify-center mb-12">
                            <Home className="w-8 h-8 text-orange-500 mr-3" />
                            <h2 className="text-3xl font-bold text-blue-900">
                                住宿选择
                            </h2>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <AnimatedSection animation="slideUp" delay={0.1}>
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="relative h-48">
                                    <img
                                        src="/api/placeholder/400/300"
                                        alt="University Halls of Residence"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-0 left-0 bg-blue-900 text-white py-1 px-3 rounded-br-lg">
                                        推荐选择
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">大学宿舍</h3>
                                    <p className="text-gray-600 mb-4">
                                        大学宿舍是新生的理想选择，提供完善设施和全面支持。多数宿舍提供餐食，有专职人员全天候管理，安全有保障。
                                    </p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>月均费用: $800-1200</span>
                                        <span>安全系数: ★★★★★</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={0.2}>
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="h-48">
                                    <img
                                        src="/api/placeholder/400/300"
                                        alt="Homestay Family"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">寄宿家庭</h3>
                                    <p className="text-gray-600 mb-4">
                                        与当地家庭同住，体验纯正的新西兰生活方式和文化。通常包含餐食，是提升英语能力和融入当地社会的绝佳选择。
                                    </p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>月均费用: $850-1100</span>
                                        <span>安全系数: ★★★★★</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={0.3}>
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="h-48">
                                    <img
                                        src="/api/placeholder/400/300"
                                        alt="Shared Apartment"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">合租公寓</h3>
                                    <p className="text-gray-600 mb-4">
                                        与其他学生共享房屋或公寓，兼具独立性和社交性。费用相对较低，但需要自己处理日常事务，适合有一定生活经验的学生。
                                    </p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>月均费用: $600-900</span>
                                        <span>安全系数: ★★★★☆</span>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection animation="slideUp" delay={0.4}>
                        <div className="max-w-4xl mx-auto bg-blue-50 p-8 rounded-lg">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">住宿小知识</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            <b>未成年学生被要求住在寄宿家庭直至成年。</b>不熟悉当地环境？寄宿家庭出现问题？不用担心，纽蛋和学校会全力给予帮助。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            新西兰所有出租住宅必须符合《住宅租赁法》规定的最低健康和安全标准，包括适当的隔热、供暖和通风。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            大学校内住宿有24小时保安和访问控制系统，确保学生安全。大多数校外住宿区域也非常安全，犯罪率低。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">
                                            所有合法的住宿提供商都必须向学生提供书面租赁协议，明确双方权利和责任，提供法律保障。
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Eats Section */}
            <section id="eats" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <div className="flex items-center justify-center mb-4">
                            <h2 className="text-3xl font-bold text-blue-900">
                                饮食
                            </h2>
                            <UtensilsCrossed className="w-8 h-8 text-orange-500 ml-3" />
                        </div>
                    </AnimatedSection>

                    <div className="flex flex-col md:flex-row-reverse items-center mb-16">
                        <AnimatedSection animation="slideLeft" delay={0.2} className="md:w-1/2 mb-8 md:mb-0 md:ml-12">
                            <div className="relative">
                                <img
                                    src="/api/placeholder/600/400"
                                    alt="New Zealand Cuisine"
                                    className="rounded-lg shadow-lg w-full"
                                />
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideRight" delay={0.3} className="md:w-1/2">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">多元化的美食选择</h3>
                            <p className="text-gray-600 mb-6 wrap w-5/6">
                                新西兰是一个多元文化国家，美食选择丰富多样。在这里，您可以品尝到来自世界各地的美食，从传统的毛利料理到亚洲、欧洲和中东风味。大城市中的美食街和夜市提供各种美味且价格亲民的选择。
                            </p>
                            <p className="text-gray-600 mb-6 w-5/6">
                                新西兰以其优质的农产品和海鲜而闻名，当地餐厅普遍使用新鲜的当季食材。咖啡文化在新西兰非常发达，各城市都有众多精品咖啡馆提供世界级的咖啡体验。
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-1 bg-orange-500 mr-4"></div>
                                <span className="text-blue-900 font-medium">学生餐饮平均支出: 每周$80-120</span>
                            </div>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection animation="slideUp" delay={0.4}>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="text-xl font-bold text-blue-900 mb-3">种类1</h4>
                                <p className="text-gray-600 mb-4">
                                    占位符
                                </p>
                                <div className="text-sm text-gray-500">
                                    <div className="flex justify-between mb-1">
                                        <span>均价:</span>
                                        <span>$X-X/餐</span>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="text-xl font-bold text-blue-900 mb-3">种类2</h4>
                                <p className="text-gray-600 mb-4">
                                    占位符
                                </p>
                                <div className="text-sm text-gray-500">
                                    <div className="flex justify-between mb-1">
                                        <span>均价:</span>
                                        <span>$X-X/餐</span>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="text-xl font-bold text-blue-900 mb-3">种类3</h4>
                                <p className="text-gray-600 mb-4">
                                    占位符
                                </p>
                                <div className="text-sm text-gray-500">
                                    <div className="flex justify-between mb-1">
                                        <span>均价:</span>
                                        <span>$X-X/餐</span>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow">
                                <h4 className="text-xl font-bold text-blue-900 mb-3">种类4</h4>
                                <p className="text-gray-600 mb-4">
                                    占位符
                                </p>
                                <div className="text-sm text-gray-500">
                                    <div className="flex justify-between mb-1">
                                        <span>均价:</span>
                                        <span>$X-X</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-900">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedSection animation="fade">
                        <h2 className="text-3xl font-bold text-white mb-6">准备开始您的新西兰留学之旅?</h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            纽蛋留学为您提供全方位的留学规划和生活指导，帮助您在新西兰拥有难忘的学习和生活体验。
                        </p>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-flex items-center">
                            免费咨询
                            <ChevronRight className="ml-2" />
                        </button>
                    </AnimatedSection>
                </div>
            </section>

            {/* Floating Navigation */}
            <div className="fixed bottom-8 right-8 z-50">
                <FloatingSectionNav sections={sections} />
            </div>
        </div>
    );
};

// English version
export const NZLifeEN = () => {
    // Define sections for the floating navigation
    const location = useLocation;
    const sections = [
        { id: "top", label: "Back to Top" },
        { id: "cities", label: "Cities" },
        { id: "culture", label: "Culture" },
        { id: "transport", label: "Transport" },
        { id: "accommodation", label: "Accommodation" },
        { id: "eats", label: "Food" }
    ];

    useEffect(() => {
        // Check if location has a hash
        if (location.hash) {
            // Remove the # symbol
            console.log(location.hash)
            const id = location.hash.replace('#', '');

            // Find the element with this id
            const element = document.getElementById(id);

            // If the element exists, scroll to it with a small delay to ensure page is fully loaded
            if (element) {
                setTimeout(() => {
                    const headerHeight = 80; // Adjust based on your header height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <section id="top" className="relative bg-blue-900 overflow-hidden" style={{ height: 'calc(100vh - 5rem)' }}>
                <img src={`${process.env.PUBLIC_URL}/NZLifeEgg.png`} alt="EggLogo" className="absolute right-0 md:h-48 h-32" />
                <div className="absolute inset-0">
                    <img
                        src={`${process.env.PUBLIC_URL}/campus_night.jpg`}
                        alt="New Zealand Landscape"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="relative container mx-auto px-4 h-full flex items-center z-10">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-4">"The Last Paradise on Earth"</h1>
                        <div className="w-20 h-1 bg-orange-500 mb-6"></div>
                        <p className="text-xl mb-8">
                            Discover this beautiful South Pacific island nation and experience its pleasant climate, friendly culture, spectacular natural scenery, and high quality of life. Here, you'll find a safe, inclusive, and vibrant lifestyle.
                        </p>
                    </div>
                </div>
            </section>

            {/* Cities Section */}
            <section id="cities" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
                            New Zealand Cities Overview
                            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection animation="slideUp" delay={0.2}>
                        <div className="mb-12">
                            <Cities />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection animation="slideUp" delay={0.3}>
                        <div className="max-w-4xl mx-auto bg-blue-50 p-8 rounded-lg shadow-sm">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Quick Facts</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-800 mb-2">Official Languages</h4>
                                        <p className="text-gray-600">English, Māori, New Zealand Sign Language</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1 mr-4 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-800 mb-2">Climate</h4>
                                        <div className="flex flex-row gap-6">
                                            <p className="text-gray-600">Summer: Average 24°C</p>
                                            <p className="text-gray-600">Winter: Average 16°C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Culture Section */}
            <section id="culture" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-end">
                        <AnimatedSection animation="slideLeft">
                            <h2 className="text-4xl font-bold text-blue-900 text-right">New Zealand's Unique Multicultural Heritage</h2>
                        </AnimatedSection>
                    </div>
                    <Bubbles />
                </div>
            </section>

            {/* Transport Section */}
            <section id="transport" className="py-16 bg-blue-50/90" >
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade" delay={0.1}>
                        <div className="mb-16 text-left">
                            <h2 className="text-5xl font-bold text-blue-900">
                                Getting Around
                                <div className="w-32 h-2 bg-orange-500 mt-6"></div>
                            </h2>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-12 mb-16">
                        <AnimatedSection animation="slideUp" delay={0.2}>
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                                <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-10">Public Transport</h3>

                                <div className="space-y-4">
                                    <p className="text-gray-600 mb-4">
                                        Major cities like Auckland, Wellington, and Christchurch have well-developed public transport systems including buses, trains, and ferries.
                                    </p>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Auckland</p>
                                            <p className="text-sm text-gray-600">AT HOP card - buses, trains, ferries</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Wellington</p>
                                            <p className="text-sm text-gray-600">Snapper card - buses, trains</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Christchurch</p>
                                            <p className="text-sm text-gray-600">Metro card - buses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={0.3}>
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                                <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-10">Driving</h3>

                                <div className="space-y-4">
                                    <p className="text-gray-600 mb-4">
                                        New Zealand drives on the left side of the road. International students can drive with a valid overseas license or International Driving Permit (IDP).
                                    </p>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Driver's License Requirements</p>
                                            <p className="text-sm text-gray-600">Valid for 12 months from entry date</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Road Rules</p>
                                            <p className="text-sm text-gray-600">Drive on the left, give way to the right</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Parking</p>
                                            <p className="text-sm text-gray-600">Pay attention to time limits and zones</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={0.4}>
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                                <div className="bg-blue-100 rounded-full p-6 w-20 h-20 flex items-center justify-center mb-6">
                                    <svg className="w-10 h-10 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-10">Cycling</h3>

                                <div className="space-y-4">
                                    <p className="text-gray-600 mb-4">
                                        Cycling is a popular and eco-friendly way to get around. Many cities have dedicated bike lanes and beautiful cycling routes.
                                    </p>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Safety First</p>
                                            <p className="text-sm text-gray-600">Helmets are mandatory by law</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Bike Sharing</p>
                                            <p className="text-sm text-gray-600">Available in major cities</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1 mr-3 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-blue-800">Cycle Trails</p>
                                            <p className="text-sm text-gray-600">Extensive network of scenic routes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Accommodation Section */}
            <section id="accommodation" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl font-bold text-blue-900">
                                Accommodation Options
                            </h2>
                            <div className="w-24 h-1 bg-orange-500 mx-auto mt-4"></div>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        <AnimatedSection animation="slideUp" delay={0.2}>
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">University Halls</h3>
                                    <p className="text-gray-600 mb-4">
                                        On-campus accommodation provides a convenient and social living experience. Includes furnished rooms, meal plans, and various amenities. Perfect for first-year students to integrate into campus life.
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>All utilities included</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>Close to classes and facilities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>Built-in social community</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={0.3}>
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">Homestay</h3>
                                    <p className="text-gray-600 mb-4">
                                        Live with a local Kiwi family to immerse yourself in the culture and improve your English. Experience authentic New Zealand lifestyle while enjoying a supportive home environment.
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>Meals provided</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>Cultural immersion</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>English practice daily</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideUp" delay={0.4}>
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                    <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">Shared Apartments</h3>
                                    <p className="text-gray-600 mb-4">
                                        Rent an apartment with other students for more independence and flexibility. Share living costs while maintaining your own private space. Great for those seeking autonomy.
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>More independence</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>Shared costs</span>
                                        </li>
                                        <li className="flex items-start">
                                            <ChevronRight className="w-4 h-4 text-orange-500 mt-1 mr-2 flex-shrink-0" />
                                            <span>Flexible lease terms</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Food Section */}
            <section id="eats" className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <AnimatedSection animation="fade">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-blue-900 mb-4">
                                New Zealand Cuisine
                            </h2>
                            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Experience a diverse culinary scene that celebrates fresh, local ingredients and multicultural influences. From traditional Māori hangi to world-class wines and modern fusion cuisine.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <AnimatedSection animation="slideRight" delay={0.2}>
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="bg-blue-500 rounded-full p-4 mr-4">
                                        <UtensilsCrossed className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-blue-900">Local Specialties</h3>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Fish & Chips:</strong> A Kiwi favorite - fresh fish with crispy fries</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Pavlova:</strong> Iconic meringue dessert topped with fruit</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Meat Pies:</strong> Perfect comfort food for any occasion</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Lamb:</strong> New Zealand's premium export product</span>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>

                        <AnimatedSection animation="slideLeft" delay={0.3}>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 shadow-lg">
                                <div className="flex items-center mb-6">
                                    <div className="bg-orange-500 rounded-full p-4 mr-4">
                                        <Home className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-blue-900">Dining Culture</h3>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Cafés:</strong> World-renowned coffee culture</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Farmers Markets:</strong> Fresh local produce weekly</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Asian Cuisine:</strong> Diverse and authentic options</span>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                        <span><strong>Wine Regions:</strong> World-class vineyards to explore</span>
                                    </li>
                                </ul>
                            </div>
                        </AnimatedSection>
                    </div>

                    <AnimatedSection animation="slideUp" delay={0.4}>
                        <div className="mt-12 text-center bg-blue-50 rounded-xl p-8 max-w-4xl mx-auto">
                            <h4 className="text-xl font-bold text-blue-900 mb-4">Ready to Start Your New Zealand Journey?</h4>
                            <p className="text-gray-600 mb-6">
                                Discover more about studying and living in New Zealand. Our team is here to help you every step of the way.
                            </p>
                            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center">
                                Get Free Consultation
                                <ChevronRight className="ml-2" />
                            </button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Floating Navigation */}
            <div className="fixed bottom-8 right-8 z-50">
                <FloatingSectionNav sections={sections} />
            </div>
        </div>
    );
};

// Default export for backward compatibility
export const NZLife = NZLifeCN;
