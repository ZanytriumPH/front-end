// src/components/cards/MyRegisteredCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';
import { useActivityCard } from "../../hooks/useActivityCard";

export const MyRegisteredCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const { getImageUrl, handleButtonClick } = useActivityCard(id, '/MyRegisteredDetail');
    const imageUrl = getImageUrl(image);

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
            onButtonClick={handleButtonClick}
        />
    );
};