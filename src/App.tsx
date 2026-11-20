import React from 'react';
import JSZip from 'jszip';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  X,
} from 'lucide-react';
import {
  DEFAULT_LAB_CONFIG,
  INITIAL_SCREENSHOTS,
  ImagePathMode,
  LabConfig,
  LabScreenshot,
  generateReadmeMarkdown,
  getPhpAppCode,
  getStartupScript,
} from './data/labData';
import { MarkdownPreview } from './components/MarkdownPreview';
import { ScreenshotManager } from './components/ScreenshotManager';
import { GitPushGuide } from './components/GitPushGuide';

type ActiveTab = 'preview' | 'raw' | 'screenshots' | 'push';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('preview');
  const [config, setConfig] = React.useState<LabConfig>(DEFAULT_LAB_CONFIG);
  const [screenshots, setScreenshots] =
    React.useState<LabScreenshot[]>(INITIAL_SCREENSHOTS);
  const [lightboxId, setLightboxId] = React.useState<string | null>(null);
  const [isZipping, setIsZipping] = React.useState(false);
  const [zipError, setZipError] = React.useState<string | null>(null);
  const [copiedRaw, setCopiedRaw] = React.useState(false);

  const markdownText = React.useMemo(
    () => generateReadmeMarkdown(config, screenshots),
    [config, screenshots]
  );

  const selectedScreenshots = React.useMemo(
    () =>
      screenshots
        .filter((s) => s.selected)
        .sort((a, b) => a.stepOrder - b.stepOrder),
    [screenshots]
  );

  const orderedScreenshots = React.useMemo(
    () => [...screenshots].sort((a, b) => a.stepOrder - b.stepOrder),
    [screenshots]
  );

  const lightboxIndex = lightboxId
    ? orderedScreenshots.findIndex((s) => s.id === lightboxId)
    : -1;
  const activeLightboxShot =
    lightboxIndex >= 0 ? orderedScreenshots[lightboxIndex] : null;

  React.useEffect(() => {
    if (!activeLightboxShot) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxId(null);
      } else if (e.key === 'ArrowRight' && lightboxIndex < orderedScreenshots.length - 1) {
        setLightboxId(orderedScreenshots[lightboxIndex + 1].id);
      } else if (e.key === 'ArrowLeft' && lightboxIndex > 0) {
        setLightboxId(orderedScreenshots[lightboxIndex - 1].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxShot, lightboxIndex, orderedScreenshots]);

  const handleToggleSelect = (id: string) => {
    setScreenshots((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleUpdateScreenshot = (
    id: string,
    patch: Partial<LabScreenshot>
  ) => {
    setScreenshots((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  const handleSelectRecommended = () => {
    setScreenshots((prev) =>
      prev.map((item) => ({ ...item, selected: item.recommended }))
    );
  };

  const handleSelectAll = () => {
    setScreenshots((prev) =>
      prev.map((item) => ({ ...item, selected: true }))
    );
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyRaw = async () => {
    try {
      await navigator.clipboard.writeText(markdownText);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    setZipError(null);
    try {
      const zip = new JSZip();
      zip.file('README.md', markdownText);
      zip.file('.gitignore', '.DS_Store\n*.log\n.env\n');
      zip.file('scripts/startup.sh', getStartupScript());
      zip.file('src/index.php', getPhpAppCode(config));

      const screenshotsFolder = zip.folder('screenshots');
      if (screenshotsFolder) {
        await Promise.all(
          selectedScreenshots.map(async (shot) => {
            const response = await fetch(shot.originalPath);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${shot.cleanFilename}`);
            }
            const contentType = response.headers.get('content-type') || '';
            if (contentType && !contentType.startsWith('image/')) {
              throw new Error(`Unexpected response type for ${shot.cleanFilename}`);
            }
            const blob = await response.blob();
            screenshotsFolder.file(shot.cleanFilename, blob);
          })
        );
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      const safeRepo = config.repoName.trim() || 'gcp-cloud-storage-cloud-sql-lab';
      link.download = `${safeRepo}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setZipError(
        err instanceof Error ? err.message : 'Unable to generate zip archive.'
      );
    } finally {
      setIsZipping(false);
    }
  };

  const updateConfig = <K extends keyof LabConfig>(
    key: K,
    value: LabConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar Contract: Brand wordmark — 4 single-line nav links — 1 primary CTA */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          <a
            href="#preview"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('preview');
            }}
            className="text-base font-bold tracking-tight text-slate-950 whitespace-nowrap shrink-0"
          >
            CloudLab Docs
          </a>

          <nav className="flex items-center gap-6 text-sm font-medium overflow-x-auto">
            {(
              [
                { id: 'preview', label: 'Preview' },
                { id: 'raw', label: 'Raw Markdown' },
                {
                  id: 'screenshots',
                  label: `Screenshots (${selectedScreenshots.length})`,
                },
                { id: 'push', label: 'Git Push' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'border-blue-700 text-slate-950'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            {isZipping ? 'Packaging...' : 'Download Repo .zip'}
          </button>
        </div>
      </header>

      <div className="max-w-[1440px] w-full mx-auto flex-1 flex flex-col lg:flex-row gap-6 px-6 py-6">
        {/* Left Sidebar: Lab Metadata & Sanitization Controls */}
        <aside className="w-full lg:w-[280px] shrink-0 space-y-5">
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-sm font-semibold text-slate-950">
                Repository Settings
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Extracted from your GCP Console screenshots. Edits update README.md live.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={config.githubUsername}
                  onChange={(e) => updateConfig('githubUsername', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Repository Name
                </label>
                <input
                  type="text"
                  value={config.repoName}
                  onChange={(e) => updateConfig('repoName', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  GCP Project ID
                </label>
                <input
                  type="text"
                  value={config.projectId}
                  onChange={(e) => updateConfig('projectId', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Zone
                  </label>
                  <input
                    type="text"
                    value={config.zone}
                    onChange={(e) => updateConfig('zone', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Bucket Region
                  </label>
                  <select
                    value={config.bucketLocation}
                    onChange={(e) => updateConfig('bucketLocation', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                  >
                    <option value="ASIA">ASIA</option>
                    <option value="US">US</option>
                    <option value="EU">EU</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  VM External IP (bloghost)
                </label>
                <input
                  type="text"
                  value={config.vmExternalIp}
                  onChange={(e) => updateConfig('vmExternalIp', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Cloud SQL Public IP (blog-db)
                </label>
                <input
                  type="text"
                  value={config.sqlPublicIp}
                  onChange={(e) => updateConfig('sqlPublicIp', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  GitHub Image Path Format
                </label>
                <select
                  value={config.imagePathMode}
                  onChange={(e) =>
                    updateConfig('imagePathMode', e.target.value as ImagePathMode)
                  }
                  className="w-full px-2.5 py-1.5 text-xs text-slate-900 bg-white border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                >
                  <option value="zip-renamed">./screenshots/01-*.png (Repo .zip)</option>
                  <option value="gnome-original">./Screenshot%20From%20...png (GNOME local)</option>
                  <option value="aistudio-public">./public/assets/aistudio/...png (Workspace)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.sanitizeSecrets}
                  onChange={(e) =>
                    updateConfig('sanitizeSecrets', e.target.checked)
                  }
                  className="mt-0.5 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  Replace lab IPs & password with placeholders before public GitHub push
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeTroubleshootingNotes}
                  onChange={(e) =>
                    updateConfig('includeTroubleshootingNotes', e.target.checked)
                  }
                  className="mt-0.5 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  Include troubleshooting notes section in README.md
                </span>
              </label>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-2.5">
            <h3 className="text-xs font-semibold text-slate-900">
              Bundle Summary
            </h3>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Uploaded captures</span>
              <span className="font-mono tabular-nums text-slate-900">
                {screenshots.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Selected for README</span>
              <span className="font-mono tabular-nums text-slate-900">
                {selectedScreenshots.length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Included code files</span>
              <span className="font-mono tabular-nums text-slate-900">
                3
              </span>
            </div>
            {zipError && (
              <p className="text-xs text-red-600 pt-1">{zipError}</p>
            )}
          </div>
        </aside>

        {/* Main Workspace Viewport */}
        <main className="flex-1 min-w-0">
          {activeTab === 'preview' && (
            <MarkdownPreview
              config={config}
              screenshots={screenshots}
              markdownText={markdownText}
              onOpenLightbox={(shot) => setLightboxId(shot.id)}
              onDownloadMarkdown={handleDownloadMarkdown}
            />
          )}

          {activeTab === 'raw' && (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="font-mono font-semibold text-slate-900">
                    README.md
                  </span>
                  <span aria-hidden="true" className="text-slate-300">/</span>
                  <span className="text-xs text-slate-500">Raw Markdown Source</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyRaw}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    {copiedRaw ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy All
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadMarkdown}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download README.md
                  </button>
                </div>
              </div>
              <pre className="p-6 text-xs font-mono text-slate-800 bg-white overflow-x-auto leading-relaxed whitespace-pre-wrap break-words">
                {markdownText}
              </pre>
            </div>
          )}

          {activeTab === 'screenshots' && (
            <ScreenshotManager
              screenshots={screenshots}
              onToggleSelect={handleToggleSelect}
              onUpdateScreenshot={handleUpdateScreenshot}
              onSelectRecommended={handleSelectRecommended}
              onSelectAll={handleSelectAll}
              onOpenLightbox={(shot) => setLightboxId(shot.id)}
            />
          )}

          {activeTab === 'push' && (
            <GitPushGuide
              config={config}
              screenshots={screenshots}
              onDownloadZip={handleDownloadZip}
              isZipping={isZipping}
            />
          )}
        </main>
      </div>

      {/* Screenshot Lightbox Modal */}
      {activeLightboxShot && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxId(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-slate-950 truncate">
                  {activeLightboxShot.title}
                </h3>
                <p className="text-xs text-slate-500 font-mono truncate">
                  ./screenshots/{activeLightboxShot.cleanFilename} · Captured {activeLightboxShot.timestamp}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={lightboxIndex <= 0}
                  onClick={() =>
                    lightboxIndex > 0 &&
                    setLightboxId(orderedScreenshots[lightboxIndex - 1].id)
                  }
                  className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 border border-slate-200 rounded-md bg-white"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono tabular-nums text-slate-600 px-1">
                  {lightboxIndex + 1} / {orderedScreenshots.length}
                </span>
                <button
                  type="button"
                  disabled={lightboxIndex >= orderedScreenshots.length - 1}
                  onClick={() =>
                    lightboxIndex < orderedScreenshots.length - 1 &&
                    setLightboxId(orderedScreenshots[lightboxIndex + 1].id)
                  }
                  className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 border border-slate-200 rounded-md bg-white"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxId(null)}
                  className="p-1.5 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md bg-white ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950 flex-1 overflow-auto flex items-center justify-center">
              <img
                src={activeLightboxShot.originalPath}
                alt={activeLightboxShot.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain"
              />
            </div>

            <div className="px-5 py-3 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-700">{activeLightboxShot.caption}</p>
              <button
                type="button"
                onClick={() => handleToggleSelect(activeLightboxShot.id)}
                className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-800 whitespace-nowrap shrink-0"
              >
                {activeLightboxShot.selected ? 'Included in README' : 'Excluded (Click to Include)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
