import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LayoutDashboard, Search, Settings, LogOut, Zap } from 'lucide-react';
import type { User as UserType, ViewName } from '@/types';

interface NavbarProps {
  currentUser: UserType | null;
  currentView: ViewName;
  onNavigate: (view: ViewName) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export function Navbar({ currentUser, currentView, onNavigate, onOpenAuth, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const isAdmin = currentUser?.type === 'admin' || currentUser?.email === 'admin@capstack.io';
  const isInvestor = currentUser?.type === 'investor';
  const isFounder = currentUser?.type === 'founder';

  const navLinks = [
    { id: 'directory' as ViewName, label: 'Opportunities', show: true },
    { id: 'profile' as ViewName, label: 'My Profile', show: !!currentUser && isFounder },
    { id: 'tracker' as ViewName, label: 'Tracker', show: !!currentUser && isFounder },
    { id: 'investor' as ViewName, label: 'Dashboard', show: !!currentUser && (isInvestor || isAdmin) },
    { id: 'admin' as ViewName, label: 'Admin', show: !!currentUser && isAdmin, isAdmin: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10">
      <div className="container-money">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c853] to-[#00a344] flex items-center justify-center">
              <span className="text-black font-bold text-sm">$</span>
            </div>
            <span className="text-xl font-bold">
              Cap<span className="text-[#00c853]">stack</span>
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.filter(l => l.show).map(link => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === link.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                } ${link.isAdmin ? 'text-[#00c853] hover:text-[#00c853]' : ''}`}
              >
                {link.isAdmin && <Zap className="w-3 h-3 inline mr-1" />}
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#00c853]/50 transition-all"
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold ${
                    isInvestor ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00c853]/20 text-[#00c853]'
                  }`}>
                    {currentUser.picture ? (
                      <img src={currentUser.picture} alt="" className="w-full h-full rounded-md object-cover" />
                    ) : (
                      getInitials(currentUser.name)
                    )}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-[#141414] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in">
                    <div className="p-4 bg-gradient-to-br from-[#1a1a1a] to-[#141414] border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isInvestor ? 'bg-blue-500/20 text-blue-400' : isAdmin ? 'bg-amber-500/20 text-amber-400' : 'bg-[#00c853]/20 text-[#00c853]'
                        }`}>
                          {currentUser.picture ? (
                            <img src={currentUser.picture} alt="" className="w-full h-full rounded-lg object-cover" />
                          ) : (
                            getInitials(currentUser.name)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{currentUser.name}</p>
                          <p className="text-xs text-white/50 truncate">{currentUser.email}</p>
                          <span className={`inline-flex items-center gap-1 mt-1 text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                            isInvestor ? 'bg-blue-500/10 text-blue-400' : isAdmin ? 'bg-amber-500/10 text-amber-400' : 'bg-[#00c853]/10 text-[#00c853]'
                          }`}>
                            {isInvestor ? '🏦 Investor' : isAdmin ? '⚡ Admin' : '🚀 Founder'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      {isFounder && (
                        <>
                          <button
                            onClick={() => { onNavigate('profile'); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </button>
                          <button
                            onClick={() => { onNavigate('tracker'); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Application Tracker
                          </button>
                        </>
                      )}
                      {(isInvestor || isAdmin) && (
                        <button
                          onClick={() => { onNavigate('investor'); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Investor Dashboard
                        </button>
                      )}
                      {isAdmin && (
                        <button
                          onClick={() => { onNavigate('admin'); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#00c853] hover:bg-[#00c853]/10 transition-all"
                        >
                          <Zap className="w-4 h-4" />
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={() => { onNavigate('directory'); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <Search className="w-4 h-4" />
                        Browse Opportunities
                      </button>
                      <button
                        onClick={() => showToast('Settings coming soon!')}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>

                    <div className="p-2 border-t border-white/10">
                      <button
                        onClick={() => { onLogout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold text-sm hover:shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 animate-fade-in">
          <div className="container-money py-4 space-y-2">
            {navLinks.filter(l => l.show).map(link => (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentView === link.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            {!currentUser && (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold text-sm"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function showToast(msg: string) {
  // This is a placeholder - the actual toast is handled by App.tsx
  console.log(msg);
}