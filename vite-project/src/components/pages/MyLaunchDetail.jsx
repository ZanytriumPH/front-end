// src/components/pages/MyLaunchDetail.jsx
import React, { useEffect, useState } from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import { useParams } from "react-router-dom";
import { Notification } from '../shared/Notification.jsx';

export const MyLaunchDetail = () => {
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

    const handleCancelLaunch = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('username');

        if (!userName) {
            setNotification({ message: '请先登录', visible: true, type: 'error' });
            return;
        }

        try {
            const response = await fetch(`/api/activities/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            });
            const result = await response.json();

            if (result.success) {
                setNotification({ message: '活动删除成功', visible: true, type: 'success' });
                setTimeout(() => {
                    window.history.back();
                }, 2000);
            } else {
                setNotification({ message: result.message, visible: true, type: 'error' });
            }
        } catch (error) {
            console.error('删除活动失败:', error);
            setNotification({ message: '删除活动失败，请稍后重试', visible: true, type: 'error' });
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
            <Notification message={notification.message} visible={notification.visible} type={notification.type} />
            <BaseActivityDetail
                isOpen={true}
                onClose={() => window.history.back()} // 返回上一页
                id={id}
                signedUp={signedUp}
                total={total}
                buttonText="确认取消发布"
                onButtonClick={handleCancelLaunch}
            />
        </div>
    );
};