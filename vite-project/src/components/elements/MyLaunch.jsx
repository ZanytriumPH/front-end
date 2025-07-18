// src/components/elements/MyLaunch.jsx
import { MyLaunchCard } from '../cards/MyLaunchCard.jsx';
import {BtnLink} from "../shared/BtnLink.jsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

export const MyLaunch = () => {
    const [launchedActivities, setLaunchActivities] = useState([]);

    const navigate = useNavigate(); // 使用 useNavigate

    const handleCreateActivity = () => {
        navigate('/CreateActivity'); // 路由切换至 CreateActivity 页
    };

    useEffect(() => {
        const fetchLaunchActivities = async () => {
            const username = localStorage.getItem('username');
            if (username) {
                try {
                    const response = await fetch(`/api/users/${username}/launchedActivities`);
                    const result = await response.json();
                    if (result.success && Array.isArray(result.data)) {
                        setLaunchActivities(result.data);
                    } else {
                        console.error('获取用户发布活动列表失败:', result.message || '未知错误');
                        setLaunchActivities([]);
                    }
                } catch (error) {
                    console.error('获取用户发布活动列表失败:', error);
                    setLaunchActivities([]);
                }
            }
        };

        fetchLaunchActivities();
    }, []);

    return (
        <div>
            <h2 className="text-heading-1 text-3xl font-bold mb-8">我的发布</h2>
            {launchedActivities.length === 0 ? (
                <p className="text-heading-3 text-center">暂无数据</p>
            ) : (
                <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {launchedActivities.map((activity, index) => (
                        <MyLaunchCard
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
            <div className="flex justify-center mt-8">
                <BtnLink text="发布新活动" onClick={handleCreateActivity} />
            </div>
        </div>
    );
};