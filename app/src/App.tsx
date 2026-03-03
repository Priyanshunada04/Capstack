import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/Navbar';
import { LandingView } from '@/views/LandingView';
import { DirectoryView } from '@/views/DirectoryView';
import { DetailView } from '@/views/DetailView';
import { ProfileView } from '@/views/ProfileView';
import { TrackerView } from '@/views/TrackerView';
import { InvestorView } from '@/views/InvestorView';
import { AdminView } from '@/views/AdminView';
import { AuthModal } from '@/components/AuthModal';
import { OnboardingModal } from '@/components/OnboardingModal';
import { SubmitModal } from '@/components/SubmitModal';
import { RejectModal } from '@/components/RejectModal';
import { GooglePicker } from '@/components/GooglePicker';
import { Toast } from '@/components/Toast';
import { useDatabase, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/hooks/useDatabase';
import { opportunities as initialOpportunities } from '@/data/opportunities';
import type { User, Opportunity, Submission, ViewName } from '@/types';

function App() {
  // Database
  const db = useDatabase();
  
  // State
  const [currentView, setCurrentView] = useState<ViewName>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [opportunities] = useState<Opportunity[]>(initialOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  
  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [googlePickerOpen, setGooglePickerOpen] = useState(false);
  const [rejectTargetId, setRejectTargetId] = useState<string | null>(null);
  
  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | ''; show: boolean }>({
    message: '',
    type: '',
    show: false
  });

  // Load current user on mount
  useEffect(() => {
    const user = db.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, [db.isLoaded]);

  // Show toast helper
  const showToast = useCallback((message: string, type: 'success' | 'error' | '' = '') => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  }, []);

  // Navigation
  const navigateTo = useCallback((view: ViewName) => {
    // Auth guards
    if (view === 'admin') {
      if (!currentUser || (currentUser.type !== 'admin' && currentUser.email !== ADMIN_EMAIL)) {
        showToast('Admin access required', 'error');
        return;
      }
    }
    if (['profile', 'tracker'].includes(view) && !currentUser) {
      setAuthModalOpen(true);
      return;
    }
    if (view === 'investor') {
      if (!currentUser) {
        setAuthModalOpen(true);
        return;
      }
      if (currentUser.type !== 'investor' && currentUser.type !== 'admin') {
        showToast('This area is for investors', 'error');
        return;
      }
    }
    
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentUser, showToast]);

  // Auth handlers
  const handleSignIn = useCallback((email: string, password: string): boolean => {
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: 'admin_001',
        name: 'Capstack Admin',
        email: ADMIN_EMAIL,
        type: 'admin',
        createdAt: new Date().toISOString()
      };
      db.setCurrentUser(adminUser);
      setCurrentUser(adminUser);
      setAuthModalOpen(false);
      showToast('Welcome back, Admin ⚡', 'success');
      setTimeout(() => navigateTo('admin'), 400);
      return true;
    }

    const users = db.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return false;
    
    db.setCurrentUser(user);
    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');
    
    setTimeout(() => {
      if (user.type === 'investor') navigateTo('investor');
      else if (user.type === 'admin') navigateTo('admin');
      else navigateTo('directory');
    }, 400);
    return true;
  }, [db, navigateTo, showToast]);

  const handleSignUp = useCallback((userData: Partial<User>): boolean => {
    const users = db.getUsers();
    if (users.find(u => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: 'user_' + Date.now(),
      name: userData.name || '',
      email: userData.email || '',
      password: userData.password,
      type: userData.type || 'founder',
      createdAt: new Date().toISOString(),
      profile: {}
    };

    users.push(newUser);
    db.saveUsers(users);
    db.setCurrentUser(newUser);
    setCurrentUser(newUser);
    setAuthModalOpen(false);

    if (newUser.type === 'investor') {
      showToast(`Welcome, ${newUser.name.split(' ')[0]}! Let's get your listings live. 🚀`, 'success');
      setTimeout(() => navigateTo('investor'), 400);
    } else {
      setTimeout(() => setOnboardingOpen(true), 400);
    }
    return true;
  }, [db, navigateTo, showToast]);

  const handleGoogleAuth = useCallback((profile: { name: string; email: string; picture?: string; googleId: string }) => {
    const users = db.getUsers();
    let user = users.find(u => u.email === profile.email);

    if (user) {
      if (profile.picture && !user.picture) {
        user.picture = profile.picture;
        db.saveUsers(users);
      }
      db.setCurrentUser(user);
      setCurrentUser(user);
      setAuthModalOpen(false);
      setGooglePickerOpen(false);
      showToast(`Welcome back, ${user.name.split(' ')[0]}! 👋`, 'success');
      setTimeout(() => {
        if (user!.type === 'investor') navigateTo('investor');
        else if (user!.type === 'admin') navigateTo('admin');
        else navigateTo('directory');
      }, 350);
    } else {
      const newUser: User = {
        id: 'guser_' + Date.now(),
        name: profile.name,
        email: profile.email,
        picture: profile.picture,
        googleId: profile.googleId,
        type: 'founder',
        provider: 'google',
        createdAt: new Date().toISOString(),
        profile: {}
      };
      users.push(newUser);
      db.saveUsers(users);
      db.setCurrentUser(newUser);
      setCurrentUser(newUser);
      setAuthModalOpen(false);
      setGooglePickerOpen(false);
      setTimeout(() => setOnboardingOpen(true), 400);
    }
  }, [db, navigateTo, showToast]);

  const handleLogout = useCallback(() => {
    db.clearCurrentUser();
    setCurrentUser(null);
    showToast('Signed out. See you soon! 👋');
    navigateTo('landing');
  }, [db, navigateTo, showToast]);

  // Opportunity handlers
  const handleOpenDetail = useCallback((opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Tracker handlers
  const handleAddToTracker = useCallback((opp: Opportunity) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    const items = db.getTrackerItems(currentUser.id);
    if (items.find(i => String(i.oppId) === String(opp.id))) {
      showToast('Already in your tracker!');
      return;
    }
    items.push({
      oppId: opp.id,
      name: opp.name,
      org: opp.org,
      amount: opp.amount,
      deadline: opp.deadline,
      matchScore: opp.matchScore,
      logo: opp.logo,
      status: 'saved',
      addedAt: new Date().toISOString()
    });
    db.saveTrackerItems(currentUser.id, items);
    showToast(`"${opp.name}" saved to tracker 📊`, 'success');
  }, [currentUser, db, showToast]);

  // Submission handlers
  const handleSubmitOpportunity = useCallback((submission: Omit<Submission, 'id' | 'userId' | 'status' | 'views' | 'submittedAt'>) => {
    if (!currentUser) return;
    const subs = db.getSubmissions();
    const newSub: Submission = {
      ...submission,
      id: 'sub_' + Date.now(),
      userId: currentUser.id,
      status: 'pending',
      views: 0,
      submittedAt: new Date().toISOString()
    };
    subs.push(newSub);
    db.saveSubmissions(subs);
    setSubmitModalOpen(false);
    showToast('Submitted! We\'ll review within 48 hours ✓', 'success');
  }, [currentUser, db, showToast]);

  // Admin handlers
  const handleApproveSubmission = useCallback((id: string) => {
    const subs = db.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;
    sub.status = 'live';
    sub.approvedAt = new Date().toISOString();
    db.saveSubmissions(subs);
    db.logActivity('✅', `Approved: <strong>${sub.name}</strong> by ${sub.org} — now live in directory`, 'green');
    showToast(`✓ "${sub.name}" is now live in the directory`, 'success');
  }, [db, showToast]);

  const handleRejectSubmission = useCallback((id: string, reason: string) => {
    const subs = db.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;
    sub.status = 'rejected';
    sub.rejectReason = reason;
    sub.rejectedAt = new Date().toISOString();
    db.saveSubmissions(subs);
    db.logActivity('✗', `Rejected: <strong>${sub.name}</strong> — "${reason.substring(0, 50)}..."`, 'red');
    setRejectModalOpen(false);
    showToast(`"${sub.name}" rejected`, 'error');
  }, [db, showToast]);

  const handleFlagSubmission = useCallback((id: string) => {
    const subs = db.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;
    sub.status = 'flagged';
    db.saveSubmissions(subs);
    db.logActivity('⚑', `Flagged for review: <strong>${sub.name}</strong> by ${sub.org}`, 'gold');
    showToast(`"${sub.name}" flagged for further review`);
  }, [db, showToast]);

  const handleRevokeSubmission = useCallback((id: string) => {
    const subs = db.getSubmissions();
    const sub = subs.find(s => s.id === id);
    if (!sub) return;
    sub.status = 'pending';
    delete sub.approvedAt;
    db.saveSubmissions(subs);
    db.logActivity('↩', `Revoked live listing: <strong>${sub.name}</strong> — returned to pending`, 'gold');
    showToast(`"${sub.name}" revoked — moved back to pending`);
  }, [db, showToast]);

  // Onboarding completion
  const handleOnboardingComplete = useCallback((selections: { sector: string[]; stage: string; geo: string }) => {
    if (!currentUser) return;
    const user = { ...currentUser };
    user.profile = {
      ...user.profile,
      sectors: selections.sector,
      stage: selections.stage,
      geo: selections.geo,
      onboarded: true
    };
    
    const users = db.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx > -1) {
      users[idx] = user;
      db.saveUsers(users);
    }
    db.setCurrentUser(user);
    setCurrentUser(user);
    setOnboardingOpen(false);
    showToast(`Perfect, ${user.name.split(' ')[0]}! Your matches are ready ✦`, 'success');
    setTimeout(() => navigateTo('directory'), 350);
  }, [currentUser, db, navigateTo, showToast]);

  // Get all opportunities including live submissions
  const getAllOpportunities = useCallback((): Opportunity[] => {
    const subs = db.getSubmissions().filter(s => s.status === 'live');
    const mappedSubs: Opportunity[] = subs.map(s => ({
      id: s.id,
      logo: '🏢',
      name: s.name,
      org: s.org,
      type: s.type,
      stage: s.stage,
      geo: s.geo,
      amount: s.amount,
      deadline: s.deadline,
      status: 'active',
      verified: 'Recently',
      matchScore: Math.floor(Math.random() * 30) + 50,
      tags: s.tags || [],
      desc: s.desc,
      fullDesc: s.fullDesc,
      eligibility: s.eligibility,
      isNew: true,
      applyUrl: s.url,
      views: s.views
    }));
    return [...opportunities, ...mappedSubs];
  }, [opportunities, db]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white money-bg">
      <Navbar
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="pt-16">
        {currentView === 'landing' && (
          <LandingView
            onNavigate={navigateTo}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {currentView === 'directory' && (
          <DirectoryView
            opportunities={getAllOpportunities()}
            onOpenDetail={handleOpenDetail}
          />
        )}

        {currentView === 'detail' && selectedOpportunity && (
          <DetailView
            opportunity={selectedOpportunity}
            onBack={() => setCurrentView('directory')}
            onAddToTracker={handleAddToTracker}
            onNavigate={navigateTo}
          />
        )}

        {currentView === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            onUpdateUser={(user) => {
              setCurrentUser(user);
              db.setCurrentUser(user);
              const users = db.getUsers();
              const idx = users.findIndex(u => u.id === user.id);
              if (idx > -1) {
                users[idx] = user;
                db.saveUsers(users);
              }
            }}
          />
        )}

        {currentView === 'tracker' && (
          <TrackerView
            currentUser={currentUser}
            db={db}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {currentView === 'investor' && (
          <InvestorView
            currentUser={currentUser}
            db={db}
            onOpenSubmit={() => setSubmitModalOpen(true)}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            db={db}
            onApprove={handleApproveSubmission}
            onReject={(id) => {
              setRejectTargetId(id);
              setRejectModalOpen(true);
            }}
            onFlag={handleFlagSubmission}
            onRevoke={handleRevokeSubmission}
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(m => m === 'signin' ? 'signup' : 'signin')}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onGoogleAuth={() => setGooglePickerOpen(true)}
      />

      <GooglePicker
        isOpen={googlePickerOpen}
        onClose={() => setGooglePickerOpen(false)}
        onSelect={handleGoogleAuth}
        db={db}
      />

      <OnboardingModal
        isOpen={onboardingOpen}
        onComplete={handleOnboardingComplete}
        onSkip={() => {
          setOnboardingOpen(false);
          navigateTo('directory');
        }}
      />

      <SubmitModal
        isOpen={submitModalOpen}
        onClose={() => setSubmitModalOpen(false)}
        onSubmit={handleSubmitOpportunity}
      />

      <RejectModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={(reason) => {
          if (rejectTargetId) {
            handleRejectSubmission(rejectTargetId, reason);
          }
        }}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
      />
    </div>
  );
}

export default App;
