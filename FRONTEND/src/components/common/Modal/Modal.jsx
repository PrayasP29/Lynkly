import React from 'react'

export const Modal = ({ isOpen, title, children, onClose, footerActions }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-modal-open">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footerActions && (
          <div className="flex gap-2 justify-end border-t px-6 py-4">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  )
}
