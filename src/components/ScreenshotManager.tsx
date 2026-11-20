import React from 'react';
import { CheckSquare, Square, Maximize2, RotateCcw, Search } from 'lucide-react';
import { LabScreenshot, TaskId } from '../data/labData';

interface ScreenshotManagerProps {
  screenshots: LabScreenshot[];
  onToggleSelect: (id: string) => void;
  onUpdateScreenshot: (id: string, patch: Partial<LabScreenshot>) => void;
  onSelectRecommended: () => void;
  onSelectAll: () => void;
  onOpenLightbox: (screenshot: LabScreenshot) => void;
}

const TASK_FILTERS: { id: 'all' | TaskId; label: string }[] = [
  { id: 'all', label: 'All Tasks' },
  { id: 'task2', label: 'Task 2 · VM' },
  { id: 'task3', label: 'Task 3 · Storage' },
  { id: 'task4', label: 'Task 4 · Cloud SQL' },
  { id: 'task5', label: 'Task 5 · PHP App' },
  { id: 'task6', label: 'Task 6 · Image' },
];

export const ScreenshotManager: React.FC<ScreenshotManagerProps> = ({
  screenshots,
  onToggleSelect,
  onUpdateScreenshot,
  onSelectRecommended,
  onSelectAll,
  onOpenLightbox,
}) => {
  const [taskFilter, setTaskFilter] = React.useState<'all' | TaskId>('all');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'selected' | 'skipped'>('all');
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return screenshots
      .filter((item) => {
        if (taskFilter !== 'all' && item.taskId !== taskFilter) return false;
        if (statusFilter === 'selected' && !item.selected) return false;
        if (statusFilter === 'skipped' && item.selected) return false;
        if (
          q &&
          !item.title.toLowerCase().includes(q) &&
          !item.cleanFilename.toLowerCase().includes(q) &&
          !item.caption.toLowerCase().includes(q)
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => a.stepOrder - b.stepOrder);
  }, [screenshots, taskFilter, statusFilter, query]);

  const selectedCount = screenshots.filter((s) => s.selected).length;
  const recommendedCount = screenshots.filter((s) => s.recommended).length;

  return (
    <div className="space-y-5">
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Screenshot Curator & Renaming Map
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              {selectedCount} of {screenshots.length} uploaded screenshots selected for{' '}
              <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">./screenshots/</code> and{' '}
              <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">README.md</code>. Duplicate retries are deselected by default.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onSelectRecommended}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Use Curated ({recommendedCount})
            </button>
            <button
              type="button"
              onClick={onSelectAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              Include All ({screenshots.length})
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {TASK_FILTERS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTaskFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  taskFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter screenshots..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 w-48"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['all', 'selected', 'skipped'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap shrink-0 ${
                    statusFilter === status
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
          <p className="text-sm font-medium text-slate-900">
            No screenshots match the current filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setTaskFilter('all');
              setStatusFilter('all');
              setQuery('');
            }}
            className="mt-3 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((shot) => (
            <div
              key={shot.id}
              className={`bg-white border rounded-lg overflow-hidden transition-colors ${
                shot.selected ? 'border-slate-300' : 'border-slate-200 opacity-80'
              }`}
            >
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/60">
                <button
                  type="button"
                  onClick={() => onToggleSelect(shot.id)}
                  className="flex items-center gap-2.5 text-left min-w-0 group"
                >
                  {shot.selected ? (
                    <CheckSquare className="w-4 h-4 text-blue-700 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                  )}
                  <span className="text-xs font-medium text-slate-600 truncate">
                    {shot.taskLabel}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-xs font-mono text-slate-500 tabular-nums shrink-0">
                    {shot.timestamp}
                  </span>
                </button>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">
                    {shot.recommended ? 'Recommended' : 'Optional / Duplicate'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(shot)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-200/60 transition-colors"
                    aria-label={`Inspect ${shot.title}`}
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(shot)}
                  className="sm:w-44 shrink-0 aspect-video bg-slate-950 rounded-md overflow-hidden border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-600"
                >
                  <img
                    src={shot.originalPath}
                    alt={shot.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </button>

                <div className="flex-1 min-w-0 space-y-2.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={shot.title}
                      onChange={(e) =>
                        onUpdateScreenshot(shot.id, { title: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      GitHub File Path (./screenshots/)
                    </label>
                    <input
                      type="text"
                      value={shot.cleanFilename}
                      onChange={(e) =>
                        onUpdateScreenshot(shot.id, { cleanFilename: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-800 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Caption
                    </label>
                    <textarea
                      rows={2}
                      value={shot.caption}
                      onChange={(e) =>
                        onUpdateScreenshot(shot.id, { caption: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
