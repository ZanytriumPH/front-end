
import React from 'react';
import { BtnLink } from './BtnLink.jsx';

export const BaseActivity = ({
                                 title,
                                 time,
                                 location,
                                 price = '¥0',
                                 id,
                                 image,
                                 signedUp = 0,
                                 total = 0,
                                 buttonText,
                                 onButtonClick
                             }) => {

    const handleViewDetails = (e) => {
        e.preventDefault();
        if (onButtonClick) {
            onButtonClick(e);
        }
    };

    return (
        // 渐变边框实则为p-1的容器
        <div className={'bg-gradient-to-r from-blue-600 to-violet-600 p-1 rounded-3xl'}>
            <div className="bg-box-bg p-6 relative rounded-3xl">
                {/* 添加图片显示 */}
                {image ? (
                    <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
                ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500">加载中...</span>
                    </div>
                )}
                <div className="absolute top-4 right-4 text-red-500 font-bold text-3xl bg-price p-1 rounded">
                    <span className="text-2xl align-top">¥</span>{price}
                </div>
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
                    <BtnLink href="#" text={buttonText} onClick={handleViewDetails} />
                </div>
            </div>
        </div>
    );
};