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
          <span>{{ item.label }}</span><em v-if="item.count">{{ item.count }}</em>
        </button>
      </nav>

      <div class="sidebar-bottom">
        <a class="sidebar-cta" href="mailto:golez.sf@gmail.com">Contact Me <span>↗</span></a>
        <div class="socials">
          <a href="https://github.com/vanilla-cheesecake" target="_blank" rel="noopener">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/lloyd-golez-301389169/" target="_blank" rel="noopener">LinkedIn ↗</a>
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
        <template v-if="activeView === 'overview'"> </template>

        <template v-else-if="activeView === 'projects'"> </template>

        <template v-else-if="activeView === 'experience'"> </template>

        <template v-else-if="activeView === 'skills'"> </template>

        <template v-else> </template>

        <footer>
          <span>© {{ new Date().getFullYear() }} Lloyd Golez</span><span>DESIGNED & BUILT WITH INTENT</span><a
            href="mailto:golez.sf@gmail.com">golez.sf@gmail.com</a>
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

.menu-button {
  display: none;
}

.content {
  max-width: 1500px;
  margin: auto;
  padding: 0 3.5vw;
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

  .stats>div:nth-child(2) {
    border-right: 0;
  }

  .stats>div:nth-child(-n + 2) {
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
