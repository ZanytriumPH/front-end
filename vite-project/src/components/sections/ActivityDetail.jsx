import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Notification } from '../shared/Notification.jsx'; // 引入 Notification 组件
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';

export const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [signedUp, setSignedUp] = useState(0);
    const [total, setTotal] = useState(0);
    const [username] = useState(localStorage.getItem('username') || '用户');
    const [notification, setNotification] = useState({ message: '', visible: false, type: 'success' }); // 添加通知状态

    useEffect(() => {
        const fetchActivityDetail = async () => {
            try {
                const response = await fetch(`/api/activities/${id}`);
                const result = await response.json();
                if (result.success && result.data) {
                    setActivity(result.data);
                    setSignedUp(result.data.signedUp);
                    setTotal(result.data.total);
                } else {
                    console.error('获取活动详情失败:', result.message || '未知错误');
                }
            } catch (error) {
                console.error('获取活动详情失败:', error);
            }
        };

        if (id) {
            fetchActivityDetail();
        }
    }, [id]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userName = localStorage.getItem('username'); // 从 localStorage 获取 userName

            if (!userName) {
                setNotification({ message: '请先登录', visible: true, type: 'error' }); // 更新通知状态
                return;
            }

            const response = await fetch(`/api/activities/${id}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            });
            const result = await response.json();
            const balance = localStorage.getItem('balance'); // 获取之前的用户余额
            console.log('服务器返回的数据:', result); // 打印服务器返回的数据
            if (result.success) {
                setNotification({ message: '报名成功', visible: true, type: 'success' }); // 更新通知状态
                localStorage.setItem('balance', (balance - activity.price).toString()); // 更新用户余额
                // 刷新页面或更新活动信息
                // setTimeout(() => {
                //     window.location.reload();
                // }, 2000); // 延迟 2 秒后刷新页面
            } else {
                setNotification({ message: result.message, visible: true, type: 'error' }); // 更新通知状态
            }
        } catch (error) {
            console.error('报名失败:', error);
            setNotification({ message: '报名失败，请稍后重试', visible: true, type: 'error' }); // 更新通知状态
        }
    };

    const handleClose = () => {
        navigate(-1); // 返回上一个路由
    };

    useEffect(() => {
        if (notification.visible) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, visible: false }));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification.visible]);

    return (
        <div>
            <Notification message={notification.message} visible={notification.visible} type={notification.type} /> {/* 渲染 Notification 组件 */}
            {activity && (
                <BaseActivityDetail
                    isOpen={true}
                    onClose={handleClose}
                    id={id}
                    signedUp={signedUp}
                    total={total}
                    buttonText="确认活动报名"
                    onButtonClick={handleSignUp}
                />
            )}
        </div>
    );
};