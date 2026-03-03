import { useState, useEffect } from 'react';
import type { User } from '@/types';

interface GooglePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (profile: { name: string; email: string; picture?: string; googleId: string }) => void;
  db: {
    getUsers: () => User[];
  };
}

const DEMO_ACCOUNTS = [
  { name: 'Alex Johnson', email: 'alex.johnson@gmail.com', initials: 'AJ', color: '#4285F4', type: 'founder' as const },
  { name: 'Priya Sharma', email: 'priya.sharma@gmail.com', initials: 'PS', color: '#34A853', type: 'founder' as const },
];

export function GooglePicker({ isOpen, onClose, onSelect, db }: GooglePickerProps) {
  const [accounts, setAccounts] = useState(DEMO_ACCOUNTS);

  useEffect(() => {
    if (isOpen) {
      const savedUsers = db.getUsers().filter(u => u.provider === 'google');
      const merged = [
        ...savedUsers.map(u => ({
          name: u.name,
          email: u.email,
          initials: u.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
          color: u.type === 'investor' ? '#34A853' : '#4285F4',
          type: u.type,
          isReal: true,
          googleId: u.googleId
        })),
        ...DEMO_ACCOUNTS.filter(d => !savedUsers.find(u => u.email === d.email))
      ];
      setAccounts(merged as typeof DEMO_ACCOUNTS);
    }
  }, [isOpen, db]);

  if (!isOpen) return null;

  const handleSelect = (account: typeof accounts[0]) => {
    onSelect({
      name: account.name,
      email: account.email,
      googleId: (account as any).googleId || `demo_${account.email}`
    });
  };

  const handleAddAccount = () => {
    const email = prompt('Enter email (demo mode):');
    if (email && email.includes('@')) {
      const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      onSelect({
        name,
        email,
        googleId: `demo_${email}`
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Choose an account</h3>
          <p className="text-sm text-gray-500 mt-1">to continue to Capstack</p>
        </div>

        {/* Accounts */}
        <div className="py-2">
          {accounts.map((account, i) => (
            <button
              key={i}
              onClick={() => handleSelect(account)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: account.color }}
              >
                {account.initials}
              </div>
              <div>
                <p className="font-medium text-gray-900">{account.name}</p>
                <p className="text-sm text-gray-500">{account.email}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Add Account */}
        <button
          onClick={handleAddAccount}
          className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
        >
          <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xl">+</span>
          </div>
          <span className="font-medium text-blue-600">Use another account</span>
        </button>

        {/* Footer */}
        <div className="p-4 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
