export default function TextInput({ label, name, type, placeholder, error = undefined, value = '', required = false, onChange }: { label: string, name: string, type: string, placeholder: string, error?: string, value: string, required: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {

    const getClasses = () => {
        let classes = "input input-bordered w-full mb-3";
        if (error) {
            classes += " input-error";
        }
        return classes;
    };

    return (
        <div className="w-full">
            <label htmlFor={name} className="sr-only">{label}</label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={onChange}
                className={getClasses()}
            />
        </div>
    );
}