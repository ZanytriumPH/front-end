import React, { useState } from 'react';
import { useThemeStore } from '../../store/ThemeStore.jsx';

export const LoginRegisterModal = ({ isOpen, onClose }) => {
    const { theme } = useThemeStore();
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setPassword('');
        setPasswordError('');
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length < 6 || newPassword.length > 12) {
            setPasswordError('密码长度必须为 6 到 12 个字符');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 6 || password.length > 12) {
            setPasswordError('密码长度必须为 6 到 12 个字符');
        } else {
            // 这里可以添加登录或注册的逻辑
            console.log('密码验证通过，执行登录/注册逻辑');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* 增大弹窗尺寸，使用 p-12 增加内边距 */}
            <div className={`bg-box-bg p-12 rounded-lg border-4 relative w-96 ${theme === 'dark' ? 'border-box-border' : 'border-gradient-to-r from-blue-600 to-violet-600'}`}>
                <button
                    className="absolute top-4 right-4 text-heading-2 cursor-pointer"
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
                <h2 className="text-heading-1 text-3xl font-bold mb-6">
                    {isLogin ? '登录' : '注册'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="用户名"
                        className="block w-full p-3 mb-6 border border-box-border rounded-md bg-body text-heading-3"
                    />
                    <input
                        type="password"
                        placeholder="密码"
                        className="block w-full p-3 mb-2 border border-box-border rounded-md bg-body text-heading-3"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && (
                        <p className="text-red-500 text-sm mb-6">{passwordError}</p>
                    )}
                    {/* 增加按钮上方的外边距，使用 mt-8 增大距离 */}
                    <button
                        type="submit"
                        className="w-full px-6 py-3 rounded-full bg-violet-600 text-white hover:scale-102 cursor-pointer mt-8"
                    >
                        {isLogin ? '登录' : '注册'}
                    </button>
                </form>
                <p className="text-heading-3 text-center mt-6">
                    {isLogin ? '没有账号？' : '已有账号？'}
                    <button
                        className="text-violet-600 ml-1 cursor-pointer"
                        onClick={toggleForm}
                    >
                        {isLogin ? '注册' : '登录'}
                    </button>
                </p>
            </div>
        </div>
    );
};