//todo 点击ActivityCard的"去报名“按钮后进入这个页面，包括图片、标题、时间地点、详细描述，还有他人评论，用户自身也可以参与评论或删除自己的评论，并有“活动报名”按钮

// src/components/cards/ActivityDetailCard.jsx
import React, { useState } from 'react';
import { Container } from '../shared/Container.jsx';
import { BtnLink } from '../shared/BtnLink.jsx';

// 模拟他人评论数据
const initialComments = [
    { id: 1, user: '张三', content: '这个活动看起来很有趣！' },
    { id: 2, user: '李四', content: '期待参加！' },
];

export const ActivityDetailCard = () => {
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

    return (
        <section className="py-20">
            <Container>
                <div className="bg-box-bg p-12 rounded-lg border border-box-border">
                    <img
                        src="activity-image.jpg"
                        alt="Activity"
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                    <h2 className="text-heading-1 text-3xl font-bold mb-4">活动标题</h2>
                    <p className="text-heading-3 mb-4">
                        <span className="font-medium">时间：</span>2024-10-01 14:00
                    </p>
                    <p className="text-heading-3 mb-6">
                        <span className="font-medium">地点：</span>体育馆 1 号场地
                    </p>
                    <p className="text-heading-3 mb-8">
                        详细描述：这是一个非常精彩的体育活动，欢迎大家踊跃参加！
                    </p>
                    <h3 className="text-heading-2 text-xl font-bold mb-4">他人评论</h3>
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
            </Container>
        </section>
    );
};