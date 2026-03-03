import { useState } from 'react';
import { X, Mail, Lock, User, Rocket, Building2 } from 'lucide-react';
import type { UserType } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onSwitchMode: () => void;
  onSignIn: (email: string, password: string) => boolean;
  onSignUp: (userData: { name: string; email: string; password: string; type: UserType }) => boolean;
  onGoogleAuth: () => void;
}

export function AuthModal({ isOpen, onClose, mode, onSwitchMode, onSignIn, onSignUp, onGoogleAuth }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState<UserType>('founder');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (mode === 'signin') {
        const success = onSignIn(email, password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        const success = onSignUp({
          name: `${firstName} ${lastName}`.trim(),
          email,
          password,
          type: userType
        });
        if (!success) {
          setError('An account with this email already exists');
        }
      }
      setIsLoading(false);
    }, 500);
  };

  const handleGoogleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      onGoogleAuth();
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c853] to-[#00a344] flex items-center justify-center">
              <span className="text-black font-bold text-sm">$</span>
            </div>
            <span className="text-lg font-bold">
              Cap<span className="text-[#00c853]">stack</span>
            </span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-[#0a0a0a]">
          <button
            onClick={() => mode === 'signup' && onSwitchMode()}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'signin' 
                ? 'bg-[#141414] text-white shadow-sm' 
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => mode === 'signin' && onSwitchMode()}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === 'signup' 
                ? 'bg-[#141414] text-white shadow-sm' 
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-6">
          {/* Google Button */}
          <button
            onClick={handleGoogleClick}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white rounded-xl text-gray-900 font-medium hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/40 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* User Type Selection (Signup only) */}
          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setUserType('founder')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  userType === 'founder'
                    ? 'border-[#00c853] bg-[#00c853]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <Rocket className={`w-6 h-6 ${userType === 'founder' ? 'text-[#00c853]' : 'text-white/50'}`} />
                <div className="text-center">
                  <p className={`text-sm font-semibold ${userType === 'founder' ? 'text-white' : 'text-white/70'}`}>Founder</p>
                  <p className="text-[10px] text-white/40">Find & track funding</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('investor')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                  userType === 'investor'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <Building2 className={`w-6 h-6 ${userType === 'investor' ? 'text-blue-400' : 'text-white/50'}`} />
                <div className="text-center">
                  <p className={`text-sm font-semibold ${userType === 'investor' ? 'text-white' : 'text-white/70'}`}>Investor</p>
                  <p className="text-[10px] text-white/40">Submit opportunities</p>
                </div>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00c853] transition-colors"
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00c853] transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00c853] transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="password"
                placeholder={mode === 'signin' ? 'Password' : 'Min. 8 characters'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#00c853] transition-colors"
                required
                minLength={mode === 'signup' ? 8 : undefined}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/50">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={onSwitchMode}
              className="text-[#00c853] font-medium hover:underline"
            >
              {mode === 'signin' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
