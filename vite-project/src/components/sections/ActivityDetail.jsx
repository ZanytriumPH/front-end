// src/components/sections/ActivityDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';

export const ActivityDetail = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [signedUp, setSignedUp] = useState(0);
    const [total, setTotal] = useState(0);

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

    const handleSignUp = (e) => {
        e.preventDefault();
        // 可以在这里添加报名逻辑
    };

    return (
        <div>
            {activity && (
                <BaseActivityDetail
                    isOpen={true}
                    onClose={() => {}}
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