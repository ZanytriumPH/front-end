// src/components/cards/MyPublishedCard.jsx
import { BaseActivityCard } from '../shared/BaseActivityCard.jsx';

export const MyPublishedCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const handleCancelActivity = (e) => {
        e.preventDefault();
        // 可以在这里添加取消活动逻辑
    };

    return (
        <BaseActivityCard
            title={title}
            time={time}
            location={location}
            price={price}
            id={id}
            image={image}
            signedUp={signedUp}
            total={total}
            buttonText="取消活动"
            onButtonClick={handleCancelActivity}
        />
    );
};