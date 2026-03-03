import type { Opportunity } from '@/types';

export const opportunities: Opportunity[] = [
  {
    id: 1,
    logo: "🇪🇺",
    name: "EIC Accelerator 2026",
    org: "European Innovation Council",
    type: "Government Grant",
    stage: ["Pre-seed", "Seed", "Series A"],
    geo: "Europe",
    amount: "Up to €2.5M",
    deadline: "May 6, 2026",
    urgent: false,
    status: "active",
    verified: "Today",
    matchScore: 91,
    communityRating: 4.6,
    reviewCount: 142,
    tags: ["Deep Tech", "Hardware", "Climate", "Europe"],
    desc: "The EIC Accelerator supports individual SMEs and startups to develop and scale up breakthrough innovations with EU-wide and global potential. Grant + equity investment up to €15M.",
    fullDesc: "The EIC Accelerator provides a combination of grant financing (up to €2.5M) and equity investment (up to €15M) for high-impact startups in deep tech, cleantech, and digital.",
    eligibility: [
      { ok: true, text: "SMEs in EU Member State or associated country" },
      { ok: true, text: "TRL 5–6 minimum" },
      { ok: true, text: "Deep tech, cleantech, healthtech, or digital" },
      { ok: false, text: "Not open to large enterprises as lead applicants" }
    ],
    reviews: [
      { name: "Elena K.", rating: 5, date: "Feb 2026", text: "Long process but worth it. TRL documentation is critical." },
      { name: "David T.", rating: 4, date: "Jan 2026", text: "Business innovation component matters as much as tech." }
    ],
    isNew: false,
    applyUrl: "https://ec.europa.eu/info/funding-tenders"
  },
  {
    id: 2,
    logo: "🚀",
    name: "Y Combinator S26",
    org: "Y Combinator",
    type: "Accelerator",
    stage: ["Pre-seed", "Seed"],
    geo: "Global",
    amount: "$500K",
    deadline: "Apr 22, 2026",
    urgent: false,
    status: "active",
    verified: "Yesterday",
    matchScore: 87,
    communityRating: 4.8,
    reviewCount: 3102,
    tags: ["Accelerator", "Global", "Any Sector"],
    desc: "The world's most prestigious startup accelerator. $500K for 7% equity. 3-month programme in San Francisco ending with Demo Day to 5,000+ investors.",
    fullDesc: "Y Combinator invests $500,000 in exchange for 7% equity. Summer 2026 batch runs July–September in San Francisco. Unlimited access to YC partners, alumni, and the most powerful investor network on earth.",
    eligibility: [
      { ok: true, text: "Any stage — pre-launch to Series A" },
      { ok: true, text: "Any sector or geography" },
      { ok: false, text: "Prior raise over $2M rarely accepted" }
    ],
    reviews: [
      { name: "James H.", rating: 5, date: "Feb 2026", text: "The network opens every door." },
      { name: "Mei L.", rating: 5, date: "Jan 2026", text: "Be crystal clear on why you, why now." }
    ],
    isNew: true,
    applyUrl: "https://www.ycombinator.com/apply"
  },
  {
    id: 3,
    logo: "🇺🇸",
    name: "SBIR Phase I — NSF",
    org: "National Science Foundation",
    type: "Government Grant",
    stage: ["Pre-seed", "Seed"],
    geo: "USA",
    amount: "Up to $275K",
    deadline: "Jun 3, 2026",
    urgent: false,
    status: "active",
    verified: "3 days ago",
    matchScore: 78,
    communityRating: 3.9,
    reviewCount: 416,
    tags: ["Government", "USA", "Non-dilutive", "R&D"],
    desc: "NSF SBIR Phase I funds early-stage R&D for US small businesses. Non-dilutive, equity-free. Strong preference for deep tech and scientific innovation with commercial potential.",
    fullDesc: "NSF SBIR Phase I awards support feasibility research for innovations with strong commercial and societal potential. Awards up to $275K over 6–12 months.",
    eligibility: [
      { ok: true, text: "US-based small business under 500 employees" },
      { ok: true, text: "51%+ US citizen or permanent resident owned" },
      { ok: false, text: "Non-US entities not eligible" },
      { ok: false, text: "Pure software without scientific basis rarely funded" }
    ],
    reviews: [
      { name: "Dr. Anita W.", rating: 4, date: "Feb 2026", text: "Bureaucratic but genuinely non-dilutive." },
      { name: "Carlos M.", rating: 3, date: "Jan 2026", text: "Give yourself twice the time you think you need." }
    ],
    isNew: false,
    applyUrl: "https://www.sbir.gov/apply"
  },
  {
    id: 4,
    logo: "⚡",
    name: "Techstars SF 2026",
    org: "Techstars",
    type: "Accelerator",
    stage: ["Pre-seed", "Seed"],
    geo: "USA",
    amount: "$120K",
    deadline: "May 6, 2026",
    urgent: false,
    status: "active",
    verified: "2 days ago",
    matchScore: 83,
    communityRating: 4.2,
    reviewCount: 412,
    tags: ["Accelerator", "USA", "San Francisco", "B2B"],
    desc: "Techstars San Francisco accelerator — $120K investment, 3-month mentorship-driven programme, culminating in Demo Day before 500+ investors.",
    fullDesc: "Techstars SF connects startups with world-class mentors and investors. The 3-month programme ends with Demo Day and lifetime access to the Techstars global network.",
    eligibility: [
      { ok: true, text: "Pre-seed to seed stage" },
      { ok: true, text: "Any sector, generalist programme" },
      { ok: true, text: "Willing to be in SF for 3 months" },
      { ok: false, text: "Consumer apps without network effects rarely selected" }
    ],
    reviews: [
      { name: "Sofia K.", rating: 4, date: "Feb 2026", text: "The mentor network is exceptional." },
      { name: "Wei Z.", rating: 5, date: "Jan 2026", text: "Best 3 months of our startup journey." }
    ],
    isNew: true,
    applyUrl: "https://www.techstars.com/accelerators"
  },
  {
    id: 5,
    logo: "🌱",
    name: "Breakthrough Energy Fellows Cohort 6",
    org: "Breakthrough Energy",
    type: "Foundation",
    stage: ["Pre-seed", "Seed"],
    geo: "Global",
    amount: "Up to $3M",
    deadline: "Rolling 2026",
    urgent: false,
    status: "active",
    verified: "1 week ago",
    matchScore: 62,
    communityRating: 4.5,
    reviewCount: 87,
    tags: ["Climate", "Clean Energy", "Global", "Non-dilutive"],
    desc: "Breakthrough Energy Fellows provides up to $3M non-dilutive funding for early-stage climate tech innovators. Cohort 6 begins September 2026.",
    fullDesc: "Supports scientists and entrepreneurs working on electricity, transportation, agriculture, manufacturing, and buildings. Full-time 1-year fellowship with stipend, lab costs, and expert network.",
    eligibility: [
      { ok: true, text: "Climate tech focus — 500M+ ton CO₂ reduction potential" },
      { ok: true, text: "Pre-seed to seed stage, under $2M raised" },
      { ok: false, text: "Pure software without emissions impact not eligible" }
    ],
    reviews: [
      { name: "Dr. Fatima A.", rating: 5, date: "Jan 2026", text: "Technical review is rigorous but evaluates real impact." },
      { name: "Ravi P.", rating: 4, date: "Dec 2025", text: "They want to see you've thought seriously about scale." }
    ],
    isNew: false,
    applyUrl: "https://befellows.smapply.org/"
  },
  {
    id: 6,
    logo: "🏛️",
    name: "Innovate UK Smart Grant",
    org: "UK Research & Innovation",
    type: "Government Grant",
    stage: ["Pre-seed", "Seed", "Series A"],
    geo: "UK",
    amount: "£25K–£500K",
    deadline: "Apr 1, 2026",
    urgent: false,
    status: "active",
    verified: "4 days ago",
    matchScore: 71,
    communityRating: 3.7,
    reviewCount: 623,
    tags: ["Government", "UK", "R&D", "Non-dilutive"],
    desc: "Innovate UK's flagship open funding competition for game-changing R&D innovations with major UK economic impact. Up to £500K for single companies.",
    fullDesc: "Smart is Innovate UK's open competition targeting disruptive innovations. Single companies can apply for £25K–£500K. Collaborative projects can receive more.",
    eligibility: [
      { ok: true, text: "UK-registered company" },
      { ok: true, text: "R&D-led, clearly disruptive innovation" },
      { ok: false, text: "Non-UK entities not eligible" }
    ],
    reviews: [
      { name: "Ben A.", rating: 4, date: "Feb 2026", text: "Focus on UK economic impact, not just technical novelty." },
      { name: "Laura T.", rating: 3, date: "Jan 2026", text: "Very competitive. A consultant made a huge difference." }
    ],
    isNew: false,
    applyUrl: "https://apply-for-innovation-funding.service.gov.uk"
  },
  {
    id: 7,
    logo: "👼",
    name: "500 Global Flagship Fund",
    org: "500 Global",
    type: "VC / Angel",
    stage: ["Pre-seed", "Seed"],
    geo: "Global",
    amount: "$150K–$250K",
    deadline: "Rolling",
    urgent: false,
    status: "active",
    verified: "5 days ago",
    matchScore: 76,
    communityRating: 4.1,
    reviewCount: 288,
    tags: ["Angel", "Global", "Pre-seed", "Seed"],
    desc: "500 Global invests in pre-seed and seed startups worldwide. One of the most prolific early-stage funds globally with 2,800+ portfolio companies across 80 countries.",
    fullDesc: "500 Global's flagship fund invests $150K–$250K at pre-seed and seed stages. Strong networks in Southeast Asia, Latin America, Middle East, and the US.",
    eligibility: [
      { ok: true, text: "Pre-seed or seed stage, any geography" },
      { ok: true, text: "Strong founding team with evidence of execution" },
      { ok: false, text: "Not suitable for pre-revenue ideas without traction" }
    ],
    reviews: [
      { name: "Ama S.", rating: 4, date: "Feb 2026", text: "Fast decision-making and great LATAM network." },
      { name: "Kiran R.", rating: 4, date: "Jan 2026", text: "Good for internationally minded founders." }
    ],
    isNew: false,
    applyUrl: "https://500.co/thefund"
  },
  {
    id: 8,
    logo: "🌐",
    name: "Google for Startups Accelerator",
    org: "Google",
    type: "Accelerator",
    stage: ["Seed", "Series A"],
    geo: "Global",
    amount: "Up to $350K in credits + equity-free",
    deadline: "Rolling 2026",
    urgent: false,
    status: "active",
    verified: "2 days ago",
    matchScore: 80,
    communityRating: 4.4,
    reviewCount: 521,
    tags: ["Accelerator", "Global", "AI", "Tech"],
    desc: "Google for Startups Accelerator is a 3-month equity-free programme for AI-first startups. Includes up to $350K in Google Cloud credits, technical mentorship from Googlers, and investor access.",
    fullDesc: "The programme focuses on AI/ML startups. You get access to Google engineers, product experts, and a global demo event. Zero equity taken.",
    eligibility: [
      { ok: true, text: "AI-first or ML-driven product" },
      { ok: true, text: "Seed to Series A stage" },
      { ok: true, text: "Any country — multiple regional cohorts" },
      { ok: false, text: "Non-tech companies rarely accepted" }
    ],
    reviews: [
      { name: "Priya N.", rating: 5, date: "Feb 2026", text: "Google Cloud credits alone are worth $350K. The engineering mentorship is world-class." },
      { name: "Tobias L.", rating: 4, date: "Jan 2026", text: "Excellent for AI startups needing compute infrastructure." }
    ],
    isNew: true,
    applyUrl: "https://startup.google.com/programs/accelerator/"
  },
  {
    id: 9,
    logo: "🏗️",
    name: "a16z Speedrun — Pre-seed",
    org: "Andreessen Horowitz",
    type: "VC / Angel",
    stage: ["Pre-seed"],
    geo: "USA",
    amount: "$1M–$3M",
    deadline: "Rolling",
    urgent: false,
    status: "active",
    verified: "1 week ago",
    matchScore: 68,
    communityRating: 4.3,
    reviewCount: 174,
    tags: ["Angel", "Pre-seed", "USA", "Consumer", "B2B"],
    desc: "a16z Speedrun is a pre-seed programme from one of the world's top VC firms. Fast decisions, large initial checks, and access to the full a16z platform.",
    fullDesc: "Andreessen Horowitz's early-stage programme invests $1M–$3M at pre-seed in exceptional founding teams. Focus on software, AI, crypto, fintech, and consumer.",
    eligibility: [
      { ok: true, text: "Pre-seed stage, usually pre-revenue" },
      { ok: true, text: "Based in or willing to relocate to USA" },
      { ok: false, text: "Hardware-only companies rarely funded" }
    ],
    reviews: [
      { name: "Leo K.", rating: 5, date: "Jan 2026", text: "The platform support is unreal. Portfolio intros opened our seed round." },
      { name: "Hannah G.", rating: 4, date: "Dec 2025", text: "Fast process. They know quickly if they're interested." }
    ],
    isNew: false,
    applyUrl: "https://a16z.com/speedrun/"
  },
  {
    id: 10,
    logo: "🦁",
    name: "Antler Global Residency",
    org: "Antler",
    type: "Accelerator",
    stage: ["Pre-seed"],
    geo: "Global",
    amount: "$200K–$250K",
    deadline: "Rolling 2026",
    urgent: false,
    status: "active",
    verified: "3 days ago",
    matchScore: 73,
    communityRating: 4.0,
    reviewCount: 298,
    tags: ["Accelerator", "Pre-seed", "Global", "Co-founder"],
    desc: "Antler is a global day-zero investor that helps exceptional people build companies from scratch. 10-week residency with $200K–$250K for 10–12% equity.",
    fullDesc: "Antler operates in 30+ cities. You join as an individual or team, go through an intensive co-founding and validation period, then pitch for investment. 10-12% equity for $200K–$250K.",
    eligibility: [
      { ok: true, text: "Individuals or early teams — even pre-idea" },
      { ok: true, text: "Any sector and any geography" },
      { ok: false, text: "Not suitable for post-seed companies" }
    ],
    reviews: [
      { name: "Yuki T.", rating: 4, date: "Feb 2026", text: "Great if you're looking for a co-founder. The residency is intense but clarifying." },
      { name: "Obi M.", rating: 4, date: "Jan 2026", text: "Good network across Africa and Asia." }
    ],
    isNew: true,
    applyUrl: "https://www.antler.co/apply"
  },
  {
    id: 11,
    logo: "💡",
    name: "Founders Factory Accelerator",
    org: "Founders Factory",
    type: "Accelerator",
    stage: ["Pre-seed", "Seed"],
    geo: "Europe",
    amount: "£250K + studio support",
    deadline: "Rolling 2026",
    urgent: false,
    status: "active",
    verified: "5 days ago",
    matchScore: 65,
    communityRating: 4.1,
    reviewCount: 142,
    tags: ["Accelerator", "Europe", "Studio", "B2B"],
    desc: "Founders Factory is a global startup studio and accelerator backed by L'Oréal, Aviva, and Holtzbrinck. £250K investment plus hands-on build support for 6 months.",
    fullDesc: "Founders Factory has two tracks: accelerator (external startups, £250K) and studio (FF-built companies). Deep industry partnerships in media, beauty, finance, and mobility.",
    eligibility: [
      { ok: true, text: "Pre-seed to seed, early stage" },
      { ok: true, text: "UK or European companies preferred" },
      { ok: false, text: "Consumer hardware difficult without strong IP" }
    ],
    reviews: [
      { name: "Rachel W.", rating: 4, date: "Jan 2026", text: "The corporate partnership access is genuinely unique." },
      { name: "Dayo A.", rating: 4, date: "Dec 2025", text: "Good operational support, not just money." }
    ],
    isNew: false,
    applyUrl: "https://foundersfactory.com/accelerate/"
  },
  {
    id: 12,
    logo: "🌍",
    name: "Africa Seed Fund — Partech",
    org: "Partech Africa",
    type: "VC / Angel",
    stage: ["Seed"],
    geo: "Africa",
    amount: "$1M–$5M",
    deadline: "Rolling",
    urgent: false,
    status: "active",
    verified: "1 week ago",
    matchScore: 55,
    communityRating: 4.2,
    reviewCount: 63,
    tags: ["Angel", "Africa", "Seed", "Emerging Markets"],
    desc: "Partech Africa invests $1M–$5M at seed stage in tech startups across Sub-Saharan Africa. One of the continent's most active and respected seed funds.",
    fullDesc: "Partech Africa focuses on fintech, agritech, health, and mobility across Nigeria, Kenya, Francophone Africa, and South Africa.",
    eligibility: [
      { ok: true, text: "Tech startup with African market focus" },
      { ok: true, text: "Seed stage with some traction" },
      { ok: false, text: "Non-African market focus not considered" }
    ],
    reviews: [
      { name: "Chidi O.", rating: 5, date: "Feb 2026", text: "Best fund for pan-African ambitions. Deep continent expertise." },
      { name: "Amara D.", rating: 4, date: "Jan 2026", text: "Strong Francophone Africa network is rare." }
    ],
    isNew: false,
    applyUrl: "https://partechpartners.com/africa"
  },
  {
    id: 13,
    logo: "🔬",
    name: "Wellcome Leap R&D Fund",
    org: "Wellcome Trust",
    type: "Foundation",
    stage: ["Pre-seed", "Seed"],
    geo: "Global",
    amount: "Up to $1M+",
    deadline: "Rolling 2026",
    urgent: false,
    status: "active",
    verified: "4 days ago",
    matchScore: 58,
    communityRating: 4.6,
    reviewCount: 47,
    tags: ["Foundation", "Global", "Health", "Non-dilutive", "R&D"],
    desc: "Wellcome Leap funds ambitious R&D programmes that could deliver transformative health impact. Non-dilutive. Strong focus on biology, neuroscience, and quantum biology.",
    fullDesc: "Wellcome Leap's challenge-based programmes fund high-risk, high-reward health innovations. Each programme has specific milestones and is intensely milestone-driven.",
    eligibility: [
      { ok: true, text: "University spinouts, startups, or research teams" },
      { ok: true, text: "Bold health or biomedical technology focus" },
      { ok: false, text: "Commercial software without research component not eligible" }
    ],
    reviews: [
      { name: "Dr. James P.", rating: 5, date: "Jan 2026", text: "One of the best non-dilutive health funders globally. Very mission-driven." },
      { name: "Sara T.", rating: 4, date: "Dec 2025", text: "Rigorous milestones but fair and supportive." }
    ],
    isNew: false,
    applyUrl: "https://wellcomeleap.org/programs/"
  },
  {
    id: 14,
    logo: "🏦",
    name: "SBA Small Business Loan (7a)",
    org: "US Small Business Administration",
    type: "Government Grant",
    stage: ["Seed", "Series A"],
    geo: "USA",
    amount: "Up to $5M",
    deadline: "Rolling",
    urgent: false,
    status: "active",
    verified: "1 week ago",
    matchScore: 60,
    communityRating: 3.5,
    reviewCount: 892,
    tags: ["Government", "USA", "Loan", "Non-dilutive"],
    desc: "The SBA 7(a) loan programme is the most common government-backed small business loan in the USA. Up to $5M with favourable terms. Not a grant — must be repaid.",
    fullDesc: "SBA 7(a) loans are partially guaranteed by the federal government, allowing banks to offer better terms to small businesses that might not otherwise qualify.",
    eligibility: [
      { ok: true, text: "US-registered for-profit business" },
      { ok: true, text: "Meets SBA size standards (varies by industry)" },
      { ok: false, text: "Non-US businesses not eligible" },
      { ok: false, text: "Not suitable for pure R&D pre-revenue companies" }
    ],
    reviews: [
      { name: "Maria F.", rating: 4, date: "Feb 2026", text: "Good rates if you qualify. Bank relationship matters a lot." },
      { name: "Derek W.", rating: 3, date: "Jan 2026", text: "Paperwork is significant but worth it for the rates." }
    ],
    isNew: false,
    applyUrl: "https://www.sba.gov/funding-programs/loans/7a-loans"
  },
  {
    id: 15,
    logo: "🧬",
    name: "Schmidt Futures Innovation Fund",
    org: "Schmidt Futures",
    type: "Foundation",
    stage: ["Pre-seed", "Seed"],
    geo: "Global",
    amount: "$100K–$1M",
    deadline: "Rolling 2026",
    urgent: false,
    status: "active",
    verified: "3 days ago",
    matchScore: 64,
    communityRating: 4.4,
    reviewCount: 38,
    tags: ["Foundation", "Global", "Science", "Non-dilutive"],
    desc: "Schmidt Futures funds people and projects that leverage talent and technology to benefit humanity — especially at the intersection of AI, biology, and climate.",
    fullDesc: "Eric Schmidt's philanthropic initiative funds breakthrough science-led ventures. They back exceptional individuals who work at the frontier of AI, computational biology, and climate solutions.",
    eligibility: [
      { ok: true, text: "Science-led innovation with societal benefit" },
      { ok: true, text: "Global — no geography restriction" },
      { ok: false, text: "Business-only plays without scientific underpinning not funded" }
    ],
    reviews: [
      { name: "Dr. Yara M.", rating: 5, date: "Jan 2026", text: "Best funder for scientist-entrepreneurs. True long-term thinking." },
      { name: "Eric B.", rating: 4, date: "Dec 2025", text: "Exceptional network access in AI and bio." }
    ],
    isNew: true,
    applyUrl: "https://schmidtfutures.com/our-work/apply/"
  },
  {
    id: 16,
    logo: "🔥",
    name: "First Round Capital — Seed",
    org: "First Round Capital",
    type: "VC / Angel",
    stage: ["Seed"],
    geo: "USA",
    amount: "$500K–$1.5M",
    deadline: "Rolling",
    urgent: false,
    status: "active",
    verified: "2 days ago",
    matchScore: 72,
    communityRating: 4.5,
    reviewCount: 319,
    tags: ["Angel", "Seed", "USA", "B2B", "Consumer"],
    desc: "First Round Capital is one of the most founder-friendly seed funds. Famous for investments in Uber, Square, and Warby Parker. Active seed investor in 2026.",
    fullDesc: "FRC invests $500K–$1.5M at seed stage across B2B software, consumer, fintech, and marketplace businesses. Known for operational support and community.",
    eligibility: [
      { ok: true, text: "Seed stage, US-based preferred" },
      { ok: true, text: "Software-led business model" },
      { ok: false, text: "Hardware or non-tech companies rarely funded" }
    ],
    reviews: [
      { name: "Alex P.", rating: 5, date: "Feb 2026", text: "The community platform is worth as much as the money." },
      { name: "Julia C.", rating: 5, date: "Jan 2026", text: "Most founder-friendly seed fund. They actually help." }
    ],
    isNew: false,
    applyUrl: "https://firstround.com/apply/"
  },
  {
    id: 17,
    logo: "🌏",
    name: "Sequoia Arc — Global Seed",
    org: "Sequoia Capital",
    type: "VC / Angel",
    stage: ["Pre-seed", "Seed"],
    geo: "Global",
    amount: "Up to $1M",
    deadline: "Rolling 2026",
    urgent: false,
    status: "active",
    verified: "4 days ago",
    matchScore: 69,
    communityRating: 4.7,
    reviewCount: 201,
    tags: ["Angel", "Global", "Pre-seed", "Seed", "AI"],
    desc: "Sequoia Arc is Sequoia's global pre-seed and seed programme for early-stage companies. Equity investment plus intensive support across the US, Europe, India, and Southeast Asia.",
    fullDesc: "Sequoia Arc runs regular global cohorts with intensive mentorship, peer networks, and follow-on access to Sequoia's main fund. Focus on AI, infrastructure, and consumer.",
    eligibility: [
      { ok: true, text: "Pre-seed or seed stage" },
      { ok: true, text: "Global — US, EU, India, SEA cohorts available" },
      { ok: false, text: "Post-Series A not eligible" }
    ],
    reviews: [
      { name: "Nina K.", rating: 5, date: "Feb 2026", text: "The brand alone opens every door. Arc is the best entry point." },
      { name: "Arjun S.", rating: 4, date: "Jan 2026", text: "Cohort community is exceptional. Strong India programme." }
    ],
    isNew: true,
    applyUrl: "https://www.sequoiacap.com/arc/"
  },
  {
    id: 18,
    logo: "💼",
    name: "Acumen Academy Fellowship",
    org: "Acumen",
    type: "Foundation",
    stage: ["Pre-seed", "Seed"],
    geo: "Global",
    amount: "$60K non-dilutive + network",
    deadline: "Mar 31, 2026",
    urgent: false,
    status: "active",
    verified: "5 days ago",
    matchScore: 52,
    communityRating: 4.3,
    reviewCount: 76,
    tags: ["Foundation", "Global", "Impact", "Non-dilutive", "Social Enterprise"],
    desc: "Acumen Fellows is a year-long leadership and funding programme for founders building companies that serve low-income communities. $60K non-dilutive stipend plus global cohort.",
    fullDesc: "Acumen's fellowship combines $60K in non-dilutive support with intensive leadership development and a global network of impact investors and social enterprise leaders.",
    eligibility: [
      { ok: true, text: "Social enterprise or impact-first business" },
      { ok: true, text: "Any geography — global cohorts across Africa, Asia, Americas" },
      { ok: false, text: "Not suitable for pure profit-first businesses without social mission" }
    ],
    reviews: [
      { name: "Amira B.", rating: 5, date: "Jan 2026", text: "Transformative for impact founders. The peer network lasts forever." },
      { name: "Samuel L.", rating: 4, date: "Dec 2025", text: "The leadership curriculum is genuinely world-class." }
    ],
    isNew: false,
    applyUrl: "https://acumen.org/fellowships/"
  }
];

export const getTypeIcon = (type: string): string => {
  const t = type.toLowerCase();
  if (t.includes('accelerator')) return '⚡';
  if (t.includes('government') || t.includes('grant')) return '🏛️';
  if (t.includes('vc') || t.includes('angel')) return '👼';
  if (t.includes('foundation')) return '🔬';
  return '💼';
};

export const getTypeChipClass = (type: string): string => {
  const t = type.toLowerCase();
  if (t.includes('accelerator')) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  if (t.includes('government') || t.includes('grant')) return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  if (t.includes('vc') || t.includes('angel')) return 'bg-green-500/10 text-green-400 border-green-500/30';
  if (t.includes('foundation')) return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
  return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
};
