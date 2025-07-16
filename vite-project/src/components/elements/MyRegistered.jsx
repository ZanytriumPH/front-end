// src/components/elements/MyRegistered.jsx
import { MyRegisteredCard } from '../cards/MyRegisteredCard.jsx';
import React, { useEffect, useState } from 'react';

export const MyRegistered = () => {
    const [registeredActivities, setRegisteredActivities] = useState([]);

    useEffect(() => {
        const fetchRegisteredActivities = async () => {
            const username = localStorage.getItem('username');
            if (username) {
                try {
                    const response = await fetch(`/api/users/${username}/registeredActivities`);
                    const result = await response.json();
                    if (result.success && Array.isArray(result.data)) {
                        setRegisteredActivities(result.data);
                    } else {
                        console.error('获取用户报名活动列表失败:', result.message || '未知错误');
                        setRegisteredActivities([]);
                    }
                } catch (error) {
                    console.error('获取用户报名活动列表失败:', error);
                    setRegisteredActivities([]);
                }
            }
        };

        fetchRegisteredActivities();
    }, []);

    return (
        <div>
            <h2 className="text-heading-1 text-3xl font-bold mb-8">我的报名</h2>
            {registeredActivities.length === 0 ? (
                <p className="text-heading-3 text-center">暂无数据</p>
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {registeredActivities.map((activity, index) => (
                        <MyRegisteredCard
                            key={index}
                            id={activity.id}
                            title={activity.title}
                            time={activity.time}
                            location={activity.location}
                            price={activity.price}
                            image={activity.image}
                            signedUp={activity.signedUp}
                            total={activity.total}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};