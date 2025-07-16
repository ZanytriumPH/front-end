// src/components/elements/MyPublished.jsx
import { MyPublishedCard } from '../cards/MyPublishedCard.jsx';
import {BtnLink} from "../shared/BtnLink.jsx";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate(); // 使用 useNavigate

    const handleCreateActivity = () => {
        navigate('/CreateActivity'); // 路由切换至 CreateActivity 页
    };

    return (
        <div>
            <h2 className="text-heading-1 text-3xl font-bold mb-8">我的发布</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
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
            <div className="flex justify-center mt-8">
                <BtnLink text="发布新活动" onClick={handleCreateActivity} />
            </div>
        </div>
    );
};