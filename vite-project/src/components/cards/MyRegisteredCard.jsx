// src/components/cards/MyRegisteredCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';
import { MyRegisteredDetailCard } from './MyRegisteredDetailCard.jsx';
import React, { useState } from 'react';

export const MyRegisteredCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleCancelRegistration = (e) => {
        e.preventDefault();
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };

    return (
        <>
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
            />
            {isDetailOpen && (
                <MyRegisteredDetailCard
                    isOpen={isDetailOpen}
                    onClose={handleCloseDetail}
                    id={id}
                    signedUp={signedUp}
                    total={total}
                />
            )}
        </>
    );
};