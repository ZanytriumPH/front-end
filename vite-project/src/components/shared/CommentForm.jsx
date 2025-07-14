// src/components/shared/CommentForm.jsx
import React from 'react';

export const CommentForm = ({ newComment, setNewComment, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="mb-8 flex gap-4">
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
    );
};