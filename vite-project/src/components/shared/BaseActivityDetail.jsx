// src/components/shared/BaseActivityDetail.jsx
import React, { useEffect, useState } from 'react';
import { useThemeStore } from '../../store/ThemeStore.jsx';
import { formatDate } from '../../utils/dateUtils';
import {CommentForm} from "./CommentForm.jsx";
import {CommentItem} from "./CommentItem.jsx";

export const BaseActivityDetail = ({ isOpen, onClose, id, signedUp, total, buttonText, onButtonClick }) => {
    if (!isOpen) return null;

    const { theme } = useThemeStore(); // 获取主题状态
    const [activity, setActivity] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [username] = useState(localStorage.getItem('username') || '用户');

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

    // 根据主题状态设置背景色
    const backgroundColorClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <div className={`${backgroundColorClass} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}>
                {/* 顶部标题栏 */}
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <h2 className="text-2xl font-bold truncate">{activity?.title || '活动详情'}</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* 内容区域 */}
                <div className="overflow-y-auto flex-grow p-6 space-y-6">
                    {/* 活动图片 */}
                    <div className="rounded-xl overflow-hidden shadow-md">
                        <img
                            src={activity?.image || 'default-image.jpg'}
                            alt="Activity"
                            className="w-full h-72 object-cover"
                        />
                    </div>

                    {/* 活动信息网格 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">时间</p>
                                <p className="font-medium">{activity?.time || '未设置'}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">地点</p>
                                <p className="font-medium">{activity?.location || '未设置'}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">价格</p>
                                <p className="font-medium">{activity?.price || '免费'}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-gray-100 p-3 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">报名情况</p>
                                <p className="font-medium">
                                    <span className="text-indigo-600">{signedUp || 0}</span> / {total || 0} 人
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 活动描述 */}
                    <div className="pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-heading-3 mb-3">活动详情</h3>
                        <p className="text-heading-3 leading-relaxed whitespace-pre-line">
                            {activity?.description || '这个活动目前还没有描述~'}
                        </p>
                    </div>

                    {/* 评论区 */}
                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-heading-3">评论区</h3>
                            <span className="text-sm text-gray-500">{comments.length} 条评论</span>
                        </div>

                        <div className="space-y-5">
                            {comments.length > 0 ? (
                                comments.map(comment => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                        username={username}
                                        onDelete={handleCommentDelete}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <p className="mt-2">暂无评论，成为第一个评论者吧</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 评论表单 */}
                    <div className="pt-4">
                        <CommentForm
                            newComment={newComment}
                            setNewComment={setNewComment}
                            onSubmit={handleCommentSubmit}
                        />
                    </div>
                </div>

                {/* 底部按钮 */}
                <div className="p-5 bg-box-bg border-t border-gray-200">
                    <div className="flex justify-center">
                        <button
                            onClick={onButtonClick}
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};