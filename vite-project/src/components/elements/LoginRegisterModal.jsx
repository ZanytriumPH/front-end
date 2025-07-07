import React, { useState } from 'react';
import { useThemeStore } from '../../store/ThemeStore.jsx';

export const LoginRegisterModal = ({ isOpen, onClose }) => {
    const { theme } = useThemeStore();
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`bg-box-bg p-8 rounded-lg border-4 relative ${theme === 'dark' ? 'border-box-border' : 'border-gradient-to-r from-blue-600 to-violet-600'}`}>
                <button
                    className="absolute top-2 right-2 text-heading-2"
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-heading-1 text-2xl font-bold mb-4">
                    {isLogin ? '登录' : '注册'}
                </h2>
                <form>
                    <input
                        type="text"
                        placeholder="用户名"
                        className="block w-full p-2 mb-4 border border-box-border rounded-md bg-body text-heading-3"
                    />
                    <input
                        type="password"
                        placeholder="密码"
                        className="block w-full p-2 mb-4 border border-box-border rounded-md bg-body text-heading-3"
                    />
                    <button
                        type="submit"
                        className="w-full px-6 py-3 rounded-full bg-violet-600 text-white hover:scale-102"
                    >
                        {isLogin ? '登录' : '注册'}
                    </button>
                </form>
                <p className="text-heading-3 text-center mt-4">
                    {isLogin ? '没有账号？' : '已有账号？'}
                    <button
                        className="text-violet-600 ml-1"
                        onClick={toggleForm}
                    >
                        {isLogin ? '注册' : '登录'}
                    </button>
                </p>
            </div>
        </div>
    );
};