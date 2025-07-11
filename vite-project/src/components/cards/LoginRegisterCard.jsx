import React, { useState } from 'react';
import { useThemeStore } from '../../store/ThemeStore.jsx';
import axios from 'axios';


export const LoginRegisterCard = ({ isOpen, onClose }) => {
    const { theme } = useThemeStore();
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码状态
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState(''); // 确认密码错误信息

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // 切换表单时重置所有密码相关状态
        setPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setConfirmError('');
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // 验证密码长度
        if (newPassword.length < 6 || newPassword.length > 12) {
            setPasswordError('密码长度必须为 6 到 12 个字符');
        } else {
            setPasswordError('');
            // 如果是注册状态，同步验证确认密码
            if (!isLogin && confirmPassword) {
                validateConfirmPassword(newPassword, confirmPassword);
            }
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirm = e.target.value;
        setConfirmPassword(newConfirm);
        // 验证两次密码是否一致
        validateConfirmPassword(password, newConfirm);
    };

    // 验证两次密码是否一致的工具函数
    const validateConfirmPassword = (pwd, confirmPwd) => {
        if (pwd !== confirmPwd) {
            setConfirmError('两次输入的密码不一致');
        } else {
            setConfirmError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        // 验证密码长度（登录和注册都需要）
        if (password.length < 6 || password.length > 12) {
            setPasswordError('密码长度必须为 6 到 12 个字符');
            isValid = false;
        } else {
            setPasswordError('');
        }

        // 注册状态下额外验证确认密码
        if (!isLogin) {
            if (password !== confirmPassword) {
                setConfirmError('两次输入的密码不一致');
                isValid = false;
            } else {
                setConfirmError('');
            }
        }

        if (isValid) {
            const username = e.target[0].value;
            try {
                if (isLogin) {
                    const response = await axios.post('/api/login', { username, password });
                    console.log('登录成功：', response.data);
                } else {
                    const response = await axios.post('/api/register', { username, password });
                    console.log('注册成功：', response.data);
                }
                onClose(); // 可选择提交后关闭弹窗
            } catch (error) {
                console.error('请求失败：', error.response.data.message);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className={`bg-box-bg p-12 rounded-lg border-4 relative w-96 border-gradient-to-r from-blue-600 to-violet-600`}>
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
                        required
                    />
                    <input
                        type="password"
                        placeholder="密码"
                        className="block w-full p-3 mb-2 border border-box-border rounded-md bg-body text-heading-3"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {passwordError && (
                        <p className="text-red-500 text-sm mb-6">{passwordError}</p>
                    )}

                    {/* 注册状态下显示确认密码输入框 */}
                    {!isLogin && (
                        <>
                            <input
                                type="password"
                                placeholder="确认密码"
                                className="block w-full p-3 mb-2 border border-box-border rounded-md bg-body text-heading-3 mt-4"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            {confirmError && (
                                <p className="text-red-500 text-sm mb-6">{confirmError}</p>
                            )}
                        </>
                    )}

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