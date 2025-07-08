// todo 在Discovery点击“更多活动”跳转至这个页面，可以查看所有活动的ActivityCard
// 也具有和Discovery中一样的搜索功能

// src/components/elements/ActivityList.jsx
import React, { useState } from 'react';
import { Container } from '../shared/Container.jsx';
import { ActivityCard } from '../cards/ActivityCard.jsx';

// 模拟活动数据
const activities = [
    { title: '篮球比赛', time: '2024-10-01 14:00', location: '体育馆 1 号场地' },
    { title: '足球友谊赛', time: '2024-10-02 15:30', location: '足球场' },
    { title: '瑜伽课程', time: '2024-10-03 09:00', location: '健身中心' },
    { title: '羽毛球活动', time: '2024-10-04 16:00', location: '羽毛球馆' },
    { title: '乒乓球赛', time: '2024-10-05 18:00', location: '乒乓球室' },
    { title: '跑步活动', time: '2024-10-06 07:00', location: '公园' },
];

export const ActivityList = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(activities);

    const handleSearch = () => {
        const filteredResults = activities.filter(activity =>
            activity.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <section className="py-20">
            <Container>
                <div className="flex gap-4 mb-8">
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
                {searchResults.length === 0 ? (
                    <p className="text-heading-3 text-center">暂无数据</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {searchResults.map((activity, index) => (
                            <ActivityCard
                                key={index}
                                title={activity.title}
                                time={activity.time}
                                location={activity.location}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
};