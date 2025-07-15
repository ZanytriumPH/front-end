// src/components/elements/RouteSwitchButtons.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const routes = [
    { path: '/', name: '首页' },
    { path: '/ActivityList', name: '活动列表' },
    { path: '/Mine', name: '我的' }
];

export const RouteSwitchButtons = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoverLeft, setHoverLeft] = useState(false);
    const [hoverRight, setHoverRight] = useState(false);

    useEffect(() => {
        const index = routes.findIndex(route => route.path === location.pathname);
        if (index !== -1) {
            setCurrentIndex(index);
        }
    }, [location.pathname]);

    const handlePrevRoute = () => {
        if (currentIndex > 0) {
            navigate(routes[currentIndex - 1].path);
        }
    };

    const handleNextRoute = () => {
        if (currentIndex < routes.length - 1) {
            navigate(routes[currentIndex + 1].path);
        }
    };

    // 判断当前路由是否为 ActivityDetail 界面
    const isActivityDetail = location.pathname.includes('/ActivityDetail/');

    if (isActivityDetail) {
        return null;
    }

    return (
        <>
            {/* 左侧按钮 - 固定在屏幕左侧垂直居中 */}
            <div
                className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
                    currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
                onClick={handlePrevRoute}
                onMouseEnter={() => setHoverLeft(true)}
                onMouseLeave={() => setHoverLeft(false)}
            >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur-md transition-all duration-300 ${
                    hoverLeft ? 'opacity-70 scale-110' : 'opacity-0'
                }`}></div>
                <div className="relative flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 rounded-full shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:scale-105 w-16 h-16">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 transition-transform duration-300 ${hoverLeft ? 'transform -translate-x-1' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
            </div>

            {/* 右侧按钮 - 固定在屏幕右侧垂直居中 */}
            <div
                className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
                    currentIndex === routes.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                }`}
                onClick={handleNextRoute}
                onMouseEnter={() => setHoverRight(true)}
                onMouseLeave={() => setHoverRight(false)}
            >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur-md transition-all duration-300 ${
                    hoverRight ? 'opacity-70 scale-110' : 'opacity-0'
                }`}></div>
                <div className="relative flex items-center justify-center bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 rounded-full shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:scale-105 w-16 h-16">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-8 w-8 transition-transform duration-300 ${hoverRight ? 'transform translate-x-1' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </>
    );
};