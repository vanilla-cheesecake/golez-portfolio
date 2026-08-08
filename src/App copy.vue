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
  { id: 'about', label: 'About me', icon: 'user' },
]

const projects = [
  {
    title: 'Enterprise Accounting',
    type: 'BUSINESS SYSTEM',
    description:
      'Full accounting platform for invoicing, ledgers, payments, audit trails, and financial reporting.',
    stack: ['Laravel', 'Livewire', 'MySQL'],
    status: 'In production',
    color: '#c7f36b',
    icon: 'chart',
  },
  {
    title: 'HRIS & Payroll',
    type: 'OPERATIONS PLATFORM',
    description:
      'Employee records, attendance, leave, scheduling, payroll, loans, and deductions in one workflow.',
    stack: ['Laravel', 'Vue.js', 'MySQL'],
    status: 'In production',
    color: '#ffb86b',
    icon: 'people',
  },
  {
    title: 'Airline Integration',
    type: 'API ECOSYSTEM',
    description:
      'Secure financial transaction APIs with tax processing and automated accounting entries.',
    stack: ['REST API', 'OAuth 2.0', 'Laravel'],
    status: 'Active',
    color: '#85c8ff',
    icon: 'plane',
  },
  {
    title: 'QuickBooks Extension',
    type: 'DESKTOP APPLICATION',
    description:
      'Windows app automating accounting workflows and synchronizing data with QuickBooks Desktop.',
    stack: ['C#', '.NET', 'QuickBooks SDK'],
    status: 'Delivered',
    color: '#d0a9ff',
    icon: 'desktop',
  },
]

const skills = [
  ['Laravel', 92],
  ['PHP', 94],
  ['Vue.js', 86],
  ['JavaScript', 88],
  ['MySQL', 90],
  ['SQL Server', 84],
  ['C# / .NET', 76],
  ['Linux', 80],
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
        <div><strong>Lloyd Golez</strong><span>Software Engineer</span></div>
        <button class="close-menu" aria-label="Close menu" @click="sidebarOpen = false">×</button>
      </div>

      <p class="nav-label">WORKSPACE</p>
      <nav>
        <button
          v-for="item in navItems"
          :key="item.id"
          :class="{ active: activeView === item.id }"
          @click="selectView(item.id)"
        >
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
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" />
          </svg>
          <svg v-else-if="item.icon === 'code'" viewBox="0 0 24 24">
            <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c.5-5 3-7 8-7s7.5 2 8 7" />
          </svg>
          <span>{{ item.label }}</span
          ><em v-if="item.count">{{ item.count }}</em>
        </button>
      </nav>

      <div class="sidebar-bottom">
        <div class="availability">
          <i></i>
          <div><strong>Available for work</strong><span>Let's build something great.</span></div>
        </div>
        <a class="sidebar-cta" href="mailto:golez.sf@gmail.com"
          >Start a conversation <span>↗</span></a
        >
        <div class="socials">
          <a href="https://github.com/vanilla-cheesecake" target="_blank" rel="noopener"
            >GitHub ↗</a
          >
          <a
            href="https://www.linkedin.com/in/lloyd-golez-301389169/"
            target="_blank"
            rel="noopener"
            >LinkedIn ↗</a
          >
        </div>
      </div>
    </aside>

    <main>
      <header class="topbar">
        <button class="menu-button" aria-label="Open menu" @click="sidebarOpen = true">☰</button>
        <div class="breadcrumb"><span>PORTFOLIO</span><b>/</b>{{ viewTitle.toUpperCase() }}</div>
        <div class="top-actions">
          <span class="local-time">PH • GMT+8</span>
          <button class="theme-toggle" aria-label="Toggle color theme" @click="toggleTheme">
            {{ darkMode ? '☀' : '☾' }}
          </button>
          <a class="hire-button" href="mailto:golez.sf@gmail.com">Let's talk <span>↗</span></a>
        </div>
      </header>

      <div class="content">
        <template v-if="activeView === 'overview'">
          <section class="welcome">
            <div>
              <!-- <p class="kicker">WELCOME TO MY WORKSPACE</p> -->
              <h1>LLOYD GOLEZ</h1>
              <p class="intro">Software engineer</p>
              <div class="welcome-actions">
                <button @click="selectView('experience')">My work experience<span>→</span></button>
                <a href="mailto:golez.sf@gmail.com">Get in touch</a>
              </div>
            </div>
          </section>

          <section class="stats">
            <div>
              <span>01</span><strong>4+</strong>
              <p>Enterprise systems<br />shipped</p>
            </div>
            <div>
              <span>02</span><strong>12</strong>
              <p>Core technologies<br />in my toolkit</p>
            </div>
            <div>
              <span>03</span><strong>3+</strong>
              <p>Years solving<br />business problems</p>
            </div>
            <div>
              <span>04</span><strong>100%</strong>
              <p>Commitment to<br />quality work</p>
            </div>
          </section>

          <section class="section-block">
            <div class="section-title">
              <div>
                <p>SELECTED WORK</p>
                <h2>Systems that make an impact.</h2>
              </div>
              <button @click="selectView('projects')">View all projects →</button>
            </div>
            <div class="project-grid compact">
              <article
                v-for="project in projects.slice(0, 3)"
                :key="project.title"
                class="project-card"
                @click="selectView('projects')"
              >
                <div class="project-visual" :style="{ '--accent': project.color }">
                  <span>{{
                    project.icon === 'chart' ? '▥' : project.icon === 'people' ? '♙' : '↗'
                  }}</span>
                  <small>{{ project.type }}</small>
                </div>
                <div class="project-info">
                  <div>
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                  </div>
                  <span class="arrow">↗</span>
                </div>
                <div class="tags">
                  <span v-for="tech in project.stack" :key="tech">{{ tech }}</span>
                </div>
              </article>
            </div>
          </section>

          <section class="activity-block">
            <div>
              <p class="kicker">CURRENTLY</p>
              <h2>Building software that<br /><em>does the heavy lifting.</em></h2>
            </div>
            <div class="activity-list">
              <div>
                <span class="activity-icon">⌁</span>
                <p><strong>Software Engineer</strong><small>Digimax IT Solutions</small></p>
                <em>2023 — NOW</em>
              </div>
              <div>
                <span class="activity-icon lime">⌘</span>
                <p><strong>Primary stack</strong><small>Laravel • Vue.js • MySQL</small></p>
                <em>FULL STACK</em>
              </div>
              <div>
                <span class="activity-icon orange">◎</span>
                <p>
                  <strong>Current focus</strong><small>Enterprise accounting & integrations</small>
                </p>
                <em>IN PROGRESS</em>
              </div>
            </div>
          </section>
        </template>

        <template v-else-if="activeView === 'projects'">
          <section class="page-heading">
            <p class="kicker">PROJECT DIRECTORY</p>
            <h1>Work built for the<br /><em>real world.</em></h1>
            <p>
              A selection of production systems designed around real teams, processes, and business
              constraints.
            </p>
          </section>
          <div class="project-grid full">
            <article
              v-for="(project, index) in projects"
              :key="project.title"
              class="project-card detailed"
            >
              <div class="project-visual" :style="{ '--accent': project.color }">
                <b>0{{ index + 1 }}</b
                ><span>{{
                  project.icon === 'chart'
                    ? '▥'
                    : project.icon === 'people'
                      ? '♙'
                      : project.icon === 'plane'
                        ? '↗'
                        : '▣'
                }}</span
                ><small>{{ project.type }}</small>
              </div>
              <div class="project-info">
                <div>
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                </div>
              </div>
              <div class="tags">
                <span v-for="tech in project.stack" :key="tech">{{ tech }}</span
                ><i>● {{ project.status }}</i>
              </div>
            </article>
          </div>
        </template>

        <template v-else-if="activeView === 'experience'">
          <section class="page-heading">
            <p class="kicker">CAREER LOG</p>
            <h1>Where craft meets<br /><em>business context.</em></h1>
            <p>
              I work across product thinking, system architecture, implementation, and production
              support.
            </p>
          </section>
          <section class="timeline">
            <article>
              <div class="timeline-date">AUG 2023<br /><span>PRESENT</span></div>
              <i></i>
              <div>
                <p class="kicker">DIGIMAX IT SOLUTIONS</p>
                <h2>Software Engineer</h2>
                <p>
                  Building and maintaining accounting, HRIS, payroll, POS, invoicing, reporting,
                  desktop, and API integration systems for real business operations.
                </p>
                <div class="tags">
                  <span>Laravel</span><span>Vue.js</span><span>MySQL</span><span>C#</span
                  ><span>Linux</span>
                </div>
              </div>
            </article>
          </section>
        </template>

        <template v-else-if="activeView === 'skills'">
          <section class="page-heading">
            <p class="kicker">TECHNICAL TOOLKIT</p>
            <h1>Tools are secondary.<br /><em>Outcomes come first.</em></h1>
            <p>
              A practical stack developed through shipping and supporting production-grade business
              software.
            </p>
          </section>
          <section class="skills-panel">
            <div v-for="[skill, level] in skills" :key="skill" class="skill-row">
              <div>
                <strong>{{ skill }}</strong
                ><span>{{ level }}%</span>
              </div>
              <i><b :style="{ width: `${level}%` }"></b></i>
            </div>
          </section>
        </template>

        <template v-else>
          <section class="page-heading about-heading">
            <p class="kicker">THE PERSON BEHIND THE CODE</p>
            <h1>I care about software<br />that <em>earns its keep.</em></h1>
            <p>
              I develop systems that handle real company operations—from accounting and payroll to
              APIs and third-party integrations.
            </p>
          </section>
          <section class="about-panel">
            <div>
              <span>HOW I WORK</span>
              <h2>From fuzzy requirement<br />to reliable product.</h2>
            </div>
            <div>
              <p>
                My work covers the full process: understanding business requirements, designing
                databases, building interfaces, creating APIs, deploying Linux servers, and
                supporting the system once it meets the real world.
              </p>
              <p>
                I’m at my best when a problem has real operational weight—when thoughtful software
                can save a team hours, reduce errors, and make complicated work feel simple.
              </p>
              <a href="mailto:golez.sf@gmail.com">Tell me about your project →</a>
            </div>
          </section>
        </template>

        <footer>
          <span>© {{ new Date().getFullYear() }} Lloyd Golez</span
          ><span>DESIGNED & BUILT WITH INTENT</span
          ><a href="mailto:golez.sf@gmail.com">golez.sf@gmail.com</a>
        </footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap');

:global(*) {
  box-sizing: border-box;
}

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  background: #f3f1ea;
  color: #15231f;
  font-family: Manrope, sans-serif;
}

:global(button),
:global(a) {
  font: inherit;
}

:global(button) {
  cursor: pointer;
}

:global(a) {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  --bg: #f3f1ea;
  --panel: #fbfaf6;
  --ink: #15231f;
  --muted: #6c756f;
  --line: #d9d8d0;
  --nav: #12251f;
  --lime: #c7f36b;
  min-height: 100vh;
  background: var(--bg);
  color: var(--ink);
  transition: 0.25s;
}

.app-shell.dark {
  --bg: #101512;
  --panel: #18201c;
  --ink: #eef3ec;
  --muted: #9aa69f;
  --line: #303a34;
  --nav: #0a110e;
}

.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 30;
  width: 260px;
  padding: 26px 18px;
  background: var(--nav);
  color: #eff6f0;
  display: flex;
  flex-direction: column;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 7px 34px;
}

.brand-mark {
  width: 41px;
  height: 41px;
  border: 1px solid #597068;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: var(--lime);
  font-weight: 700;
}

.brand strong,
.brand span {
  display: block;
}

.brand strong {
  font-size: 14px;
}

.brand span {
  font-size: 10px;
  color: #91a49d;
  margin-top: 2px;
}

.nav-label,
.kicker {
  font-family: 'DM Mono';
  font-size: 10px;
  letter-spacing: 0.16em;
  color: #8da098;
}

.nav-label {
  padding: 0 12px;
  margin: 7px 0 10px;
}

.sidebar nav {
  display: grid;
  gap: 5px;
}

.sidebar nav button {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  border: 0;
  padding: 11px 12px;
  border-radius: 7px;
  background: transparent;
  color: #9dafaa;
  font-size: 13px;
  text-align: left;
}

.sidebar nav button:hover,
.sidebar nav button.active {
  background: #243831;
  color: white;
}

.sidebar nav button.active:before {
  content: '';
  position: absolute;
  left: 0;
  width: 3px;
  height: 22px;
  background: var(--lime);
  border-radius: 0 3px 3px 0;
}

.sidebar nav svg {
  width: 17px;
  height: 17px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
}

.sidebar nav em {
  margin-left: auto;
  font-style: normal;
  font: 10px 'DM Mono';
  padding: 2px 6px;
  background: #354b43;
  border-radius: 10px;
}

.sidebar-bottom {
  margin-top: auto;
}

.availability {
  border-top: 1px solid #2d413a;
  padding: 20px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.availability i {
  width: 8px;
  height: 8px;
  background: var(--lime);
  box-shadow: 0 0 0 5px #2d4933;
  border-radius: 50%;
}

.availability strong,
.availability span {
  display: block;
}

.availability strong {
  font-size: 11px;
}

.availability span {
  font-size: 9px;
  color: #82958e;
  margin-top: 3px;
}

.sidebar-cta {
  display: flex;
  justify-content: space-between;
  padding: 13px 14px;
  background: var(--lime);
  color: #13241e;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 700;
}

.socials {
  display: flex;
  gap: 18px;
  padding: 17px 7px 0;
  font: 9px 'DM Mono';
  color: #8ca098;
}

.close-menu {
  display: none;
}

main {
  margin-left: 260px;
  min-height: 100vh;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  height: 70px;
  padding: 0 3.5vw;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 90%, transparent);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.breadcrumb {
  font: 10px 'DM Mono';
  letter-spacing: 0.09em;
}

.breadcrumb span {
  color: #83908a;
}

.breadcrumb b {
  margin: 0 10px;
  color: #a9afa8;
}

.top-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.local-time {
  font: 9px 'DM Mono';
  color: var(--muted);
}

.theme-toggle,
.menu-button {
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--ink);
  border-radius: 7px;
  width: 35px;
  height: 35px;
}

.hire-button {
  background: var(--ink);
  color: var(--bg);
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 700;
}

.hire-button span {
  margin-left: 12px;
}

.menu-button {
  display: none;
}

.content {
  max-width: 1500px;
  margin: auto;
  padding: 0 3.5vw;
}

.welcome {
  min-height: 510px;
  padding: 70px 0 55px;
  display: grid;
  grid-template-columns: 1.5fr 0.55fr;
  gap: 7vw;
  align-items: center;
  border-bottom: 1px solid var(--line);
}

.kicker {
  color: #64726c;
  margin: 0 0 18px;
}

.welcome h1,
.page-heading h1 {
  font-size: clamp(42px, 5vw, 72px);
  line-height: 1.06;
  letter-spacing: -0.055em;
  margin: 0;
  font-weight: 600;
}

.welcome h1 em,
.page-heading h1 em,
.activity-block h2 em {
  font-family: 'Playfair Display';
  font-weight: 600;
  color: #4c6259;
}

.intro {
  max-width: 620px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.75;
  margin: 25px 0;
}

.welcome-actions {
  display: flex;
  align-items: center;
  gap: 26px;
}

.welcome-actions button {
  border: 0;
  border-radius: 6px;
  background: var(--ink);
  color: var(--bg);
  padding: 13px 18px;
  font-size: 11px;
  font-weight: 700;
}

.welcome-actions button span {
  margin-left: 18px;
}

.welcome-actions a {
  font-size: 11px;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 3px;
}

.system-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 18px 40px #18251a10;
}

.system-top {
  display: flex;
  justify-content: space-between;
  font: 8px 'DM Mono';
  color: var(--muted);
}

.system-top i {
  width: 7px;
  height: 7px;
  background: var(--lime);
  border-radius: 50%;
}

.avatar {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #1d322a;
  color: var(--lime);
  display: grid;
  place-items: center;
  margin: 25px auto 12px;
  font-size: 19px;
  font-weight: 700;
}

.avatar span {
  position: absolute;
  right: 3px;
  bottom: 5px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--lime);
  border: 3px solid var(--panel);
}

.system-card h3,
.system-card > p {
  text-align: center;
  margin: 0;
}

.system-card h3 {
  font-size: 16px;
}

.system-card > p {
  font-size: 10px;
  color: var(--muted);
  margin-top: 4px;
}

.system-card dl {
  margin: 22px 0 15px;
}

.system-card dl div {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--line);
  padding: 9px 0;
  font-size: 9px;
}

.system-card dt {
  font-family: 'DM Mono';
  color: var(--muted);
}

.system-card dd {
  margin: 0;
  font-weight: 600;
}

.system-status {
  font: 8px 'DM Mono';
  text-align: center;
  background: color-mix(in srgb, var(--lime) 20%, transparent);
  padding: 8px;
  border-radius: 5px;
}

.system-status span {
  color: #55a432;
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--line);
}

.stats > div {
  position: relative;
  padding: 28px 24px;
  border-right: 1px solid var(--line);
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3px 14px;
}

.stats > div:last-child {
  border-right: 0;
}

.stats span {
  position: absolute;
  right: 12px;
  top: 12px;
  font: 8px 'DM Mono';
  color: #9da49e;
}

.stats strong {
  font-size: 30px;
  letter-spacing: -0.05em;
  grid-row: span 2;
}

.stats p {
  font-size: 9px;
  line-height: 1.5;
  color: var(--muted);
  margin: 3px 0;
}

.section-block {
  padding: 65px 0;
}

.section-title {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 25px;
}

.section-title p {
  font: 9px 'DM Mono';
  letter-spacing: 0.14em;
  color: var(--muted);
}

.section-title h2 {
  font-size: 28px;
  margin: 8px 0 0;
}

.section-title button {
  border: 0;
  background: none;
  color: var(--ink);
  font-size: 10px;
  border-bottom: 1px solid var(--line);
  padding: 7px;
}

.project-grid {
  display: grid;
  gap: 16px;
}

.project-grid.compact {
  grid-template-columns: repeat(3, 1fr);
}

.project-card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 9px;
  overflow: hidden;
  transition: 0.2s;
}

.project-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 28px #1b281c10;
}

.project-visual {
  height: 120px;
  background: color-mix(in srgb, var(--accent) 40%, var(--panel));
  position: relative;
  display: grid;
  place-items: center;
}

.project-visual > span {
  font-size: 30px;
  width: 58px;
  height: 58px;
  border: 1px solid color-mix(in srgb, var(--ink) 18%, transparent);
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--panel) 65%, transparent);
}

.project-visual small {
  position: absolute;
  left: 14px;
  bottom: 12px;
  font: 8px 'DM Mono';
  letter-spacing: 0.1em;
}

.project-visual b {
  position: absolute;
  right: 14px;
  top: 12px;
  font: 10px 'DM Mono';
  opacity: 0.45;
}

.project-info {
  display: flex;
  gap: 15px;
  padding: 18px 18px 8px;
}

.project-info h3 {
  font-size: 14px;
  margin: 0 0 8px;
}

.project-info p {
  font-size: 10px;
  color: var(--muted);
  line-height: 1.65;
  margin: 0;
}

.arrow {
  margin-left: auto;
}

.tags {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px 18px;
  flex-wrap: wrap;
}

.tags span {
  font: 8px 'DM Mono';
  padding: 5px 7px;
  border: 1px solid var(--line);
  border-radius: 4px;
  color: var(--muted);
}

.tags i {
  margin-left: auto;
  font: 8px 'DM Mono';
  color: #51973c;
  font-style: normal;
}

.activity-block {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 8vw;
  border-top: 1px solid var(--line);
  padding: 65px 0;
}

.activity-block h2 {
  font-size: 31px;
  letter-spacing: -0.04em;
  margin: 0;
}

.activity-list > div {
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.activity-icon {
  width: 38px;
  height: 38px;
  background: #c7ddf4;
  border-radius: 7px;
  display: grid;
  place-items: center;
  margin-right: 13px;
}

.activity-icon.lime {
  background: #d8f4a5;
}

.activity-icon.orange {
  background: #f5d2a6;
}

.activity-list p {
  margin: 0;
}

.activity-list strong,
.activity-list small {
  display: block;
}

.activity-list strong {
  font-size: 11px;
}

.activity-list small {
  font-size: 9px;
  color: var(--muted);
  margin-top: 3px;
}

.activity-list em {
  margin-left: auto;
  font: 8px 'DM Mono';
  color: var(--muted);
  font-style: normal;
}

.page-heading {
  padding: 75px 0 55px;
  border-bottom: 1px solid var(--line);
}

.page-heading > p:last-child {
  max-width: 600px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
  margin: 24px 0 0;
}

.project-grid.full {
  grid-template-columns: repeat(2, 1fr);
  padding: 40px 0 80px;
}

.detailed .project-visual {
  height: 190px;
}

.timeline {
  padding: 55px 0 120px;
}

.timeline article {
  display: grid;
  grid-template-columns: 130px 20px 1fr;
  gap: 22px;
}

.timeline-date {
  font: 10px 'DM Mono';
  line-height: 1.8;
}

.timeline-date span {
  color: #57a33d;
}

.timeline article > i {
  width: 10px;
  height: 10px;
  background: var(--lime);
  border-radius: 50%;
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--lime) 25%, transparent);
  margin-top: 4px;
}

.timeline h2 {
  font-size: 28px;
  margin: 0 0 14px;
}

.timeline article > div:last-child > p:not(.kicker) {
  max-width: 700px;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.8;
}

.timeline .tags {
  padding-left: 0;
}

.skills-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px 50px;
  padding: 60px 0 110px;
}

.skill-row > div {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 10px;
}

.skill-row span {
  font: 9px 'DM Mono';
  color: var(--muted);
}

.skill-row > i {
  display: block;
  height: 5px;
  background: var(--line);
  border-radius: 9px;
  overflow: hidden;
}

.skill-row b {
  display: block;
  height: 100%;
  background: var(--lime);
}

.about-panel {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 9vw;
  padding: 65px 0 110px;
}

.about-panel > div:first-child span {
  font: 9px 'DM Mono';
  color: var(--muted);
}

.about-panel h2 {
  font-size: 29px;
  line-height: 1.25;
}

.about-panel p {
  font-size: 14px;
  line-height: 1.9;
  color: var(--muted);
  margin: 0 0 22px;
}

.about-panel a {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 4px;
}

footer {
  border-top: 1px solid var(--line);
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
  font: 8px 'DM Mono';
  color: var(--muted);
}

.overlay {
  display: none;
}

@media (max-width: 950px) {
  .sidebar {
    transform: translateX(-100%);
    transition: 0.25s;
  }

  .sidebar.open {
    transform: none;
  }

  .close-menu {
    display: block;
    margin-left: auto;
    border: 0;
    background: none;
    color: white;
    font-size: 24px;
  }

  .overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: #07110bb0;
    z-index: 29;
  }

  .menu-button {
    display: block;
  }

  main {
    margin-left: 0;
  }

  .welcome {
    grid-template-columns: 1fr 0.6fr;
  }

  .project-grid.compact {
    grid-template-columns: 1fr 1fr;
  }

  .project-grid.compact article:last-child {
    display: none;
  }
}

@media (max-width: 680px) {
  .content {
    padding: 0 20px;
  }

  .topbar {
    padding: 0 20px;
  }

  .breadcrumb,
  .local-time {
    display: none;
  }

  .top-actions {
    margin-left: auto;
  }

  .welcome {
    grid-template-columns: 1fr;
    padding-top: 45px;
  }

  .welcome h1,
  .page-heading h1 {
    font-size: 42px;
  }

  .system-card {
    display: none;
  }

  .stats {
    grid-template-columns: 1fr 1fr;
  }

  .stats > div:nth-child(2) {
    border-right: 0;
  }

  .stats > div:nth-child(-n + 2) {
    border-bottom: 1px solid var(--line);
  }

  .project-grid.compact,
  .project-grid.full {
    grid-template-columns: 1fr;
  }

  .project-grid.compact article:last-child {
    display: block;
  }

  .activity-block,
  .about-panel {
    grid-template-columns: 1fr;
  }

  .skills-panel {
    grid-template-columns: 1fr;
  }

  .timeline article {
    grid-template-columns: 90px 12px 1fr;
    gap: 12px;
  }

  .section-title button {
    display: none;
  }

  footer {
    gap: 12px;
    flex-direction: column;
  }

  .hire-button {
    padding: 10px;
  }

  .sidebar {
    width: 280px;
    max-width: 85vw;
  }
}
</style>
