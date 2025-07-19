// src/components/cards/MyLaunchCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';
import { useActivityCard } from "../../hooks/useActivityCard";

export const MyLaunchCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const { getImageUrl, handleButtonClick } = useActivityCard(id, '/MyLaunchDetail');
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
            buttonText="取消发布"
            onButtonClick={handleButtonClick}
        />
    );
};