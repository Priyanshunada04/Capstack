import { useState } from 'react';
import { Check } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (selections: { sector: string[]; stage: string; geo: string }) => void;
  onSkip: () => void;
}

const SECTORS = [
  { icon: '🤖', label: 'AI / ML' },
  { icon: '🌱', label: 'Climate Tech' },
  { icon: '🏥', label: 'Health / Bio' },
  { icon: '💰', label: 'Fintech' },
  { icon: '🔬', label: 'Deep Tech' },
  { icon: '🛍', label: 'Consumer' },
  { icon: '🏢', label: 'B2B SaaS' },
  { icon: '🌍', label: 'Impact / Social' },
  { icon: '⚡', label: 'Energy' },
  { icon: '🚗', label: 'Mobility' },
  { icon: '🎮', label: 'Gaming / Media' },
];

const STAGES = [
  { icon: '💡', label: 'Idea stage', desc: "Haven't built anything yet" },
  { icon: '🛠', label: 'Building MVP', desc: 'Pre-revenue, under $50K raised' },
  { icon: '🌱', label: 'Pre-seed', desc: 'Early traction, raising first round' },
  { icon: '🌿', label: 'Seed', desc: '$250K–$2M raised' },
  { icon: '🚀', label: 'Series A+', desc: '$2M+ raised' },
];

const GEOGRAPHIES = [
  { icon: '🇺🇸', label: 'United States' },
  { icon: '🇬🇧', label: 'United Kingdom' },
  { icon: '🇪🇺', label: 'Europe (EU)' },
  { icon: '🇮🇳', label: 'India' },
  { icon: '🌍', label: 'Africa' },
  { icon: '🌏', label: 'Southeast Asia' },
  { icon: '🇨🇦', label: 'Canada' },
  { icon: '🌐', label: 'Global / Remote' },
];

export function OnboardingModal({ isOpen, onComplete, onSkip }: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState('');
  const [selectedGeo, setSelectedGeo] = useState('');

  if (!isOpen) return null;

  const totalSteps = 4;
  const progress = (step / (totalSteps - 1)) * 100;

  const toggleSector = (sector: string) => {
    setSelectedSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      onComplete({
        sector: selectedSectors,
        stage: selectedStage,
        geo: selectedGeo
      });
    }
  };

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return selectedSectors.length > 0;
    if (step === 2) return selectedStage !== '';
    if (step === 3) return selectedGeo !== '';
    return true;
  };

  const steps = [
    {
      title: 'Welcome to Capstack 🎉',
      subtitle: "Let's personalize your funding matches in 3 quick steps.",
      content: (
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-[#00c853]/20 flex items-center justify-center text-lg">🔍</div>
            <div>
              <p className="font-medium">Browse 2,400+ verified opportunities</p>
              <p className="text-sm text-white/50">Every listing is hand-verified and up-to-date</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-[#00c853]/20 flex items-center justify-center text-lg">✦</div>
            <div>
              <p className="font-medium">Get personalized match scores</p>
              <p className="text-sm text-white/50">See how well each opportunity fits your startup</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-[#00c853]/20 flex items-center justify-center text-lg">📊</div>
            <div>
              <p className="font-medium">Track all applications in one place</p>
              <p className="text-sm text-white/50">Never miss a deadline with our kanban board</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'What sector are you in?',
      subtitle: 'Select all that apply — we\'ll surface the most relevant grants and programmes.',
      content: (
        <div className="flex flex-wrap gap-2">
          {SECTORS.map((s) => (
            <button
              key={s.label}
              onClick={() => toggleSector(s.label)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedSectors.includes(s.label)
                  ? 'bg-[#00c853] text-black'
                  : 'bg-[#1a1a1a] text-white/70 border border-white/10 hover:border-[#00c853]/50'
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'What stage is your startup?',
      subtitle: "We'll use this to filter funding that's actually available to you right now.",
      content: (
        <div className="space-y-3">
          {STAGES.map((s) => (
            <button
              key={s.label}
              onClick={() => setSelectedStage(s.label)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                selectedStage === s.label
                  ? 'border-[#00c853] bg-[#00c853]/10'
                  : 'border-white/10 bg-[#1a1a1a] hover:border-white/20'
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <div className="flex-1">
                <p className={`font-medium ${selectedStage === s.label ? 'text-white' : 'text-white/80'}`}>{s.label}</p>
                <p className="text-sm text-white/50">{s.desc}</p>
              </div>
              {selectedStage === s.label && (
                <div className="w-6 h-6 rounded-full bg-[#00c853] flex items-center justify-center">
                  <Check className="w-4 h-4 text-black" />
                </div>
              )}
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Where is your startup based?',
      subtitle: 'Many grants are region-specific — this ensures you only see eligible opportunities.',
      content: (
        <div className="flex flex-wrap gap-2">
          {GEOGRAPHIES.map((g) => (
            <button
              key={g.label}
              onClick={() => setSelectedGeo(g.label)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedGeo === g.label
                  ? 'bg-[#00c853] text-black'
                  : 'bg-[#1a1a1a] text-white/70 border border-white/10 hover:border-[#00c853]/50'
              }`}
            >
              {g.icon} {g.label}
            </button>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-lg bg-[#141414] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-br from-[#0a0a0a] to-[#1a2a1a] overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00c853]/20 rounded-full blur-3xl" />
          
          {/* Step dots */}
          <div className="flex gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i <= step ? 'bg-[#00c853]' : 'bg-white/20'
                } ${i === step ? 'w-8' : 'w-4'}`}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-2">{steps[step].title}</h2>
          <p className="text-white/60">{steps[step].subtitle}</p>

          {/* Progress bar */}
          <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00c853] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {steps[step].content}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10">
          <button
            onClick={onSkip}
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-6 py-2.5 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === totalSteps - 1 ? 'See my matches →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
