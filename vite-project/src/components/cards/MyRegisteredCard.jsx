// src/components/cards/MyRegisteredCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';
import { useNavigate } from 'react-router-dom';

export const MyRegisteredCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const navigate = useNavigate();

    // 直接构建图片URL
    const imageUrl = image
        ? `http://127.0.0.1:7001/api/activities/images/${image}`
        : '';

    const handleCancelRegistration = (e) => {
        e.preventDefault();
        navigate(`/MyRegisteredDetail/${id}`); // 导航到报名的活动详情页
    };

    return (
        <BaseActivity
            title={title}
            time={time}
            location={location}
            price={price}
            id={id}
            image={imageUrl}
            signedUp={signedUp}
            total={total}
            buttonText="取消报名"
            onButtonClick={handleCancelRegistration}
        />
    );
};