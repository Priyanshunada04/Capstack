import { useState, useEffect } from 'react';
import { Plus, ExternalLink, Clock, CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import type { User, Submission } from '@/types';
import type { useDatabase } from '@/hooks/useDatabase';

interface InvestorViewProps {
  currentUser: User | null;
  db: ReturnType<typeof useDatabase>;
  onOpenSubmit: () => void;
}

const TABS = [
  { id: 'all', label: 'All Submissions' },
  { id: 'pending', label: 'Pending Review' },
  { id: 'live', label: 'Live' },
  { id: 'rejected', label: 'Rejected' },
];

export function InvestorView({ currentUser, db, onOpenSubmit }: InvestorViewProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    if (currentUser) {
      const allSubs = db.getSubmissions();
      setSubmissions(allSubs.filter(s => s.userId === currentUser.id));
    }
  }, [currentUser, db]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">Please sign in to view your dashboard</p>
        </div>
      </div>
    );
  }

  const filteredSubmissions = submissions.filter(s => 
    activeTab === 'all' ? true : s.status === activeTab
  );

  const stats = {
    total: submissions.length,
    live: submissions.filter(s => s.status === 'live').length,
    pending: submissions.filter(s => s.status === 'pending').length,
    views: submissions.reduce((acc, s) => acc + (s.views || 0), 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-amber-400" />;
      case 'live': return <CheckCircle className="w-4 h-4 text-[#00c853]" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'flagged': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'live': return 'bg-[#00c853]/10 text-[#00c853] border-[#00c853]/30';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'flagged': return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      default: return 'bg-white/5 text-white/60 border-white/10';
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10">
        <div className="container-money py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Investor Dashboard</h1>
              <p className="text-white/60">Manage your funding opportunities and track performance.</p>
            </div>
            <button
              onClick={onOpenSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all"
            >
              <Plus className="w-5 h-5" />
              Submit Opportunity
            </button>
          </div>
        </div>
      </div>

      <div className="container-money py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Total Submissions</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Live Listings</p>
            <p className="text-3xl font-bold text-[#00c853]">{stats.live}</p>
          </div>
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-amber-400">{stats.pending}</p>
          </div>
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Total Views</p>
            <p className="text-3xl font-bold flex items-center gap-2">
              {stats.views}
              <TrendingUp className="w-5 h-5 text-[#00c853]" />
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-20 bg-[#141414] border border-white/10 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Plus className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No submissions yet</h3>
              <p className="text-white/50 mb-6">Submit your first opportunity to get started.</p>
              <button
                onClick={onOpenSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl"
              >
                <Plus className="w-5 h-5" />
                Submit Opportunity
              </button>
            </div>
          ) : (
            filteredSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-[#141414] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{sub.name}</h3>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusClass(sub.status)}`}>
                        {getStatusIcon(sub.status)}
                        {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-white/60 mb-4">{sub.org}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-white/40">{sub.type}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/40">{sub.geo}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-[#00c853] font-medium">{sub.amount}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-white/40">Deadline: {sub.deadline}</span>
                    </div>

                    {sub.status === 'rejected' && sub.rejectReason && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <p className="text-sm text-red-400">
                          <strong>Reason:</strong> {sub.rejectReason}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">{sub.views || 0}</p>
                      <p className="text-xs text-white/40">views</p>
                    </div>
                    <a
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-white/60" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40">Submitted {new Date(sub.submittedAt).toLocaleDateString()}</span>
                  {sub.approvedAt && (
                    <>
                      <span className="text-white/20">·</span>
                      <span className="text-xs text-[#00c853]">Approved {new Date(sub.approvedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-[#141414] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-[#00c853]">💡</span> Submission Tips
          </h3>
          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <span className="text-[#00c853]">✓</span>
              <span><strong>Be specific</strong> — Include exact amounts, deadlines, and eligibility criteria.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00c853]">✓</span>
              <span><strong>Verify first</strong> — Make sure the programme is active and accepting applications.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00c853]">✓</span>
              <span><strong>Include contact</strong> — Provide a way for founders to reach out with questions.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
