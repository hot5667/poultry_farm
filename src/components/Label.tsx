import React from 'react';

interface LabelProps {
    labelText: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Label = ({ labelText, type, value, onChange }: LabelProps) => {
    return (
        <label className="text-left">
            {labelText}:
            <input
                type={type}
                value={value}
                onChange={onChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
        </label>
    );
};

export default Label;
