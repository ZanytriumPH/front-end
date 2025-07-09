// src/components/elements/MyRegistered.jsx
import { MyRegisteredCard } from '../cards/MyRegisteredCard.jsx';

// 假设这里是已报名的活动数据，这里简单使用所有活动数据模拟
const registeredActivities = [{
        id: 2,
        title: '足球友谊赛',
        time: '2024-10-02 15:30',
        location: '足球场',
        price: '¥60',
        image: '../../src/assets/HeroImg.png', // 替换为实际的图片 URL
        total: 25, // 可根据实际情况修改活动总人数
        signedUp: 8
}]

export const MyRegistered = () => {
    return (
        <div>
            <h2 className="text-heading-1 text-3xl font-bold mb-8">我的报名</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
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
        </div>
    );
};