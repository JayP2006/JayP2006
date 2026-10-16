(() => {
  'use strict';
  const GITHUB_USER = 'JayP2006';
  const GITHUB_PROFILE = `https://github.com/${GITHUB_USER}`;
  const API_BASE = `https://api.github.com/users/${GITHUB_USER}`;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toast = $('#toast');
  let toastTimer;
  let repositories = [];
  let apiFetchedAt = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function formatCompact(value) {
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value ?? 0);
  }

  function formatDate(value) {
    if (!value) return 'No recent push signal';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'No recent push signal';
    return new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setConnection(state, ready = false) {
    setText('connectionState', state);
    const status = $('#connectionState');
    if (status) status.style.color = ready ? 'var(--green)' : 'var(--muted)';
    const consoleStatus = $('#repoLoadStatus');
    if (consoleStatus) consoleStatus.textContent = ready ? 'SYNCED' : state === 'API LIMIT' ? 'RATE-LIMITED' : 'CONNECTING';
  }

  async function fetchWithTimeout(url, timeoutMs = 9000) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-cache'
      });
      if (!response.ok) {
        const error = new Error(`GitHub API responded with ${response.status}`);
        error.status = response.status;
        throw error;
      }
      return await response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }

  async function loadGithubData() {
    setConnection('CONNECTING TO GITHUB');
    try {
      const [profile, repos] = await Promise.all([
        fetchWithTimeout(API_BASE),
        fetchWithTimeout(`${API_BASE}/repos?per_page=100&sort=updated`)
      ]);
      repositories = Array.isArray(repos) ? repos.filter(repo => !repo.private) : [];
      apiFetchedAt = new Date();
      setConnection('GITHUB API CONNECTED', true);
      setText('liveRepos', formatCompact(profile.public_repos));
      setText('liveFollowers', formatCompact(profile.followers));
      setText('liveStars', formatCompact(repositories.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)));
      const latestRepo = [...repositories].sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at))[0];
      setText('lastPush', latestRepo ? `${latestRepo.name} · ${formatDate(latestRepo.pushed_at || latestRepo.updated_at)}` : 'No public push data');
      setText('apiTimestamp', `Synced ${apiFetchedAt.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`);
      setText('repoStars', formatCompact(repositories.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)));
      setText('repoUpdated', `LAST API SYNC / ${apiFetchedAt.toISOString().replace('T', ' ').slice(0, 19)} UTC`);
      renderLanguageOptions();
      renderRepositories();
    } catch (error) {
      const rateLimited = error.status === 403 || error.status === 429;
      setConnection(rateLimited ? 'API LIMIT' : 'API UNAVAILABLE');
      setText('apiTimestamp', rateLimited ? 'GitHub anonymous API rate limit reached. Try again later.' : 'Could not connect to the GitHub API. External widgets still work.');
      setText('repoLoadStatus', rateLimited ? 'RATE-LIMITED' : 'OFFLINE');
      $('#repoGrid').innerHTML = '';
      const box = document.createElement('div');
      box.className = 'repo-empty';
      box.textContent = rateLimited
        ? 'GitHub is rate-limiting this anonymous request. Reopen the page later to retry.'
        : 'Repository data could not load. Use the button below to open the public repository list.';
      $('#repoGrid').append(box);
      setText('repoShown', '0');
      setText('repoStars', '--');
      setText('repoUpdated', 'API CONNECTION UNAVAILABLE');
      setText('apiNote', 'The dynamic repo viewer uses the public GitHub REST API. If anonymous rate limits are reached, try again later or open the profile directly.');
    }
  }

  const languageColors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219', C: '#555555', 'C++': '#f34b7d', HTML: '#e34c26', CSS: '#663399', Jupyter: '#DA5B0B', Go: '#00ADD8', Rust: '#dea584', Shell: '#89e051', Vue: '#41b883', PHP: '#4F5D95', Ruby: '#701516', Dart: '#00B4AB'
  };

  function renderLanguageOptions() {
    const select = $('#languageFilter');
    const current = select.value;
    const languages = [...new Set(repositories.map(repo => repo.language).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    select.textContent = '';
    const all = document.createElement('option');
    all.value = 'all'; all.textContent = 'All languages'; select.append(all);
    languages.forEach(language => {
      const option = document.createElement('option');
      option.value = language; option.textContent = language; select.append(option);
    });
    select.value = languages.includes(current) ? current : 'all';
  }

  function createRepoCard(repo) {
    const card = document.createElement('article');
    card.className = 'repo-card';
    const head = document.createElement('div'); head.className = 'repo-card-head';
    const name = document.createElement('a'); name.className = 'repo-name'; name.href = repo.html_url; name.target = '_blank'; name.rel = 'noreferrer';
    const glyph = document.createElement('span'); glyph.textContent = '◈';
    name.append(glyph, document.createTextNode(repo.name));
    const visibility = document.createElement('span'); visibility.className = 'repo-visibility'; visibility.textContent = repo.fork ? 'FORK' : 'PUBLIC';
    head.append(name, visibility);
    const description = document.createElement('p'); description.textContent = repo.description || 'No description added yet — open the repository to inspect the source.';
    const foot = document.createElement('div'); foot.className = 'repo-card-foot';
    if (repo.language) {
      const language = document.createElement('span'); language.className = 'repo-language';
      const dot = document.createElement('i'); dot.className = 'language-dot'; dot.style.setProperty('--dot', languageColors[repo.language] || '#67e8f9');
      language.append(dot, document.createTextNode(repo.language)); foot.append(language);
    }
    const star = document.createElement('span'); star.textContent = `★ ${formatCompact(repo.stargazers_count)}`;
    const forks = document.createElement('span'); forks.textContent = `⑂ ${formatCompact(repo.forks_count)}`;
    const updated = document.createElement('span'); updated.textContent = formatDate(repo.pushed_at || repo.updated_at);
    const link = document.createElement('a'); link.href = repo.html_url; link.target = '_blank'; link.rel = 'noreferrer'; link.textContent = 'OPEN ↗';
    foot.append(star, forks, updated, link);
    card.append(head, description, foot);
    return card;
  }

  function renderRepositories() {
    const query = $('#repoSearch').value.trim().toLowerCase();
    const language = $('#languageFilter').value;
    const sort = $('#repoSort').value;
    let visible = repositories.filter(repo => {
      const searchText = [repo.name, repo.description, repo.language, ...(repo.topics || [])].join(' ').toLowerCase();
      return searchText.includes(query) && (language === 'all' || repo.language === language);
    });
    if (sort === 'stars') visible.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    else if (sort === 'name') visible.sort((a, b) => a.name.localeCompare(b.name));
    else visible.sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at));

    const grid = $('#repoGrid');
    grid.textContent = '';
    setText('repoShown', visible.length.toString());
    if (!visible.length) {
      const empty = document.createElement('div'); empty.className = 'repo-empty';
      empty.textContent = 'No repositories match those filters. Try a different query.';
      grid.append(empty); return;
    }
    visible.slice(0, 8).forEach(repo => grid.append(createRepoCard(repo)));
    if (visible.length > 8) {
      const more = document.createElement('a'); more.className = 'repo-empty'; more.href = `${GITHUB_PROFILE}?tab=repositories`; more.target = '_blank'; more.rel = 'noreferrer';
      more.textContent = `+ ${visible.length - 8} more matching repositories — open all ↗`;
      grid.append(more);
    }
  }

  // Animated role text without a typewriter dependency.
  const roles = ['Full-stack products', 'Real-time systems', 'Applied machine learning', 'Algorithmic problem solving'];
  let roleIndex = 0;
  async function typeRole() {
    const target = $('#typewriter');
    if (!target) return;
    if (prefersReducedMotion) { target.textContent = roles[0]; return; }
    let index = 0;
    while (true) {
      const word = roles[roleIndex % roles.length];
      target.textContent = word.slice(0, index++);
      if (index <= word.length) {
        await new Promise(resolve => window.setTimeout(resolve, 55));
      } else {
        await new Promise(resolve => window.setTimeout(resolve, 1500));
        while (index > 0) {
          target.textContent = word.slice(0, --index);
          await new Promise(resolve => window.setTimeout(resolve, 25));
        }
        roleIndex = (roleIndex + 1) % roles.length;
        await new Promise(resolve => window.setTimeout(resolve, 230));
      }
    }
  }

  function initReveal() {
    const targets = $$('.reveal');
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      targets.forEach(target => target.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    targets.forEach(target => observer.observe(target));
  }

  function initCursorAura() {
    if (prefersReducedMotion || !window.matchMedia('(pointer:fine)').matches) return;
    let pending = false;
    document.addEventListener('pointermove', event => {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--aura-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--aura-y', `${event.clientY}px`);
        pending = false;
      });
    }, { passive: true });
  }

  function initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem('jay-systems-theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
    $('#themeToggle').addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('jay-systems-theme', root.dataset.theme);
      $('#themeToggle').textContent = root.dataset.theme === 'dark' ? '◐' : '◑';
      showToast(`${root.dataset.theme.toUpperCase()} THEME ENABLED`);
    });
  }

  const commandOverlay = $('#commandOverlay');
  const commandInput = $('#commandInput');
  let lastFocused = null;
  function openCommand() {
    lastFocused = document.activeElement;
    commandOverlay.classList.add('open');
    commandOverlay.setAttribute('aria-hidden', 'false');
    commandInput.value = '';
    filterCommands('');
    window.setTimeout(() => commandInput.focus(), 30);
  }
  function closeCommand() {
    commandOverlay.classList.remove('open');
    commandOverlay.setAttribute('aria-hidden', 'true');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }
  function filterCommands(query) {
    const lower = query.trim().toLowerCase();
    $$('#commandList button').forEach(button => {
      button.hidden = !button.textContent.toLowerCase().includes(lower);
    });
  }
  function executeCommand(command) {
    closeCommand();
    if (command === 'copy-email') { copyEmail(); return; }
    const target = $(command);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('jay91451@gmail.com');
      showToast('EMAIL ADDRESS COPIED');
    } catch (_) {
      showToast('EMAIL: jay91451@gmail.com');
    }
  }

  function initCommandPalette() {
    $('#openCommand').addEventListener('click', openCommand);
    $$('[data-close-command]').forEach(element => element.addEventListener('click', closeCommand));
    commandInput.addEventListener('input', () => filterCommands(commandInput.value));
    $$('#commandList button').forEach(button => button.addEventListener('click', () => executeCommand(button.dataset.command)));
    document.addEventListener('keydown', event => {
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); commandOverlay.classList.contains('open') ? closeCommand() : openCommand();
      } else if (event.key === 'Escape' && commandOverlay.classList.contains('open')) {
        closeCommand();
      } else if (event.key === '/' && !typing && !commandOverlay.classList.contains('open')) {
        event.preventDefault(); $('#repoSearch').focus(); $('#repo-radar').scrollIntoView({ behavior: 'smooth' });
      } else if (event.key === 'ArrowDown' && commandOverlay.classList.contains('open')) {
        const visible = $$('#commandList button:not([hidden])');
        const index = visible.indexOf(document.activeElement);
        if (visible.length) { event.preventDefault(); visible[(index + 1) % visible.length].focus(); }
      } else if (event.key === 'ArrowUp' && commandOverlay.classList.contains('open')) {
        const visible = $$('#commandList button:not([hidden])');
        const index = visible.indexOf(document.activeElement);
        if (visible.length) { event.preventDefault(); visible[(index - 1 + visible.length) % visible.length].focus(); }
      }
    });
  }

  function initRepoControls() {
    $('#repoSearch').addEventListener('input', renderRepositories);
    $('#languageFilter').addEventListener('change', renderRepositories);
    $('#repoSort').addEventListener('change', renderRepositories);
  }

  function initActiveNav() {
    const links = $$('.nav-links a');
    const sections = links.map(link => $(link.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-25% 0px -62% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  function initBootScreen() {
    const screen = $('#bootScreen');
    window.setTimeout(() => screen.classList.add('done'), prefersReducedMotion ? 50 : 1050);
  }

  function init() {
    setText('yearNow', new Date().getFullYear().toString());
    initBootScreen();
    initReveal();
    initCursorAura();
    initTheme();
    initCommandPalette();
    initRepoControls();
    initActiveNav();
    $('#copyEmail').addEventListener('click', copyEmail);
    typeRole();
    loadGithubData();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
