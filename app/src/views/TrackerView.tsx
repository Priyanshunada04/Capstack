import { useState, useEffect } from 'react';
import { Calendar, Trash2, MessageSquare } from 'lucide-react';
import type { TrackerItem } from '@/types';
import type { useDatabase } from '@/hooks/useDatabase';

interface TrackerViewProps {
  currentUser: { id: string } | null;
  db: ReturnType<typeof useDatabase>;
  onOpenAuth: () => void;
}

const COLUMNS = [
  { id: 'saved', label: 'Saved', color: 'bg-blue-500', count: 0 },
  { id: 'inprogress', label: 'In Progress', color: 'bg-amber-500', count: 0 },
  { id: 'submitted', label: 'Submitted', color: 'bg-purple-500', count: 0 },
  { id: 'decision', label: 'Decision', color: 'bg-[#00c853]', count: 0 },
];

export function TrackerView({ currentUser, db, onOpenAuth }: TrackerViewProps) {
  const [items, setItems] = useState<TrackerItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<TrackerItem | null>(null);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (currentUser) {
      setItems(db.getTrackerItems(currentUser.id));
    }
  }, [currentUser, db]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Please sign in to view your tracker</p>
          <button
            onClick={onOpenAuth}
            className="px-6 py-3 bg-gradient-to-r from-[#00c853] to-[#00a344] text-black font-semibold rounded-xl"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const handleDragStart = (item: TrackerItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (status: string) => {
    if (!draggedItem) return;
    
    const updated = items.map(i => 
      String(i.oppId) === String(draggedItem.oppId) 
        ? { ...i, status: status as TrackerItem['status'] } 
        : i
    );
    setItems(updated);
    db.saveTrackerItems(currentUser.id, updated);
    setDraggedItem(null);
  };

  const handleDelete = (oppId: string | number) => {
    const updated = items.filter(i => String(i.oppId) !== String(oppId));
    setItems(updated);
    db.saveTrackerItems(currentUser.id, updated);
  };

  const handleSaveNote = (oppId: string | number) => {
    const updated = items.map(i => 
      String(i.oppId) === String(oppId) 
        ? { ...i, note: noteText } 
        : i
    );
    setItems(updated);
    db.saveTrackerItems(currentUser.id, updated);
    setEditingNote(null);
  };

  const getColumnItems = (status: string) => items.filter(i => i.status === status);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/10">
        <div className="container-money py-8">
          <h1 className="text-3xl font-bold mb-2">Application Tracker</h1>
          <p className="text-white/60">Drag cards between columns to track your progress.</p>
        </div>
      </div>

      <div className="container-money py-8">
        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map((col) => (
            <div
              key={col.id}
              className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${col.color}`} />
                    <span className="font-semibold">{col.label}</span>
                  </div>
                  <span className="text-sm text-white/40">{getColumnItems(col.id).length}</span>
                </div>
              </div>

              {/* Column Items */}
              <div className="p-3 space-y-3 min-h-[200px]">
                {getColumnItems(col.id).map((item) => (
                  <div
                    key={item.oppId}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 cursor-move hover:border-[#00c853]/30 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-lg bg-[#0a0a0a] flex items-center justify-center text-xl">
                        {item.logo}
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            setEditingNote(String(item.oppId));
                            setNoteText(item.note || '');
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.oppId)}
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-white/50 mb-3">{item.org}</p>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#00c853] font-medium">{item.amount}</span>
                      <span className="text-white/40 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.deadline}
                      </span>
                    </div>

                    {/* Note */}
                    {item.note && (
                      <div className="mt-3 p-2 bg-white/5 rounded-lg text-xs text-white/60">
                        {item.note}
                      </div>
                    )}

                    {/* Edit Note Modal */}
                    {editingNote === String(item.oppId) && (
                      <div className="mt-3">
                        <textarea
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add a note..."
                          className="w-full px-3 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00c853] resize-none"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleSaveNote(item.oppId)}
                            className="px-3 py-1 bg-[#00c853] text-black text-xs font-medium rounded-lg"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNote(null)}
                            className="px-3 py-1 bg-white/10 text-white/60 text-xs rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {getColumnItems(col.id).length === 0 && (
                  <div className="text-center py-8 text-white/30 text-sm">
                    Drop items here
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-[#141414] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-[#00c853]">💡</span> How to use your tracker
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-[#0a0a0a] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="font-medium">Saved</span>
              </div>
              <p className="text-white/50">Opportunities you've bookmarked but haven't started yet.</p>
            </div>
            <div className="p-4 bg-[#0a0a0a] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-medium">In Progress</span>
              </div>
              <p className="text-white/50">Applications you've started but haven't submitted.</p>
            </div>
            <div className="p-4 bg-[#0a0a0a] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="font-medium">Submitted</span>
              </div>
              <p className="text-white/50">Applications you've sent. Waiting for a response.</p>
            </div>
            <div className="p-4 bg-[#0a0a0a] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-[#00c853]" />
                <span className="font-medium">Decision</span>
              </div>
              <p className="text-white/50">Final outcomes — accepted, rejected, or withdrawn.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
