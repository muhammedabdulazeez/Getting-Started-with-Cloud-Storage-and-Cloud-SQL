import React from 'react';
import { Check, Copy, Download, FolderTree, Terminal } from 'lucide-react';
import { LabConfig, LabScreenshot } from '../data/labData';

interface GitPushGuideProps {
  config: LabConfig;
  screenshots: LabScreenshot[];
  onDownloadZip: () => void;
  isZipping: boolean;
}

export const GitPushGuide: React.FC<GitPushGuideProps> = ({
  config,
  screenshots,
  onDownloadZip,
  isZipping,
}) => {
  const [copiedStep, setCopiedStep] = React.useState<string | null>(null);

  const selected = screenshots
    .filter((s) => s.selected)
    .sort((a, b) => a.stepOrder - b.stepOrder);

  const username = config.githubUsername.trim() || 'your-username';
  const repo = config.repoName.trim() || 'gcp-cloud-storage-cloud-sql-lab';
  const remoteUrl = `https://github.com/${username}/${repo}.git`;

  const pushCommands = `unzip ${repo}.zip -d ${repo}
cd ${repo}
git init
git add .
git commit -m "docs: add Google Cloud Storage and Cloud SQL lab walkthrough"
git branch -M main
git remote add origin ${remoteUrl}
git push -u origin main`;

  const ghCliCommands = `unzip ${repo}.zip -d ${repo}
cd ${repo}
git init
git add .
git commit -m "docs: add Google Cloud Storage and Cloud SQL lab walkthrough"
gh repo create ${repo} --public --source=. --remote=origin --push`;

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(id);
      setTimeout(() => setCopiedStep(null), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Export & Push to GitHub
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Download the complete repository archive containing <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">README.md</code>,{' '}
              <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">src/index.php</code>,{' '}
              <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">scripts/startup.sh</code>, and all{' '}
              <span className="tabular-nums font-medium text-slate-900">{selected.length}</span> renamed screenshots, then push to GitHub.
            </p>
          </div>

          <button
            type="button"
            onClick={onDownloadZip}
            disabled={isZipping}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            {isZipping ? 'Building Archive...' : `Download ${repo}.zip`}
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Option A: Standard Git Push (create empty repo on github.com first)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('std', pushCommands)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedStep === 'std' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Commands
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-xs overflow-x-auto leading-relaxed">
              <code>{pushCommands}</code>
            </pre>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-600" />
                <h3 className="text-sm font-semibold text-slate-900">
                  Option B: One-Step Push via GitHub CLI (gh)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('gh', ghCliCommands)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedStep === 'gh' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Commands
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-slate-900 text-slate-100 text-xs overflow-x-auto leading-relaxed">
              <code>{ghCliCommands}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Why Aren&apos;t Images Showing on GitHub?
        </h3>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-700 leading-relaxed">
          <li>
            <strong className="font-semibold text-slate-900">Unzip the archive first</strong>: Do not push <code className="bg-slate-100 px-1 py-0.5 rounded">{repo}.zip</code> itself. Extract it so <code className="bg-slate-100 px-1 py-0.5 rounded">README.md</code> and the <code className="bg-slate-100 px-1 py-0.5 rounded">screenshots/</code> folder sit at the repository root.
          </li>
          <li>
            <strong className="font-semibold text-slate-900">Filename mismatch</strong>: If you uploaded your original Linux screenshots (<code className="bg-slate-100 px-1 py-0.5 rounded">Screenshot From 2026-11-20 ...png</code>) without renaming them, switch <strong>Image Path Format</strong> in the left sidebar to match your local filenames, or use <code className="bg-slate-100 px-1 py-0.5 rounded">Download Repo .zip</code> which renames and places every PNG inside <code className="bg-slate-100 px-1 py-0.5 rounded">screenshots/</code> automatically.
          </li>
          <li>
            <strong className="font-semibold text-slate-900">Case sensitivity</strong>: GitHub paths are case-sensitive (<code className="bg-slate-100 px-1 py-0.5 rounded">screenshots/</code> must be lowercase).
          </li>
        </ul>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
          <FolderTree className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm font-semibold text-slate-900">
            Exported Repository File Tree ({selected.length + 4} files)
          </h3>
        </div>
        <pre className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs overflow-x-auto leading-relaxed">
          <code>{`${repo}/
├── README.md
├── .gitignore
├── scripts/
│   └── startup.sh
├── src/
│   └── index.php
└── screenshots/
${selected.map((s, idx) => `    ${idx === selected.length - 1 ? '└──' : '├──'} ${s.cleanFilename}`).join('\n')}`}</code>
        </pre>
      </div>
    </div>
  );
};
