import { ArrowRight, Search, CheckCircle, FileText, Shield, DollarSign } from 'lucide-react';
import type { ViewName } from '@/types';

interface LandingViewProps {
  onNavigate: (view: ViewName) => void;
  onOpenAuth: () => void;
}

const stats = [
  { value: '2,400+', label: 'Verified opportunities' },
  { value: '94%', label: 'Active & up-to-date' },
  { value: '8h', label: 'Saved per founder / week' },
  { value: '12K+', label: 'Founders using Capstack' },
];

const painPoints = [
  {
    icon: '🕳️',
    title: 'The Legitimacy Black Hole',
    desc: "You spend 3 hours researching a grant, write the application, then discover it's invite-only. Or it closed two years ago. Or it never existed properly at all.",
    quote: '"I applied to something I spent a week on. Turned out it was a dead programme." — Maya, SaaS Founder'
  },
  {
    icon: '🔄',
    title: 'The Re-entry Trap',
    desc: 'Every application is a fresh copy-paste marathon. Company description. Team bios. Revenue metrics. Pitch summary. Over and over, for every programme you apply to.',
    quote: '"I\'ve written my company description 40 times this year. It\'s demoralising." — Tom, Fintech Founder'
  },
  {
    icon: '🗂️',
    title: 'The Spreadsheet Chaos',
    desc: "Tracking 10+ applications across bookmarks, email threads, and a spreadsheet that's already out of date. Deadlines get missed. Follow-ups fall through the cracks.",
    quote: '"I genuinely forgot I\'d applied to one accelerator. Found the rejection email 3 months later." — Priya, Deep Tech Founder'
  }
];

const steps = [
  {
    num: '01',
    icon: <FileText className="w-6 h-6" />,
    title: 'Build your profile once',
    desc: 'Enter your startup details, team, traction, and pitch. It lives here permanently and powers everything else.'
  },
  {
    num: '02',
    icon: <Search className="w-6 h-6" />,
    title: 'Discover verified opportunities',
    desc: 'Search 2,400+ opportunities filtered to your stage, sector, and geography. Every listing is verified and dated.'
  },
  {
    num: '03',
    icon: <Shield className="w-6 h-6" />,
    title: 'Trust the signal',
    desc: "See verification badges, last-checked dates, and founder reviews before investing a single minute in an application."
  },
  {
    num: '04',
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Apply with pre-filled data',
    desc: 'Click Apply and your profile data auto-populates the form. Track applications in one dashboard with deadline alerts.'
  }
];

const miniCards = [
  { name: 'EIC Accelerator 2026', org: 'European Innovation Council', amount: '€2.5M', tags: ['Deep Tech', 'EU'], status: 'Active' },
  { name: 'Y Combinator S26', org: 'Y Combinator', amount: '$500K', tags: ['Accelerator', 'Global'], status: 'Active' },
  { name: 'SBIR Phase I Grant', org: 'US Department of Commerce', amount: '$275K', tags: ['Government', 'USA'], status: 'Active' },
];

export function LandingView({ onNavigate, onOpenAuth }: LandingViewProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00c853]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#ffd700]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-money relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00c853]/10 border border-[#00c853]/30">
                <DollarSign className="w-4 h-4 text-[#00c853]" />
                <span className="text-sm font-medium text-[#00c853]">2,400+ verified opportunities</span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1]">
                Stop wasting time.
                <br />
                Start <span className="gradient-text-green">finding</span> real funding.
              </h1>

              {/* Subhead */}
              <p className="text-xl text-white/60 max-w-lg">
                The only funding aggregator built around trust. Every opportunity is verified, dated, and reviewed by founders who've been there.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('directory')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(0,200,83,0.3)] transition-all"
                >
                  Browse Opportunities
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onOpenAuth}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Create Free Account
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-bold gradient-text-green">{stat.value}</p>
                    <p className="text-sm text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Floating Cards */}
            <div className="hidden lg:block relative h-[500px]">
              {miniCards.map((card, i) => (
                <div
                  key={i}
                  className="absolute w-80 bg-[#141414] border border-white/10 rounded-2xl p-5 shadow-2xl animate-fade-in"
                  style={{
                    top: `${i * 140}px`,
                    right: i === 1 ? '20px' : i === 2 ? '40px' : '0',
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold">{card.name}</p>
                      <p className="text-sm text-white/50">{card.org}</p>
                    </div>
                    <span className="text-[#00c853] font-bold">{card.amount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#00c853]/20 text-[#00c853] text-xs rounded-full">● {card.status}</span>
                    {card.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-1 bg-white/5 text-white/50 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="container-money">
          <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">The Problem We're Solving</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-16">
            Founders lose weeks.
            <br />
            <span className="text-white/60">Not hours — weeks.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="p-8 bg-[#141414] border border-white/10 rounded-2xl hover:border-white/20 transition-all"
              >
                <span className="text-4xl mb-6 block">{point.icon}</span>
                <h3 className="text-xl font-bold mb-4">{point.title}</h3>
                <p className="text-white/60 mb-6 leading-relaxed">{point.desc}</p>
                <p className="text-sm text-white/40 italic border-l-2 border-[#00c853] pl-4">{point.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container-money">
          <p className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">How Capstack Works</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-16">
            Research once. Apply faster.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="group p-8 bg-[#141414] border border-white/10 rounded-2xl hover:border-[#00c853]/30 transition-all"
              >
                <p className="text-5xl font-bold text-[#00c853]/40 mb-4 group-hover:text-[#00c853]/60 transition-colors">{step.num}</p>
                <div className="w-12 h-12 rounded-xl bg-[#00c853]/10 flex items-center justify-center text-[#00c853] mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-money">
          <div className="relative p-12 sm:p-16 bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-white/10 rounded-3xl text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00c853]/10 rounded-full blur-[100px]" />
            
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Stop researching. Start applying.
              </h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                Join 12,000+ founders who use Capstack to cut their funding research time by 8 hours a week.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={onOpenAuth}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(0,200,83,0.3)] transition-all"
                >
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('directory')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  Browse Opportunities
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container-money">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00c853] to-[#00a344] flex items-center justify-center">
                <span className="text-black font-bold text-sm">$</span>
              </div>
              <span className="text-xl font-bold">
                Cap<span className="text-[#00c853]">stack</span>
              </span>
            </div>
            <p className="text-sm text-white/40">© 2026 Capstack · Find. Verify. Apply.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
