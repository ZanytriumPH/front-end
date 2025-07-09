// src/components/cards/ActivityDetailCard.jsx
import React, { useState } from 'react';
import { Container } from '../shared/Container.jsx';
import { BtnLink } from '../shared/BtnLink.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { activities } from '../sections/Discovery.jsx'; // 导入活动数据

// 模拟他人评论数据
const initialComments = [
    { id: 1, user: '张三', content: '这个活动看起来很有趣！' },
    { id: 2, user: '李四', content: '期待参加！' },
];

export const ActivityDetailCard = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // 获取路由参数中的活动 ID
    const activity = activities.find(act => act.id === parseInt(id)); // 找到对应的活动信息
    const [comments, setComments] = useState(initialComments);
    const [newComment, setNewComment] = useState('');

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

    const handleClose = () => {
        navigate(-1); // 返回上一页
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
            <div className="bg-box-bg p-12 rounded-lg border-4 relative w-11/12 max-w-3xl border-gradient-to-r from-blue-600 to-violet-600 max-h-[80vh] overflow-y-auto">
                <div className="absolute top-4 right-4 text-heading-2 cursor-pointer z-50">
                    <button onClick={handleClose}>
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
                    src="activity-image.jpg"
                    alt="Activity"
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h2 className="text-heading-1 text-3xl font-bold mb-4">{activity?.title || '活动标题'}</h2>
                <p className="text-heading-3 mb-4">
                    <span className="font-medium">时间：</span>{activity?.time || '2024-10-01 14:00'}
                </p>
                <p className="text-heading-3 mb-6">
                    <span className="font-medium">地点：</span>{activity?.location || '体育馆 1 号场地'}
                </p>
                <p className="text-heading-3 mb-6">
                    <span className="font-medium">价格：</span>{activity?.price || '免费'}
                </p>
                <p className="text-heading-3 mb-8">
                    详细描述：这是一个非常精彩的体育活动，欢迎大家踊跃参加！
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
                                className="absolute top-2 right-2 text-red-500"
                                onClick={() => handleCommentDelete(comment.id)}
                            >
                                删除
                            </button>
                        )}
                    </div>
                ))}
                <form onSubmit={handleCommentSubmit} className="mb-8">
                    <input
                        type="text"
                        placeholder="发表评论"
                        className="block w-full p-3 mb-4 border border-box-border rounded-md bg-body text-heading-3"
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
                <BtnLink href="#" text="活动报名" />
            </div>
        </div>
    );
};