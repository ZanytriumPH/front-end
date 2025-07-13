// src/components/shared/BaseActivityDetail.jsx
import React, {useEffect, useState} from 'react';
import { BtnLink } from './BtnLink.jsx';
// import { activities } from '../sections/Discovery.jsx'; // 导入活动数据

// 模拟他人评论数据
const initialComments = [
    { id: 1, user: '张三', content: '这个活动看起来很有趣！' },
    { id: 2, user: '李四', content: '期待参加！' },
];

export const BaseActivityDetail = ({ isOpen, onClose, id, signedUp, total, buttonText, onButtonClick }) => {
    if (!isOpen) return null;

    const [activity, setActivity] = useState(null);
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchActivityDetail = async () => {
            try {
                const response = await fetch(`/api/activities/${id}`);
                const result = await response.json(); // 将变量名改为 result 以避免混淆
                if (result.success && result.data) {
                    setActivity(result.data);
                } else {
                    console.error('获取活动详情失败:', result.message || '未知错误');
                }
            } catch (error) {
                console.error('获取活动详情失败:', error);
            }
        };

        if (id) {
            fetchActivityDetail();
        }
    }, [id]);


    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const newId = comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
            setComments([...comments, { id: newId, user: '用户', content: newComment }]);
            setNewComment('');
        }
    };

    const handleCommentDelete = (id) => {
        const updatedComments = comments.filter(comment => comment.id!== id);
        setComments(updatedComments);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className="bg-box-bg p-12 rounded-lg border-4 relative w-11/12 max-w-3xl border-gradient-to-r from-blue-600 to-violet-600 max-h-[80vh] overflow-y-auto">
                <div className="absolute top-3 right-7 text-heading-2 cursor-pointer z-50">
                    <button
                        className={`cursor-pointer fixed `}
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <img
                    src={activity?.image || 'default-image.jpg'}
                    alt="Activity"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-heading-1 text-3xl font-bold mb-4">{activity?.title || '活动标题'}</h2>
                <p className="text-heading-3 mb-4">
                    <span className="font-medium">时间：</span>{activity?.time || '2024-10-01 14:00'}
                </p>
                <p className="text-heading-3 mb-4">
                    <span className="font-medium">地点：</span>{activity?.location || '体育馆 1 号场地'}
                </p>
                <p className="text-heading-3 mb-4">
                    <span className="font-medium">价格：</span>{activity?.price || '免费'}
                </p>
                <p className="text-heading-3 mb-6">
                    <span className="font-medium">报名情况：</span>{signedUp || 0}/{total || 0}
                </p>
                <p className="text-heading-3 mb-8">
                    {/*详细描述：这是一个非常精彩的体育活动，欢迎大家踊跃参加！*/}
                    <span className="font-medium">详细描述：</span>{activity?.description || '这个活动目前还没有描述~'}
                </p>
                <h3 className="text-heading-2 text-xl font-bold mb-4">评论区</h3>
                {comments.map(comment => (
                    <div
                        key={comment.id}
                        className="bg-body p-4 rounded-lg border border-box-border mb-4 relative"
                    >
                        <p className="text-heading-3">
                            <span className="font-medium">{comment.user}：</span>{comment.content}
                        </p>
                        {comment.user === '用户' && (
                            <button
                                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md cursor-pointer"
                                onClick={() => handleCommentDelete(comment.id)}
                            >
                                删除
                            </button>
                        )}
                    </div>
                ))}
                <form onSubmit={handleCommentSubmit} className="mb-8 flex gap-4">
                    <input
                        type="text"
                        placeholder="发表评论"
                        className="flex-1 p-3 border border-box-border rounded-md bg-body text-heading-3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-full bg-violet-600 text-white hover:scale-102 cursor-pointer"
                    >
                        提交评论
                    </button>
                </form>
                <div className="text-center">
                    <BtnLink href="#" text={buttonText} onClick={onButtonClick} />
                </div>
            </div>
        </div>
    );
};