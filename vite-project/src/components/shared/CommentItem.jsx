// src/components/shared/CommentItem.jsx
import React from 'react';

export const CommentItem = ({ comment, username, onDelete }) => {
    return (
        <div
            key={comment.id}
            className="bg-body p-4 rounded-lg border border-box-border mb-4 relative flex items-center"
        >
            <div className="flex-1">
                <p className="text-heading-3">
                    <span className="font-medium">{comment.username}：</span>{comment.content}
                </p>
                <p className="text-sm text-gray-500">{comment.createdAt}</p>
            </div>
            {comment.username === username && (
                <button
                    className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md cursor-pointer"
                    onClick={() => onDelete(comment.id)}
                >
                    删除
                </button>
            )}
        </div>
    );
};