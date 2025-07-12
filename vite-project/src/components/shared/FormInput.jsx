// src/components/shared/FormInput.jsx
export const FormInput = ({ type, placeholder, value, onChange, error }) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                className="block w-full p-3 mb-2 border border-box-border rounded-md bg-body text-heading-3"
                value={value}
                onChange={onChange}
                required
            />
            {error && (
                <p className="text-red-500 text-sm mb-6">{error}</p>
            )}
        </>
    );
};