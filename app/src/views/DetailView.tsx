import { ArrowLeft, ExternalLink, Bookmark, Flag, Check, X, Star, Sparkles } from 'lucide-react';
import type { Opportunity, ViewName } from '@/types';

interface DetailViewProps {
  opportunity: Opportunity;
  onBack: () => void;
  onAddToTracker: (opp: Opportunity) => void;
  onNavigate: (view: ViewName) => void;
}

export function DetailView({ opportunity, onBack, onAddToTracker, onNavigate }: DetailViewProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.round(rating) ? 'text-[#ffd700] fill-[#ffd700]' : 'text-white/20'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10">
        <div className="container-money py-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to opportunities
          </button>
        </div>
      </div>

      <div className="container-money py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Info */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-4xl flex-shrink-0">
                {opportunity.logo}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{opportunity.name}</h1>
                    <p className="text-white/60">{opportunity.org} · {opportunity.type} · {opportunity.geo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-[#00c853]/20 text-[#00c853] text-sm font-medium rounded-full border border-[#00c853]/30">
                      ● Active
                    </span>
                    {opportunity.isNew && (
                      <span className="px-3 py-1.5 bg-[#00c853] text-black text-sm font-bold rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {opportunity.tags?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 text-white/60 text-sm rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Panel */}
            <div className="mt-8 p-6 bg-[#0a0a0a] rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Trust & Verification</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-white/40 mb-1">Status</p>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#00c853]/20 text-[#00c853] text-sm rounded-full">
                    ● Active
                  </span>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Last Verified</p>
                  <p className="text-sm font-medium text-[#00c853]">✓ {opportunity.verified}</p>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Community Rating</p>
                  <div className="flex items-center gap-1">
                    {opportunity.communityRating ? renderStars(opportunity.communityRating) : <span className="text-sm text-white/50">No reviews</span>}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1">Reviews</p>
                  <p className="text-sm font-medium">{opportunity.reviewCount || 0} founders</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => onAddToTracker(opportunity)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all"
              >
                <Bookmark className="w-4 h-4" />
                Save to Tracker
              </button>
              <a
                href={opportunity.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a5c0a] text-white font-semibold rounded-xl hover:bg-[#236b0f] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Apply Now
              </a>
              <button
                onClick={() => alert('Thanks for flagging. We\'ll review within 24 hours.')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white/70 font-medium rounded-xl hover:bg-white/10 transition-all"
              >
                <Flag className="w-4 h-4" />
                Flag as outdated
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs text-white/40 mb-2">Amount</p>
              <p className="text-2xl font-bold text-[#00c853]">{opportunity.amount}</p>
            </div>
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs text-white/40 mb-2">Deadline</p>
              <p className="text-xl font-bold">{opportunity.deadline}</p>
            </div>
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-xs text-white/40 mb-2">Stage</p>
              <p className="text-lg font-bold">{opportunity.stage.join(' · ')}</p>
            </div>
          </div>

          {/* About */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-6">
            <h2 className="text-lg font-bold mb-4">About This Programme</h2>
            <p className="text-white/70 leading-relaxed">{opportunity.fullDesc || opportunity.desc}</p>
          </div>

          {/* Eligibility */}
          {opportunity.eligibility && opportunity.eligibility.length > 0 && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-6">
              <h2 className="text-lg font-bold mb-4">Eligibility Criteria</h2>
              <ul className="space-y-3">
                {opportunity.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      item.ok ? 'bg-[#00c853]/20 text-[#00c853]' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {item.ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    </span>
                    <span className="text-white/70">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Match Score */}
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Your Match</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00c853]/20 text-[#00c853] text-sm font-medium rounded-full border border-[#00c853]/30">
                <Sparkles className="w-4 h-4" />
                {opportunity.matchScore}% match
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-[#00c853] to-[#00a344] rounded-full transition-all duration-1000"
                style={{ width: `${opportunity.matchScore}%` }}
              />
            </div>
            <p className="text-sm text-white/50">
              Based on your profile: Seed-stage B2B, USA, $28K MRR, AI/Supply Chain.
            </p>
          </div>

          {/* Reviews */}
          {opportunity.reviews && opportunity.reviews.length > 0 && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-6">
              <h2 className="text-lg font-bold mb-4">Founder Reviews ({opportunity.reviewCount})</h2>
              <div className="space-y-4">
                {opportunity.reviews.map((review, i) => (
                  <div key={i} className="p-4 bg-[#0a0a0a] rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.name}</p>
                      <p className="text-xs text-white/40">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm text-white/60">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a2a1a] border border-[#00c853]/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to apply?</h3>
            <p className="text-white/60 mb-6">Complete your profile to unlock auto-fill for this application.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => onAddToTracker(opportunity)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all"
              >
                <Bookmark className="w-4 h-4" />
                Save to Tracker
              </button>
              <a
                href={opportunity.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a5c0a] text-white font-semibold rounded-xl hover:bg-[#236b0f] transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Apply Now
              </a>
              <button
                onClick={() => onNavigate('profile')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
              >
                Complete My Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
