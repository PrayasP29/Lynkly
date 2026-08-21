import React from 'react'

export const Modal = ({ isOpen, title, children, onClose, footerActions }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#0a0e17]/50 flex items-center justify-center z-50">
      <div className="bg-[#101520] rounded-lg shadow-xl max-w-md w-full mx-4 animate-modal-open">
        <div className="flex items-center justify-between border border-[#303545]/30 px-6 py-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#666b85] hover:text-[#8892a8] text-2xl font-light"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footerActions && (
          <div className="flex gap-2 justify-end border-t border-[#303545]/30 px-6 py-4">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  )
}
