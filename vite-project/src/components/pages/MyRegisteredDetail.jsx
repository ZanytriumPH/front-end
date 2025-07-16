// src/components/pages/MyRegisteredDetail.jsx
import React, { useState, useEffect } from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import { useParams } from 'react-router-dom';

const handleCancelRegistration = async (e, id) => {
    e.preventDefault();
    const userName = localStorage.getItem('username');

    if (!userName) {
        console.error('请先登录');
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
            console.log('取消报名成功');
            // 更新本地存储的余额
            const activityResponse = await fetch(`/api/activities/${id}`);
            const activityResult = await activityResponse.json();
            if (activityResult.success && activityResult.data) {
                const price = parseFloat(activityResult.data.price);
                const storedBalance = parseFloat(localStorage.getItem('balance'));
                localStorage.setItem('balance', (storedBalance + price).toString());
            }
            window.history.back(); // 返回上一页
        } else {
            console.error('取消报名失败:', result.message);
        }
    } catch (error) {
        console.error('取消报名失败:', error);
    }
};

export const MyRegisteredDetail = () => {
    const { id } = useParams();
    const [signedUp, setSignedUp] = useState(0);
    const [total, setTotal] = useState(0);

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

    return (
        <BaseActivityDetail
            isOpen={true}
            onClose={() => window.history.back()} // 返回上一页
            id={id}
            signedUp={signedUp}
            total={total}
            buttonText="确认取消报名"
            onButtonClick={(e) => handleCancelRegistration(e, id)}
        />
    );
};