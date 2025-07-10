// src/components/cards/ActivityCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';

export const ActivityCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const handleSignUp = (e) => {
        e.preventDefault();
        // 可以在这里添加报名逻辑
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