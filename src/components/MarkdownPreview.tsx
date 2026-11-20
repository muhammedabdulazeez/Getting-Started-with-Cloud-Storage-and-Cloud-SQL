import React from 'react';
import { Copy, Check, Download, ExternalLink, Maximize2 } from 'lucide-react';
import { LabConfig, LabScreenshot, TaskId, getPhpAppCode, getStartupScript } from '../data/labData';

interface MarkdownPreviewProps {
  config: LabConfig;
  screenshots: LabScreenshot[];
  markdownText: string;
  onOpenLightbox: (screenshot: LabScreenshot) => void;
  onDownloadMarkdown: () => void;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  config,
  screenshots,
  markdownText,
  onOpenLightbox,
  onDownloadMarkdown,
}) => {
  const [copied, setCopied] = React.useState(false);

  const selected = React.useMemo(
    () =>
      screenshots
        .filter((s) => s.selected)
        .sort((a, b) => a.stepOrder - b.stepOrder),
    [screenshots]
  );

  const byTask = (taskId: TaskId) => selected.filter((s) => s.taskId === taskId);

  const projectDisplay = config.sanitizeSecrets ? '<YOUR_PROJECT_ID>' : config.projectId;
  const vmExternalIpDisplay = config.sanitizeSecrets ? '<VM_EXTERNAL_IP>' : config.vmExternalIp;
  const sqlPublicIpDisplay = config.sanitizeSecrets ? '<CLOUDSQL_PUBLIC_IP>' : config.sqlPublicIp;
  const sqlUserDisplay = config.sanitizeSecrets ? '<DB_USER>' : config.sqlUser;
  const sqlPasswordDisplay = config.sanitizeSecrets ? '<DB_PASSWORD>' : config.sqlPassword;

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdownText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  const renderScreenshotGroup = (items: LabScreenshot[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mt-5 space-y-6">
        {items.map((shot) => (
          <figure
            key={shot.id}
            className="border border-slate-200 rounded-lg bg-white overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/70">
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-slate-900 truncate">
                  {shot.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 font-mono truncate">
                  ./screenshots/{shot.cleanFilename}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenLightbox(shot)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Inspect
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                {shot.caption}
              </p>
              <button
                type="button"
                onClick={() => onOpenLightbox(shot)}
                className="block w-full text-left rounded-md overflow-hidden border border-slate-200 bg-slate-900 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <img
                  src={shot.originalPath}
                  alt={shot.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-auto max-h-[420px] object-contain mx-auto bg-slate-950"
                />
              </button>
            </div>
          </figure>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <span className="font-mono font-semibold text-slate-900">README.md</span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-xs text-slate-500 tabular-nums">
            {selected.length} embedded screenshots
          </span>
          <span aria-hidden="true" className="text-slate-300">/</span>
          <span className="text-xs text-slate-500 tabular-nums">
            {markdownText.split('\n').length} lines
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Copied Markdown
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Markdown
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            Download README.md
          </button>
        </div>
      </div>

      <article className="px-6 py-8 md:px-10 md:py-10 max-w-4xl mx-auto text-slate-800 space-y-8">
        <header className="pb-6 border-b border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-950 text-balance">
            Google Cloud Fundamentals: Getting Started with Cloud Storage and Cloud SQL
          </h1>
          <p className="mt-3 text-base text-slate-600 leading-relaxed max-w-3xl">
            Lab documentation and implementation files for deploying an Apache/PHP web application on{' '}
            <strong className="font-semibold text-slate-900">Compute Engine</strong>, serving static media from{' '}
            <strong className="font-semibold text-slate-900">Cloud Storage</strong>, and connecting to a managed MySQL database on{' '}
            <strong className="font-semibold text-slate-900">Cloud SQL</strong>.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Lab Objectives
          </h2>
          <ol className="mt-4 list-decimal list-inside space-y-1.5 text-sm text-slate-700 leading-relaxed">
            <li>Create a Cloud Storage bucket and upload a publicly readable banner image.</li>
            <li>Provision and configure a Cloud SQL for MySQL instance.</li>
            <li>Connect a PHP web application running on Compute Engine to Cloud SQL.</li>
            <li>Embed the Cloud Storage public object into the web application.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Architecture & Environment Summary
          </h2>
          <div className="mt-4 overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-2.5 px-4">Component</th>
                  <th className="py-2.5 px-4">Resource / Configuration</th>
                  <th className="py-2.5 px-4">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">GCP Project ID</td>
                  <td className="py-2.5 px-4">Lab Project</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{projectDisplay}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">Compute Engine VM</td>
                  <td className="py-2.5 px-4">
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{config.vmName}</code>{' '}
                    ({config.vmMachineType}, Debian 12)
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs">Zone {config.zone}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">VM Network IPs</td>
                  <td className="py-2.5 px-4">Internal / External IP</td>
                  <td className="py-2.5 px-4 font-mono text-xs tabular-nums">
                    {config.vmInternalIp} / {vmExternalIpDisplay}
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">Cloud Storage Bucket</td>
                  <td className="py-2.5 px-4 font-mono text-xs">gs://{projectDisplay}</td>
                  <td className="py-2.5 px-4 text-xs">Multi-region {config.bucketLocation}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">Public Asset</td>
                  <td className="py-2.5 px-4 font-mono text-xs">my-excellent-blog.png</td>
                  <td className="py-2.5 px-4 font-mono text-xs">ACL allUsers:R</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">Cloud SQL Instance</td>
                  <td className="py-2.5 px-4">
                    <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{config.sqlInstanceId}</code>{' '}
                    (MySQL 8.4 Enterprise Sandbox)
                  </td>
                  <td className="py-2.5 px-4 font-mono text-xs tabular-nums">
                    {sqlPublicIpDisplay}:3306
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">Database User</td>
                  <td className="py-2.5 px-4 font-mono text-xs">{sqlUserDisplay}</td>
                  <td className="py-2.5 px-4 font-mono text-xs">Host %</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-slate-900">Authorized Network</td>
                  <td className="py-2.5 px-4">web front end</td>
                  <td className="py-2.5 px-4 font-mono text-xs tabular-nums">
                    {vmExternalIpDisplay}/32
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="pt-2">
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Task 1. Sign in to the Google Cloud Console
          </h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Signed in to the Google Cloud Console using the temporary Qwiklabs student credentials and verified the active project (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{projectDisplay}</code>).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Task 2. Deploy a Web Server VM Instance
          </h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Provisioned a Compute Engine VM instance named <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{config.vmName}</code> in <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{config.zone}</code> with Apache2 and PHP configured via startup script:
          </p>
          <pre className="mt-3 p-4 rounded-lg bg-slate-900 text-slate-100 text-xs overflow-x-auto leading-relaxed">
            <code>{getStartupScript()}</code>
          </pre>
          {renderScreenshotGroup(byTask('task2'))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Task 3. Create a Cloud Storage Bucket via Cloud Shell
          </h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Activated Cloud Shell, configured the <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">LOCATION</code> variable, created the bucket, copied the sample banner image, and granted public read ACL access:
          </p>
          <pre className="mt-3 p-4 rounded-lg bg-slate-900 text-slate-100 text-xs overflow-x-auto leading-relaxed">
            <code>{`export LOCATION=${config.bucketLocation}
gcloud storage buckets create -l $LOCATION gs://$DEVSHELL_PROJECT_ID
gcloud storage cp gs://cloud-training/gcpfci/my-excellent-blog.png my-excellent-blog.png
gcloud storage cp my-excellent-blog.png gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png
gsutil acl ch -u allUsers:R gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png`}</code>
          </pre>
          {renderScreenshotGroup(byTask('task3'))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Task 4. Create and Configure the Cloud SQL Instance
          </h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Created a managed MySQL 8.4 instance (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{config.sqlInstanceId}</code>) using Cloud SQL Enterprise (Sandbox preset) in <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{config.zone}</code>, added built-in user <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{sqlUserDisplay}</code>, and authorized <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{vmExternalIpDisplay}/32</code>.
          </p>
          {renderScreenshotGroup(byTask('task4'))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Task 5. Connect the Compute Engine PHP App to Cloud SQL
          </h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Connected to <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{config.vmName}</code> via SSH-in-browser, edited <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">/var/www/html/index.php</code> with PHP PDO connection logic, and updated <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">$dbserver</code> (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{sqlPublicIpDisplay}</code>) and <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">$dbpassword</code> (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{sqlPasswordDisplay}</code>).
          </p>
          {renderScreenshotGroup(byTask('task5'))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
            Task 6. Integrate the Cloud Storage Banner Image
          </h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed">
            Copied the public object URL from the Cloud Storage Console and added the banner image markup into <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">src/index.php</code>:
          </p>
          <pre className="mt-3 p-4 rounded-lg bg-slate-900 text-slate-100 text-xs overflow-x-auto leading-relaxed">
            <code>{getPhpAppCode(config)}</code>
          </pre>
          {renderScreenshotGroup(byTask('task6'))}
        </section>

        {config.includeTroubleshootingNotes && (
          <section>
            <h2 className="text-xl font-semibold text-slate-950 pb-2 border-b border-slate-200">
              Troubleshooting Notes
            </h2>
            <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-slate-700 leading-relaxed">
              <li>
                <strong className="font-semibold text-slate-900">gsutil acl ch No URLs matched</strong>: Copy the local image to the bucket (<code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">gcloud storage cp my-excellent-blog.png gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png</code>) before modifying the object ACL.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">SQLSTATE[HY000] [2002] php_network_getaddresses</strong>: Expected verification error before replacing <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">CLOUDSQLIP</code> in <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">index.php</code>.
              </li>
              <li>
                <strong className="font-semibold text-slate-900">SQLSTATE[HY000] [1045] Access denied</strong>: Confirm the password for <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{sqlUserDisplay}</code> matches Cloud SQL &gt; Users and <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{vmExternalIpDisplay}/32</code> is saved in Authorized networks.
              </li>
            </ul>
          </section>
        )}

        <section className="p-4 rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Security Note</h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                In a production deployment, never store database credentials in the web document root or commit live passwords to source control. Use Secret Manager, Private IP or Cloud SQL Auth Proxy, and enforced SSL/TLS connections.
              </p>
            </div>
            <a
              href="https://cloud.google.com/sql/docs/mysql/use-secret-manager"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:underline whitespace-nowrap shrink-0"
            >
              Docs
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>
      </article>
    </div>
  );
};
