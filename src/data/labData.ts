export type TaskId = 'task1' | 'task2' | 'task3' | 'task4' | 'task5' | 'task6';

export interface LabConfig {
  githubUsername: string;
  repoName: string;
  projectId: string;
  region: string;
  zone: string;
  vmName: string;
  vmMachineType: string;
  vmInternalIp: string;
  vmExternalIp: string;
  bucketLocation: string;
  sqlInstanceId: string;
  sqlPublicIp: string;
  sqlUser: string;
  sqlPassword: string;
  sanitizeSecrets: boolean;
  includeTroubleshootingNotes: boolean;
}

export interface LabScreenshot {
  id: string;
  originalPath: string;
  originalFilename: string;
  timestamp: string;
  taskId: TaskId;
  taskLabel: string;
  cleanFilename: string;
  title: string;
  caption: string;
  recommended: boolean;
  selected: boolean;
  stepOrder: number;
}

export const DEFAULT_LAB_CONFIG: LabConfig = {
  githubUsername: 'your-username',
  repoName: 'gcp-cloud-storage-cloud-sql-lab',
  projectId: 'qwiklabs-gcp-01-299f2df85339',
  region: 'us-central1',
  zone: 'us-central1-b',
  vmName: 'bloghost',
  vmMachineType: 'e2-standard-2',
  vmInternalIp: '10.128.0.2',
  vmExternalIp: '34.135.118.239',
  bucketLocation: 'ASIA',
  sqlInstanceId: 'blog-db',
  sqlPublicIp: '136.116.215.192',
  sqlUser: 'blogdbuser',
  sqlPassword: 'Passw0rd1!',
  sanitizeSecrets: false,
  includeTroubleshootingNotes: true,
};

export const INITIAL_SCREENSHOTS: LabScreenshot[] = [
  {
    id: 'img-01',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-22-53_14a3c788.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-22-53_14a3c788.png',
    timestamp: '15:22:53',
    taskId: 'task2',
    taskLabel: 'Task 2 · Compute Engine VM',
    cleanFilename: '01-compute-engine-vm-empty.png',
    title: 'Compute Engine VM Instances Dashboard',
    caption: 'Opening Compute Engine > VM instances in project qwiklabs-gcp-01-299f2df85339 before provisioning the bloghost VM.',
    recommended: true,
    selected: true,
    stepOrder: 1,
  },
  {
    id: 'img-02',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-25-05_1931b9cf.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-25-05_1931b9cf.png',
    timestamp: '15:25:05',
    taskId: 'task2',
    taskLabel: 'Task 2 · Compute Engine VM',
    cleanFilename: '02-vm-boot-disk-debian12.png',
    title: 'Select Debian 12 (bookworm) Boot Disk',
    caption: 'Configuring OS and storage for bloghost (e2-standard-2, us-central1-b) by changing the boot disk version to Debian GNU/Linux 12 (bookworm).',
    recommended: true,
    selected: true,
    stepOrder: 2,
  },
  {
    id: 'img-03',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-25-26_bc87029f.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-25-26_bc87029f.png',
    timestamp: '15:25:26',
    taskId: 'task2',
    taskLabel: 'Task 2 · Compute Engine VM',
    cleanFilename: '03-vm-networking-allow-http.png',
    title: 'Enable HTTP Firewall Rule',
    caption: 'Enabling "Allow HTTP traffic" under Networking, adding the http-server network tag for web access.',
    recommended: true,
    selected: true,
    stepOrder: 3,
  },
  {
    id: 'img-04',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-25-58_08f3da5a.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-25-58_08f3da5a.png',
    timestamp: '15:25:58',
    taskId: 'task2',
    taskLabel: 'Task 2 · Compute Engine VM',
    cleanFilename: '04-vm-startup-script.png',
    title: 'Configure Apache & PHP Startup Script',
    caption: 'Adding the Bash startup script under Advanced > Automation to install apache2, php, and php-mysql and restart Apache.',
    recommended: true,
    selected: true,
    stepOrder: 4,
  },
  {
    id: 'img-05',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-27-01_edbc6cb5.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-27-01_edbc6cb5.png',
    timestamp: '15:27:01',
    taskId: 'task2',
    taskLabel: 'Task 2 · Compute Engine VM',
    cleanFilename: '05-vm-bloghost-running-ips.png',
    title: 'VM Running with Internal & External IPs',
    caption: 'bloghost provisioned in us-central1-b with Internal IP 10.128.0.2 and External IP 34.135.118.239.',
    recommended: true,
    selected: true,
    stepOrder: 5,
  },
  {
    id: 'img-06',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-29-49_1a237c9e.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-29-49_1a237c9e.png',
    timestamp: '15:29:49',
    taskId: 'task3',
    taskLabel: 'Task 3 · Cloud Storage Bucket',
    cleanFilename: '06-cloud-shell-location-env.png',
    title: 'Activate Cloud Shell & Set Bucket Location',
    caption: 'Launching Cloud Shell and exporting LOCATION=ASIA for the multi-region Cloud Storage bucket.',
    recommended: true,
    selected: true,
    stepOrder: 6,
  },
  {
    id: 'img-07',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-32-16_3274c127.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-32-16_3274c127.png',
    timestamp: '15:32:16',
    taskId: 'task3',
    taskLabel: 'Task 3 · Cloud Storage Bucket',
    cleanFilename: '07a-cloud-shell-acl-troubleshooting.png',
    title: 'ACL Error Before Object Upload (Troubleshooting)',
    caption: 'Initial gsutil acl ch attempt returned "No URLs matched" because my-excellent-blog.png had only been copied locally and not yet uploaded to the bucket.',
    recommended: false,
    selected: false,
    stepOrder: 7,
  },
  {
    id: 'img-08',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-32-48_73d7a50d.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-32-48_73d7a50d.png',
    timestamp: '15:32:48',
    taskId: 'task3',
    taskLabel: 'Task 3 · Cloud Storage Bucket',
    cleanFilename: '07b-cloud-shell-acl-retry.png',
    title: 'Duplicate ACL Retry Attempt',
    caption: 'Repeated gsutil acl ch command prior to uploading the local image to the Cloud Storage bucket.',
    recommended: false,
    selected: false,
    stepOrder: 8,
  },
  {
    id: 'img-09',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-34-22_ff8ecafa.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-34-22_ff8ecafa.png',
    timestamp: '15:34:22',
    taskId: 'task3',
    taskLabel: 'Task 3 · Cloud Storage Bucket',
    cleanFilename: '08-cloud-storage-upload-and-acl.png',
    title: 'Upload Image & Grant Public Read ACL',
    caption: 'Copying my-excellent-blog.png to gs://qwiklabs-gcp-01-299f2df85339/ and updating the object ACL to allUsers:R.',
    recommended: true,
    selected: true,
    stepOrder: 9,
  },
  {
    id: 'img-10',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-35-05_2c2d9725.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-35-05_2c2d9725.png',
    timestamp: '15:35:05',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '09-cloudsql-choose-mysql.png',
    title: 'Choose MySQL Database Engine',
    caption: 'Selecting MySQL as the database engine in Cloud SQL Create an instance.',
    recommended: true,
    selected: true,
    stepOrder: 10,
  },
  {
    id: 'img-11',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-35-43_473239bf.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-35-43_473239bf.png',
    timestamp: '15:35:43',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '10-cloudsql-enterprise-sandbox.png',
    title: 'Select Enterprise Edition & Sandbox Preset',
    caption: 'Configuring Cloud SQL Enterprise edition with the Sandbox preset (MySQL 8.4, db-custom-2-8192, us-central1).',
    recommended: true,
    selected: true,
    stepOrder: 11,
  },
  {
    id: 'img-12',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-37-54_d8bfcaee.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-37-54_d8bfcaee.png',
    timestamp: '15:37:54',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '11-cloudsql-security-unencrypted.png',
    title: 'Allow Unencrypted Network Traffic',
    caption: 'Selecting "Allow unencrypted network traffic (not recommended)" under Security so the PHP PDO client can connect without SSL certificates in the lab.',
    recommended: true,
    selected: true,
    stepOrder: 12,
  },
  {
    id: 'img-13',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-38-19_a160c17c.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-38-19_a160c17c.png',
    timestamp: '15:38:19',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '12-cloudsql-provisioning-overview.png',
    title: 'Cloud SQL Instance Provisioning',
    caption: 'Overview page for blog-db (MySQL 8.4.11, Enterprise, us-central1 Single zone) while instance creation completes.',
    recommended: false,
    selected: false,
    stepOrder: 13,
  },
  {
    id: 'img-14',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-40-23_a2371716.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-40-23_a2371716.png',
    timestamp: '15:40:23',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '13-cloudsql-public-ip-config.png',
    title: 'Copy Cloud SQL Public IP Address',
    caption: 'Configurations view showing blog-db Public IP address 136.116.215.192 and connection name qwiklabs-gcp-01-299f2df85339:us-central1:blog-db.',
    recommended: true,
    selected: true,
    stepOrder: 14,
  },
  {
    id: 'img-15',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-40-29_13d6ccf8.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-40-29_13d6ccf8.png',
    timestamp: '15:40:29',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '13b-cloudsql-instance-summary.png',
    title: 'Cloud SQL Instance Info Summary',
    caption: 'Top section of blog-db Configurations displaying Instance ID, MySQL 8.4.11, Enterprise edition, and Primary zone us-central1-b.',
    recommended: false,
    selected: false,
    stepOrder: 15,
  },
  {
    id: 'img-16',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-44-21_20858b79.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-44-21_20858b79.png',
    timestamp: '15:44:21',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '14-cloudsql-add-user-form.png',
    title: 'Create Built-in User blogdbuser',
    caption: 'Adding database user account blogdbuser with built-in authentication and Allow any host (%) access.',
    recommended: true,
    selected: true,
    stepOrder: 16,
  },
  {
    id: 'img-17',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-45-11_4d70d1ce.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-45-11_4d70d1ce.png',
    timestamp: '15:45:11',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '15-cloudsql-user-created.png',
    title: 'Verify blogdbuser Account Added',
    caption: 'Users list confirming blogdbuser (% any host) is active on blog-db.',
    recommended: true,
    selected: true,
    stepOrder: 17,
  },
  {
    id: 'img-18',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-45-28_c871671c.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-45-28_c871671c.png',
    timestamp: '15:45:28',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '16a-cloudsql-new-network-form.png',
    title: 'Add Authorized Network Form',
    caption: 'Opening Connections > Networking > Add a network with Public IP enabled.',
    recommended: false,
    selected: false,
    stepOrder: 18,
  },
  {
    id: 'img-19',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-48-26_ae789658.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-48-26_ae789658.png',
    timestamp: '15:48:26',
    taskId: 'task4',
    taskLabel: 'Task 4 · Cloud SQL Instance',
    cleanFilename: '16-cloudsql-authorized-network-saved.png',
    title: 'Authorize bloghost External IP (/32)',
    caption: 'Authorized network "web front end" configured with bloghost external IP CIDR 34.135.118.239/32.',
    recommended: true,
    selected: true,
    stepOrder: 19,
  },
  {
    id: 'img-20',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-52-53_588d6e58.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-52-53_588d6e58.png',
    timestamp: '15:52:53',
    taskId: 'task5',
    taskLabel: 'Task 5 · PHP & Cloud SQL Connection',
    cleanFilename: '17-ssh-bloghost-var-www-html.png',
    title: 'SSH into bloghost Document Root',
    caption: 'Connecting to bloghost via SSH-in-browser and changing directory to /var/www/html.',
    recommended: true,
    selected: true,
    stepOrder: 20,
  },
  {
    id: 'img-21',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-54-03_7e59e72b.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-54-03_7e59e72b.png',
    timestamp: '15:54:03',
    taskId: 'task5',
    taskLabel: 'Task 5 · PHP & Cloud SQL Connection',
    cleanFilename: '18a-ssh-nano-command.png',
    title: 'Launch nano Editor for index.php',
    caption: 'Running sudo nano index.php inside /var/www/html.',
    recommended: false,
    selected: false,
    stepOrder: 21,
  },
  {
    id: 'img-22',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-54-09_c234962c.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-54-09_c234962c.png',
    timestamp: '15:54:09',
    taskId: 'task5',
    taskLabel: 'Task 5 · PHP & Cloud SQL Connection',
    cleanFilename: '18-nano-index-php-placeholder.png',
    title: 'Initial index.php with Placeholder Credentials',
    caption: 'Creating index.php with PDO MySQL connection logic using placeholder CLOUDSQLIP and DBPASSWORD values.',
    recommended: true,
    selected: true,
    stepOrder: 22,
  },
  {
    id: 'img-23',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-54-22_a20af7cd.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-54-22_a20af7cd.png',
    timestamp: '15:54:22',
    taskId: 'task5',
    taskLabel: 'Task 5 · PHP & Cloud SQL Connection',
    cleanFilename: '19-ssh-apache2-restart.png',
    title: 'Restart Apache2 Service',
    caption: 'Restarting Apache web server with sudo service apache2 restart after saving index.php.',
    recommended: false,
    selected: false,
    stepOrder: 23,
  },
  {
    id: 'img-24',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_15-55-04_b7b40974.png',
    originalFilename: 'Screenshot_From_2026-11-20_15-55-04_b7b40974.png',
    timestamp: '15:55:04',
    taskId: 'task5',
    taskLabel: 'Task 5 · PHP & Cloud SQL Connection',
    cleanFilename: '20-browser-initial-db-error.png',
    title: 'Expected Initial Connection Failure',
    caption: 'Visiting http://34.135.118.239/index.php confirms PHP is active and displays the expected getaddrinfo error for placeholder CLOUDSQLIP.',
    recommended: true,
    selected: true,
    stepOrder: 24,
  },
  {
    id: 'img-25',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_16-03-18_d34f95cc.png',
    originalFilename: 'Screenshot_From_2026-11-20_16-03-18_d34f95cc.png',
    timestamp: '16:03:18',
    taskId: 'task5',
    taskLabel: 'Task 5 · PHP & Cloud SQL Connection',
    cleanFilename: '21-nano-index-php-configured.png',
    title: 'Update index.php with Cloud SQL IP & Password',
    caption: 'Replacing CLOUDSQLIP with 136.116.215.192 and DBPASSWORD with the configured database password.',
    recommended: true,
    selected: true,
    stepOrder: 25,
  },
  {
    id: 'img-26',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_16-07-32_42bc1fc1.png',
    originalFilename: 'Screenshot_From_2026-11-20_16-07-32_42bc1fc1.png',
    timestamp: '16:07:32',
    taskId: 'task6',
    taskLabel: 'Task 6 · Cloud Storage Image Integration',
    cleanFilename: '22-gcs-buckets-list.png',
    title: 'Inspect Bucket in Cloud Storage Console',
    caption: 'Cloud Storage > Buckets displaying qwiklabs-gcp-01-299f2df85339 in asia multi-region with object-level ACLs.',
    recommended: true,
    selected: true,
    stepOrder: 26,
  },
  {
    id: 'img-27',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_16-07-46_b1a9ac0d.png',
    originalFilename: 'Screenshot_From_2026-11-20_16-07-46_b1a9ac0d.png',
    timestamp: '16:07:46',
    taskId: 'task6',
    taskLabel: 'Task 6 · Cloud Storage Image Integration',
    cleanFilename: '23a-gcs-bucket-object-details.png',
    title: 'Bucket Object List (my-excellent-blog.png)',
    caption: 'Viewing my-excellent-blog.png (8.4 KB) inside the bucket details view.',
    recommended: false,
    selected: false,
    stepOrder: 27,
  },
  {
    id: 'img-29',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_16-11-17_9fb75eae.png',
    originalFilename: 'Screenshot_From_2026-11-20_16-11-17_9fb75eae.png',
    timestamp: '16:11:17',
    taskId: 'task6',
    taskLabel: 'Task 6 · Cloud Storage Image Integration',
    cleanFilename: '23-gcs-copy-public-url.png',
    title: 'Copy Public Object URL',
    caption: 'Copying the public link for my-excellent-blog.png ("Access granted to public principals") from the Cloud Storage browser.',
    recommended: true,
    selected: true,
    stepOrder: 28,
  },
  {
    id: 'img-28',
    originalPath: '/assets/aistudio/Screenshot_From_2026-11-20_16-10-58_b50378b2.png',
    originalFilename: 'Screenshot_From_2026-11-20_16-10-58_b50378b2.png',
    timestamp: '16:10:58',
    taskId: 'task6',
    taskLabel: 'Task 6 · Cloud Storage Image Integration',
    cleanFilename: '24-browser-final-blog-banner.png',
    title: 'Final Blog Page Serving Cloud Storage Banner',
    caption: 'Reloading http://34.135.118.239/index.php renders the "My Excellent Blog" banner image directly from Cloud Storage.',
    recommended: true,
    selected: true,
    stepOrder: 29,
  },
];

export function getStartupScript(): string {
  return `#!/bin/bash
apt-get install apache2 php php-mysql -y
service apache2 restart
`;
}

export function getPhpAppCode(config: LabConfig): string {
  const sqlIp = config.sanitizeSecrets ? '<YOUR_CLOUDSQL_PUBLIC_IP>' : config.sqlPublicIp;
  const sqlUser = config.sanitizeSecrets ? '<YOUR_DB_USER>' : config.sqlUser;
  const sqlPass = config.sanitizeSecrets ? '<YOUR_DB_PASSWORD>' : config.sqlPassword;
  const bucket = config.sanitizeSecrets ? '<YOUR_PROJECT_ID>' : config.projectId;

  return `<html>
<head><title>Welcome to my excellent blog</title></head>
<body>
<img src='https://storage.googleapis.com/${bucket}/my-excellent-blog.png' alt='My Excellent Blog banner'>
<h1>Welcome to my excellent blog</h1>
<?php
$dbserver = "${sqlIp}";
$dbuser = "${sqlUser}";
$dbpassword = "${sqlPass}";
// In a production blog, we would not store the MySQL
// password in the document root. Instead, we would store
// it in Secret Manager. For more information see:
// https://cloud.google.com/sql/docs/mysql/use-secret-manager

try {
  $conn = new PDO("mysql:host=$dbserver;dbname=mysql", $dbuser, $dbpassword);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Connected successfully";
} catch(PDOException $e) {
  echo "Database connection failed:: " . $e->getMessage();
}
?>
</body>
</html>
`;
}

export function generateReadmeMarkdown(
  config: LabConfig,
  screenshots: LabScreenshot[]
): string {
  const selected = screenshots
    .filter((s) => s.selected)
    .sort((a, b) => a.stepOrder - b.stepOrder);

  const byTask = (taskId: TaskId) =>
    selected
      .filter((s) => s.taskId === taskId)
      .map(
        (s) =>
          `#### ${s.title}\n\n${s.caption}\n\n![${s.title}](./screenshots/${s.cleanFilename})`
      )
      .join('\n\n');

  const projectDisplay = config.sanitizeSecrets ? '<YOUR_PROJECT_ID>' : config.projectId;
  const vmExternalIpDisplay = config.sanitizeSecrets ? '<VM_EXTERNAL_IP>' : config.vmExternalIp;
  const sqlPublicIpDisplay = config.sanitizeSecrets ? '<CLOUDSQL_PUBLIC_IP>' : config.sqlPublicIp;
  const sqlUserDisplay = config.sanitizeSecrets ? '<DB_USER>' : config.sqlUser;
  const sqlPasswordDisplay = config.sanitizeSecrets ? '<DB_PASSWORD>' : config.sqlPassword;

  const task2Imgs = byTask('task2');
  const task3Imgs = byTask('task3');
  const task4Imgs = byTask('task4');
  const task5Imgs = byTask('task5');
  const task6Imgs = byTask('task6');

  const troubleshootingBlock = config.includeTroubleshootingNotes
    ? `
## Troubleshooting Notes

- **\`gsutil acl ch\` returns \`CommandException: No URLs matched\`**: Ensure the file is copied to the bucket (\`gcloud storage cp my-excellent-blog.png gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png\`) before applying public-read ACL permissions. Copying from \`gs://cloud-training/...\` to your local Cloud Shell directory alone does not upload it to your bucket.
- **\`SQLSTATE[HY000] [2002] php_network_getaddresses\`**: Expected during Task 5 verification before replacing the placeholder \`CLOUDSQLIP\` string in \`/var/www/html/index.php\`.
- **\`SQLSTATE[HY000] [1045] Access denied for user\`**: Verify that the database user password in \`index.php\` matches the built-in password configured for \`${sqlUserDisplay}\` in Cloud SQL > Users and that \`${vmExternalIpDisplay}/32\` is saved under Connections > Networking > Authorized networks.
`
    : '';

  return `# Google Cloud Fundamentals: Getting Started with Cloud Storage and Cloud SQL

Lab documentation and implementation files for deploying an Apache/PHP web application on **Compute Engine**, serving static media from **Cloud Storage**, and connecting to a managed MySQL database on **Cloud SQL**.

## Lab Objectives

1. Create a Cloud Storage bucket and upload a publicly readable banner image.
2. Provision and configure a Cloud SQL for MySQL instance.
3. Connect a PHP web application running on Compute Engine to Cloud SQL.
4. Embed the Cloud Storage public object into the web application.

## Architecture & Environment Summary

| Component | Resource / Configuration | Value |
| :--- | :--- | :--- |
| **GCP Project ID** | Lab Project | \`${projectDisplay}\` |
| **Compute Engine VM** | \`${config.vmName}\` (\`${config.vmMachineType}\`, Debian 12) | Zone \`${config.zone}\` |
| **VM Network IPs** | Internal / External IP | \`${config.vmInternalIp}\` / \`${vmExternalIpDisplay}\` |
| **Cloud Storage Bucket** | \`gs://${projectDisplay}\` | Multi-region \`${config.bucketLocation}\` |
| **Public Asset** | \`my-excellent-blog.png\` | ACL \`allUsers:R\` |
| **Cloud SQL Instance** | \`${config.sqlInstanceId}\` (MySQL 8.4 Enterprise Sandbox) | \`${sqlPublicIpDisplay}:3306\` |
| **Database User** | \`${sqlUserDisplay}\` | Host \`%\` |
| **Authorized Network** | \`web front end\` | \`${vmExternalIpDisplay}/32\` |

---

## Task 1. Sign in to the Google Cloud Console

Signed in to the Google Cloud Console using the temporary Qwiklabs student credentials and verified the active project (\`${projectDisplay}\`).

---

## Task 2. Deploy a Web Server VM Instance

Provisioned a Compute Engine VM instance named \`${config.vmName}\` in \`${config.zone}\` with Apache2 and PHP configured via a startup script:

- **Name**: \`${config.vmName}\`
- **Region / Zone**: \`${config.region}\` / \`${config.zone}\`
- **Machine Type**: \`${config.vmMachineType}\`
- **Boot Disk**: Debian GNU/Linux 12 (bookworm)
- **Firewall**: Allow HTTP traffic (\`http-server\`)
- **Startup Script** (\`scripts/startup.sh\`):

\`\`\`bash
#!/bin/bash
apt-get install apache2 php php-mysql -y
service apache2 restart
\`\`\`

${task2Imgs ? `${task2Imgs}\n` : ''}
---

## Task 3. Create a Cloud Storage Bucket via Cloud Shell

Activated Cloud Shell, configured the multi-region \`LOCATION\` variable, created a globally unique bucket matching the project ID, downloaded the sample blog banner, uploaded it to the bucket, and granted public read access:

\`\`\`bash
export LOCATION=${config.bucketLocation}
gcloud storage buckets create -l $LOCATION gs://$DEVSHELL_PROJECT_ID
gcloud storage cp gs://cloud-training/gcpfci/my-excellent-blog.png my-excellent-blog.png
gcloud storage cp my-excellent-blog.png gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png
gsutil acl ch -u allUsers:R gs://$DEVSHELL_PROJECT_ID/my-excellent-blog.png
\`\`\`

${task3Imgs ? `${task3Imgs}\n` : ''}
---

## Task 4. Create and Configure the Cloud SQL Instance

Created a managed MySQL 8.4 instance (\`${config.sqlInstanceId}\`) using Cloud SQL Enterprise (Sandbox preset) in the same region/zone as \`${config.vmName}\` for low-latency communication:

- **Instance ID**: \`${config.sqlInstanceId}\`
- **Region / Zone**: \`${config.region}\` / \`${config.zone}\` (Single zone)
- **Security**: Enabled \`Allow unencrypted network traffic\` for non-SSL lab testing
- **Database User**: \`${sqlUserDisplay}\`
- **Authorized Network**: \`web front end\` (\`${vmExternalIpDisplay}/32\`)

${task4Imgs ? `${task4Imgs}\n` : ''}
---

## Task 5. Connect the Compute Engine PHP App to Cloud SQL

Connected to \`${config.vmName}\` via SSH-in-browser, navigated to \`/var/www/html\`, and created \`index.php\` using PHP PDO to connect to Cloud SQL:

\`\`\`bash
cd /var/www/html
sudo nano index.php
sudo service apache2 restart
\`\`\`

Initial verification against \`http://${vmExternalIpDisplay}/index.php\` confirmed PHP execution before substituting \`${sqlPublicIpDisplay}\` and \`${sqlPasswordDisplay}\`.

${task5Imgs ? `${task5Imgs}\n` : ''}
---

## Task 6. Integrate the Cloud Storage Banner Image

Retrieved the public URL for \`my-excellent-blog.png\` from the Cloud Storage Console and inserted the \`<img>\` tag above the \`<h1>\` heading in \`/var/www/html/index.php\`:

\`\`\`php
<img src='https://storage.googleapis.com/${projectDisplay}/my-excellent-blog.png'>
<h1>Welcome to my excellent blog</h1>
\`\`\`

See [\`src/index.php\`](./src/index.php) for the complete application file.

${task6Imgs ? `${task6Imgs}\n` : ''}
---
${troubleshootingBlock}
## Repository Structure

\`\`\`text
.
├── README.md
├── .gitignore
├── scripts/
│   └── startup.sh
├── src/
│   └── index.php
└── screenshots/
${selected.map((s, idx) => `    ${idx === selected.length - 1 ? '└──' : '├──'} ${s.cleanFilename}`).join('\n')}
\`\`\`

## Security Note

> In a production deployment, never store database credentials directly in the web document root or commit live passwords to source control. Use [Google Cloud Secret Manager](https://cloud.google.com/sql/docs/mysql/use-secret-manager), Private IP / Cloud SQL Auth Proxy, and enforced SSL/TLS connections.
`;
}
