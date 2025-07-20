import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../shared/Notification.jsx';

export const CreateActivity = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(''); // 日期部分
    const [time, setTime] = useState(''); // 时间部分
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [total, setTotal] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [notification, setNotification] = useState({ message: '', visible: false, type: 'success' });
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userName = localStorage.getItem('username');

        if (!userName) {
            setNotification({ message: '请先登录', visible: true, type: 'error' });
            return;
        }

        // 组合日期和时间
        const fullDateTime = date && time ? `${date} ${time}` : '';

        // 简单验证
        if (!title || !date || !time || !location || !price || !image || !total || !description || !contact) {
            setNotification({ message: '所有字段均为必填项', visible: true, type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('time', fullDateTime);
        formData.append('location', location);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('total', total);
        formData.append('description', description);
        formData.append('contact', contact);
        formData.append('organizer', username);

        try {
            const response = await fetch('http://localhost:7001/api/activities', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                setNotification({ message: '活动创建成功', visible: true, type: 'success' });
                setTimeout(() => {
                    navigate('/Mine');
                }, 2000);
            } else {
                setNotification({ message: result.message || '活动创建失败，请稍后重试', visible: true, type: 'error' });
            }
        } catch (error) {
            console.error('活动创建失败:', error);
            setNotification({ message: '活动创建失败，请稍后重试', visible: true, type: 'error' });
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="py-18">
            {/* 统一标题栏样式 */}
            <div className="rounded-t-xl max-w-2xl mx-auto shadow-md flex justify-between items-center p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <h2 className="text-2xl font-bold truncate">{'创建活动'}</h2>
                <button
                    onClick={handleGoBack}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* 统一内容容器样式 */}
            <div className="max-w-2xl mx-auto bg-box-bg shadow-md rounded-b-xl overflow-hidden">
                <div className="p-6 space-y-5">
                    <Notification message={notification.message} visible={notification.visible} type={notification.type} />
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* 活动标题 */}
                        <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="title" className="block text-sm text-heading-2">活动标题</label>
                                <input
                                    type="text"
                                    id="title"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* 活动时间 - 独占一行 */}
                        <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <label className="block text-sm text-heading-2">活动时间</label>
                                <div className="grid grid-cols-2 gap-3 mt-1">
                                    <div>
                                        <input
                                            type="date"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="time"
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                            value={time}
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 网格布局信息卡片 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* 活动地点 */}
                            <div className="flex items-center">
                                <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="location" className="block text-sm text-heading-2">活动地点</label>
                                    <input
                                        type="text"
                                        id="location"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 活动价格 */}
                            <div className="flex items-center">
                                <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="price" className="block text-sm text-heading-2">活动价格</label>
                                    <input
                                        type="text"
                                        id="price"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 活动总人数 */}
                            <div className="flex items-center">
                                <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="total" className="block text-sm text-heading-2">活动总人数</label>
                                    <input
                                        type="number"
                                        id="total"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                        value={total}
                                        onChange={(e) => setTotal(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* 联系方式 */}
                            <div className="flex items-center">
                                <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="contact" className="block text-sm text-heading-2">联系方式</label>
                                    <input
                                        type="text"
                                        id="contact"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 活动图片 - 独占一行 */}
                        <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="image" className="block text-sm text-heading-2">活动图片</label>
                                <input
                                    type="file"
                                    id="image"
                                    className="mt-1 block w-full text-heading-3 text-sm cursor-pointer border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        {/* 活动描述 */}
                        <div className="pt-4 border-t border-gray-200">
                            <label htmlFor="description" className="block text-lg font-semibold text-heading-3 mb-3">活动详情</label>
                            <textarea
                                id="description"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-heading-3"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* 统一按钮样式 */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="cursor-pointer px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    创建活动
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};