// src/components/sections/Discovery.jsx
import React, {useEffect, useState} from 'react';
import { Container } from '../shared/Container.jsx';
import { ActivityCard } from '../cards/ActivityCard.jsx';
import { BtnLink } from '../shared/BtnLink.jsx';
import { ActivityList } from '../elements/ActivityList.jsx'; // 引入 ActivityList 组件

export const Discovery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isActivityListOpen, setIsActivityListOpen] = useState(false); // 新增状态
    const [activities, setActivities] = useState([]); // 新新增状态，用于存储从数据库获取的活动数据

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch('/api/activities');
                const result = await response.json(); // 将变量名改为 result 以避免混淆
                if (result.success && Array.isArray(result.data)) {
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

    const handleMoreActivities = () => {
        setIsActivityListOpen(true); // 打开活动列表窗口
    };

    const handleCloseActivityList = () => {
        setIsActivityListOpen(false); // 关闭活动列表窗口
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
                        {searchResults.slice(0, 6).map((activity, index) => (
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
                <div className="text-center">
                    <BtnLink href="#" text="更多活动" onClick={handleMoreActivities} /> {/* 绑定点击事件 */}
                </div>
            </Container>
            {isActivityListOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
                    <div className="bg-box-bg p-12 rounded-lg border-2 relative w-11/12 max-w-11xl border-normal max-h-[90vh] overflow-y-auto">
                        <div className="absolute top-3 right-7 text-heading-2 cursor-pointer z-50">
                            <button
                                className={`cursor-pointer fixed `}
                                onClick={handleCloseActivityList}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <ActivityList activities={activities} />
                    </div>
                </div>
            )}
        </section>
    );
};