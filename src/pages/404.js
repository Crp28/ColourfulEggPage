import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { getLang } from '../helpers/getLang';

const NotFound = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main content - between header and footer */}
            <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
                <div className="max-w-2xl w-full text-center">
                    {/* Error Code with Animation */}
                    <div className="relative">
                        <h1 className="text-[180px] font-bold text-blue-900 opacity-10 whitespace-pre-wrap">
                            4  4
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Your logo or a cute egg illustration could go here */}
                            <img
                                src="/QuestionEgg.gif"
                                alt="Confused Egg"
                                className="h-36 w-36 object-contain"
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    <h2 className="text-3xl font-bold text-blue-900 mt-8 mb-4">
                        啊哦...这个页面找不到了
                    </h2>
                    <p className="text-gray-600 mb-8">
                        看起来您访问的页面不存在，或者已经被移动到别处了。
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center px-6 py-3 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            返回上一页
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            <Home className="mr-2 h-5 w-5" />
                            回到主页
                        </button>
                    </div>

                    {/* Additional help text */}
                    <p className="mt-12 text-gray-500 text-sm">
                        需要帮助？
                        <button
                            onClick={() => navigate(`${getLang(location)}/contact-us`)}
                            className="text-orange-500 hover:text-orange-600 ml-1"
                        >
                            联系我们
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default NotFound;