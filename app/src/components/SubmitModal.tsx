import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import type { Submission } from '@/types';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (submission: Omit<Submission, 'id' | 'userId' | 'status' | 'views' | 'submittedAt'>) => void;
}

const FUNDING_TYPES = ['Accelerator', 'Government Grant', 'VC / Angel', 'Foundation', 'Competition', 'Fellowship', 'Loan / Revenue Share'];
const GEOGRAPHIES = ['Global', 'USA', 'Europe', 'UK', 'Asia', 'Africa', 'Latin America', 'Middle East'];
const STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B+', 'Any'];

export function SubmitModal({ isOpen, onClose, onSubmit }: SubmitModalProps) {
  const [formData, setFormData] = useState({
    org: '',
    name: '',
    type: '',
    geo: '',
    amount: '',
    deadline: '',
    url: '',
    desc: '',
    fullDesc: '',
    stage: ['Pre-seed', 'Seed'] as string[],
    eligibility: [{ ok: true, text: '' }, { ok: false, text: '' }] as { ok: boolean; text: string }[],
    tags: '',
    contact: '',
    website: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.org || !formData.name || !formData.type || !formData.geo || !formData.amount || !formData.deadline || !formData.url || !formData.desc) {
      setError('Please fill in all required fields');
      return;
    }

    onSubmit({
      name: formData.name,
      org: formData.org,
      type: formData.type,
      geo: formData.geo,
      amount: formData.amount,
      deadline: formData.deadline,
      url: formData.url,
      desc: formData.desc,
      fullDesc: formData.fullDesc,
      stage: formData.stage,
      eligibility: formData.eligibility.filter(e => e.text.trim()),
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      contact: formData.contact,
      website: formData.website
    });
  };

  const toggleStage = (stage: string) => {
    setFormData(prev => ({
      ...prev,
      stage: prev.stage.includes(stage)
        ? prev.stage.filter(s => s !== stage)
        : [...prev.stage, stage]
    }));
  };

  const updateEligibility = (index: number, field: 'ok' | 'text', value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      eligibility: prev.eligibility.map((e, i) => i === index ? { ...e, [field]: value } : e)
    }));
  };

  const addEligibilityRow = () => {
    setFormData(prev => ({
      ...prev,
      eligibility: [...prev.eligibility, { ok: true, text: '' }]
    }));
  };

  const removeEligibilityRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      eligibility: prev.eligibility.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]">
          <div>
            <h2 className="text-xl font-bold">Submit an Opportunity</h2>
            <p className="text-sm text-white/50 mt-1">We'll review your submission within 48 hours before it goes live.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Programme Details */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Programme Details *</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm text-white/70 mb-2">Organisation Name</label>
                <input
                  type="text"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  placeholder="e.g. European Innovation Council"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm text-white/70 mb-2">Programme Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. EIC Accelerator 2027"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Funding Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00c853]"
                >
                  <option value="">Select type...</option>
                  {FUNDING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Geography</label>
                <select
                  value={formData.geo}
                  onChange={(e) => setFormData({ ...formData, geo: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00c853]"
                >
                  <option value="">Select geography...</option>
                  {GEOGRAPHIES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Funding Amount</label>
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. Up to €2.5M"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Application Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#00c853]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-white/70 mb-2">Application URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                />
              </div>
            </div>
          </div>

          {/* Eligible Stages */}
          <div>
            <label className="block text-sm text-white/70 mb-3">Eligible Stages *</label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map(stage => (
                <button
                  key={stage}
                  type="button"
                  onClick={() => toggleStage(stage)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.stage.includes(stage)
                      ? 'bg-[#00c853]/20 text-[#00c853] border border-[#00c853]/50'
                      : 'bg-[#0a0a0a] text-white/50 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Description</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Short Description * <span className="text-white/40 font-normal">(shown in directory)</span></label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  placeholder="One compelling paragraph — what is this, and why should founders care?"
                  maxLength={280}
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853] resize-none"
                />
                <p className="text-right text-xs text-white/40 mt-1">{formData.desc.length} / 280</p>
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Full Description</label>
                <textarea
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  placeholder="Detailed description, process, timeline, what makes this opportunity unique..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Eligibility Criteria</h3>
            <p className="text-sm text-white/50 mb-4">Add criteria with ✓ for requirements and ✗ for exclusions.</p>
            <div className="space-y-3">
              {formData.eligibility.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex rounded-lg overflow-hidden border border-white/10">
                    <button
                      type="button"
                      onClick={() => updateEligibility(i, 'ok', true)}
                      className={`px-3 py-2 text-sm ${item.ok ? 'bg-[#00c853]/20 text-[#00c853]' : 'bg-[#0a0a0a] text-white/50'}`}
                    >
                      ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => updateEligibility(i, 'ok', false)}
                      className={`px-3 py-2 text-sm ${!item.ok ? 'bg-red-500/20 text-red-400' : 'bg-[#0a0a0a] text-white/50'}`}
                    >
                      ✗
                    </button>
                  </div>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateEligibility(i, 'text', e.target.value)}
                    placeholder="e.g. Must be incorporated in EU member state"
                    className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                  />
                  <button
                    type="button"
                    onClick={() => removeEligibilityRow(i)}
                    className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addEligibilityRow}
              className="mt-3 flex items-center gap-2 text-sm text-[#00c853] hover:text-[#00c853]/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Criterion
            </button>
          </div>

          {/* Contact & Discovery */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Contact & Discovery (Optional)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Contact Email</label>
                <input
                  type="email"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="applications@yourorg.com"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Organisation Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://yourorg.com"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-white/70 mb-2">Tags <span className="text-white/40 font-normal">(comma-separated)</span></label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. Deep Tech, Climate, Non-dilutive"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853]"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 px-4 py-3 rounded-lg">{error}</p>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10 bg-[#0a0a0a]">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
          >
            Submit for Review →
          </button>
        </div>
      </div>
    </div>
  );
}
