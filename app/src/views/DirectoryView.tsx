import { useState, useMemo } from 'react';
import { Search, Filter, MapPin, Calendar, Sparkles } from 'lucide-react';
import type { Opportunity } from '@/types';
import { getTypeIcon, getTypeChipClass } from '@/data/opportunities';

interface DirectoryViewProps {
  opportunities: Opportunity[];
  onOpenDetail: (opp: Opportunity) => void;
}

const FILTERS = {
  status: [
    { label: 'Active', count: 1842, checked: true },
    { label: 'Closing soon', count: 94, checked: false },
    { label: 'Closed', count: 386, checked: false },
  ],
  type: [
    { label: 'Accelerator', count: 412, checked: true },
    { label: 'Government Grant', count: 634, checked: true },
    { label: 'VC / Angel', count: 548, checked: true },
    { label: 'Foundation', count: 219, checked: true },
  ],
  stage: [
    { label: 'Pre-seed', count: 723, checked: true },
    { label: 'Seed', count: 891, checked: true },
    { label: 'Series A', count: 334, checked: false },
  ],
  geo: [
    { label: 'Global', count: 398, checked: true },
    { label: 'USA', count: 512, checked: true },
    { label: 'Europe', count: 487, checked: true },
    { label: 'UK', count: 203, checked: false },
  ],
};

export function DirectoryView({ opportunities, onOpenDetail }: DirectoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'match' | 'deadline' | 'amount'>('match');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    type: ['Accelerator', 'Government Grant', 'VC / Angel', 'Foundation'],
    stage: ['Pre-seed', 'Seed'],
    geo: ['Global', 'USA', 'Europe'],
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredOpportunities = useMemo(() => {
    let filtered = opportunities;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(o => 
        o.name.toLowerCase().includes(query) ||
        o.org.toLowerCase().includes(query) ||
        o.desc.toLowerCase().includes(query) ||
        o.tags?.some(t => t.toLowerCase().includes(query))
      );
    }

    // Type filter
    if (activeFilters.type.length > 0) {
      filtered = filtered.filter(o => activeFilters.type.some(t => o.type.includes(t)));
    }

    // Stage filter
    if (activeFilters.stage.length > 0) {
      filtered = filtered.filter(o => o.stage.some(s => activeFilters.stage.includes(s)));
    }

    // Geo filter
    if (activeFilters.geo.length > 0) {
      filtered = filtered.filter(o => activeFilters.geo.includes(o.geo));
    }

    // Sort
    if (sortBy === 'deadline') {
      filtered = [...filtered].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else if (sortBy === 'amount') {
      filtered = [...filtered].sort((a, b) => {
        const getNum = (s: string) => {
          const match = s.match(/[\d.]+/);
          return match ? parseFloat(match[0]) : 0;
        };
        return getNum(b.amount) - getNum(a.amount);
      });
    } else {
      filtered = [...filtered].sort((a, b) => b.matchScore - a.matchScore);
    }

    return filtered;
  }, [opportunities, searchQuery, activeFilters, sortBy]);

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10">
        <div className="container-money py-8">
          <h1 className="text-3xl font-bold mb-6">Find Funding</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, organisation, keyword..."
                className="w-full pl-12 pr-4 py-4 bg-[#141414] border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#00c853] transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[#141414] border border-white/10 rounded-xl text-white hover:border-[#00c853]/50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container-money py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {(showFilters || window.innerWidth >= 1024) && (
            <aside className="lg:w-64 space-y-8">
              {Object.entries(FILTERS).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">
                    {category === 'geo' ? 'Geography' : category}
                  </h3>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <label
                        key={item.label}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters[category]?.includes(item.label) || false}
                          onChange={() => toggleFilter(category, item.label)}
                          className="w-4 h-4 rounded border-white/20 bg-transparent text-[#00c853] focus:ring-[#00c853] focus:ring-offset-0"
                        />
                        <span className="flex-1 text-sm text-white/70">{item.label}</span>
                        <span className="text-xs text-white/40">{item.count}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </aside>
          )}

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-white/60">
                <span className="text-white font-semibold">{filteredOpportunities.length}</span> opportunities found
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-[#141414] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-[#00c853]"
              >
                <option value="match">Sort: Best Match</option>
                <option value="deadline">Sort: Deadline (soonest)</option>
                <option value="amount">Sort: Amount (highest)</option>
              </select>
            </div>

            {/* Opportunity Cards */}
            <div className="space-y-4">
              {filteredOpportunities.map((opp, i) => (
                <div
                  key={opp.id}
                  onClick={() => onOpenDetail(opp)}
                  className="group relative bg-[#141414] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00c853]/30 transition-all cursor-pointer"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* New Badge */}
                  {opp.isNew && (
                    <div className="absolute top-4 right-0 px-3 py-1 bg-[#00c853] text-black text-xs font-bold rounded-l-full">
                      NEW
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Logo */}
                      <div className="w-14 h-14 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                        {opp.logo}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-[#00c853] transition-colors">{opp.name}</h3>
                            <p className="text-sm text-white/50">{opp.org}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[#00c853] font-bold text-lg">{opp.amount}</p>
                          </div>
                        </div>

                        <p className="text-sm text-white/60 mt-3 line-clamp-2">{opp.desc}</p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getTypeChipClass(opp.type)}`}>
                            {getTypeIcon(opp.type)} {opp.type}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10">
                            <MapPin className="w-3 h-3" />
                            {opp.geo}
                          </span>
                          {opp.stage.slice(0, 1).map(s => (
                            <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/10">
                              {s}
                            </span>
                          ))}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 ml-auto">
                            <Sparkles className="w-3 h-3" />
                            {opp.matchScore}% match
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-white/40">
                            <Calendar className="w-3 h-3" />
                            {opp.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredOpportunities.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                  <Search className="w-10 h-10 text-white/30" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No opportunities found</h3>
                <p className="text-white/50">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
