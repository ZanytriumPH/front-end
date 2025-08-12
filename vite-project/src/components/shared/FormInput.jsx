// src/components/shared/FormInput.jsx
export const FormInput = ({ type, placeholder, value, onChange, error }) => {
    return (
        <>
            <input
                type={type} // 输入框的类型
                placeholder={placeholder} // 输入框内的提示信息
                className="block w-full p-3 mb-2 border border-box-border rounded-md bg-body text-heading-3"
                value={value} // 绑定输入框的值
                onChange={onChange} // 监听输入框的值变化
                required // 输入框的值不能为空
            />
            {error && (
                <p className="text-red-500 text-sm mb-6">{error}</p> // 输入框下方显示错误提示
            )}
        </>
    );
};