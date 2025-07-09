// src/components/elements/MyPublished.jsx
import { MyPublishedCard } from '../cards/MyPublishedCard.jsx';

// 假设这里是已发布的活动数据，这里简单使用所有活动数据模拟
const publishedActivities = [{
    id: 1,
    title: '篮球比赛',
    time: '2024-10-01 14:00',
    location: '体育馆 1 号场地',
    price: '¥50',
    image: '../../public/vite.svg', // 替换为实际的图片 URL
    total: 20, // 可根据实际情况修改活动总人数
    signedUp: 12
}]

export const MyPublished = () => {
    return (
        <div>
            <h2 className="text-heading-1 text-3xl font-bold mb-8">我的发布</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {publishedActivities.map((activity, index) => (
                    <MyPublishedCard
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
        </div>
    );
};