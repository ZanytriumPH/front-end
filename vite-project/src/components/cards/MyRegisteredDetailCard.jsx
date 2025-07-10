// src/components/cards/MyRegisteredCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';

export const MyRegisteredCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const handleCancelRegistration = (e) => {
        e.preventDefault();
        // 可以在这里添加取消报名逻辑
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
            buttonText="取消报名"
            onButtonClick={handleCancelRegistration}
            cardType="registered"
        />
    );
};