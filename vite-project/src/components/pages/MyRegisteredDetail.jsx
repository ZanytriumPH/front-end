// src/components/pages/MyRegisteredDetail.jsx
import React, { useState, useEffect } from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import { useParams } from 'react-router-dom';
import { Notification } from '../shared/Notification.jsx'; // 引入 Notification 组件

export const MyRegisteredDetail = () => {
    const { id } = useParams();
    const [signedUp, setSignedUp] = useState(0);
    const [total, setTotal] = useState(0);
    const [notification, setNotification] = useState({ message: '', visible: false, type: 'success' }); // 添加通知状态

    useEffect(() => {
        const fetchActivityDetail = async () => {
            try {
                const response = await fetch(`/api/activities/${id}`);
                const result = await response.json();
                if (result.success && result.data) {
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

    const handleCancelRegistration = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('username');

        if (!userName) {
            setNotification({ message: '请先登录', visible: true, type: 'error' }); // 更新通知状态
            return;
        }

        try {
            const response = await fetch(`/api/activities/${id}/register`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            });
            const result = await response.json();

            if (result.success) {
                setNotification({ message: '取消报名成功', visible: true, type: 'success' }); // 更新通知状态
                // 更新本地存储的余额
                const activityResponse = await fetch(`/api/activities/${id}`);
                const activityResult = await activityResponse.json();
                if (activityResult.success && activityResult.data) {
                    const price = parseFloat(activityResult.data.price);
                    const storedBalance = parseFloat(localStorage.getItem('balance'));
                    localStorage.setItem('balance', (storedBalance + price).toString());
                }
                setTimeout(() => {
                    window.history.back();
                }, 2000);
            } else {
                setNotification({ message: result.message, visible: true, type: 'error' }); // 更新通知状态
            }
        } catch (error) {
            console.error('取消报名失败:', error);
            setNotification({ message: '取消报名失败，请稍后重试', visible: true, type: 'error' }); // 更新通知状态
        }
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
            <BaseActivityDetail
                isOpen={true}
                onClose={() => window.history.back()} // 返回上一页
                id={id}
                signedUp={signedUp}
                total={total}
                buttonText="确认取消报名"
                onButtonClick={(e) => handleCancelRegistration(e, id)}
            />
        </div>
    );
};