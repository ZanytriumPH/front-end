// src/components/cards/ActivityDetailCard.jsx
import React from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';

const handleSignUp = (e) => {
    e.preventDefault();
    // 可以在这里添加报名逻辑
};

export const ActivityDetailCard = ({ isOpen, onClose, id, signedUp, total }) => {
    return (
        <BaseActivityDetail
            isOpen={isOpen}
            onClose={onClose}
            id={id}
            signedUp={signedUp}
            total={total}
            buttonText="确认活动报名"
            onButtonClick={handleSignUp}
        />
    );
};