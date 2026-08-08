<script setup>
import { computed, onMounted, ref } from 'vue'

const activeView = ref('overview')
const sidebarOpen = ref(false)
const darkMode = ref(false)

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'projects', label: 'Projects', icon: 'folder', count: 4 },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Tech stack', icon: 'code' },
  { id: 'about', label: 'About', icon: 'user' },
]

const profile = [
  ['NAME', 'Lloyd Golez'],
  ['ROLE', 'Software Engineer'],
  ['DISCIPLINE', 'Backend-heavy full stack'],
  ['PRIMARY STACK', 'Laravel / PHP'],
  ['DATABASES', 'MySQL, SQL Server'],
  ['ALSO BUILDING', 'Kotlin / Android'],
  ['LOCATION', 'Philippines (GMT+8)'],
]

const stats = [
  ['4+', 'Production systems shipped'],
  ['3+', 'Years building business software'],
  ['5', 'Domains: accounting, HRIS, payroll, POS, integrations'],
  ['E2E', 'Database, backend, frontend, deployment'],
]

const projects = [
  {
    title: 'Enterprise Accounting System',
    category: 'BUSINESS SYSTEM',
    description:
      'Double-entry accounting platform: chart of accounts, journal entries, general ledger, AR/AP, invoicing, collection receipts, credit memos, check vouchers, VAT and withholding tax, and financial reports.',
    stack: ['Laravel', 'Livewire', 'MySQL'],
    status: 'IN PRODUCTION',
  },
  {
    title: 'HRIS & Payroll',
    category: 'OPERATIONS PLATFORM',
    description:
      'Employee records, departments and branches, attendance and time logs, shift scheduling and overrides, overtime, leave, payroll processing, loans, deductions, and payroll reporting.',
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    status: 'IN PRODUCTION',
  },
  {
    title: 'Airline Financial Integration',
    category: 'API / INTEGRATION',
    description:
      'Secure REST APIs for financial transactions with OAuth 2.0, bearer tokens, IP allowlisting, tax processing, automated accounting entries, request logging, and full audit trails.',
    stack: ['REST API', 'OAuth 2.0', 'Laravel'],
    status: 'ACTIVE',
  },
  {
    title: 'QuickBooks Desktop Extension',
    category: 'DESKTOP APPLICATION',
    description:
      'Windows utility that automates accounting workflows and synchronizes transaction data with QuickBooks Desktop through the QBSDK, including custom reports and data validation.',
    stack: ['C#', '.NET', 'QuickBooks SDK'],
    status: 'DELIVERED',
  },
]

const capabilities = [
  {
    label: 'BACKEND',
    title: 'Backend & business logic',
    detail: 'Laravel application architecture, REST APIs, queues, scheduled jobs, role and permission systems, audit logging, document generation.',
  },
  {
    label: 'DATA',
    title: 'Database design',
    detail: 'Relational design and normalization, migrations, constraints, transactions, query optimization, legacy database integration and data migration.',
  },
  {
    label: 'API',
    title: 'System integration',
    detail: 'OAuth 2.0, bearer tokens, API keys, IP allowlisting, SFTP and file-based batch integrations, XML processing, third-party accounting systems.',
  },
  {
    label: 'INFRA',
    title: 'Deployment & servers',
    detail: 'Ubuntu VPS administration, Nginx and Apache, PHP-FPM, SSL via Certbot, DNS, UFW, Fail2ban, Git-based deployment and CI workflows.',
  },
]

const domains = [
  {
    name: 'Accounting',
    items: [
      'Chart of accounts',
      'Journal entries',
      'General ledger & trial balance',
      'AR / AP',
      'Invoicing & billing',
      'Tax, VAT & withholding',
      'Multi-currency',
      'Financial reports',
    ],
  },
  {
    name: 'HRIS & Payroll',
    items: [
      'Employee records',
      'Attendance & time logs',
      'Shift scheduling',
      'Overtime & leave',
      'Payroll processing',
      'Loans & deductions',
      'Salary configuration',
      'Payroll reports',
    ],
  },
  {
    name: 'Point of Sale',
    items: [
      'Item & category management',
      'Modifier groups',
      'Order processing',
      'Payments & receipts',
      'Discounts & taxes',
      'Cashier sessions',
      'Void & refund workflows',
      'Manager authorization',
    ],
  },
]

const skillGroups = [
  {
    name: 'BACKEND',
    items: ['PHP', 'Laravel', 'REST APIs', 'Sanctum', 'Passport / OAuth 2.0', 'Queues & jobs', 'Scheduled tasks', 'PDF generation', 'Email automation'],
  },
  {
    name: 'FRONTEND',
    items: ['Livewire', 'Vue.js', 'Inertia.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    name: 'DATABASES',
    items: ['MySQL', 'Microsoft SQL Server', 'SQLite', 'Schema design', 'Migrations', 'Query optimization', 'Transactions'],
  },
  {
    name: 'MOBILE',
    items: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'REST integration', 'Offline data', 'Mobile auth'],
  },
  {
    name: 'DESKTOP',
    items: ['C#', '.NET', 'VB.NET', 'Windows Forms', 'QuickBooks Desktop SDK'],
  },
  {
    name: 'INFRASTRUCTURE',
    items: ['Ubuntu', 'Nginx', 'Apache', 'PHP-FPM', 'SSH / SFTP', 'DNS', 'SSL / Certbot', 'UFW', 'Fail2ban'],
  },
  {
    name: 'INTEGRATION',
    items: ['REST', 'JSON', 'XML', 'OAuth 2.0', 'Bearer tokens', 'API keys', 'IP allowlisting', 'Webhooks', 'Audit trails'],
  },
  {
    name: 'TOOLING',
    items: ['Git', 'GitHub', 'GitHub Actions', 'Composer', 'NPM', 'Vite', 'Postman', 'Linux CLI', 'PowerShell'],
  },
]

const viewTitle = computed(
  () => navItems.find((item) => item.id === activeView.value)?.label || 'Overview',
)

function selectView(id) {
  activeView.value = id
  sidebarOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function toggleTheme() {
  darkMode.value = !darkMode.value
  localStorage.setItem('portfolio-theme', darkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  darkMode.value = localStorage.getItem('portfolio-theme') === 'dark'
})
</script>

<template>
  <div class="app-shell" :class="{ dark: darkMode }">
    <div v-if="sidebarOpen" class="overlay" @click="sidebarOpen = false"></div>

    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="brand">
        <div class="brand-mark">LG</div>
        <div class="brand-name">
          <strong>Lloyd Golez</strong><span>Software Engineer</span>
        </div>
        <button class="close-menu" aria-label="Close menu" @click="sidebarOpen = false">×</button>
      </div>

      <p class="nav-label">SECTIONS</p>
      <nav>
        <button v-for="item in navItems" :key="item.id" :class="{ active: activeView === item.id }"
          @click="selectView(item.id)">
          <svg v-if="item.icon === 'grid'" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          <svg v-else-if="item.icon === 'folder'" viewBox="0 0 24 24">
            <path d="M3 7h7l2 2h9v10H3z" />
            <path d="M3 7V5h7l2 2" />
          </svg>
          <svg v-else-if="item.icon === 'briefcase'" viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" />
            <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
          </svg>
          <svg v-else-if="item.icon === 'code'" viewBox="0 0 24 24">
            <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c.5-5 3-7 8-7s7.5 2 8 7" />
          </svg>
          <span>{{ item.label }}</span><em v-if="item.count">{{ item.count }}</em>
        </button>
      </nav>

      <div class="sidebar-bottom">
        <div class="availability">
          <i></i>
          <div><strong>Available for work</strong><span>Open to new projects</span></div>
        </div>
        <a class="sidebar-cta" href="mailto:golez.sf@gmail.com">
          <span>CONTACT</span><span>golez.sf@gmail.com</span>
        </a>
        <div class="socials">
          <a href="https://github.com/vanilla-cheesecake" target="_blank" rel="noopener">GITHUB</a>
          <a href="https://www.linkedin.com/in/lloyd-golez-301389169/" target="_blank" rel="noopener">LINKEDIN</a>
        </div>
      </div>
    </aside>

    <main>
      <header class="topbar">
        <button class="menu-button" aria-label="Open menu" @click="sidebarOpen = true">≡</button>
        <div class="breadcrumb">
          <span>PORTFOLIO</span><b>/</b><i>{{ viewTitle.toUpperCase() }}</i>
        </div>
        <div class="top-actions">
          <span class="local-time">PH · GMT+8</span>
          <button class="theme-toggle" aria-label="Toggle color theme" @click="toggleTheme">
            {{ darkMode ? 'LIGHT' : 'DARK' }}
          </button>
          <a class="hire-button" href="mailto:golez.sf@gmail.com">CONTACT</a>
        </div>
      </header>

      <div class="content">
        <template v-if="activeView === 'overview'">
          <section class="hero">
            <div class="hero-main">
              <p class="kicker">OVERVIEW</p>
              <h1>Backend-heavy full-stack<br />software engineer.</h1>
              <p class="lead">
                I build the systems companies run their operations on — accounting platforms, HRIS
                and payroll, point of sale, invoicing, and the APIs and integrations that connect
                them. Laravel and PHP on the backend, Livewire and Vue on the frontend, MySQL and
                SQL Server underneath, deployed and maintained on Linux servers I configure myself.
              </p>
              <div class="hero-actions">
                <button @click="selectView('projects')">VIEW PROJECTS</button>
                <button class="ghost" @click="selectView('skills')">TECH STACK</button>
              </div>
            </div>

            <div class="spec-panel">
              <div class="panel-head"><span>PROFILE</span><span>ACTIVE</span></div>
              <dl>
                <div v-for="[key, value] in profile" :key="key">
                  <dt>{{ key }}</dt>
                  <dd>{{ value }}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section class="stats">
            <div v-for="([value, label], index) in stats" :key="label">
              <span class="stat-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <strong>{{ value }}</strong>
              <p>{{ label }}</p>
            </div>
          </section>

          <section class="block">
            <div class="block-head">
              <div>
                <p class="kicker">CAPABILITIES</p>
                <h2>What the work covers</h2>
              </div>
            </div>
            <div class="capability-grid">
              <article v-for="item in capabilities" :key="item.title">
                <span class="tag">{{ item.label }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.detail }}</p>
              </article>
            </div>
          </section>

          <section class="block">
            <div class="block-head">
              <div>
                <p class="kicker">SELECTED WORK</p>
                <h2>Systems in production</h2>
              </div>
              <button class="link-button" @click="selectView('projects')">ALL PROJECTS →</button>
            </div>
            <div class="record-table">
              <div v-for="(project, index) in projects.slice(0, 3)" :key="project.title" class="record"
                @click="selectView('projects')">
                <span class="record-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="record-body">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                  <div class="tags">
                    <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
                  </div>
                </div>
                <span class="record-status">{{ project.status }}</span>
              </div>
            </div>
          </section>

          <section class="block">
            <div class="block-head">
              <div>
                <p class="kicker">BUSINESS DOMAINS</p>
                <h2>Where the logic lives</h2>
              </div>
            </div>
            <div class="domain-grid">
              <article v-for="domain in domains" :key="domain.name">
                <h3>{{ domain.name }}</h3>
                <ul>
                  <li v-for="item in domain.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </section>
        </template>

        <template v-else-if="activeView === 'projects'">
          <section class="page-heading">
            <p class="kicker">PROJECT DIRECTORY</p>
            <h1>Work built for real operations</h1>
            <p>
              Production systems designed around actual teams, processes, and business constraints —
              not demos.
            </p>
          </section>
          <div class="project-list">
            <article v-for="(project, index) in projects" :key="project.title">
              <header>
                <span class="record-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <p class="tag">{{ project.category }}</p>
                  <h2>{{ project.title }}</h2>
                </div>
                <span class="record-status">{{ project.status }}</span>
              </header>
              <p>{{ project.description }}</p>
              <div class="tags">
                <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
              </div>
            </article>
          </div>
        </template>

        <template v-else-if="activeView === 'experience'">
          <section class="page-heading">
            <p class="kicker">EXPERIENCE</p>
            <h1>Career log</h1>
            <p>
              I work across requirements, system architecture, implementation, deployment, and
              production support.
            </p>
          </section>
          <section class="timeline">
            <article>
              <div class="timeline-date">AUG 2023<br /><span>PRESENT</span></div>
              <div class="timeline-body">
                <p class="kicker">DIGIMAX IT SOLUTIONS</p>
                <h2>Software Engineer</h2>
                <p>
                  Building and maintaining accounting, HRIS, payroll, POS, invoicing, reporting,
                  desktop, and API integration systems used in day-to-day business operations.
                </p>
                <ul>
                  <li>Designed and implemented Laravel backends and relational database schemas.</li>
                  <li>Built REST APIs with OAuth 2.0, token, and API key authentication.</li>
                  <li>Delivered SFTP and file-based integrations with external systems.</li>
                  <li>Developed Windows utilities integrating with QuickBooks Desktop via QBSDK.</li>
                  <li>Deployed and maintained applications on Ubuntu servers with Nginx and SSL.</li>
                </ul>
                <div class="tags">
                  <span>Laravel</span><span>Livewire</span><span>Vue.js</span><span>MySQL</span><span>C#</span><span>Linux</span>
                </div>
              </div>
            </article>
          </section>
        </template>

        <template v-else-if="activeView === 'skills'">
          <section class="page-heading">
            <p class="kicker">TECH STACK</p>
            <h1>Tools and technologies</h1>
            <p>
              A practical stack built through shipping and supporting production business software.
            </p>
          </section>
          <section class="skill-grid">
            <article v-for="group in skillGroups" :key="group.name">
              <h3>{{ group.name }}</h3>
              <div class="tags">
                <span v-for="item in group.items" :key="item">{{ item }}</span>
              </div>
            </article>
          </section>
        </template>

        <template v-else>
          <section class="page-heading">
            <p class="kicker">ABOUT</p>
            <h1>Software that earns its keep</h1>
            <p>
              I develop systems that handle real company operations — from accounting and payroll to
              APIs and third-party integrations.
            </p>
          </section>
          <section class="about-panel">
            <div>
              <p class="kicker">HOW I WORK</p>
              <h2>From requirement to running system</h2>
            </div>
            <div>
              <p>
                My work covers the full process: understanding business requirements, designing the
                database, implementing business logic, building the interface, exposing APIs,
                deploying to Linux servers, and supporting the system once it meets the real world.
              </p>
              <p>
                I work mainly on business-critical software rather than content websites, which
                means correctness, data integrity, and audit trails matter more than visual novelty.
                Most of what I build replaces manual processes — payroll runs, ledger entries,
                invoice batches, and reconciliation work that used to be done by hand.
              </p>
              <p>
                I am currently expanding into native Android development with Kotlin and Jetpack
                Compose, targeting mobile clients for the same Laravel-based business systems.
              </p>
              <a class="text-link" href="mailto:golez.sf@gmail.com">golez.sf@gmail.com →</a>
            </div>
          </section>
        </template>

        <footer>
          <span>© {{ new Date().getFullYear() }} LLOYD GOLEZ</span>
          <span>SOFTWARE ENGINEER</span>
          <a href="mailto:golez.sf@gmail.com">GOLEZ.SF@GMAIL.COM</a>
        </footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  background: #ffffff;
  color: #111111;
  font-family: Arial, 'Helvetica Neue', Helvetica, 'Liberation Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

:global(button),
:global(a) {
  font: inherit;
}

:global(button) {
  cursor: pointer;
  border-radius: 0;
}

:global(a) {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  --bg: #ffffff;
  --panel: #fafafa;
  --ink: #111111;
  --muted: #6b6b6b;
  --line: #d8d8d8;
  --line-soft: #e8e8e8;
  --accent: #1a1a1a;
  --ok: #2f7a3d;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
}

.app-shell.dark {
  --bg: #0d0d0d;
  --panel: #141414;
  --ink: #ededed;
  --muted: #8c8c8c;
  --line: #2b2b2b;
  --line-soft: #202020;
  --accent: #ededed;
  --ok: #5fa96d;
}

/* ---------- sidebar ---------- */

.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 30;
  width: 250px;
  background: var(--panel);
  border-right: 1px solid var(--line);
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 16px;
  border-bottom: 1px solid var(--line);
}

.brand-mark {
  width: 34px;
  height: 34px;
  border: 1px solid var(--line);
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 600;
  background: var(--bg);
}

.brand-name strong,
.brand-name span {
  display: block;
}

.brand-name strong {
  font-size: 13px;
  font-weight: 600;
}

.brand-name span {
  font-size: 10px;
  color: var(--muted);
  margin-top: 2px;
}

.nav-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--muted);
  margin: 18px 0 8px;
  padding: 0 16px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
}

.sidebar nav button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 0;
  border-left: 2px solid transparent;
  padding: 10px 16px;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  text-align: left;
}

.sidebar nav button:hover {
  color: var(--ink);
  background: var(--bg);
}

.sidebar nav button.active {
  color: var(--ink);
  background: var(--bg);
  border-left-color: var(--accent);
  font-weight: 600;
}

.sidebar nav svg {
  width: 15px;
  height: 15px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

.sidebar nav em {
  margin-left: auto;
  font-style: normal;
  font-size: 10px;
  color: var(--muted);
}

.sidebar-bottom {
  margin-top: auto;
}

.availability {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-top: 1px solid var(--line);
}

.availability i {
  width: 7px;
  height: 7px;
  background: var(--ok);
  flex: none;
}

.availability strong,
.availability span {
  display: block;
}

.availability strong {
  font-size: 11px;
  font-weight: 600;
}

.availability span {
  font-size: 10px;
  color: var(--muted);
  margin-top: 2px;
}

.sidebar-cta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px;
  border-top: 1px solid var(--line);
  font-size: 10px;
}

.sidebar-cta span:first-child {
  color: var(--muted);
  letter-spacing: 0.1em;
}

.socials {
  display: flex;
  gap: 16px;
  padding: 12px 16px;
  border-top: 1px solid var(--line);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.socials a:hover {
  color: var(--ink);
}

.close-menu {
  display: none;
}

/* ---------- topbar ---------- */

main {
  margin-left: 250px;
  min-height: 100vh;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  height: 56px;
  padding: 0 32px;
  border-bottom: 1px solid var(--line);
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.breadcrumb {
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.breadcrumb b {
  margin: 0 8px;
  font-weight: 400;
}

.breadcrumb i {
  font-style: normal;
  color: var(--ink);
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.local-time {
  font-size: 10px;
  color: var(--muted);
}

.theme-toggle,
.menu-button {
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  height: 30px;
  padding: 0 10px;
  font-size: 10px;
  letter-spacing: 0.08em;
}

.theme-toggle:hover,
.menu-button:hover {
  border-color: var(--accent);
}

.hire-button {
  background: var(--ink);
  color: var(--bg);
  height: 30px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  font-size: 10px;
  letter-spacing: 0.08em;
}

.menu-button {
  display: none;
}

/* ---------- layout ---------- */

.content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

.kicker {
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--muted);
  margin: 0 0 14px;
}

h1 {
  font-size: clamp(28px, 3.4vw, 42px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
  margin: 0;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
}

h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
}

/* ---------- overview hero ---------- */

.hero {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 48px;
  padding: 56px 0;
  border-bottom: 1px solid var(--line);
}

.lead {
  max-width: 640px;
  margin: 20px 0 26px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  gap: 10px;
}

.hero-actions button {
  border: 1px solid var(--ink);
  background: var(--ink);
  color: var(--bg);
  padding: 10px 16px;
  font-size: 10px;
  letter-spacing: 0.08em;
}

.hero-actions button.ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}

.hero-actions button.ghost:hover {
  border-color: var(--ink);
}

.spec-panel {
  border: 1px solid var(--line);
  background: var(--panel);
  align-self: start;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  padding: 9px 12px;
  border-bottom: 1px solid var(--line);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.panel-head span:last-child {
  color: var(--ok);
}

.spec-panel dl {
  margin: 0;
}

.spec-panel dl div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 12px;
  border-bottom: 1px solid var(--line-soft);
}

.spec-panel dl div:last-child {
  border-bottom: 0;
}

.spec-panel dt {
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--muted);
}

.spec-panel dd {
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  text-align: right;
}

/* ---------- stats ---------- */

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--line);
}

.stats > div {
  position: relative;
  padding: 24px 20px;
  border-right: 1px solid var(--line);
}

.stats > div:last-child {
  border-right: 0;
}

.stat-index {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 10px;
  color: var(--muted);
}

.stats strong {
  display: block;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
}

.stats p {
  margin: 10px 0 0;
  font-size: 11px;
  line-height: 1.6;
  color: var(--muted);
}

/* ---------- blocks ---------- */

.block {
  padding: 48px 0;
  border-bottom: 1px solid var(--line);
}

.block:last-of-type {
  border-bottom: 0;
}

.block-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;
}

.link-button {
  border: 0;
  background: none;
  color: var(--ink);
  font-size: 10px;
  letter-spacing: 0.08em;
  padding: 0;
  border-bottom: 1px solid var(--line);
}

.link-button:hover {
  border-bottom-color: var(--ink);
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid var(--line);
}

.capability-grid article {
  padding: 20px;
  border-right: 1px solid var(--line);
}

.capability-grid article:last-child {
  border-right: 0;
}

.tag {
  display: inline-block;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--muted);
  margin: 0 0 12px;
}

.capability-grid h3 {
  margin-bottom: 10px;
}

.capability-grid p {
  margin: 0;
  font-size: 12px;
  line-height: 1.75;
  color: var(--muted);
}

/* ---------- record table ---------- */

.record-table {
  border: 1px solid var(--line);
}

.record {
  display: grid;
  grid-template-columns: 48px 1fr 140px;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--line-soft);
  cursor: pointer;
}

.record:last-child {
  border-bottom: 0;
}

.record:hover {
  background: var(--panel);
}

.record-index {
  font-size: 11px;
  color: var(--muted);
  padding-top: 2px;
}

.record-body h3 {
  margin-bottom: 8px;
}

.record-body p {
  margin: 0;
  max-width: 760px;
  font-size: 12px;
  line-height: 1.75;
  color: var(--muted);
}

.record-status {
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--ok);
  text-align: right;
  padding-top: 2px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tags span {
  font-size: 10px;
  padding: 3px 7px;
  border: 1px solid var(--line);
  color: var(--muted);
}

/* ---------- domains ---------- */

.domain-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--line);
}

.domain-grid article {
  padding: 20px;
  border-right: 1px solid var(--line);
}

.domain-grid article:last-child {
  border-right: 0;
}

.domain-grid h3 {
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--line);
}

.domain-grid ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.domain-grid li {
  font-size: 12px;
  line-height: 1.9;
  color: var(--muted);
}

.domain-grid li::before {
  content: '—';
  margin-right: 8px;
  color: var(--line);
}

/* ---------- page heading ---------- */

.page-heading {
  padding: 56px 0 40px;
  border-bottom: 1px solid var(--line);
}

.page-heading > p:last-child {
  max-width: 620px;
  margin: 18px 0 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
}

/* ---------- projects ---------- */

.project-list {
  padding: 40px 0 64px;
  display: grid;
  gap: 16px;
}

.project-list article {
  border: 1px solid var(--line);
  padding: 20px;
}

.project-list header {
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 16px;
  align-items: start;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line-soft);
}

.project-list header .tag {
  margin-bottom: 6px;
}

.project-list > article > p {
  margin: 16px 0 0;
  max-width: 860px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
}

/* ---------- timeline ---------- */

.timeline {
  padding: 40px 0 80px;
}

.timeline article {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
}

.timeline-date {
  font-size: 11px;
  line-height: 1.8;
  padding-top: 4px;
}

.timeline-date span {
  color: var(--ok);
}

.timeline-body {
  border-left: 1px solid var(--line);
  padding-left: 32px;
}

.timeline-body h2 {
  margin-bottom: 14px;
}

.timeline-body > p {
  max-width: 720px;
  font-size: 13px;
  line-height: 1.8;
  color: var(--muted);
  margin: 0;
}

.timeline-body ul {
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
  max-width: 720px;
}

.timeline-body li {
  font-size: 13px;
  line-height: 1.9;
  color: var(--muted);
}

.timeline-body li::before {
  content: '—';
  margin-right: 8px;
  color: var(--line);
}

/* ---------- skills ---------- */

.skill-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid var(--line);
  border-bottom: 0;
  margin: 40px 0 80px;
}

.skill-grid article {
  padding: 20px;
  border-bottom: 1px solid var(--line);
  border-right: 1px solid var(--line);
}

.skill-grid article:nth-child(2n) {
  border-right: 0;
}

.skill-grid h3 {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

/* ---------- about ---------- */

.about-panel {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 48px;
  padding: 48px 0 80px;
}

.about-panel h2 {
  line-height: 1.3;
}

.about-panel p {
  margin: 0 0 20px;
  max-width: 720px;
  font-size: 14px;
  line-height: 1.9;
  color: var(--muted);
}

.text-link {
  display: inline-block;
  font-size: 11px;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 3px;
}

/* ---------- footer ---------- */

footer {
  border-top: 1px solid var(--line);
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--muted);
}

.overlay {
  display: none;
}

/* ---------- responsive ---------- */

@media (max-width: 1100px) {
  .capability-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .capability-grid article:nth-child(2n) {
    border-right: 0;
  }

  .capability-grid article:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }
}

@media (max-width: 950px) {
  .sidebar {
    transform: translateX(-100%);
    transition: transform 0.2s;
  }

  .sidebar.open {
    transform: none;
  }

  .close-menu {
    display: block;
    margin-left: auto;
    border: 0;
    background: none;
    color: var(--ink);
    font-size: 22px;
    line-height: 1;
  }

  .overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 29;
  }

  .menu-button {
    display: block;
  }

  main {
    margin-left: 0;
  }

  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .spec-panel {
    max-width: 380px;
  }

  .about-panel {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 680px) {
  .content,
  .topbar {
    padding: 0 16px;
  }

  .breadcrumb,
  .local-time {
    display: none;
  }

  .top-actions {
    margin-left: auto;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }

  .stats > div:nth-child(2n) {
    border-right: 0;
  }

  .stats > div:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }

  .capability-grid,
  .domain-grid,
  .skill-grid {
    grid-template-columns: 1fr;
  }

  .capability-grid article,
  .domain-grid article {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .capability-grid article:last-child,
  .domain-grid article:last-child {
    border-bottom: 0;
  }

  .skill-grid article {
    border-right: 0;
  }

  .record {
    grid-template-columns: 32px 1fr;
  }

  .record-status {
    grid-column: 2;
    text-align: left;
  }

  .project-list header {
    grid-template-columns: 32px 1fr;
  }

  .project-list header .record-status {
    grid-column: 2;
  }

  .timeline article {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .timeline-body {
    border-left: 0;
    padding-left: 0;
  }

  footer {
    flex-direction: column;
    gap: 8px;
  }

  .sidebar {
    width: 260px;
    max-width: 82vw;
  }
}
</style>
