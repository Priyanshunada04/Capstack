import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | '';
  show: boolean;
}

export function Toast({ message, type, show }: ToastProps) {
  if (!show) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#00c853]" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    '': <Info className="w-5 h-5 text-white/60" />
  };

  const borderColors = {
    success: 'border-[#00c853]/50',
    error: 'border-red-500/50',
    '': 'border-white/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] animate-fade-in">
      <div className={`flex items-center gap-3 px-5 py-4 bg-[#141414] border ${borderColors[type]} rounded-xl shadow-2xl`}>
        {icons[type]}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
