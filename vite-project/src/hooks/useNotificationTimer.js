// src/hooks/useNotificationTimer.js
import { useEffect } from 'react';

export const useNotificationTimer = (notification, setNotification) => {
    useEffect(() => {
        if (notification.visible) {
            const timer = setTimeout(() => {
                setNotification(prev => ({ ...prev, visible: false }));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification.visible]);
};