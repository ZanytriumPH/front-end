// src/components/shared/Notification.jsx
import React from 'react';

export const Notification = ({ message, visible, type }) => {
    return (
        <div className={`notification ${type} ${visible ? 'visible' : ''}`}>
            {message}
        </div>
    );
};