import React, { useState, useEffect } from 'react';

const Immigration = () => {
    const [activeSection, setActiveSection] = useState('');

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                'technical-migration',
                'six-point-system',
                'study-for-immigration',
                'green-list',
                'employer-sponsorship',
                'investment-migration',
                'entrepreneurship-migration'
            ];

            const scrollPosition = window.scrollY + 100;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 100; // 80px header + 20px padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = window.pageYOffset + elementPosition - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen flex bg-white pt-20">
            {/* Sidebar - Wikipedia style with improved styling */}
            <div className="w-1/5 p-4 rounded-r-none rounded-lg relative overflow-y-auto sticky top-20 self-start max-h-[calc(100vh-5rem)]">
                <h2 className="text-xl font-bold mt-4 mb-6 text-blue-900 pb-3 border-b-2 border-gray-200">新西兰移民</h2>

                <ul className="text-gray-700 space-y-4">
                    <li>
                        <a
                            href="#technical-migration"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('technical-migration');
                            }}
                            className={`block text-lg font-semibold hover:text-blue-700 transition-colors py-1 ${activeSection === 'technical-migration' ? 'text-blue-700 border-l-3 border-blue-500 pl-3' : ''
                                }`}
                        >
                            技术移民
                        </a>
                        <ul className="pl-6 mt-3 space-y-2 border-l-2 border-gray-100">
                            <li>
                                <a
                                    href="#six-point-system"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection('six-point-system');
                                    }}
                                    className={`block text-base hover:text-blue-700 transition-colors py-1 ${activeSection === 'six-point-system' ? 'text-blue-700 font-medium' : ''
                                        }`}
                                >
                                    六分制移民政策
                                </a>
                                <ul className="pl-6 mt-2 space-y-1 border-l border-gray-100">
                                    <li>
                                        <a
                                            href="#study-for-immigration"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection('study-for-immigration');
                                            }}
                                            className={`block text-sm hover:text-blue-700 transition-colors py-1 ${activeSection === 'study-for-immigration' ? 'text-blue-700 font-medium' : 'text-gray-600'
                                                }`}
                                        >
                                            以移民为目的的留学
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a
                                    href="#green-list"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection('green-list');
                                    }}
                                    className={`block text-base hover:text-blue-700 transition-colors py-1 ${activeSection === 'green-list' ? 'text-blue-700 font-medium' : ''
                                        }`}
                                >
                                    绿色清单
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#employer-sponsorship"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection('employer-sponsorship');
                                    }}
                                    className={`block text-base hover:text-blue-700 transition-colors py-1 ${activeSection === 'employer-sponsorship' ? 'text-blue-700 font-medium' : ''
                                        }`}
                                >
                                    雇主担保
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#investment-migration"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('investment-migration');
                            }}
                            className={`block text-lg font-semibold hover:text-blue-700 transition-colors py-1 ${activeSection === 'investment-migration' ? 'text-blue-700 border-l-3 border-blue-500 pl-3' : ''
                                }`}
                        >
                            投资移民
                        </a>
                    </li>
                    <li>
                        <a
                            href="#entrepreneurship-migration"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('entrepreneurship-migration');
                            }}
                            className={`block text-lg font-semibold hover:text-blue-700 transition-colors py-1 ${activeSection === 'entrepreneurship-migration' ? 'text-blue-700 border-l-3 border-blue-500 pl-3' : ''
                                }`}
                        >
                            创业移民
                        </a>
                    </li>
                </ul>
            </div>

            {/* Thread border separator - adapted from provided code */}
            <div className="relative" style={{ width: '0', position: 'relative', zIndex: 20 }}>
                <div className="absolute top-0 left-0 bottom-0 w-3 overflow-hidden bg-transparent" style={{ transform: 'translateX(-1.5px)' }}>
                    <div className="absolute top-0 left-0 h-full w-3 overflow-hidden">
                        {/* Thread effect */}
                        <div
                            className="absolute top-0 left-0 h-full w-3"
                            style={{
                                backgroundImage: `
                  linear-gradient(180deg, 
                    #4a94fd 0px, #4a94fd 2px, 
                    #9254f0 2px, #9254f0 4px,
                    #43c6a8 4px, #43c6a8 6px,
                    #ff9933 6px, #ff9933 7px,
                    #4a94fd 7px, #4a94fd 10px,
                    #43c6a8 10px, #43c6a8 11px,
                    #9254f0 11px, #9254f0 14px,
                    #ff9933 14px, #ff9933 16px,
                    #4a94fd 16px, #4a94fd 17px,
                    #9254f0 17px, #9254f0 19px,
                    #ff9933 19px, #ff9933 22px,
                    #4a94fd 22px, #4a94fd 23px,
                    #9254f0 23px, #9254f0 25px
                  ),
                  linear-gradient(180deg, 
                    #ff9933 0px, #ff9933 1px, 
                    #43c6a8 1px, #43c6a8 5px,
                    #4a94fd 5px, #4a94fd 6px,
                    #9254f0 6px, #9254f0 9px,
                    #43c6a8 9px, #43c6a8 12px,
                    #ff9933 12px, #ff9933 14px,
                    #9254f0 14px, #9254f0 16px,
                    #4a94fd 16px, #4a94fd 18px,
                    #ff9933 18px, #ff9933 21px,
                    #43c6a8 21px, #43c6a8 25px
                  )`,
                                backgroundSize: '1.5px 25px, 1.5px 25px',
                                backgroundPosition: '0 0, 1.5px 0',
                                backgroundRepeat: 'repeat-y',
                                animation: 'refinedThreadMove 18s linear infinite',
                                transform: 'skewY(35deg)'
                            }}
                        ></div>

                    </div>
                </div>
            </div>

            {/* Main content - keeping all existing content exactly as provided */}
            <div className="flex-1 p-8 bg-white shadow-lg rounded-l-none rounded-lg border border-gray-200 ml-0">
                <h1 className="text-3xl font-bold text-blue-900 mb-6" id="technical-migration">技术移民</h1>

                <div className="prose max-w-none">
                    <p className="text-gray-700 mb-6">
                        新西兰技术移民（Skilled Migrant Category，简称SMC）是新西兰政府为了吸引全球技术人才而设立的移民项目。该项目旨在填补新西兰本地人才缺失，促进经济与社会发展。新西兰技术移民无资产要求，不需要投资和创业，不会占压资金，一直是备受关注的移民项目之一。
                    </p>

                    <h2 className="text-3xl font-bold text-blue-800 mt-12 mb-6 pb-3 border-b-2 border-blue-200 relative" id="six-point-system">
                        <span className="relative">
                            六分制移民政策
                            <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        </span>
                    </h2>

                    <div className="bg-blue-50 p-6 rounded-lg mb-8">
                        <h3 className="text-xl font-semibold text-blue-800 mb-4">政策概述</h3>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                2023年6月21日，新西兰移民局宣布技术移民新政策，2023年10月9日正式实施新的6分制技术移民系统，完全取代了原有的180分制系统。
                            </p>
                            <p>
                                新政策大刀阔斧地简化了申请流程，从180分简化到6分，取消了移民配额限制，不再有伴侣加分、地区加分和年龄加分。
                            </p>
                            <p>
                                申请人需要先获得新西兰认可雇主的工作机会或已经在新西兰从事相关工作，符合基本要求，并且评分标准获得至少6分即可提交申请。
                            </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-4 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            基本要求
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                    <h4 className="text-lg font-bold text-blue-800">个人条件</h4>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>申请人年龄在55岁以下</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>身体健康，无重大疾病或传染病</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>品行良好，无犯罪记录</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>雅思A类或G类6.5分，部分情况可豁免语言成绩</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                                    <h4 className="text-lg font-bold text-blue-800">工作要求</h4>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>必须有一份新西兰全职工作或拿到雇主offer</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>薪资达到工资中位数（目前为$31.61/小时）</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>ANZSCO技能级别4或5职位需达到1.5倍工资中位数</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>雇主必须通过移民局认证</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-4 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            打分标准详解
                        </h3>
                        <div className="bg-yellow-50 p-6 rounded-lg mb-6 border-l-4 border-yellow-400">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                6分来自<span className="font-semibold text-blue-800">A职业注册</span>、<span className="font-semibold text-blue-800">B学历等级</span>、<span className="font-semibold text-blue-800">C收入</span>三个技能指标中的一项，加上<span className="font-semibold text-blue-800">D工作年限</span>分数。申请人可自行选择A、B或C的一种，然后结合D来计算分数，不得累加。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                                <h4 className="text-white text-lg font-semibold">六分制评分标准</h4>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-blue-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold text-blue-800 border-b border-blue-200">评分类别</th>
                                            <th className="px-6 py-4 text-left font-semibold text-blue-800 border-b border-blue-200">要求</th>
                                            <th className="px-6 py-4 text-center font-semibold text-blue-800 border-b border-blue-200">分数</th>
                                            <th className="px-6 py-4 text-left font-semibold text-blue-800 border-b border-blue-200">工作年限加分</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-blue-25 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                                                    <span className="font-medium text-gray-900">A. 职业注册</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">新西兰认可的4年制注册职业</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-800 rounded-full font-bold">4</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">2年新西兰技能工作 = 2分</td>
                                        </tr>
                                        <tr className="hover:bg-green-25 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                    <span className="font-medium text-gray-900">B. 学历等级</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">9级硕士学位 (Master)</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-bold">5</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">1年新西兰技能工作 = 1分</td>
                                        </tr>
                                        <tr className="hover:bg-green-25 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                    <span className="font-medium text-gray-900">B. 学历等级</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">8级学士后文凭 (PGD)</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-bold">4</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">2年新西兰技能工作 = 2分</td>
                                        </tr>
                                        <tr className="hover:bg-green-25 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                    <span className="font-medium text-gray-900">B. 学历等级</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">7级学士学位 (Bachelor)</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-bold">3</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">3年新西兰技能工作 = 3分</td>
                                        </tr>
                                        <tr className="hover:bg-orange-25 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                                                    <span className="font-medium text-gray-900">C. 收入水平</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">薪水达到工资中位数2倍或以上</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-800 rounded-full font-bold">4</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">2年新西兰技能工作 = 2分</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 mb-8">
                        <div className="flex items-center mb-6">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-green-800">常见6分组合示例</h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="bg-white p-5 rounded-lg shadow-sm border border-green-100">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                            <span className="text-purple-600 font-bold text-sm">A</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-800 mb-2">注册职业路径</h5>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                4年培训的新西兰注册职业<span className="text-purple-600 font-semibold">（4分）</span> +
                                                2年新西兰技能工作<span className="text-purple-600 font-semibold">（2分）</span> =
                                                <span className="text-green-700 font-bold">6分</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-lg shadow-sm border border-green-100">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                            <span className="text-green-600 font-bold text-sm">B</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-800 mb-2">硕士学历路径</h5>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                9级硕士学历<span className="text-green-600 font-semibold">（5分）</span> +
                                                1年新西兰技能工作<span className="text-green-600 font-semibold">（1分）</span> =
                                                <span className="text-green-700 font-bold">6分</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white p-5 rounded-lg shadow-sm border border-green-100">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                            <span className="text-orange-600 font-bold text-sm">C</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-800 mb-2">高收入路径</h5>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                薪水达到工资中位数2倍<span className="text-orange-600 font-semibold">（4分）</span> +
                                                2年新西兰技能工作<span className="text-orange-600 font-semibold">（2分）</span> =
                                                <span className="text-green-700 font-bold">6分</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-5 rounded-lg shadow-sm border border-green-100">
                                    <div className="flex items-start">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">B</span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-gray-800 mb-2">本科学历路径</h5>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                7级学士学位<span className="text-blue-600 font-semibold">（3分）</span> +
                                                3年新西兰技能工作<span className="text-blue-600 font-semibold">（3分）</span> =
                                                <span className="text-green-700 font-bold">6分</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-4 flex items-center" id="study-for-immigration">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                        以移民为目的的留学
                    </h3>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border border-blue-100">
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-blue-800 mb-3">留学移民系统性路径</h4>
                                <p className="text-gray-700 leading-relaxed">
                                    对于希望通过留学最终实现移民目标的申请人，在新西兰攻读相关学历是一个系统性的移民路径。不同的学历级别对应不同的移民优势和毕业后工作签证权利。以下详细分析各学历级别如何帮助实现6分制移民目标。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h4 className="text-lg font-bold text-blue-800 mb-6">新西兰学历框架(NZQF)与移民路径对照表</h4>

                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                                <h5 className="text-white text-lg font-semibold">学历级别与移民优势对比</h5>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">学历级别</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">学历类型</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">学制</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">6分制得分</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">所需工作经验</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">毕业后工签</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b">配偶工签</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold mr-3">10</span>
                                                    <span className="font-medium text-gray-900">Level 10</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 font-medium">博士学位 (PhD)</td>
                                            <td className="px-4 py-4 text-center text-gray-600">3-4年</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-bold">6</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    无需工作经验
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700">3年开放工签</td>
                                            <td className="px-4 py-4 text-gray-700">开放工签</td>
                                        </tr>
                                        <tr className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold mr-3">9</span>
                                                    <span className="font-medium text-gray-900">Level 9</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 font-medium">硕士学位 (Master)</td>
                                            <td className="px-4 py-4 text-center text-gray-600">1-2年</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full font-bold">5</span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700">1年NZ技能工作</td>
                                            <td className="px-4 py-4 text-gray-700">3年开放工签</td>
                                            <td className="px-4 py-4 text-gray-700">开放工签</td>
                                        </tr>
                                        <tr className="bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full text-sm font-bold mr-3">8</span>
                                                    <span className="font-medium text-gray-900">Level 8</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 font-medium">学士后文凭 (PGD)</td>
                                            <td className="px-4 py-4 text-center text-gray-600">1年</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full font-bold">4</span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700">2年NZ技能工作</td>
                                            <td className="px-4 py-4 text-gray-700">1年工签</td>
                                            <td className="px-4 py-4 text-gray-700">绿色清单专业可获得</td>
                                        </tr>
                                        <tr className="bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 transition-all">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-500 text-white rounded-full text-sm font-bold mr-3">7</span>
                                                    <span className="font-medium text-gray-900">Level 7</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 font-medium">学士学位 (Bachelor)</td>
                                            <td className="px-4 py-4 text-center text-gray-600">3年</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full font-bold">3</span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700">3年NZ技能工作</td>
                                            <td className="px-4 py-4 text-gray-700">3年开放工签</td>
                                            <td className="px-4 py-4 text-gray-700">绿色清单专业可获得</td>
                                        </tr>
                                        <tr className="bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full text-sm font-bold mr-3">5-6</span>
                                                    <span className="font-medium text-gray-900">Level 5-6</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700 font-medium">文凭 (Diploma)</td>
                                            <td className="px-4 py-4 text-center text-gray-600">1-2年</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    不计分
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-700">只能通过绿色清单</td>
                                            <td className="px-4 py-4 text-gray-700">仅特定专业可获得</td>
                                            <td className="px-4 py-4 text-gray-700">无</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-xl border border-blue-200 mb-8">
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-blue-800">留学移民最优路径分析</h4>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* 推荐路径 */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
                                <div className="flex items-center mb-4">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-green-700 font-bold text-lg">推荐路径</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-green-800 mb-1">硕士学位</h5>
                                            <p className="text-green-700 text-sm">最快移民路径，仅需1年工作经验</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-green-800 mb-1">博士学位</h5>
                                            <p className="text-green-700 text-sm">可直接移民，无需工作经验</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start p-4 bg-green-50 rounded-lg border border-green-100">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-green-800 mb-1">注册职业文凭</h5>
                                            <p className="text-green-700 text-sm">如护理、教师、工程师等</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 次优路径 */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-200">
                                <div className="flex items-center mb-4">
                                    <div className="flex">
                                        {[...Array(3)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        {[...Array(2)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-orange-700 font-bold text-lg">次优路径</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start p-4 bg-orange-50 rounded-lg border border-orange-100">
                                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-orange-800 mb-1">学士学位</h5>
                                            <p className="text-orange-700 text-sm">需3年工作经验，但工签长</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start p-4 bg-orange-50 rounded-lg border border-orange-100">
                                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-orange-800 mb-1">学士后文凭</h5>
                                            <p className="text-orange-700 text-sm">1年学制，但工签仅1年</p>
                                        </div>
                                    </div>

                                    {/* 占位空间保持对称 */}
                                    <div className="h-16"></div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-200">
                            <div className="flex items-start">
                                <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-blue-800 leading-relaxed">
                                    <span className="font-semibold">重要提示：</span>选择留学路径时应综合考虑个人背景、时间成本、经济能力和职业规划。建议咨询专业移民顾问制定最适合的个人方案。
                                </p>
                            </div>
                        </div>
                    </div>

                    <h4 className="text-lg font-bold text-blue-800 mt-6 mb-4">热门移民专业推荐</h4>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-bold text-green-800 mb-2">工程类 (高需求)</h5>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>土木工程 (Civil Engineering)</li>
                                <li>电气工程 (Electrical Engineering)</li>
                                <li>机械工程 (Mechanical Engineering)</li>
                                <li>软件工程 (Software Engineering)</li>
                            </ul>
                            <p className="text-xs text-gray-600 mt-2">大多数在绿色清单上，移民路径明确</p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-bold text-blue-800 mb-2">医疗健康类</h5>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>注册护理 (Registered Nursing)</li>
                                <li>物理治疗 (Physiotherapy)</li>
                                <li>放射技师 (Medical Radiation Therapy)</li>
                                <li>职业治疗 (Occupational Therapy)</li>
                            </ul>
                            <p className="text-xs text-gray-600 mt-2">注册职业，就业率高，薪资优厚</p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h5 className="font-bold text-purple-800 mb-2">教育类</h5>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                <li>幼儿教育 (Early Childhood Teaching)</li>
                                <li>中学教育 (Secondary Teaching)</li>
                                <li>小学教育 (Primary Teaching)</li>
                                <li>特殊教育 (Special Education)</li>
                            </ul>
                            <p className="text-xs text-gray-600 mt-2">注册职业，社会地位高，工作稳定</p>
                        </div>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-lg mb-6">
                        <h4 className="text-lg font-semibold text-orange-800 mb-3">留学期间及毕业后权利</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-bold text-gray-800 mb-2">学习期间</h5>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>硕博学生：配偶可获得开放工签，子女享受本地学费</li>
                                    <li>本科及以上：每周可工作20小时</li>
                                    <li>假期期间可全职工作</li>
                                    <li>绿色清单专业7-8级学生：配偶可获得工签</li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-bold text-gray-800 mb-2">毕业后</h5>
                                <ul className="list-disc pl-5 text-sm space-y-1">
                                    <li>硕博毕业生：3年开放工签</li>
                                    <li>本科毕业生：1-3年工签（根据学习时长）</li>
                                    <li>配偶工签延续（如适用）</li>
                                    <li>子女继续享受本地教育福利</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-blue-800 mt-12 mb-6 pb-3 border-b-2 border-blue-200 relative" id="green-list">
                        <span className="relative">
                            绿色清单
                            <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        </span>
                    </h2>

                    <p className="text-gray-700 mb-4">
                        绿色清单（Green List）于2022年5月11日由新西兰政府宣布，正式取代了之前的长期短缺技能清单(LTSSL)和地区性短缺清单(RSSL)。该清单包含了新西兰极度短缺的、高技能的建筑、工程、医疗及社会服务、第一产业及科学、ICT技术部门人才，为他们提供快速、简化、优先的移民途径。
                    </p>

                    <div className="bg-green-50 p-6 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-3">绿色清单优势</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>申请认证雇主工签无需"广告"流程，无需证明没有本地人胜任该职位</li>
                            <li>享有快速移民通道</li>
                            <li>移民局承诺最快6周即可获批居民签证（一类清单）</li>
                            <li>来自中国的申请人可能需要国家安全审查，但仍是稳妥快速的移民通道</li>
                        </ul>
                    </div>

                    <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                        绿色清单详细分类
                    </h3>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* 一类清单 */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border-l-4 border-green-500 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-gray-800 flex items-center">

                                        一类清单（直通居留）
                                    </h4>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Straight to Residence
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                符合条件可直接申请居留签证，最快6周获批，2年后可换永久居民签证
                            </p>
                            <div className="space-y-4">
                                {/* 建筑工程类 */}
                                <div className="bg-white p-4 rounded-lg border border-green-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-blue-300 pl-3">
                                        建筑工程类
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['建筑项目经理 (Construction Project Manager)', '项目建筑师 (Project Builder)', '工料测量师 (Quantity Surveyor)', '测量员 (Surveyor)'].map((job, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                                                <span>{job}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 工程类 */}
                                <div className="bg-white p-4 rounded-lg border border-green-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-blue-300 pl-3">
                                        工程类
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['化学工程师 (Chemical Engineer)', '材料工程师 (Materials Engineer)', '土木工程师 (Civil Engineer)', '岩土工程师 (Geotechnical Engineer)', '结构工程师 (Structural Engineer)', '电气工程师 (Electrical Engineer)', '电子工程师 (Electronics Engineer)', '环境工程师 (Environmental Engineer)', '工业工程师 (Industrial Engineer)', '机械工程师 (Mechanical Engineer)', '电信工程师 (Telecommunications Engineer)', '电信网络工程师 (Telecommunications Network Engineer)'].map((job, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                                                <span>{job}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 医疗类 */}
                                <div className="bg-white p-4 rounded-lg border border-green-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-blue-300 pl-3">
                                        医疗类
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['全科医生 (General Practitioner)', '外科医生 (Surgeon)', '兽医 (Veterinarian)', '各类专科医生'].map((job, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                                                <span>{job}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ICT类 */}
                                <div className="bg-white p-4 rounded-lg border border-green-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-blue-300 pl-3">
                                        ICT类（需满足时薪要求）
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { job: '首席信息官 (Chief Information Officer)', rate: '$57.69/小时' },
                                            { job: 'ICT项目经理 (ICT Project Manager)', rate: '$57.69/小时' },
                                            { job: '软件工程师 (Software Engineer)', rate: '$57.69/小时' },
                                            { job: '多媒体专员 (Multimedia Specialist)', rate: '$45.67/小时' }
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center justify-between text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                                                    <span>{item.job}</span>
                                                </div>
                                                <span className="text-orange-600 font-medium text-xs">{item.rate}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 二类清单 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border-l-4 border-blue-500 shadow-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-xl font-medium text-gray-800 flex items-center">

                                        二类清单（工作转居留）
                                    </h4>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        Work to Residence
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                需在新西兰当地工作满2年后方可申请移民
                            </p>

                            <div className="space-y-4">
                                {/* 教育类 */}
                                <div className="bg-white p-4 rounded-lg border border-blue-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-purple-300 pl-3">
                                        教育类
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { job: '中学教师 (Secondary School Teacher)', note: '特别是STEM学科' },
                                            { job: '小学教师 (Primary School Teacher)', note: '2025年3月26日起纳入一类' },
                                            { job: '幼儿教师 (Early Childhood Teacher)', note: '' }
                                        ].map((item, index) => (
                                            <div key={index} className="text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                                    <span>{item.job}</span>
                                                </div>
                                                {item.note && <p className="text-xs text-orange-600 ml-4 mt-1">{item.note}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 医疗健康类 */}
                                <div className="bg-white p-4 rounded-lg border border-blue-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-purple-300 pl-3">
                                        医疗健康类
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['注册护士 (Registered Nurse)', '助产士 (Midwife)', '物理治疗师 (Physiotherapist)', '职业治疗师 (Occupational Therapist)', '医学影像技师 (Medical Imaging Technologist)', '医学检验技师 (Medical Laboratory Scientist)'].map((job, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                                <span>{job}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 技术工人类 */}
                                <div className="bg-white p-4 rounded-lg border border-blue-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-purple-300 pl-3">
                                        技术工人类
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['土木工程技术员 (Civil Engineering Technician)', '电气工程技术员 (Electrical Engineering Technician)', '电子工程技术员 (Electronic Engineering Technician)', '汽车电工 (Automotive Electrician)', '重型汽车技师 (Diesel Motor Mechanic)'].map((job, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                                <span>{job}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 农业类 */}
                                <div className="bg-white p-4 rounded-lg border border-blue-100">
                                    <h5 className="text-lg font-medium text-gray-700 mb-2 border-l-4 border-purple-300 pl-3">
                                        农业类
                                    </h5>
                                    <div className="grid grid-cols-1 gap-2">
                                        {['奶牛农场主 (Dairy Cattle Farmer)', '农业技术员 (Agricultural Technician)'].map((job, index) => (
                                            <div key={index} className="flex items-center text-sm text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                                                <span>{job}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                        绿色清单申请要求
                    </h3>

                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-gray-800 mb-3">基本条件</h4>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>年龄：递交申请时55岁或以下（不超过56岁）</li>
                                    <li>英语：雅思6.5/PTE 58/托福79，或在英/美/加/澳/新/爱完成两年以上本科或一年以上研究生课程可豁免</li>
                                    <li>学历/工资：满足绿色清单对应职位的学历、注册或工资要求</li>
                                    <li>职位匹配：与ANZSCO澳新职业大典相应职位进行匹配评估</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 mb-3">工作要求</h4>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>雇主公司需通过移民局认证</li>
                                    <li>工作必须为全职（每周至少30小时）</li>
                                    <li>职位为永久职位或至少一年的固定期限合同</li>
                                    <li>非买卖合同获得</li>
                                    <li>良好的健康和品格要求</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-blue-800 mt-12 mb-6 pb-3 border-b-2 border-blue-200 relative" id="employer-sponsorship">
                        <span className="relative">
                            雇主担保
                            <div className="absolute -bottom-3 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                        </span>
                    </h2>

                    <p className="text-gray-700 mb-4">
                        雇主担保是新西兰技术移民的核心组成部分。自2021年起，新西兰实施了认证雇主工作签证（Accredited Employer Work Visa，简称AEWV）制度，该制度已取代了以下六种工作签证类型，成为新西兰主要的临时工作签证。
                    </p>

                    <div className="bg-blue-50 p-6 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold text-blue-800 mb-3">AEWV制度概述</h3>
                        <p className="text-gray-700 mb-4">
                            认证雇主工作签证是一种临时性签证，能让申请人在新西兰工作。只有拿到经过认证的雇主给出的工作邀请，才能申请这个签证。该制度要求雇主必须先通过移民局认证才能雇佣国际员工。
                        </p>
                        <div className="bg-white p-4 rounded-lg">
                            <h4 className="font-bold text-blue-800 mb-2">被取代的签证类型</h4>
                            <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Essential Skills Work Visa</li>
                                    <li>Talent (Accredited Employer) Work Visa</li>
                                    <li>Long Term Skill Shortage List Work Visa</li>
                                </ul>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Silver Fern Job Search Visa</li>
                                    <li>Work to Residence Visa</li>
                                    <li>South Island Contribution Work Visa</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                        雇主认证详细要求
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-3">基础认证条件</h4>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>雇主必须是合法注册的新西兰企业</li>
                                <li>公司财务状况良好，能够支付员工薪资</li>
                                <li>遵守新西兰所有相关法律法规</li>
                                <li>提供符合新西兰标准的工作条件</li>
                                <li>证明有真实的工作需求</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-3">劳动市场测试</h4>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>证明无法在本地找到合适员工（绿色清单职位除外）</li>
                                <li>在合适的平台上发布招聘广告</li>
                                <li>广告时间至少21天</li>
                                <li>提供合理的薪资水平（至少达到工资中位数）</li>
                                <li>工作条件符合行业标准</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                        申请人资格要求
                    </h3>

                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-blue-100">
                                <tr>
                                    <th className="px-4 py-2 border-b text-left font-semibold text-blue-800">要求类别</th>
                                    <th className="px-4 py-2 border-b text-left font-semibold text-blue-800">具体要求</th>
                                    <th className="px-4 py-2 border-b text-left font-semibold text-blue-800">备注</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b font-medium">年龄要求</td>
                                    <td className="px-4 py-2 border-b">通常无严格年龄限制</td>
                                    <td className="px-4 py-2 border-b">雇主可能有偏好</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b font-medium">健康要求</td>
                                    <td className="px-4 py-2 border-b">身体健康，可能需要体检</td>
                                    <td className="px-4 py-2 border-b">根据工作性质和签证长度</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b font-medium">品格要求</td>
                                    <td className="px-4 py-2 border-b">无犯罪记录，品行良好</td>
                                    <td className="px-4 py-2 border-b">可能需要无犯罪证明</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b font-medium">英语要求</td>
                                    <td className="px-4 py-2 border-b">根据职位要求，通常需要基本交流能力</td>
                                    <td className="px-4 py-2 border-b">高技能职位要求更高</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b font-medium">技能匹配</td>
                                    <td className="px-4 py-2 border-b">具备相关工作经验和技能</td>
                                    <td className="px-4 py-2 border-b">学历和经验需匹配职位要求</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b font-medium">薪资标准</td>
                                    <td className="px-4 py-2 border-b">至少达到新西兰工资中位数$31.61/小时</td>
                                    <td className="px-4 py-2 border-b">ANZSCO 4-5级职位需1.5倍中位数</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                        <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                        完整申请流程
                    </h3>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                        <div className="grid md:grid-cols-1 gap-4">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                <div>
                                    <h4 className="font-bold text-blue-800 mb-1">雇主认证阶段</h4>
                                    <p className="text-gray-700 text-sm">雇主向移民局申请认证资格，证明企业合规性和真实用工需求</p>
                                    <p className="text-xs text-gray-600 mt-1">处理时间：标准情况下20-25个工作日</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                <div>
                                    <h4 className="font-bold text-blue-800 mb-1">职位检查阶段</h4>
                                    <p className="text-gray-700 text-sm">移民局审查具体职位要求，包括薪资水平、工作条件和劳动市场测试</p>
                                    <p className="text-xs text-gray-600 mt-1">处理时间：绿色清单职位较快，其他职位10-15个工作日</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                <div>
                                    <h4 className="font-bold text-blue-800 mb-1">工作邀请阶段</h4>
                                    <p className="text-gray-700 text-sm">申请人获得认证雇主的正式工作邀请书（Job Offer）</p>
                                    <p className="text-xs text-gray-600 mt-1">包含：职位描述、薪资、工作地点、合同期限等</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                                <div>
                                    <h4 className="font-bold text-blue-800 mb-1">工作签证申请</h4>
                                    <p className="text-gray-700 text-sm">申请人提交AEWV工作签证申请，包括个人资料和支持文件</p>
                                    <p className="text-xs text-gray-600 mt-1">处理时间：4-8周，视申请人背景而定</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                                <div>
                                    <h4 className="font-bold text-blue-800 mb-1">在新西兰工作</h4>
                                    <p className="text-gray-700 text-sm">获得工作签证后在新西兰开始工作，积累本地工作经验</p>
                                    <p className="text-xs text-gray-600 mt-1">工作期间可申请签证延期，为移民申请做准备</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                                <div>
                                    <h4 className="font-bold text-green-800 mb-1">居留签证申请</h4>
                                    <p className="text-gray-700 text-sm">满足相应工作经验要求后，根据所选通道申请居留权</p>
                                    <p className="text-xs text-gray-600 mt-1">绿色清单一类：可直接申请；六分制：满足6分后申请</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold text-orange-800 mb-3">2024年最新政策变化</h3>
                        <p className="text-gray-700 mb-4">
                            2024年4月7日，新西兰政府对雇主认证工作签证政策进行了重要修改：
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-700">
                            <li>提高了某些职业的薪资门槛要求</li>
                            <li>加强了对雇主认证的审查力度</li>
                            <li>优化了绿色清单职位的申请流程</li>
                            <li>更新了劳动市场测试的要求</li>
                            <li>当前工资中位数已上涨至$31.61纽币/小时</li>
                        </ul>
                    </div>

                    {/* Investment Migration Section */}
                    <h1 className="text-3xl font-bold text-blue-900 mt-16 mb-6" id="investment-migration">投资移民</h1>

                    <div className="prose max-w-none">
                        <p className="text-gray-700 mb-6">
                            新西兰投资移民项目旨在吸引有经验的商业人士和投资者，通过在新西兰进行符合条件的投资来获得居留权。目前新西兰提供Active Investor Plus Visa（积极投资者签证）作为主要的投资移民途径。
                        </p>



                        <div className="bg-blue-50 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">政策概述</h3>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Active Investor Plus Visa取代了之前的Investor 1和Investor 2类别，于2022年7月27日正式启动。该签证要求申请人在新西兰进行至少1500万纽币的合格投资，并满足其他相关条件。
                                </p>
                                <p>
                                    该签证的设计目的是吸引能够为新西兰带来长期经济利益的高净值投资者，特别是那些能够促进创新、增长和就业的投资项目。
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            投资要求
                        </h3>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 mb-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-bold text-green-800 mb-4">最低投资金额</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">至少1500万纽币的合格投资</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">投资期限：至少4年</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">可分阶段完成投资</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-green-800 mb-4">合格投资类别</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">股票和债券投资</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">商业投资</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">管理基金</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                                            <span className="text-gray-700">慈善捐赠（有限额）</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            申请条件
                        </h3>

                        <div className="overflow-x-auto mb-6">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                                <thead className="bg-blue-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-semibold text-blue-800">条件类别</th>
                                        <th className="px-6 py-3 text-left font-semibold text-blue-800">具体要求</th>
                                        <th className="px-6 py-3 text-left font-semibold text-blue-800">备注</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">年龄要求</td>
                                        <td className="px-6 py-4 text-gray-700">无严格年龄限制</td>
                                        <td className="px-6 py-4 text-gray-600">但需考虑居住要求</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">商业经验</td>
                                        <td className="px-6 py-4 text-gray-700">至少3年商业或投资经验</td>
                                        <td className="px-6 py-4 text-gray-600">需提供相关证明</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">资金来源</td>
                                        <td className="px-6 py-4 text-gray-700">证明资金来源合法</td>
                                        <td className="px-6 py-4 text-gray-600">需详细的资金证明文件</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">英语能力</td>
                                        <td className="px-6 py-4 text-gray-700">雅思3分或等同水平</td>
                                        <td className="px-6 py-4 text-gray-600">配偶也需满足英语要求</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">健康品格</td>
                                        <td className="px-6 py-4 text-gray-700">满足健康和品格要求</td>
                                        <td className="px-6 py-4 text-gray-600">需体检和无犯罪证明</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">居住要求</td>
                                        <td className="px-6 py-4 text-gray-700">4年内累计居住117天</td>
                                        <td className="px-6 py-4 text-gray-600">主申请人最低居住要求</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            申请流程
                        </h3>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h4 className="font-bold text-blue-800 mb-1">资格评估</h4>
                                        <p className="text-gray-700 text-sm">评估申请人是否满足基本条件和投资能力</p>
                                        <p className="text-xs text-gray-600 mt-1">建议寻求专业移民顾问协助</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h4 className="font-bold text-blue-800 mb-1">准备申请材料</h4>
                                        <p className="text-gray-700 text-sm">收集所有必要文件，包括资金证明、商业经验证明等</p>
                                        <p className="text-xs text-gray-600 mt-1">所有文件需要认证翻译</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h4 className="font-bold text-blue-800 mb-1">提交申请</h4>
                                        <p className="text-gray-700 text-sm">向新西兰移民局提交完整的申请材料</p>
                                        <p className="text-xs text-gray-600 mt-1">申请费用：约8,000纽币</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                                    <div>
                                        <h4 className="font-bold text-blue-800 mb-1">审核过程</h4>
                                        <p className="text-gray-700 text-sm">移民局审核申请，可能要求补充材料或面试</p>
                                        <p className="text-xs text-gray-600 mt-1">审核时间：6-12个月</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                                    <div>
                                        <h4 className="font-bold text-green-800 mb-1">获得原则批准</h4>
                                        <p className="text-gray-700 text-sm">获得原则批准后，申请人有12个月时间完成投资</p>
                                        <p className="text-xs text-gray-600 mt-1">之后可申请居留签证</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 p-6 rounded-lg mb-6">
                            <h3 className="text-xl font-semibold text-orange-800 mb-3">2024年政策更新</h3>
                            <div className="space-y-3 text-gray-700">
                                <p>
                                    新西兰政府正在审查投资移民政策，可能会在2024年底或2025年初推出新的投资移民类别。预计的变化包括：
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>投资金额要求可能调整</li>
                                    <li>增加对特定行业的投资激励</li>
                                    <li>简化申请流程</li>
                                    <li>加强对投资项目的监管</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Entrepreneurship Migration Section */}
                    <h1 className="text-3xl font-bold text-blue-900 mt-16 mb-6" id="entrepreneurship-migration">创业移民</h1>

                    <div className="prose max-w-none">
                        <p className="text-gray-700 mb-6">
                            新西兰创业移民为有志在新西兰创建或购买企业的申请人提供了移民途径。该项目旨在吸引有经验的商业人士，通过在新西兰建立或投资企业来获得居留权，从而促进新西兰的经济增长和就业创造。
                        </p>

                        <div className="bg-blue-50 p-6 rounded-lg mb-8">
                            <h3 className="text-xl font-semibold text-blue-800 mb-4">政策概述</h3>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    新西兰创业签证允许有经验的商业人士在新西兰建立企业。该签证分为两个阶段：首先获得Entrepreneur Work Visa（创业工作签证），然后在满足条件后申请Entrepreneur Residence Visa（创业居留签证）。
                                </p>
                                <p>
                                    申请人需要提交详细的商业计划书，证明其企业将为新西兰带来经济利益，如创造就业机会、引入新技术或开拓出口市场。
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            基本要求
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                    <h4 className="text-lg font-bold text-blue-800">个人条件</h4>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>年龄：通常建议在25-65岁之间</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>英语能力：雅思4分或等同水平</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>健康和品格：满足新西兰标准</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-2 mt-1">•</span>
                                        <span>商业经验：至少3年管理或拥有企业经验</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                                    <h4 className="text-lg font-bold text-blue-800">企业要求</h4>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>投资金额：至少10万纽币</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>创造就业：至少雇佣3名新西兰本地员工</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>企业性质：必须是合法的商业活动</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-orange-500 mr-2 mt-1">•</span>
                                        <span>持续经营：企业必须持续运营至少2年</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            申请流程
                        </h3>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6">
                            <h4 className="text-lg font-bold text-green-800 mb-4">第一阶段：Entrepreneur Work Visa</h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h5 className="font-bold text-green-800 mb-1">商业计划书准备</h5>
                                        <p className="text-gray-700 text-sm">详细制定商业计划，包括市场分析、财务预测、就业计划等</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h5 className="font-bold text-green-800 mb-1">资金证明</h5>
                                        <p className="text-gray-700 text-sm">证明拥有足够资金支持企业运营和个人生活</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h5 className="font-bold text-green-800 mb-1">提交申请</h5>
                                        <p className="text-gray-700 text-sm">向新西兰移民局提交工作签证申请</p>
                                        <p className="text-xs text-gray-600 mt-1">处理时间：4-6个月</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-6">
                            <h4 className="text-lg font-bold text-blue-800 mb-4">第二阶段：Entrepreneur Residence Visa</h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                                    <div>
                                        <h5 className="font-bold text-blue-800 mb-1">企业运营</h5>
                                        <p className="text-gray-700 text-sm">在新西兰成功运营企业至少6个月</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                                    <div>
                                        <h5 className="font-bold text-blue-800 mb-1">满足承诺</h5>
                                        <p className="text-gray-700 text-sm">证明已按照商业计划书的承诺进行投资和雇佣</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                                    <div>
                                        <h5 className="font-bold text-blue-800 mb-1">申请居留</h5>
                                        <p className="text-gray-700 text-sm">提交居留签证申请，获得永久居民身份</p>
                                        <p className="text-xs text-gray-600 mt-1">处理时间：6-12个月</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            热门创业行业
                        </h3>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h4 className="text-lg font-bold text-blue-800 mb-3">科技创新</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>• 软件开发</li>
                                    <li>• 人工智能</li>
                                    <li>• 电子商务</li>
                                    <li>• 生物技术</li>
                                </ul>
                                <p className="text-xs text-gray-600 mt-3">政府大力支持科技创新企业</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h4 className="text-lg font-bold text-blue-800 mb-3">农业食品</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>• 有机农业</li>
                                    <li>• 食品加工</li>
                                    <li>• 农业技术</li>
                                    <li>• 出口贸易</li>
                                </ul>
                                <p className="text-xs text-gray-600 mt-3">新西兰农业优势明显</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h4 className="text-lg font-bold text-blue-800 mb-3">旅游服务</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li>• 生态旅游</li>
                                    <li>• 文化体验</li>
                                    <li>• 住宿服务</li>
                                    <li>• 户外运动</li>
                                </ul>
                                <p className="text-xs text-gray-600 mt-3">旅游业是新西兰重要产业</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-semibold text-blue-700 mt-8 mb-6 flex items-center">
                            <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full mr-4"></div>
                            成功要素
                        </h3>

                        <div className="bg-yellow-50 p-6 rounded-lg mb-6 border-l-4 border-yellow-400">
                            <h4 className="text-lg font-semibold text-yellow-800 mb-4">提高成功率的关键因素</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="font-bold text-gray-800 mb-2">商业计划</h5>
                                    <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                        <li>详细的市场研究和竞争分析</li>
                                        <li>切实可行的财务预测</li>
                                        <li>明确的就业创造计划</li>
                                        <li>符合新西兰经济发展需求</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-800 mb-2">执行能力</h5>
                                    <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                                        <li>丰富的商业管理经验</li>
                                        <li>对新西兰市场的了解</li>
                                        <li>充足的资金支持</li>
                                        <li>良好的英语沟通能力</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-red-50 p-6 rounded-lg mb-6 border-l-4 border-red-400">
                            <h4 className="text-lg font-semibold text-red-800 mb-4">常见风险提醒</h4>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <h5 className="font-semibold text-red-800">市场风险</h5>
                                        <p className="text-sm">充分了解新西兰市场特点，避免盲目投资</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <h5 className="font-semibold text-red-800">合规风险</h5>
                                        <p className="text-sm">确保企业运营符合新西兰法律法规要求</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <h5 className="font-semibold text-red-800">资金管理</h5>
                                        <p className="text-sm">合理规划资金使用，确保企业可持续发展</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-xl border border-blue-200 mb-8">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-blue-800">专业建议</h4>
                            </div>
                            <div className="text-gray-700">
                                <p className="mb-4">
                                    创业移民是一个复杂的过程，需要综合考虑商业、法律、税务等多个方面。建议申请人在开始之前：
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>寻求专业的移民律师或顾问协助</li>
                                    <li>详细了解新西兰的商业环境和法律法规</li>
                                    <li>制定详细的商业计划和财务预算</li>
                                    <li>考虑聘请本地的会计师和法律顾问</li>
                                    <li>准备充足的资金和应急计划</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS animations */}
            <style jsx>{`
                @keyframes refinedThreadMove {
                    0% { 
                        transform: skewY(35deg) translateY(0px);
                    }
                    20% {
                        transform: skewY(37deg) translateY(-4px);
                    }
                    40% {
                        transform: skewY(34deg) translateY(-2px);
                    }
                    60% {
                        transform: skewY(36deg) translateY(0px);
                    }
                    80% {
                        transform: skewY(33deg) translateY(-3px);
                    }
                    100% { 
                        transform: skewY(35deg) translateY(0px);
                    }
                }
                
                html {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
};

export default Immigration;