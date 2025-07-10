// src/components/cards/MyPublishedDetailCard.jsx
import React from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';

const handleCancelActivity = (e) => {
    e.preventDefault();
    // 可以在这里添加取消活动逻辑
};

export const MyPublishedDetailCard = ({ isOpen, onClose, id, signedUp, total }) => {
    return (
        <BaseActivityDetail
            isOpen={isOpen}
            onClose={onClose}
            id={id}
            signedUp={signedUp}
            total={total}
            buttonText="确认取消活动"
            onButtonClick={handleCancelActivity}
        />
    );
};