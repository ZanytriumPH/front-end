// src/components/pages/ActivityDetail.jsx
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import { Notification } from '../shared/Notification.jsx';
import {useActivityDetail} from "../../hooks/useActivityDetail.js";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.js";

export const ActivityDetail = () => {
    const { id, signedUp, total, notification, setNotification } = useActivityDetail();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('username'); // 从 localStorage 获取 userName

        if (!userName) {
            setNotification({ message: '请先登录', visible: true, type: 'error' }); // 更新通知状态
            return;
        }

        try {
            const response = await fetch(`/api/activities/${id}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName }),
            });
            const result = await response.json();
            console.log('服务器返回的数据:', result); // 打印服务器返回的数据
            if (result.success) {
                setNotification({ message: '报名成功', visible: true, type: 'success' }); // 更新通知状态
                // 更新本地存储的余额
                const activityResponse = await fetch(`/api/activities/${id}`);
                const activityResult = await activityResponse.json();
                if (activityResult.success && activityResult.data) {
                    const price = parseFloat(activityResult.data.price);
                    const storedBalance = parseFloat(localStorage.getItem('balance'));
                    localStorage.setItem('balance', (storedBalance - price).toString());
                }
            } else {
                setNotification({ message: result.message, visible: true, type: 'error' }); // 更新通知状态
            }
        } catch (error) {
            console.error('报名失败:', error);
            setNotification({ message: '报名失败，请稍后重试', visible: true, type: 'error' }); // 更新通知状态
        }
    };

    useNotificationTimer(notification, setNotification);

    return (
        <div>
            <Notification message={notification.message} visible={notification.visible} type={notification.type} /> {/* 渲染 Notification 组件 */}
            <BaseActivityDetail
                isOpen={true}
                onClose={() => window.history.back()}
                id={id} // 最重要者
                signedUp={signedUp}
                total={total}
                buttonText="确认活动报名"
                onButtonClick={handleSignUp}
            />
        </div>
    );
};