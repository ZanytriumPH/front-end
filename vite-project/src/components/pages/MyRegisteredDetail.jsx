// src/components/pages/MyRegisteredDetail.jsx
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import { Notification } from '../shared/Notification.jsx';
import {useActivityDetail} from "../../hooks/useActivityDetail.js";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.js";

export const MyRegisteredDetail = () => {
    const { id, signedUp, total, notification, setNotification } = useActivityDetail();

    const handleCancelRegistration = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('username');

        if (!userName) {
            setNotification({ message: '请先登录', visible: true, type: 'error' }); // 更新通知状态
            return;
        }

        try {
            const response = await fetch(`/api/activities/${id}/register`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            });
            const result = await response.json();

            if (result.success) {
                setNotification({ message: '取消报名成功', visible: true, type: 'success' }); // 更新通知状态
                // 更新本地存储的余额
                const activityResponse = await fetch(`/api/activities/${id}`);
                const activityResult = await activityResponse.json();
                if (activityResult.success && activityResult.data) {
                    const price = parseFloat(activityResult.data.price);
                    const storedBalance = parseFloat(localStorage.getItem('balance'));
                    localStorage.setItem('balance', (storedBalance + price).toString());
                }
                setTimeout(() => {
                    window.history.back();
                }, 2000);
            } else {
                setNotification({ message: result.message, visible: true, type: 'error' }); // 更新通知状态
            }
        } catch (error) {
            console.error('取消报名失败:', error);
            setNotification({ message: '取消报名失败，请稍后重试', visible: true, type: 'error' }); // 更新通知状态
        }
    };

    useNotificationTimer(notification, setNotification);

    return (
        <div>
            <Notification message={notification.message} visible={notification.visible} type={notification.type} /> {/* 渲染 Notification 组件 */}
            <BaseActivityDetail
                isOpen={true}
                onClose={() => window.history.back()} // 返回上一页
                id={id}
                signedUp={signedUp}
                total={total}
                buttonText="确认取消报名"
                onButtonClick={(e) => handleCancelRegistration(e, id)}
            />
        </div>
    );
};