import { useState } from 'react';
import { Building2, Globe, Users, TrendingUp, DollarSign, Target, Briefcase, ChevronDown, Check } from 'lucide-react';
import type { User, FounderProfile } from '@/types';

interface ProfileViewProps {
  currentUser: User | null;
  onUpdateUser: (user: User) => void;
}

const STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B+'];
const SECTORS = ['AI/ML', 'Fintech', 'Health/Bio', 'Climate', 'B2B SaaS', 'Consumer', 'Deep Tech', 'Other'];
const REVENUE_RANGES = ['Pre-revenue', '< $10K', '$10K–$50K', '$50K–$100K', '$100K–$500K', '$500K+'];
const GROWTH_RATES = ['< 10%', '10–30%', '30–50%', '50–100%', '100%+'];
const TEAM_SIZES = ['1–2', '3–5', '6–10', '11–20', '20+'];
const RAISING_AMOUNTS = ['$100K–$500K', '$500K–$1M', '$1M–$3M', '$3M–$5M', '$5M+'];

export function ProfileView({ currentUser, onUpdateUser }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FounderProfile>({
    companyName: currentUser?.profile?.companyName || '',
    website: currentUser?.profile?.website || '',
    description: currentUser?.profile?.description || '',
    stage: currentUser?.profile?.stage || '',
    sector: currentUser?.profile?.sector || '',
    monthlyRevenue: currentUser?.profile?.monthlyRevenue || '',
    momGrowth: currentUser?.profile?.momGrowth || '',
    customers: currentUser?.profile?.customers || '',
    teamSize: currentUser?.profile?.teamSize || '',
    raisingAmount: currentUser?.profile?.raisingAmount || '',
    roundType: currentUser?.profile?.roundType || '',
    useOfFunds: currentUser?.profile?.useOfFunds || '',
  });

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    onUpdateUser({
      ...currentUser,
      profile: { ...currentUser.profile, ...formData }
    });
    setIsEditing(false);
  };

  const handleChange = (field: keyof FounderProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const SelectField = ({ 
    label, 
    value, 
    options, 
    onChange,
    icon: Icon 
  }: { 
    label: string; 
    value: string; 
    options: string[]; 
    onChange: (val: string) => void;
    icon: any;
  }) => (
    <div className="space-y-2">
      <label className="text-sm text-white/60">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00c853] appearance-none"
        >
          <option value="">Select...</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10">
        <div className="container-money py-8">
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-white/60">Your startup details power auto-fill and match scoring.</p>
        </div>
      </div>

      <div className="container-money py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Card */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00c853]/20 to-[#00a344]/20 border border-[#00c853]/30 flex items-center justify-center text-3xl">
                {currentUser.picture ? (
                  <img src={currentUser.picture} alt="" className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                <p className="text-white/60">{currentUser.email}</p>
                <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-[#00c853]/10 text-[#00c853] text-xs font-medium rounded-full border border-[#00c853]/30">
                  🚀 Founder
                </span>
              </div>
            </div>

            {/* Edit Toggle */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isEditing
                    ? 'bg-[#00c853] text-black hover:shadow-[0_0_20px_rgba(0,200,83,0.3)]'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {isEditing ? (
                  <><Check className="w-4 h-4" /> Save Changes</>
                ) : (
                  'Edit Profile'
                )}
              </button>
            </div>

            {/* Company Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Company Information</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => handleChange('companyName', e.target.value)}
                        placeholder="Your company name"
                        className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleChange('website', e.target.value)}
                        placeholder="https://..."
                        className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm text-white/60">One-liner Description</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="What does your company do in one sentence?"
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Stage & Sector */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Stage & Sector</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <SelectField
                    label="Funding Stage"
                    value={formData.stage || ''}
                    options={STAGES}
                    onChange={(v) => handleChange('stage', v)}
                    icon={Briefcase}
                  />
                  <SelectField
                    label="Primary Sector"
                    value={formData.sector || ''}
                    options={SECTORS}
                    onChange={(v) => handleChange('sector', v)}
                    icon={Building2}
                  />
                </div>
              </div>

              {/* Traction */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Traction</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <SelectField
                    label="Monthly Revenue"
                    value={formData.monthlyRevenue || ''}
                    options={REVENUE_RANGES}
                    onChange={(v) => handleChange('monthlyRevenue', v)}
                    icon={DollarSign}
                  />
                  <SelectField
                    label="MoM Growth"
                    value={formData.momGrowth || ''}
                    options={GROWTH_RATES}
                    onChange={(v) => handleChange('momGrowth', v)}
                    icon={TrendingUp}
                  />
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Active Customers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        value={formData.customers}
                        onChange={(e) => handleChange('customers', e.target.value)}
                        placeholder="e.g. 1,200"
                        className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <SelectField
                    label="Team Size"
                    value={formData.teamSize || ''}
                    options={TEAM_SIZES}
                    onChange={(v) => handleChange('teamSize', v)}
                    icon={Users}
                  />
                </div>
              </div>

              {/* Fundraising */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Fundraising</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <SelectField
                    label="Amount Raising"
                    value={formData.raisingAmount || ''}
                    options={RAISING_AMOUNTS}
                    onChange={(v) => handleChange('raisingAmount', v)}
                    icon={DollarSign}
                  />
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Round Type</label>
                    <div className="relative">
                      <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        value={formData.roundType}
                        onChange={(e) => handleChange('roundType', e.target.value)}
                        placeholder="e.g. Seed, Series A"
                        className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm text-white/60">Use of Funds</label>
                    <textarea
                      value={formData.useOfFunds}
                      onChange={(e) => handleChange('useOfFunds', e.target.value)}
                      placeholder="What will you use this funding for?"
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853] resize-none"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <span className="text-[#00c853]">💡</span> Why this matters
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-3">
                <span className="text-[#00c853]">✓</span>
                <span><strong>Auto-fill applications</strong> — Your profile data pre-populates forms when you click Apply.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00c853]">✓</span>
                <span><strong>Accurate match scores</strong> — We compare your stage, sector, and traction to every opportunity's requirements.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00c853]">✓</span>
                <span><strong>One-time setup</strong> — Update once, benefit everywhere. No more copy-pasting the same info.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
