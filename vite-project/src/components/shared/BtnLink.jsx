





export const BtnLink = ({ href, text, className }) => {
    return (
        <a href={href} className={` px-6 py-3 rounded-full outline-none relative overflow-hidden 
                                    border bg-violet-600 cursor-pointer hover:scale-102 ${className}`}>
            <span className={"relative z-10 text-white "}> {text}</span>
        </a>
    );
};