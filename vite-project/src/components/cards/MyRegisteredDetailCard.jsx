// src/components/cards/MyRegisteredDetailCard.jsx
import React from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';

const handleCancelRegistration = (e) => {
    e.preventDefault();
    // 可以在这里添加取消报名逻辑
};

export const MyRegisteredDetailCard = ({ isOpen, onClose, id, signedUp, total }) => {
    return (
        <BaseActivityDetail
            isOpen={isOpen}
            onClose={onClose}
            id={id}
            signedUp={signedUp}
            total={total}
            buttonText="确认取消报名"
            onButtonClick={handleCancelRegistration}
        />
    );
};