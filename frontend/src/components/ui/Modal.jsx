import React from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, title, children, onClose, onConfirm, confirmText = 'Confirm' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4">
      <div className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        
        {/* Header */}
        {title && (
          <div className="px-8 py-6 border-b border-gray-300 flex items-center justify-between sticky top-0 bg-white z-10">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-8 py-6">{children}</div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-300 flex gap-3 justify-end sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="btn btn-primary"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
