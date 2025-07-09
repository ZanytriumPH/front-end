// src/components/elements/MyRegistered.jsx
import { ActivityCard } from '../cards/ActivityCard.jsx';
import { activities } from '../sections/Discovery.jsx';

// 假设这里是已报名的活动数据，这里简单使用所有活动数据模拟
const registeredActivities = activities;

export const MyRegistered = () => {
    return (
        <div>
            <h2 className="text-heading-1 text-3xl font-bold mb-8">我的报名</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                {registeredActivities.map((activity, index) => (
                    <ActivityCard
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