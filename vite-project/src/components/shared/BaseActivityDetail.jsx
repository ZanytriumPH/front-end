// src/components/shared/BaseActivityDetail.jsx
import React, { useEffect, useState } from 'react';
import { BtnLink } from './BtnLink.jsx';
import { formatDate } from '../../utils/dateUtils.js';
import { CommentItem } from './CommentItem.jsx';
import { CommentForm } from './CommentForm.jsx';

export const BaseActivityDetail = ({ isOpen, onClose, id, signedUp, total, buttonText, onButtonClick }) => {
    if (!isOpen) return null;

    const [activity, setActivity] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [username, setUsername] = useState(localStorage.getItem('username') || '用户');

    useEffect(() => {
        const fetchActivityDetail = async () => {
            try {
                const response = await fetch(`/api/activities/${id}`);
                const result = await response.json();
                if (result.success && result.data) {
                    setActivity(result.data);

                    const formattedComments = (result.data.comments || []).map(comment => ({
                        ...comment,
                        createdAt: formatDate(comment.createdAt)
                    }));

                    setComments(formattedComments);
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            try {
                const currentDate = new Date();
                const formattedDate = formatDate(currentDate);
                const response = await fetch(`/api/activities/${id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, content: newComment, createdAt: formattedDate }),
                });
                const result = await response.json();
                if (result.success) {
                    const newCommentWithFormattedDate = {
                        ...result.data,
                        createdAt: formattedDate
                    };
                    setComments([...comments, newCommentWithFormattedDate]);
                    setNewComment('');
                } else {
                    console.error('添加评论失败:', result.message);
                }
            } catch (error) {
                console.error('添加评论失败:', error);
            }
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            console.log('删除评论的 ID:', commentId); // 添加日志
            const response = await fetch(`/api/activities/${id}/comments/${commentId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                const updatedComments = comments.filter(comment => comment.id!== commentId);
                setComments(updatedComments);
            } else {
                console.error('删除评论失败:', result.message);
            }
        } catch (error) {
            console.error('删除评论失败:', error);
        }
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
                <h2 className="text-heading-1 text-3xl font-bold mb-4">{activity?.title || 'null'}</h2>
                <p className="text-heading-3 mb-4">
                    <span className="font-medium">时间：</span>{activity?.time || 'null'}
                </p>
                <p className="text-heading-3 mb-4">
                    <span className="font-medium">地点：</span>{activity?.location || 'null'}
                </p>
                <p className="text-heading-3 mb-4">
                    <span className="font-medium">价格：</span>{activity?.price || 'null'}
                </p>
                <p className="text-heading-3 mb-6">
                    <span className="font-medium">报名情况：</span>{signedUp || 0}/{total || 0}
                </p>
                <p className="text-heading-3 mb-8">
                    <span className="font-medium">详细描述：</span>{activity?.description || '这个活动目前还没有描述~'}
                </p>
                <h3 className="text-heading-2 text-xl font-bold mb-4">评论区</h3>
                {comments.map(comment => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        username={username}
                        onDelete={handleCommentDelete}
                    />
                ))}
                <CommentForm
                    newComment={newComment}
                    setNewComment={setNewComment}
                    onSubmit={handleCommentSubmit}
                />
                <div className="text-center">
                    <BtnLink href="#" text={buttonText} onClick={onButtonClick} />
                </div>
            </div>
        </div>
    );
};