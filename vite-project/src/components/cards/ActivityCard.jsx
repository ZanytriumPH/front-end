// src/components/cards/ActivityCard.jsx
import {BaseActivity} from "../shared/BaseActivity.jsx";
import {useNavigate} from "react-router-dom";

export const ActivityCard = ({ title, time, location, price = '0', id, image, signedUp = 0, total = 0 }) => {
    const navigate = useNavigate();

    // 直接构建图片URL
    const imageUrl = image
        ? `http://127.0.0.1:7001/api/activities/images/${image}`
        : '';

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate(`/ActivityDetail/${id}`);
    };

    return (
        <BaseActivity
            title={title}
            time={time}
            location={location}
            price={price}
            id={id}
            image={imageUrl} // 直接使用URL
            signedUp={signedUp}
            total={total}
            buttonText="去报名"
            onButtonClick={handleSignUp}
        />
    );
};