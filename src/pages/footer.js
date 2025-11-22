import { useState } from "react";


const Footer = () => {
    const [showQR, setShowQR] = useState(false);

    return (

        <footer
            className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-4"
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap text-center">
                    {/* Company Info */}
                    <div className="w-full md:w-5/12 footer-column">
                        <h4 className="text-2xl font-bold mb-2">纽蛋留学</h4>
                        <p className="text-gray-400 mb-1">地址：Placeholder</p>
                        <small className="text-gray-500 text-sm">© 2024 by Colourful Egg Education</small>
                    </div>

                    <div className="hidden md:block w-px bg-gray-700 mx-4 my-2" />

                    {/* Contact Info */}
                    <div className="w-full md:w-2/12 footer-column">
                        <h5 className="text-lg font-bold mb-2">联系我们</h5>
                        <ul className="space-y-1">
                            <li className="text-gray-400">Tel: 000-0000000</li>
                            <li className="text-gray-400">Email: xx@abc.com</li>
                        </ul>
                    </div>

                    <div className="hidden md:block w-px bg-gray-700 mx-4 my-2" />

                    {/* Quick Links */}
                    <div className="w-full md:w-3/12 footer-column">
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                    Link 1
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                    Link 2
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                >
                                    免费咨询
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* WeChat QR Code*/}
                    <div className="w-full md:w-1/12 footer-column mt-6 md:mt-0 flex justify-center">
                        <div
                            className="relative h-24 w-24 flex items-center justify-center cursor-pointer"
                            onClick={() => setShowQR(!showQR)}
                        >
                            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                                style={{ opacity: showQR ? 0 : 1 }}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/Wechat1.svg`}
                                    alt="WeChat Icon"
                                    className="h-20 w-20 object-contain hover:scale-105 transition-transform"
                                />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                                style={{ opacity: showQR ? 1 : 0 }}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/QR.jpg`}
                                    alt="QR Code"
                                    className="h-24 w-24 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;