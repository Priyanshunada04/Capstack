import { useState } from 'react';

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const REJECT_REASONS = [
  '🔍 Duplicate — we already have this opportunity listed',
  '📋 Incomplete information — key fields are missing or vague',
  '❌ Cannot verify — organisation or programme cannot be confirmed',
  '🚫 Ineligible type — does not meet Capstack listing standards',
  '💀 Expired — this programme has already closed or ended',
];

export function RejectModal({ isOpen, onClose, onConfirm }: RejectModalProps) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const reason = selectedReason || customNote || 'No reason provided';
    onConfirm(reason);
    setSelectedReason('');
    setCustomNote('');
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-bold">Reject Submission</h3>
          <p className="text-sm text-white/50 mt-1">Select a reason — this will be sent to the submitter.</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          {REJECT_REASONS.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                selectedReason === reason
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : 'bg-[#0a0a0a] text-white/70 border border-white/10 hover:border-white/20'
              }`}
            >
              {reason}
            </button>
          ))}

          <div className="pt-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">
              Custom Note (Optional)
            </label>
            <textarea
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Add any additional context for the submitter..."
              rows={3}
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10 bg-[#141414]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2.5 bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 font-semibold rounded-xl transition-all"
          >
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}
