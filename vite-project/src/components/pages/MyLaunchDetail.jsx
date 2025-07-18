
import React, {useState} from 'react';
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import {useParams} from "react-router-dom";


export const MyLaunchDetail = () => {
    const { id } = useParams();
    const [total, setTotal] = useState(0);
    const [notification, setNotification] = useState({ message: '', visible: false, type: 'success' }); // 添加通知状态

    const handleCancelActivity = (e) => {
        e.preventDefault();
        // 可以在这里添加取消活动逻辑
    };

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