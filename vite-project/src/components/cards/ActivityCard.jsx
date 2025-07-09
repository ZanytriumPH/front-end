// src/components/cards/ActivityCard.jsx
import React, { useState } from 'react';
import { BtnLink } from '../shared/BtnLink.jsx';
import { ActivityDetailCard } from './ActivityDetailCard.jsx';

export const ActivityCard = ({ title, time, location, price = '¥0', id, image }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const displayPrice = price || '¥0';

    const handleSignUp = (e) => {
        e.preventDefault(); // 阻止默认行为
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };

    return (
        <>
            <div className="bg-box-bg p-6 rounded-xl border-gradient-to-r border-4 relative">
                {/* 添加图片显示 */}
                {image && <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />}
                <div className="absolute top-4 right-4 text-red-500 font-bold text-3xl bg-price p-1 rounded">
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
            {isDetailOpen && (
                <ActivityDetailCard isOpen={isDetailOpen} onClose={handleCloseDetail} id={id} />
            )}
        </>
    );
};