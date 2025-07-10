// src/components/cards/MyPublishedCard.jsx
import { BaseActivity } from '../shared/BaseActivity.jsx';
import { MyPublishedDetailCard } from './MyPublishedDetailCard.jsx';
import React, { useState } from 'react';

export const MyPublishedCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleCancelActivity = (e) => {
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
                buttonText="取消活动"
                onButtonClick={handleCancelActivity}
            />
            {isDetailOpen && (
                <MyPublishedDetailCard
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