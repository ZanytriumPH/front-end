// src/components/cards/LoginRegisterCard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FormInput } from '../shared/FormInput.jsx';
import { Notification } from '../shared/Notification.jsx';
import { useNotificationTimer } from "../../hooks/useNotificationTimer.js";

export const LoginRegisterCard = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(''); // 错误提示信息，错误时显示
    const [confirmError, setConfirmError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [notification, setNotification] = useState({ message: '', visible: false, type: 'success' });

    useNotificationTimer(notification, setNotification);

    const toggleForm = () => {
        setIsLogin(!isLogin); // 状态取反，切换表单
        setPassword(''); // 清空内容
        setConfirmPassword('');
        setPasswordError('');
        setConfirmError('');
        setUsernameError('');
    };

    // 动态监听输入改变
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (newPassword.length < 6 || newPassword.length > 12) {
            setPasswordError('密码长度必须为 6 到 12 个字符');
        } else {
            setPasswordError('');
            if (!isLogin && confirmPassword) {
                validateConfirmPassword(newPassword, confirmPassword);
            }
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirm = e.target.value;
        setConfirmPassword(newConfirm);
        validateConfirmPassword(password, newConfirm);
    };

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

        const username = e.target[0].value;
        if (username.length > 6) {
            setUsernameError('用户名不能超过6个字符');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (password.length < 6 || password.length > 12) {
            setPasswordError('密码长度必须为 6 到 12 个字符');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isLogin) {
            if (password !== confirmPassword) {
                setConfirmError('两次输入的密码不一致');
                isValid = false;
            } else {
                setConfirmError('');
            }
        }

        if (isValid) {
            try {
                let response;
                let userData;

                if (isLogin) {
                    response = await axios.post('/api/login', { username, password });
                    userData = response.data.data;
                } else {
                    response = await axios.post('/api/register', { username, password });
                    userData = response.data.data;
                }

                if (response.data.success) {
                    console.log(`${isLogin ? '登录' : '注册'}成功：`, userData);
                    setNotification({
                        message: `${isLogin ? '登录' : '注册'}成功`,
                        visible: true,
                        type: 'success'
                    });

                    // 确保从响应中获取余额
                    const balance = userData?.balance || null;

                    // 登录成功后存储用户名和余额
                    localStorage.setItem('username', username);
                    localStorage.setItem('balance', balance);

                    // 发送自定义事件
                    const event = new CustomEvent('userLoggedIn', {
                        detail: {
                            username,
                            balance
                        }
                    });
                    window.dispatchEvent(event);

                    setTimeout(() => {
                        onClose();
                    }, 1500);
                } else {
                    console.error(`${isLogin ? '登录' : '注册'}失败：`, response.data.message);
                    setNotification({
                        message: response.data.message || '操作失败，请重试',
                        visible: true,
                        type: 'error'
                    });
                }
            } catch (error) {
                setNotification({
                    message: error.response ? error.response.data.message : '网络错误',
                    visible: true,
                    type: 'error'
                });
            }
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <Notification message={notification.message} visible={notification.visible} type={notification.type} />
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-transparent">
                <div className={`bg-box-bg p-12 rounded-lg border-4 relative w-96 border-gradient-to-r`}>
                    {/*关闭按钮*/}
                    <button
                        className="absolute top-4 right-4 text-heading-2 cursor-pointer"
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <h2 className="text-heading-1 text-3xl font-bold mb-6">
                        {isLogin ? '登录' : '注册'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            type="text"
                            placeholder="用户名"
                            error={usernameError} // 输入框下显示错误提示
                        />
                        <FormInput
                            type="password"
                            placeholder="密码"
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
                        />
                        {!isLogin && ( // 注册时显示
                            <FormInput
                                type="password"
                                placeholder="确认密码"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                error={confirmError}
                            />
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
        </>
    );
};