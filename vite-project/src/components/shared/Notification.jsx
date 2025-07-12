// src/components/shared/Notification.jsx
export const Notification = ({ message, visible, type }) => {
    if (!visible) return null;
    return (
        <div
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full 
                        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} 
                        text-white shadow-lg z-50 transition-opacity duration-500`}
        >
            {message}
        </div>
    );
};