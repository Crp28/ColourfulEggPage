import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const formRef = useRef();

    // Initialize EmailJS (you would normally do this once in your app)
    React.useEffect(() => {
        // Load EmailJS script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
            window.emailjs.init('LT17tu8q7V-ny7vPF');
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Validation functions
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return '姓名是必填项';
                if (value.trim().length < 2) return '姓名至少需要2个字符';
                return '';

            case 'email':
                if (!value.trim()) return '邮箱是必填项';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return '请输入有效的邮箱地址';
                return '';

            case 'phone':
                // Phone is optional, but if provided should be valid
                if (value && value.trim()) {
                    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
                    if (!phoneRegex.test(value.trim())) return '请输入有效的电话号码';
                }
                return '';

            case 'subject':
                if (!value) return '请选择咨询主题';
                return '';

            case 'message':
                if (!value.trim()) return '详细信息是必填项';
                if (value.trim().length < 10) return '请提供更详细的信息（至少10个字符）';
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        return newErrors;
    };

    const isFormValid = () => {
        const errors = validateForm();
        const requiredFields = ['name', 'email', 'subject', 'message'];

        // Check if any required field has errors or is empty
        for (let field of requiredFields) {
            if (errors[field] || !formData[field].trim()) {
                return false;
            }
        }

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        // Clear submit status when user modifies form
        if (submitStatus) {
            setSubmitStatus(null);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });

        const error = validateField(name, value);
        setErrors({
            ...errors,
            [name]: error
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched to show validation errors
        const allTouched = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        // Validate all fields
        const formErrors = validateForm();
        setErrors(formErrors);

        // Check if form is valid
        if (!isFormValid()) {
            setSubmitStatus('validation_error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                time: new Date().toLocaleString(),
            };

            await window.emailjs.send(
                'service_s100koh',
                'template_q51q0s6',
                templateParams,
                'LT17tu8q7V-ny7vPF'
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setErrors({});
            setTouched({});
        } catch (error) {
            console.error('EmailJS error:', error);
            setSubmitStatus('error');
            setErrors({});
            setTouched({});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Contact Section */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Contact Form - Left 2/3 */}
                            <div className="lg:w-2/3 p-8">
                                <h2 className="text-3xl font-bold text-blue-900 mb-6">咨询我们</h2>

                                {submitStatus === 'validation_error' && (
                                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                                        <span className="text-yellow-800">请检查并填写所有必填项目</span>
                                    </div>
                                )}

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                        <span className="text-green-800">消息发送成功！我们会尽快回复您。</span>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                                        <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                                        <span className="text-red-800">发送失败，请稍后重试或直接联系我们。</span>
                                    </div>
                                )}

                                <div ref={formRef} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                姓名 *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.name && touched.name
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                                placeholder="请输入您的姓名"
                                            />
                                            {errors.name && touched.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                邮箱 *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email && touched.email
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                                placeholder="example@email.com"
                                            />
                                            {errors.email && touched.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                电话号码
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.phone && touched.phone
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                                placeholder="+86 138 0000 0000"
                                            />
                                            {errors.phone && touched.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                咨询主题 *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.subject && touched.subject
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">请选择咨询主题</option>
                                                <option value="本科申请">本科申请</option>
                                                <option value="研究生申请">研究生申请</option>
                                                <option value="预科课程">预科课程</option>
                                                <option value="签证咨询">签证咨询</option>
                                                <option value="移民咨询">移民咨询</option>
                                                <option value="其他咨询">其他咨询</option>
                                            </select>
                                            {errors.subject && touched.subject && (
                                                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            详细信息 *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            rows={6}
                                            className={`w-full h-[300px] resize-none px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors  ${errors.message && touched.message
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.message && touched.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !isFormValid()}
                                        className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${isFormValid() && !isSubmitting
                                            ? 'bg-blue-900 text-white hover:bg-blue-800'
                                            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                发送中...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                发送消息
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Vertical Divider */}
                            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

                            {/* Contact Information - Right 1/3 */}
                            <div className="lg:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                                <h3 className="text-2xl font-bold text-blue-900 mb-6">联系方式</h3>

                                <div className="space-y-6">
                                    {/* Office Address */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <MapPin className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">办公地址</h4>
                                            <p className="text-gray-600 text-sm">
                                                新西兰奥克兰市<br />
                                                Queen Street 123号<br />
                                                Level 5, Suite 501
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">电话咨询</h4>
                                            <p className="text-gray-600 text-sm">
                                                新西兰: +64 9 123 4567<br />
                                                中国: +86 400 888 9999
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">邮箱联系</h4>
                                            <p className="text-gray-600 text-sm">
                                                info@niudanedu.com<br />
                                                admission@niudanedu.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <Clock className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">工作时间</h4>
                                            <p className="text-gray-600 text-sm">
                                                周一至周五: 9:00 - 18:00<br />
                                                周六: 10:00 - 16:00<br />
                                                周日: 休息
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* WeChat QR Code */}
                                <div className="mt-8 pt-6 border-t border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-3 text-center">微信咨询</h4>
                                    <div className="flex justify-center">
                                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                                            <img
                                                src={`${process.env.PUBLIC_URL}/QR.jpg`}
                                                alt="WeChat QR Code"
                                                className="w-20 h-20 object-contain"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 text-center mt-2">扫码添加微信</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export const ContactUsEN = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const formRef = useRef();

    // Initialize EmailJS (you would normally do this once in your app)
    React.useEffect(() => {
        // Load EmailJS script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
            window.emailjs.init('LT17tu8q7V-ny7vPF');
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Validation functions
    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return '';

            case 'email':
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';

            case 'phone':
                // Phone is optional, but if provided should be valid
                if (value && value.trim()) {
                    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
                    if (!phoneRegex.test(value.trim())) return 'Please enter a valid phone number';
                }
                return '';

            case 'subject':
                if (!value) return 'Please select a subject';
                return '';

            case 'message':
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Please provide more details (at least 10 characters)';
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });
        return newErrors;
    };

    const isFormValid = () => {
        const errors = validateForm();
        const requiredFields = ['name', 'email', 'subject', 'message'];

        // Check if any required field has errors or is empty
        for (let field of requiredFields) {
            if (errors[field] || !formData[field].trim()) {
                return false;
            }
        }

        // Check if email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        // Clear submit status when user modifies form
        if (submitStatus) {
            setSubmitStatus(null);
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });

        const error = validateField(name, value);
        setErrors({
            ...errors,
            [name]: error
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields as touched to show validation errors
        const allTouched = {};
        Object.keys(formData).forEach(key => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        // Validate all fields
        const formErrors = validateForm();
        setErrors(formErrors);

        // Check if form is valid
        if (!isFormValid()) {
            setSubmitStatus('validation_error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const templateParams = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                time: new Date().toLocaleString(),
            };

            await window.emailjs.send(
                'service_s100koh',
                'template_q51q0s6',
                templateParams,
                'LT17tu8q7V-ny7vPF'
            );

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setErrors({});
            setTouched({});
        } catch (error) {
            console.error('EmailJS error:', error);
            setSubmitStatus('error');
            setErrors({});
            setTouched({});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-16">
            {/* Contact Section */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            {/* Contact Form - Left 2/3 */}
                            <div className="lg:w-2/3 p-8">
                                <h2 className="text-3xl font-bold text-blue-900 mb-6">Contact Us</h2>

                                {submitStatus === 'validation_error' && (
                                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                                        <span className="text-yellow-800">Please check and fill all required fields</span>
                                    </div>
                                )}

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                                        <span className="text-green-800">Message sent successfully! We will reply to you soon.</span>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                                        <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                                        <span className="text-red-800">Send failed, please try again later or contact us directly.</span>
                                    </div>
                                )}

                                <div ref={formRef} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.name && touched.name
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                                placeholder="Please enter your name"
                                            />
                                            {errors.name && touched.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email && touched.email
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                                placeholder="example@email.com"
                                            />
                                            {errors.email && touched.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.phone && touched.phone
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                                placeholder="+64 21 123 4567"
                                            />
                                            {errors.phone && touched.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.subject && touched.subject
                                                    ? 'border-red-300 bg-red-50'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Please select a subject</option>
                                                <option value="Undergraduate Application">Undergraduate Application</option>
                                                <option value="Graduate Application">Graduate Application</option>
                                                <option value="Foundation Courses">Foundation Courses</option>
                                                <option value="Visa Consultation">Visa Consultation</option>
                                                <option value="Immigration Consultation">Immigration Consultation</option>
                                                <option value="Other Inquiries">Other Inquiries</option>
                                            </select>
                                            {errors.subject && touched.subject && (
                                                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            rows={6}
                                            className={`w-full h-[300px] resize-none px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors  ${errors.message && touched.message
                                                ? 'border-red-300 bg-red-50'
                                                : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.message && touched.message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || !isFormValid()}
                                        className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center ${isFormValid() && !isSubmitting
                                            ? 'bg-blue-900 text-white hover:bg-blue-800'
                                            : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Vertical Divider */}
                            <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

                            {/* Contact Information - Right 1/3 */}
                            <div className="lg:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                                <h3 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h3>

                                <div className="space-y-6">
                                    {/* Office Address */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <MapPin className="w-6 h-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">Office Address</h4>
                                            <p className="text-gray-600 text-sm">
                                                Auckland, New Zealand<br />
                                                123 Queen Street<br />
                                                Level 5, Suite 501
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">Phone Consultation</h4>
                                            <p className="text-gray-600 text-sm">
                                                New Zealand: +64 9 123 4567<br />
                                                China: +86 400 888 9999
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <Mail className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">Email Contact</h4>
                                            <p className="text-gray-600 text-sm">
                                                info@niudanedu.com<br />
                                                admission@niudanedu.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                                            <Clock className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">Business Hours</h4>
                                            <p className="text-gray-600 text-sm">
                                                Monday to Friday: 9:00 - 18:00<br />
                                                Saturday: 10:00 - 16:00<br />
                                                Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* WeChat QR Code */}
                                <div className="mt-8 pt-6 border-t border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-3 text-center">WeChat Consultation</h4>
                                    <div className="flex justify-center">
                                        <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
                                            <img
                                                src={`${process.env.PUBLIC_URL}/QR.jpg`}
                                                alt="WeChat QR Code"
                                                className="w-20 h-20 object-contain"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 text-center mt-2">Scan to add WeChat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};