import { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, RefreshCw, Users, FileText, Zap, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import type { Submission, ActivityItem } from '@/types';
import type { useDatabase } from '@/hooks/useDatabase';

interface AdminViewProps {
  db: ReturnType<typeof useDatabase>;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onFlag: (id: string) => void;
  onRevoke: (id: string) => void;
}

const PANELS = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'queue', label: 'Review Queue', icon: Clock },
  { id: 'live', label: 'Live Listings', icon: CheckCircle },
  { id: 'flagged', label: 'Flagged', icon: AlertTriangle },
  { id: 'rejected', label: 'Rejected', icon: X },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'activity', label: 'Activity Log', icon: FileText },
];

export function AdminView({ db, onApprove, onReject, onFlag, onRevoke }: AdminViewProps) {
  const [activePanel, setActivePanel] = useState('overview');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityItem[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    setSubmissions(db.getSubmissions());
    setActivityLog(db.getActivityLog());
    setUsers(db.getUsers());
  }, [db]);

  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    live: submissions.filter(s => s.status === 'live').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    flagged: submissions.filter(s => s.status === 'flagged').length,
    totalViews: submissions.reduce((acc, s) => acc + (s.views || 0), 0),
    totalUsers: users.length,
  };

  const getFilteredSubmissions = () => {
    switch (activePanel) {
      case 'queue': return submissions.filter(s => s.status === 'pending');
      case 'live': return submissions.filter(s => s.status === 'live');
      case 'flagged': return submissions.filter(s => s.status === 'flagged');
      case 'rejected': return submissions.filter(s => s.status === 'rejected');
      default: return [];
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

  const formatTime = (time: string) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Pending Review</p>
          <p className="text-3xl font-bold text-amber-400">{stats.pending}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Live Listings</p>
          <p className="text-3xl font-bold text-[#00c853]">{stats.live}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Total Views</p>
          <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Total Users</p>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {activityLog.slice(0, 5).map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl">
              <span className="text-lg">{item.icon}</span>
              <p className="flex-1 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
              <span className="text-xs text-white/40">{formatTime(item.time)}</span>
            </div>
          ))}
          {activityLog.length === 0 && (
            <p className="text-white/40 text-center py-8">No activity yet</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSubmissions = () => (
    <div className="space-y-4">
      {getFilteredSubmissions().length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a] border border-white/10 rounded-2xl">
          <p className="text-white/40">No submissions in this category</p>
        </div>
      ) : (
        getFilteredSubmissions().map((sub) => (
          <div
            key={sub.id}
            className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{sub.name}</h3>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusClass(sub.status)}`}>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                </div>
                <p className="text-white/60 mb-2">{sub.org}</p>
                <p className="text-sm text-white/40 line-clamp-2 mb-4">{sub.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full">{sub.type}</span>
                  <span className="px-2 py-1 bg-white/5 text-white/60 text-xs rounded-full">{sub.geo}</span>
                  <span className="px-2 py-1 bg-[#00c853]/10 text-[#00c853] text-xs rounded-full">{sub.amount}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/40">
                  <span>Submitted by: {sub.contact || 'Anonymous'}</span>
                  <span>·</span>
                  <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                {sub.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onApprove(sub.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#00c853] text-black text-sm font-medium rounded-lg hover:shadow-[0_0_10px_rgba(0,200,83,0.3)] transition-all"
                    >
                      <Check className="w-4 h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => onReject(sub.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 transition-all"
                    >
                      <X className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => onFlag(sub.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-lg hover:bg-amber-500/30 transition-all"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Flag
                    </button>
                  </>
                )}
                {sub.status === 'live' && (
                  <button
                    onClick={() => onRevoke(sub.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/60 text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Revoke
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderUsers = () => (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#0a0a0a]">
          <tr>
            <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">User</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Type</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Joined</th>
            <th className="text-left px-6 py-4 text-xs font-medium text-white/40 uppercase tracking-wider">Provider</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-white/10">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00c853]/20 flex items-center justify-center text-sm font-bold text-[#00c853]">
                    {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-white/50">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  user.type === 'investor' ? 'bg-blue-500/10 text-blue-400' : 
                  user.type === 'admin' ? 'bg-amber-500/10 text-amber-400' : 
                  'bg-[#00c853]/10 text-[#00c853]'
                }`}>
                  {user.type === 'investor' ? '🏦' : user.type === 'admin' ? '⚡' : '🚀'}
                  {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-white/60">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-sm text-white/60">
                {user.provider || 'Email'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderActivityLog = () => (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6">
      <div className="space-y-3">
        {activityLog.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl">
            <span className="text-lg">{item.icon}</span>
            <p className="flex-1 text-sm" dangerouslySetInnerHTML={{ __html: item.text }} />
            <span className="text-xs text-white/40">{formatTime(item.time)}</span>
          </div>
        ))}
        {activityLog.length === 0 && (
          <p className="text-white/40 text-center py-8">No activity yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10">
        <div className="container-money py-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00c853]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00c853]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-white/60">Manage submissions, users, and platform activity.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-money py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <nav className="space-y-1">
              {PANELS.map((panel) => {
                const Icon = panel.icon;
                return (
                  <button
                    key={panel.id}
                    onClick={() => setActivePanel(panel.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activePanel === panel.id
                        ? 'bg-[#00c853]/20 text-[#00c853]'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {panel.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6">
              {PANELS.find(p => p.id === activePanel)?.label}
            </h2>
            
            {activePanel === 'overview' && renderOverview()}
            {['queue', 'live', 'flagged', 'rejected'].includes(activePanel) && renderSubmissions()}
            {activePanel === 'users' && renderUsers()}
            {activePanel === 'activity' && renderActivityLog()}
          </div>
        </div>
      </div>
    </div>
  );
}
