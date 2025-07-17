import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../shared/Notification.jsx';

export const CreateActivity = () => {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
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

        // 简单验证
        if (!title || !time || !location || !price || !image || !total || !description || !contact) {
            setNotification({ message: '所有字段均为必填项', visible: true, type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('time', time);
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

    return (
        <div className="py-20">
            <div className="max-w-2xl mx-auto p-6 bg-box-bg rounded-md shadow-md">
                <h2 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl font-bold mb-8">创建活动</h2>
                <Notification message={notification.message} visible={notification.visible} type={notification.type} />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-heading-2">活动标题</label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-heading-3 text-sm"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-heading-2">活动时间</label>
                        <input
                            type="text"
                            id="time"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-heading-3 text-sm"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-heading-2">活动地点</label>
                        <input
                            type="text"
                            id="location"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-heading-3 text-sm"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-heading-2">活动价格</label>
                        <input
                            type="text"
                            id="price"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-heading-3 text-sm"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-heading-2">活动图片</label>
                        <input
                            type="file"
                            id="image"
                            className="mt-1 block w-full text-heading-3 text-sm"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="total" className="block text-heading-2">活动总人数</label>
                        <input
                            type="number"
                            id="total"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-heading-3 text-sm"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-heading-2">活动描述</label>
                        <textarea
                            id="description"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-heading-3 text-sm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-heading-2">联系方式</label>
                        <input
                            type="text"
                            id="contact"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-heading-3 text-sm"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-6 py-3 rounded-full bg-violet-600 text-white hover:scale-102 cursor-pointer"
                    >
                        创建活动
                    </button>
                </form>
            </div>
        </div>
    );
};