// src/components/sections/ActivityDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';

export const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [activity, setActivity] = useState(null);
    const [signedUp, setSignedUp] = useState(0);
    const [total, setTotal] = useState(0);
    const [username] = useState(localStorage.getItem('username') || '用户');

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
                alert('请先登录');
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
            if (result.success) {
                alert('报名成功');
                // 刷新页面或更新活动信息
                window.location.reload();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('报名失败:', error);
            alert('报名失败，请稍后重试');
        }
    };

    const handleClose = () => {
        navigate(-1); // 返回上一个路由
    };

    return (
        <div>
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