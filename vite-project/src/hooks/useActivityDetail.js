// src/hooks/useActivityDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useActivityDetail = () => {
    const { id } = useParams();
    const [signedUp, setSignedUp] = useState(0);
    const [total, setTotal] = useState(0);
    const [notification, setNotification] = useState({ message: '', visible: false, type: 'success' });

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

    return { id, signedUp, total, notification, setNotification };
};