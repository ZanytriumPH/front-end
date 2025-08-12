// src/components/pages/MyLaunchDetail.jsx
import { BaseActivityDetail } from '../shared/BaseActivityDetail.jsx';
import { Notification } from '../shared/Notification.jsx';
import {useActivityDetail} from "../../hooks/useActivityDetail.js";
import {useNotificationTimer} from "../../hooks/useNotificationTimer.js";

export const MyLaunchDetail = () => {
    const { id, signedUp, total, notification, setNotification } = useActivityDetail();

    const handleCancelLaunch = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('username');

        if (!userName) {
            setNotification({ message: '请先登录', visible: true, type: 'error' });
            return;
        }

        try {
            // 不得不把这两句放在这里，在活动删除前获取数据
            const activityResponse = await fetch(`/api/activities/${id}`);
            const activityResult = await activityResponse.json();

            const response = await fetch(`/api/activities/${id}`, {
                method: 'DELETE', // 指定请求方法为DELETE
                headers: {
                    'Content-Type': 'application/json', // 声明请求体格式为JSON
                },
                body: JSON.stringify({ userName }), // 发送的请求数据（需转为JSON字符串）
            });
            const result = await response.json();

            if (result.success) {
                setNotification({ message: '活动删除成功', visible: true, type: 'success' });
                // 更新本地存储的余额
                if (activityResult.success && activityResult.data) {
                    const price = parseFloat(activityResult.data.price);
                    const signedUp = parseInt(activityResult.data.signedUp);
                    const storedBalance = parseFloat(localStorage.getItem('balance'));
                    localStorage.setItem('balance', (storedBalance - signedUp  * price).toString());
                }
                setTimeout(() => {
                    window.history.back();
                }, 2000);
            } else {
                setNotification({ message: result.message, visible: true, type: 'error' });
            }
        } catch (error) {
            console.error('删除活动失败:', error);
            setNotification({ message: '删除活动失败，请稍后重试', visible: true, type: 'error' });
        }
    };

    useNotificationTimer(notification, setNotification);

    return (
        <div>
            <Notification message={notification.message} visible={notification.visible} type={notification.type} />
            <BaseActivityDetail
                isOpen={true}
                onClose={() => window.history.back()} // 返回上一页
                id={id}
                signedUp={signedUp}
                total={total}
                buttonText="确认取消发布"
                onButtonClick={handleCancelLaunch}
            />
        </div>
    );
};