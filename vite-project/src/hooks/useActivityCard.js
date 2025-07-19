// src/hooks/useActivityCard.js
import { useNavigate } from 'react-router-dom';

export const useActivityCard = (id, path) => {
    const navigate = useNavigate();

    // 直接构建图片URL
    const getImageUrl = (image) => {
        return image
            ? `http://127.0.0.1:7001/api/activities/images/${image}`
            : '';
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        navigate(`${path}/${id}`);
    };

    return { getImageUrl, handleButtonClick };
};