//todo 只显示图片、标题、地点和时间、报名所需金额，并有“去报名"按钮

// src/components/cards/ActivityCard.jsx
import React from 'react';
import { BtnLink } from '../shared/BtnLink.jsx';

export const ActivityCard = ({ title, time, location }) => {
    return (
        <div className="bg-box-bg p-6 rounded-lg border border-box-border">
            <h3 className="text-heading-2 text-xl font-bold mb-2">{title}</h3>
            <p className="text-heading-3 mb-4">
                <span className="font-medium">时间：</span>{time}
            </p>
            <p className="text-heading-3 mb-6">
                <span className="font-medium">地点：</span>{location}
            </p>
            <BtnLink href="#" text="去报名" />
        </div>
    );
};