import React, { Fragment } from 'react';
import { X } from 'lucide-react';

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

function DialogBox({ isOpen, onClose, title, children }: DialogBoxProps) {
    if (!isOpen) return null;

    return (
        <Fragment>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-lg">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </Fragment>
    );
}

export default DialogBox;