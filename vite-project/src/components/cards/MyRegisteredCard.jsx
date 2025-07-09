// src/components/cards/MyRegisteredCard.jsx
import React, { useState } from 'react';
import { BtnLink } from '../shared/BtnLink.jsx';
import { ActivityDetailCard } from './ActivityDetailCard.jsx';

export const MyRegisteredCard = ({ title, time, location, price = '¥0', id, image, signedUp = 0, total = 0 }) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleViewDetails = (e) => {
        e.preventDefault();
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
                <h3 className="text-heading-2 text-xl font-bold mb-2">{title}</h3>
                <p className="text-heading-3 mb-2">
                    <span className="font-medium">时间：</span>{time}
                </p>
                <p className="text-heading-3 mb-2">
                    <span className="font-medium">地点：</span>{location}
                </p>
                <div className="flex justify-between items-center text-heading-3">
                    <p>
                        <span className="font-medium">报名情况：</span>{signedUp}/{total}
                    </p>
                    <BtnLink href="#" text="取消报名" onClick={handleViewDetails} />
                </div>
            </div>
            {isDetailOpen && (
                <ActivityDetailCard
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