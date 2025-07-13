// src/components/elements/ActivityList.jsx
import React, { useState } from 'react';
import { ActivityCard } from '../cards/ActivityCard.jsx';
// import { activities } from '../sections/Discovery.jsx'; // 导入活动数据

export const ActivityList = ({ activities = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(activities);

    const handleSearch = () => {
        const filteredResults = activities.filter(activity =>
            activity.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    return (
        <section className="py-24">
            <div className="mx-auto max-w-screen-2xl w-full px-5 sm:px-8 md:px-14 lg:px-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-heading-1 text-3xl font-bold">全部活动</h2>
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
                    <div className="grid grid-cols-4 gap-6">
                        {searchResults.map((activity, index) => (
                            <ActivityCard
                                key={index}
                                id={activity.id}
                                title={activity.title}
                                time={activity.time}
                                location={activity.location}
                                price={activity.price}
                                image={activity.image}
                                signedUp={activity.signedUp}
                                total={activity.total} // 传递活动总人数
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};