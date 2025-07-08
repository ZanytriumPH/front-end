// src/components/sections/Discovery.jsx
import React, { useState } from 'react';
import { Container } from '../shared/Container.jsx';
import { ActivityCard } from '../cards/ActivityCard.jsx';
import { BtnLink } from '../shared/BtnLink.jsx';

// 定义活动数据（移至组件外部确保全局可用）
export const activities = [
    { id: 1, title: '篮球比赛', time: '2024-10-01 14:00', location: '体育馆 1 号场地', price: '¥50' },
    { id: 2, title: '足球友谊赛', time: '2024-10-02 15:30', location: '足球场', price: '¥60' },
    { id: 3, title: '瑜伽课程', time: '2024-10-03 09:00', location: '健身中心', price: '¥80' },
    { id: 4, title: '羽毛球活动', time: '2024-10-04 16:00', location: '羽毛球馆', price: '¥40' },
    { id: 5, title: '乒乓球赛', time: '2024-10-05 18:00', location: '乒乓球室', price: '¥30' },
    { id: 6, title: '跑步活动', time: '2024-10-06 07:00', location: '公园', price: '免费' },
];

export const Discovery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(activities);

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
                    <h2 className="text-heading-1 text-3xl font-bold">探索精彩活动</h2>
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

                {searchResults.length === 0 ? (
                    <p className="text-heading-3 text-center">暂无数据</p>
                ) : (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 mb-8">
                        {searchResults.slice(0, 6).map((activity, index) => (
                            <ActivityCard
                                key={index}
                                id={activity.id}
                                title={activity.title}
                                time={activity.time}
                                location={activity.location}
                                price={activity.price} // 确保传递price属性
                            />
                        ))}
                    </div>
                )}
                <div className="text-center">
                    <BtnLink href="/activity-list" text="更多活动" />
                </div>
            </Container>
        </section>
    );
};