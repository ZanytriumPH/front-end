// src/components/cards/ActivityCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';
import { useNavigate } from 'react-router-dom';

export const ActivityCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate(`/ActivityDetail/${id}`); // 导航到活动详情页
    };

    return (
        <BaseActivity
            title={title}
            time={time}
            location={location}
            price={price}
            id={id}
            image={image}
            signedUp={signedUp}
            total={total}
            buttonText="去报名"
            onButtonClick={handleSignUp}
        />
    );
};