import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function Notification({ message, onClose, duration = 4000 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg shadow-md p-4 mb-4 max-w-sm">
            <span className="text-gray-800">{message}</span>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
};
