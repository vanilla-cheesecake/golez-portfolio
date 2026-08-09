<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { SOCIAL_ICONS, TECH_ICONS } from './tech-icons.js'

const route = useRoute()
const router = useRouter()
const activeView = ref(route.name || 'overview')
const sidebarOpen = ref(false)
const darkMode = ref(true)

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'grid', path: '/' },
  { id: 'experience', label: 'Experience', icon: 'briefcase', path: '/experience' },
  { id: 'skills', label: 'Tech stack', icon: 'code', path: '/tech-stack' },
  { id: 'about', label: 'About', icon: 'user', path: '/about' },
]

const seoByView = {
  overview: {
    title: 'Lloyd Golez | Software Engineer',
    description:
      'Portfolio of Lloyd Golez, a software engineer building web, mobile, desktop, database, and integration solutions.',
  },
  experience: {
    title: 'Experience | Lloyd Golez, Software Engineer',
    description:
      'Professional software engineering experience across Laravel, accounting, HRIS, payroll, integrations, Android, desktop applications, and deployment.',
  },
  skills: {
    title: 'Tech Stack | Lloyd Golez, Software Engineer',
    description:
      'Technologies used by Lloyd Golez, including Laravel, PHP, Vue.js, MySQL, SQL Server, Kotlin, C#, Linux, and API integrations.',
  },
  about: {
    title: 'About | Lloyd Golez, Software Engineer',
    description:
      'Learn about Lloyd Golez and his end-to-end approach to building reliable business software.',
  },
}

const githubUser = 'vanilla-cheesecake'

const contribState = ref('loading')
const contribDays = ref([])
const contribMonths = ref([])
const contribTotal = ref(0)

const visitorAnalytics = ref({
  total: 0,
  countries: [],
})
const visitorAnalyticsState = ref('loading')

const topVisitorCount = computed(() => visitorAnalytics.value.countries[0]?.visits || 1)

async function loadVisitorAnalytics() {
  try {
    const hasBeenCounted = localStorage.getItem('portfolio-visitor-counted') === 'true'
    const response = await fetch('/api/visitors', { method: hasBeenCounted ? 'GET' : 'POST' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    visitorAnalytics.value = data
    visitorAnalyticsState.value = 'live'

    if (!hasBeenCounted) localStorage.setItem('portfolio-visitor-counted', 'true')
  } catch {
    visitorAnalyticsState.value = 'error'
  }
}

const MONTH_NAMES = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

function formatDate(iso) {
  const [year, month, day] = iso.split('-')
  return `${MONTH_NAMES[Number(month) - 1]} ${Number(day)}, ${year}`
}

async function loadContributions() {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`,
    )
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    const days = data.contributions ?? []
    if (!days.length) throw new Error('no data')

    // Pad the first week so each row lines up with a weekday (Sunday first).
    const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay()
    const padded = [...Array.from({ length: offset }, () => null), ...days]

    const totalWeeks = Math.ceil(padded.length / 7)
    const months = []
    padded.forEach((day, index) => {
      if (!day || index % 7 !== 0) return
      const month = Number(day.date.split('-')[1]) - 1
      const week = Math.floor(index / 7)
      if (months.length && months[months.length - 1].month === month) return
      // Span is clamped so the last label never widens the grid past the day cells.
      months.push({ month, week, span: Math.min(4, totalWeeks - week), label: MONTH_NAMES[month] })
    })

    contribDays.value = padded
    contribMonths.value = months
    contribTotal.value = data.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0)
    contribState.value = 'ready'
  } catch {
    contribState.value = 'error'
  }
}

const stats = [
  ['4+', 'Production systems shipped'],
  ['3+', 'Years building business software'],
  ['5', 'Domains: accounting, HRIS, payroll, POS, integrations'],
  ['E2E', 'Database, backend, frontend, deployment'],
]

const capabilities = [
  {
    label: 'BACKEND',
    title: 'Backend & business logic',
    detail:
      'Laravel application architecture, REST APIs, queues, scheduled jobs, role and permission systems, audit logging, document generation.',
  },
  {
    label: 'DATA',
    title: 'Database design',
    detail:
      'Relational design and normalization, migrations, constraints, transactions, query optimization, legacy database integration and data migration.',
  },
  {
    label: 'API',
    title: 'System integration',
    detail:
      'OAuth 2.0, bearer tokens, API keys, IP allowlisting, SFTP and file-based batch integrations, XML processing, third-party accounting systems.',
  },
  {
    label: 'INFRA',
    title: 'Deployment & servers',
    detail:
      'Ubuntu VPS administration, Nginx and Apache, PHP-FPM, SSL via Certbot, DNS, UFW, Fail2ban, Git-based deployment and CI workflows.',
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

// Only technologies with an actual brand mark live here; skills without one are listed
// as practices below so the logo grid stays uniform.
const techGroups = [
  {
    name: 'BACKEND',
    items: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Livewire', icon: 'livewire' },
      { name: 'Composer', icon: 'composer' },
    ],
  },
  {
    name: 'FRONTEND',
    items: [
      { name: 'Vue.js', icon: 'vuedotjs' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Inertia.js', icon: 'inertia' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'HTML', icon: 'html5' },
      { name: 'CSS', icon: 'css' },
    ],
  },
  {
    name: 'DATABASES',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'SQL Server', icon: 'microsoftsqlserver' },
      { name: 'SQLite', icon: 'sqlite' },
    ],
  },
  {
    name: 'MOBILE',
    items: [
      { name: 'Kotlin', icon: 'kotlin' },
      { name: 'Android', icon: 'android' },
      { name: 'Android Studio', icon: 'androidstudio' },
      { name: 'Jetpack Compose', icon: 'jetpackcompose' },
    ],
  },
  {
    name: 'DESKTOP',
    items: [
      { name: 'C#', icon: 'csharp' },
      { name: '.NET', icon: 'dotnet' },
      { name: 'VB.NET', icon: 'dotnet' },
      { name: 'Visual Studio', icon: 'visualstudio' },
      { name: 'QuickBooks SDK', icon: 'quickbooks' },
    ],
  },
  {
    name: 'INFRASTRUCTURE',
    items: [
      { name: 'Ubuntu', icon: 'ubuntu' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Nginx', icon: 'nginx' },
      { name: 'Apache', icon: 'apache' },
      { name: "Let's Encrypt", icon: 'letsencrypt' },
    ],
  },
  {
    name: 'TOOLING',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'GitHub Actions', icon: 'githubactions' },
      { name: 'npm', icon: 'npm' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Postman', icon: 'postman' },
      { name: 'VS Code', icon: 'visualstudiocode' },
      { name: 'PowerShell', icon: 'powershell' },
    ],
  },
]

function iconPath(slug) {
  return TECH_ICONS[slug]
}

// TODO: replace the Facebook and Instagram URLs with the real profiles.
const socialLinks = [
  {
    name: 'GitHub',
    icon: 'github',
    handle: '@vanilla-cheesecake',
    url: 'https://github.com/vanilla-cheesecake',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    handle: 'Lloyd Golez',
    url: 'https://www.linkedin.com/in/lloyd-golez-301389169/',
  },
  {
    name: 'Facebook',
    icon: 'facebook',
    handle: 'Lloyd Golez',
    url: 'https://www.facebook.com/',
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    handle: 'Lloyd Golez',
    url: 'https://www.instagram.com/',
  },
]

function socialPath(slug) {
  return SOCIAL_ICONS[slug]
}

const viewTitle = computed(
  () => navItems.find((item) => item.id === activeView.value)?.label || 'Overview',
)

async function selectView(id) {
  const item = navItems.find((navItem) => navItem.id === id)
  if (item && route.path !== item.path) await router.push(item.path)
  sidebarOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function updateSeo(view) {
  const seo = seoByView[view] || seoByView.overview
  const canonical = `https://golez.netlify.app${route.path === '/' ? '/' : route.path}`

  document.title = seo.title
  document.querySelector('#meta-description')?.setAttribute('content', seo.description)
  document.querySelector('#canonical-url')?.setAttribute('href', canonical)
  document.querySelector('#og-title')?.setAttribute('content', seo.title)
  document.querySelector('#og-url')?.setAttribute('content', canonical)
}

watch(
  () => route.name,
  (routeName) => {
    activeView.value = routeName || 'overview'
    updateSeo(activeView.value)
  },
  { immediate: true },
)

function toggleTheme() {
  darkMode.value = !darkMode.value
  localStorage.setItem('portfolio-theme', darkMode.value ? 'dark' : 'light')
}

function logConsoleEasterEgg() {
  console.log(
    [
      '%cLLOYD GOLEZ',
      '%cSoftware Engineer · Philippines',
      '',
      '%cHey 👋',
      '%cThanks for looking under the hood.',
      '',
      '%cBuilt with Vue, Netlify, and an unreasonable amount of CSS.',
      '',
      '%cGitHub: @vanilla-cheesecake',
      '',
      '%cNo secrets here. Nice try.',
    ].join('\n'),
    'font: 700 20px/1.5 monospace; color: #5fa96d;',
    'font: 12px/1.5 monospace; color: #8c8c8c;',
    'font: 700 13px/1.6 monospace; color: #ededed;',
    'font: 12px/1.6 monospace; color: #ededed;',
    'font: 12px/1.6 monospace; color: #8c8c8c;',
    'font: 12px/1.6 monospace; color: #5fa96d;',
    'font: 700 12px/1.6 monospace; color: #ededed;',
  )
}

onMounted(() => {
  logConsoleEasterEgg()
  const savedTheme = localStorage.getItem('portfolio-theme')
  if (savedTheme) darkMode.value = savedTheme === 'dark'
  loadContributions()
  loadVisitorAnalytics()
})
</script>

<template>
  <div class="app-shell" :class="{ dark: darkMode }">
    <div v-if="sidebarOpen" class="overlay" @click="sidebarOpen = false"></div>

    <aside class="sidebar" :class="{ open: sidebarOpen }">
      <div class="brand">
        <div class="brand-mark">LG</div>
        <div class="brand-name"><strong>Lloyd Golez</strong><span>Software Engineer</span></div>
        <button class="close-menu" aria-label="Close menu" @click="sidebarOpen = false">×</button>
      </div>

      <p class="nav-label">SECTIONS</p>
      <nav>
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.path"
          :class="{ active: activeView === item.id }"
          @click.prevent="selectView(item.id)"
        >
          <svg v-if="item.icon === 'grid'" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
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
          <span>{{ item.label }}</span>
        </a>
      </nav>

      <div class="sidebar-bottom">
        <a class="sidebar-cta" href="mailto:golez.sf@gmail.com">
          <span>CONTACT</span><span>golez.sf@gmail.com</span>
        </a>
        <div class="socials">
          <a href="https://github.com/vanilla-cheesecake" target="_blank" rel="noopener">GITHUB</a>
          <a
            href="https://www.linkedin.com/in/lloyd-golez-301389169/"
            target="_blank"
            rel="noopener"
            >LINKEDIN</a
          >
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
              <p class="kicker">LLOYD GOLEZ</p>
              <h1>
                Software Engineer
                <!-- Inline rather than the flag emoji, which Windows renders as a "PH" letterbox. -->
                <svg class="flag" viewBox="0 0 24 12" role="img" aria-label="Philippines">
                  <title>Philippines</title>
                  <rect width="24" height="6" fill="#0038a8" />
                  <rect y="6" width="24" height="6" fill="#ce1126" />
                  <path d="M0 0L10.392 6L0 12Z" fill="#fff" />
                  <g fill="#fcd116">
                    <circle cx="3.464" cy="6" r="1.35" />
                    <path
                      d="M4.781 5.705L6.214 6L4.781 6.295ZM4.604 6.723L5.409 7.945L4.187 7.14ZM3.759 7.317L3.464 8.75L3.169 7.317ZM2.741 7.14L1.519 7.945L2.324 6.723ZM2.147 6.295L0.714 6L2.147 5.705ZM2.324 5.277L1.519 4.055L2.741 4.86ZM3.169 4.683L3.464 3.25L3.759 4.683ZM4.187 4.86L5.409 4.055L4.604 5.277Z"
                    />
                    <path
                      d="M1.9 1.05L2.1 1.625L2.708 1.637L2.223 2.005L2.4 2.588L1.9 2.24L1.4 2.588L1.577 2.005L1.092 1.637L1.7 1.625ZM1.9 9.25L2.1 9.825L2.708 9.837L2.223 10.205L2.4 10.788L1.9 10.44L1.4 10.788L1.577 10.205L1.092 9.837L1.7 9.825ZM8.192 5.15L8.392 5.725L9 5.737L8.515 6.105L8.692 6.688L8.192 6.34L7.692 6.688L7.869 6.105L7.384 5.737L7.992 5.725Z"
                    />
                  </g>
                </svg>
              </h1>
              <p class="lead">
                I'm a software engineer building web, mobile, and desktop applications. I primarily
                work with Laravel and PHP, alongside Vue, Livewire, MySQL, SQL Server, Kotlin, C#,
                and VB.NET. My work spans backend development, APIs, databases, user interfaces,
                system integrations, and application deployment.
              </p>
              <div class="hero-actions">
                <a href="/experience" @click.prevent="selectView('experience')">EXPERIENCE</a>
                <a class="ghost" href="/tech-stack" @click.prevent="selectView('skills')"
                  >TECH STACK</a
                >
                <a class="ghost" href="/file/golez_lloyd_cv.pdf" download="Lloyd-Golez-CV.pdf">
                  MY CV ↓
                </a>
              </div>
            </div>

            <figure class="hero-banner">
              <img
                src="/img/banner.avif"
                width="1413"
                height="766"
                alt="Lloyd Golez playing guitar"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </section>

          <div class="overview-analytics">
            <section class="contrib-panel">
              <div class="panel-head">
                <span>GITHUB ACTIVITY</span>
                <a :href="`https://github.com/${githubUser}`" target="_blank" rel="noopener">
                  @{{ githubUser }} ↗
                </a>
              </div>

              <div v-if="contribState === 'ready'" class="contrib-scroll">
                <div class="contrib-chart">
                  <div class="contrib-months">
                    <span
                      v-for="month in contribMonths"
                      :key="month.week"
                      :style="{ gridColumn: `${month.week + 1} / span ${month.span}` }"
                      >{{ month.label }}</span
                    >
                  </div>
                  <div class="contrib-grid">
                    <span
                      v-for="(day, index) in contribDays"
                      :key="day ? day.date : `pad-${index}`"
                      class="cell"
                      :class="day ? `level-${day.level}` : 'empty'"
                      :title="
                        day
                          ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`
                          : ''
                      "
                    ></span>
                  </div>
                </div>
              </div>

              <div v-else class="contrib-message">
                <span v-if="contribState === 'loading'">Loading contribution data…</span>
                <span v-else>
                  Contribution data unavailable —
                  <a :href="`https://github.com/${githubUser}`" target="_blank" rel="noopener">
                    view it on GitHub ↗
                  </a>
                </span>
              </div>

              <div class="panel-foot">
                <span v-if="contribState === 'ready'">
                  {{ contribTotal.toLocaleString() }} contributions in the last year
                </span>
                <span v-else></span>
                <div class="contrib-legend">
                  <span>LESS</span>
                  <i class="cell level-0"></i>
                  <i class="cell level-1"></i>
                  <i class="cell level-2"></i>
                  <i class="cell level-3"></i>
                  <i class="cell level-4"></i>
                  <span>MORE</span>
                </div>
              </div>
            </section>

            <aside class="visitor-panel" aria-labelledby="visitor-title">
              <div class="panel-head">
                <span id="visitor-title">VISITORS</span>
                <span class="visitor-status" :class="{ live: visitorAnalyticsState === 'live' }">
                  {{
                    visitorAnalyticsState === 'live'
                      ? 'LIVE'
                      : visitorAnalyticsState === 'loading'
                        ? 'LOADING'
                        : 'OFFLINE'
                  }}
                </span>
              </div>

              <div v-if="visitorAnalyticsState === 'live'" class="visitor-total">
                <span>ALL-TIME VISITS</span>
                <strong>{{ visitorAnalytics.total.toLocaleString() }}</strong>
                <small>Unique browser visits</small>
              </div>

              <div v-if="visitorAnalyticsState === 'live'" class="country-list">
                <p>VISITORS BY COUNTRY</p>
                <div
                  v-for="country in visitorAnalytics.countries"
                  :key="country.code"
                  class="country-row"
                >
                  <div class="country-meta">
                    <span class="country-flag">
                      <img
                        :src="`/flags/${country.code.toLowerCase()}.svg`"
                        width="20"
                        height="14"
                        :alt="`${country.name} flag`"
                      />
                    </span>
                    <span>{{ country.name }}</span>
                    <strong>{{ country.visits.toLocaleString() }}</strong>
                  </div>
                  <div class="country-track" aria-hidden="true">
                    <i :style="{ width: `${(country.visits / topVisitorCount) * 100}%` }"></i>
                  </div>
                </div>
                <span v-if="!visitorAnalytics.countries.length" class="visitor-empty">
                  No country data yet.
                </span>
              </div>
              <div v-else class="visitor-message">
                {{
                  visitorAnalyticsState === 'loading'
                    ? 'Loading visitor analytics…'
                    : 'Visitor analytics unavailable.'
                }}
              </div>
            </aside>
          </div>

          <!-- <section class="stats">
            <div v-for="([value, label], index) in stats" :key="label">
              <span class="stat-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <strong>{{ value }}</strong>
              <p>{{ label }}</p>
            </div>
          </section> -->
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
              <div class="timeline-date">
                AUG 2023<br />
                <span class="current">PRESENT</span>
              </div>

              <div class="timeline-body">
                <p class="kicker">DIGIMAX IT SOLUTIONS</p>

                <h2>Software Engineer</h2>

                <p>
                  Develop and maintain business applications across accounting, HRIS, payroll, point
                  of sale, invoicing, reporting, API integrations, desktop utilities, and Android
                  applications.
                </p>

                <ul>
                  <li>
                    Build full-stack web applications using Laravel, Livewire, Vue.js, JavaScript,
                    TypeScript, and Tailwind CSS.
                  </li>

                  <li>
                    Design backend architecture, relational database schemas, business logic,
                    transaction workflows, and reporting features using MySQL and SQL Server.
                  </li>

                  <li>
                    Develop accounting modules including invoices, payments, journal entries,
                    general ledger, trial balance, accounts payable, accounts receivable, credit
                    memos, and audit trails.
                  </li>

                  <li>
                    Develop HRIS and payroll features including employee management, attendance,
                    shifts, overtime, leave management, payroll processing, loans, deductions, and
                    reporting.
                  </li>

                  <li>
                    Build REST APIs and external system integrations using OAuth 2.0, bearer tokens,
                    API keys, JSON, XML, SFTP, and file-based batch processing.
                  </li>

                  <li>
                    Develop Windows desktop applications and accounting utilities using C#, VB.NET,
                    .NET, SQL Server, and QuickBooks Desktop QBSDK.
                  </li>

                  <li>
                    Develop native Android applications using Kotlin and Jetpack Compose, integrated
                    with Laravel-based backend APIs.
                  </li>

                  <li>
                    Deploy and maintain applications on Ubuntu Linux servers, including Apache,
                    PHP-FPM, SSL/TLS, DNS, SSH, SFTP, firewall rules, permissions, and production
                    environment configuration.
                  </li>

                  <li>
                    Manage application releases, Git workflows, staging and production environments,
                    database migrations, and CI workflows using GitHub Actions.
                  </li>
                </ul>

                <div class="tags">
                  <span>Laravel</span>
                  <span>PHP</span>
                  <span>Livewire</span>
                  <span>Vue.js</span>
                  <span>Kotlin</span>
                  <span>C#</span>
                  <span>VB.NET</span>
                  <span>MySQL</span>
                  <span>SQL Server</span>
                  <span>REST API</span>
                  <span>Linux</span>
                </div>
              </div>
            </article>

            <article>
              <div class="timeline-date">
                AUG 2022<br />
                <span>AUG 2023</span>
              </div>

              <div class="timeline-body">
                <p class="kicker">ST. VINCENT COLLEGE OF CABUYAO · CABUYAO, LAGUNA</p>

                <h2>IT Staff</h2>

                <ul>
                  <li>
                    Supported users, computers, software, networks, and administrative systems while
                    helping maintain reliable day-to-day campus IT operations.
                  </li>

                  <li>
                    Assisted with system setup, troubleshooting, data handling, documentation, and
                    general technical support.
                  </li>
                </ul>

                <div class="tags">
                  <span>User Support</span>
                  <span>Troubleshooting</span>
                  <span>Networking</span>
                  <span>System Setup</span>
                  <span>Documentation</span>
                </div>
              </div>
            </article>

            <article>
              <div class="timeline-date">
                SEP 2021<br />
                <span>NOV 2021</span>
              </div>

              <div class="timeline-body">
                <p class="kicker">ST. VINCENT COLLEGE OF CABUYAO · CABUYAO, LAGUNA</p>

                <h2>Intern</h2>

                <ul>
                  <li>
                    Collaborated with a team to develop and maintain websites using HTML, CSS,
                    JavaScript, and PHP.
                  </li>

                  <li>
                    Gained hands-on experience in web development practices, including version
                    control and testing.
                  </li>
                </ul>

                <div class="tags">
                  <span>HTML</span>
                  <span>CSS</span>
                  <span>JavaScript</span>
                  <span>PHP</span>
                  <span>Git</span>
                </div>
              </div>
            </article>
          </section>
        </template>

        <template v-else-if="activeView === 'skills'">
          <section class="page-heading">
            <p class="kicker">TECH STACK</p>
            <h1>Tools and technologies</h1>
            <p>The technologies I work with.</p>
          </section>
          <section class="tech-section">
            <div v-for="group in techGroups" :key="group.name" class="tech-group">
              <p class="tech-group-name">{{ group.name }}</p>
              <div class="tech-grid">
                <div v-for="item in group.items" :key="item.name" class="tech-item">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path :d="iconPath(item.icon)" />
                  </svg>
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </div>
          </section>
        </template>

        <template v-else>
          <section class="page-heading">
            <p class="kicker">ABOUT</p>
            <h1>ABOUT ME</h1>
            <p>
              I’m a software engineer with experience in web, mobile, and desktop development. I
              work primarily with Laravel and PHP, alongside Vue, Livewire, Kotlin, C#, VB.NET,
              MySQL, and SQL Server.
            </p>
          </section>
          <section class="about-panel">
            <div>
              <p class="kicker">HOW I WORK</p>
              <h2>End-to-end development</h2>
            </div>
            <div>
              <p>
                I handle projects from requirements and database design through development,
                integration, deployment, and maintenance.
              </p>
              <p>
                My work spans web, backend, desktop, and Android applications, with a focus on
                reliable business software.
              </p>
              <a class="text-link" href="mailto:golez.sf@gmail.com">golez.sf@gmail.com →</a>
            </div>
          </section>

          <section class="social-section">
            <p class="kicker">ELSEWHERE</p>
            <div class="social-grid">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="socialPath(social.icon)" />
                </svg>
                <span>
                  <strong>{{ social.name }}</strong>
                  <small>{{ social.handle }}</small>
                </span>
                <i>↗</i>
              </a>
            </div>
          </section>
        </template>

        <!-- <footer>
          <span>© {{ new Date().getFullYear() }} LLOYD GOLEZ</span>
          <span>SOFTWARE ENGINEER</span>
          <a href="mailto:golez.sf@gmail.com">GOLEZ.SF@GMAIL.COM</a>
        </footer> -->
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
  overflow-x: clip;
  background: #0d0d0d;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  overflow-x: clip;
  background: #0d0d0d;
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
  /* Shared so the sidebar brand and the topbar always line up. */
  --header-h: 56px;
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
  height: var(--header-h);
  padding: 0 16px;
  border-bottom: 1px solid var(--line);
}

.brand-mark {
  width: 30px;
  height: 30px;
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

.sidebar nav > a {
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

.sidebar nav > a:hover {
  color: var(--ink);
  background: var(--bg);
}

.sidebar nav > a.active {
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
  min-width: 0;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--header-h);
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
  width: 100%;
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
  grid-template-columns: 1fr 360px;
  gap: 48px;
  align-items: center;
  padding: 56px 0 44px;
}

.hero-main {
  min-width: 0;
}

.flag {
  height: 0.52em;
  width: auto;
  margin-left: 0.28em;
  vertical-align: 0.06em;
  border: 1px solid var(--line);
}

.hero-banner {
  margin: 0;
  align-self: center;
  /* Nudged left so it sits closer to the text instead of hugging the right edge. */
  transform: translateX(-105px);
}

.hero-banner img {
  display: block;
  width: 150%;
  height: auto;
  /* Two axis gradients intersected so all four edges fade out evenly. */
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
  mask-composite: intersect;
}

.lead {
  max-width: 700px;
  margin: 20px 0 26px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-actions button,
.hero-actions a {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--ink);
  background: var(--ink);
  color: var(--bg);
  padding: 10px 16px;
  font-size: 10px;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.hero-actions .ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}

.hero-actions .ghost:hover {
  border-color: var(--ink);
}

/* ---------- github contributions ---------- */

.overview-analytics {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 16px;
  align-items: stretch;
  margin-bottom: 48px;
}

.contrib-panel {
  border: 1px solid var(--line);
  background: var(--panel);
  min-width: 0;
}

.panel-head,
.panel-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 14px;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--muted);
}

.panel-head {
  border-bottom: 1px solid var(--line);
}

.panel-head a:hover {
  color: var(--ink);
}

.panel-foot {
  border-top: 1px solid var(--line);
  letter-spacing: 0.04em;
}

.contrib-scroll {
  overflow-x: auto;
  padding: 16px 14px;
}

.contrib-chart {
  display: inline-block;
  min-width: 100%;
}

.contrib-months {
  display: grid;
  grid-auto-columns: 11px;
  grid-auto-flow: column;
  gap: 3px;
  margin-bottom: 6px;
  height: 13px;
}

.contrib-months span {
  font-size: 9px;
  letter-spacing: 0.08em;
  color: var(--muted);
  white-space: nowrap;
}

.contrib-grid {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(7, 11px);
  grid-auto-columns: 11px;
  gap: 3px;
}

.cell {
  display: block;
  width: 11px;
  height: 11px;
  background: var(--line-soft);
  border: 1px solid transparent;
}

.cell.empty {
  background: transparent;
}

.cell.level-0 {
  background: var(--line-soft);
}

.cell.level-1 {
  background: color-mix(in srgb, var(--ink) 22%, var(--bg));
}

.cell.level-2 {
  background: color-mix(in srgb, var(--ink) 45%, var(--bg));
}

.cell.level-3 {
  background: color-mix(in srgb, var(--ink) 70%, var(--bg));
}

.cell.level-4 {
  background: var(--ink);
}

.contrib-legend {
  display: flex;
  align-items: center;
  gap: 4px;
}

.contrib-legend span {
  font-size: 9px;
  letter-spacing: 0.08em;
}

.contrib-legend i {
  width: 10px;
  height: 10px;
}

.contrib-message {
  padding: 28px 14px;
  font-size: 12px;
  color: var(--muted);
}

.contrib-message a {
  border-bottom: 1px solid var(--line);
}

/* ---------- visitor analytics ---------- */

.visitor-panel {
  border: 1px solid var(--line);
  background: var(--panel);
}

.visitor-status {
  padding: 3px 5px;
  border: 1px solid var(--line);
  font-size: 8px;
  letter-spacing: 0.08em;
}

.visitor-status.live {
  border-color: var(--ok);
  color: var(--ok);
}

.visitor-message {
  grid-column: 1 / -1;
  padding: 28px 14px;
  color: var(--muted);
  font-size: 11px;
}

.visitor-empty {
  color: var(--muted);
  font-size: 10px;
}

.visitor-total {
  padding: 18px 14px;
  border-bottom: 1px solid var(--line);
}

.visitor-total span,
.visitor-total small,
.country-list > p {
  display: block;
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 0.1em;
}

.visitor-total strong {
  display: block;
  margin: 7px 0 5px;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
}

.visitor-total small {
  letter-spacing: 0.03em;
}

.country-list {
  padding: 14px;
}

.country-list > p {
  margin: 0 0 14px;
}

.country-row + .country-row {
  margin-top: 13px;
}

.country-meta {
  display: grid;
  grid-template-columns: 26px minmax(0, 1fr) auto;
  gap: 7px;
  align-items: center;
  margin-bottom: 5px;
  font-size: 10px;
}

.country-flag {
  display: flex;
  align-items: center;
}

.country-flag img {
  display: block;
  width: 20px;
  height: 14px;
  border: 1px solid var(--line);
  object-fit: cover;
}

.country-meta strong {
  font-weight: 500;
}

.country-track {
  height: 3px;
  margin-left: 33px;
  background: var(--line-soft);
}

.country-track i {
  display: block;
  height: 100%;
  background: var(--ink);
}

/* ---------- stats ---------- */

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
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

/* ---------- timeline ---------- */

.timeline {
  padding: 40px 0 80px;
}

.timeline article {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
}

.timeline article + article {
  margin-top: 44px;
}

.timeline-date {
  font-size: 11px;
  line-height: 1.8;
  padding-top: 4px;
}

.timeline-date span {
  color: var(--muted);
}

.timeline-date .current {
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
  position: relative;
  padding-left: 22px;
  font-size: 13px;
  line-height: 1.9;
  color: var(--muted);
}

/* Marker is pulled out of the flow so wrapped lines hang under the text, not the dash. */
.timeline-body li::before {
  content: '—';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--line);
}

/* ---------- tech stack ---------- */

.tech-section {
  padding: 40px 0 80px;
}

.tech-group + .tech-group {
  margin-top: 32px;
}

.tech-group-name {
  font-size: 10px;
  letter-spacing: 0.14em;
  color: var(--muted);
  margin: 0 0 12px;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.tech-item svg {
  width: 22px;
  height: 22px;
  flex: none;
  fill: var(--ink);
}

.tech-item span {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
}

/* ---------- about ---------- */

.about-panel {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 48px;
  padding: 48px 0;
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

.social-section {
  padding: 0 0 80px;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.social-grid a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.social-grid a:hover {
  background: var(--panel);
}

.social-grid svg {
  width: 20px;
  height: 20px;
  flex: none;
  fill: var(--ink);
}

.social-grid strong,
.social-grid small {
  display: block;
}

.social-grid strong {
  font-size: 12px;
  font-weight: 600;
}

.social-grid small {
  font-size: 10px;
  color: var(--muted);
  margin-top: 3px;
}

.social-grid i {
  margin-left: auto;
  font-style: normal;
  font-size: 11px;
  color: var(--muted);
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
  .hero {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero-banner {
    width: 100%;
    max-width: 420px;
    transform: none;
    overflow: hidden;
  }

  .hero-banner img {
    width: 100%;
  }

  .overview-analytics {
    grid-template-columns: 1fr;
  }

  .visitor-panel {
    display: grid;
    grid-template-columns: 180px 1fr;
  }

  .visitor-panel .panel-head {
    grid-column: 1 / -1;
  }

  .visitor-total {
    border-right: 1px solid var(--line);
    border-bottom: 0;
  }

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

  .about-panel {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .social-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 680px) {
  .app-shell,
  main,
  .content,
  .hero,
  .overview-analytics,
  .contrib-panel,
  .visitor-panel {
    min-width: 0;
    max-width: 100%;
  }

  .hero {
    padding-top: 40px;
  }

  .hero-actions > * {
    max-width: 100%;
  }

  .country-meta > span:nth-child(2) {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .visitor-panel {
    display: block;
  }

  .visitor-total {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

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
  .social-grid {
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

@media (max-width: 420px) {
  .hero-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .hero-actions button,
  .hero-actions a {
    width: 100%;
    justify-content: center;
  }
}
</style>
