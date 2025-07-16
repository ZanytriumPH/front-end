// src/components/sections/MyRegisteredDetail.jsx
import React, { useState, useEffect } from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import { useParams } from 'react-router-dom';

const handleCancelRegistration = (e) => {
    e.preventDefault();
    // 可以在这里添加取消报名逻辑
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
            onButtonClick={handleCancelRegistration}
        />
    );
};