// src/components/cards/ActivityCard.jsx
import React from 'react';
import { BtnLink } from '../shared/BtnLink.jsx';
import { useNavigate } from 'react-router-dom';

export const ActivityCard = ({ title, time, location, price = '¥0', id }) => {
    const navigate = useNavigate();
    const displayPrice = price || '¥0';

    const handleSignUp = (e) => {
        e.preventDefault(); // 阻止默认行为
        navigate(`/activity/${id}`);
    };

    return (
        <div className="bg-box-bg p-6 rounded-lg border border-box-border relative">
            <div className="absolute top-4 right-4 text-red-500 font-bold text-lg">
                {displayPrice}
            </div>
            <h3 className="text-heading-2 text-xl font-bold mb-2">{title}</h3>
            <p className="text-heading-3 mb-4">
                <span className="font-medium">时间：</span>{time}
            </p>
            <p className="text-heading-3 mb-6">
                <span className="font-medium">地点：</span>{location}
            </p>
            <BtnLink href="#" text="去报名" onClick={handleSignUp} />
        </div>
    );
};