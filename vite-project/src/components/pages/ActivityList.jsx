// src/components/sections/ActivityList.jsx
import React, {useEffect, useState} from 'react';
import { Container } from '../shared/Container.jsx';
import {ActivityCard} from "../cards/ActivityCard.jsx";

export const ActivityList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [activities, setActivities] = useState([]); // 新新增状态，用于存储从数据库获取的活动数据

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/api/activities');
                const result = await response.json(); // 将变量名改为 result 以避免混淆
                if (result.success && Array.isArray(result.data)) {
                    // console.log('获取的数据:', result.data);
                    setActivities(result.data);
                    setSearchResults(result.data);
                } else {
                    console.error('获取的数据不是预期格式:', result);
                    setActivities([]);
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('获取活动数据失败:', error);
                setActivities([]);
                setSearchResults([]);
            }
        };

        fetchActivities();
    }, []);

    const handleSearch = () => {
        const filteredResults = activities.filter(activity =>
            activity.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <section id="discovery" className="py-20">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl font-bold">探索精彩活动</h2>
                    <div className="flex gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            placeholder="搜索活动"
                            className="flex-1 p-3 border border-box-border rounded-md bg-body text-heading-3"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="px-6 py-3 rounded-full bg-violet-600 text-white hover:scale-102 cursor-pointer"
                            onClick={handleSearch}
                        >
                            搜索
                        </button>
                    </div>
                </div>

                {Array.isArray(searchResults) && searchResults.length === 0 ? (
                    <p className="text-heading-3 text-center">暂无数据</p>
                ) : (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                        {searchResults.map((activity, index) => (
                            <ActivityCard
                                key={index}
                                id={activity.id}
                                title={activity.title}
                                time={activity.time}
                                location={activity.location}
                                price={activity.price}
                                image={activity.image} // 传递图片 URL
                                signedUp={activity.signedUp}
                                total={activity.total} // 传递活动总人数
                            />
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
};