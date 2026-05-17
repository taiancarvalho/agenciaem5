/**
 * Brandbook Master Ultra JS v3.0
 * Theme toggle, navigation, prompt copy, code copy, format tabs, motion replay.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMasterUltra();
});

function initMasterUltra() {
    initThemeToggle();
    initNavigation();
    initLucide();
    initPromptCopy();
    initCodeCopy();
    initFormatTabs();
    initMotionReplay();
}

/* ─── Theme Toggle (Light / Dark / System) ─── */
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    const html   = document.documentElement;
    const themes = ['light', 'dark', 'system'];

    let currentTheme = localStorage.getItem('master-brandbook-theme') || 'system';
    applyTheme(currentTheme);

    toggleBtn.addEventListener('click', () => {
        let index    = themes.indexOf(currentTheme);
        currentTheme = themes[(index + 1) % themes.length];
        localStorage.setItem('master-brandbook-theme', currentTheme);
        applyTheme(currentTheme);
    });
}

function applyTheme(theme) {
    const html      = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle-btn');

    html.dataset.theme = theme;

    let icon = 'sun';
    if (theme === 'dark')   icon = 'moon';
    if (theme === 'system') icon = 'monitor';

    if (toggleBtn) {
        toggleBtn.innerHTML = `<i data-lucide="${icon}" style="width:14px;height:14px;"></i> <span>Tema: ${theme.charAt(0).toUpperCase() + theme.slice(1)}</span>`;
        if (window.lucide) lucide.createIcons();
    }
}

/* ─── Navigation active-state tracking ─── */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], header[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id   = entry.target.getAttribute('id');
                const link = document.querySelector(`.nav-link[href="#${id}"]`);
                if (link) link.classList.add('active');
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
}

/* ─── Lucide icons ─── */
function initLucide() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

/* ─── Design Prompt full-copy + card-copy ─── */
function initPromptCopy() {
    const fullCopyBtn = document.getElementById('copy-full-prompt-btn');
    const promptCards = document.querySelectorAll('.master-prompt-card');

    promptCards.forEach(card => {
        card.addEventListener('click', () => {
            const content = card.dataset.copy || card.querySelector('.p-card-body')?.innerText || '';
            copyText(content, card, '.p-card-footer', 'CLICK_TO_COPY');
        });
    });

    if (fullCopyBtn) {
        fullCopyBtn.addEventListener('click', () => {
            let full = 'Apply this brand design direction to the creative:\n\n';
            promptCards.forEach(card => {
                const label   = card.dataset.label || '';
                const content = card.dataset.copy || card.querySelector('.p-card-body')?.innerText || '';
                full += `**${label}:**\n${content}\n\n`;
            });
            copyText(full, fullCopyBtn, null, null);
        });
    }
}

/* ─── Code block copy buttons ─── */
function initCodeCopy() {
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const block   = btn.closest('.code-block');
            const content = block?.dataset.code || block?.querySelector('code')?.innerText || '';
            navigator.clipboard.writeText(content).then(() => {
                const orig = btn.innerText;
                btn.innerText = 'COPIADO!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerText = orig;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(() => {});
        });
    });
}

/* ─── Format channel tabs ─── */
function initFormatTabs() {
    document.querySelectorAll('[data-tab-group]').forEach(group => {
        const groupId = group.dataset.tabGroup;
        const tabs    = group.querySelectorAll('[data-tab]');
        const panels  = document.querySelectorAll(`[data-tab-panel="${groupId}"]`);

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const target = document.querySelector(`[data-tab-panel="${groupId}"][data-panel="${tab.dataset.tab}"]`);
                if (target) target.classList.add('active');
            });
        });
    });
}

/* ─── Motion stage: replay on hover via CSS restart trick ─── */
function initMotionReplay() {
    document.querySelectorAll('.motion-stage').forEach(stage => {
        stage.addEventListener('mouseenter', () => {
            const el = stage.querySelector('.bb-anim');
            if (!el) return;
            el.style.animation = 'none';
            el.offsetHeight; // reflow
            el.style.animation = '';
        });
    });
}

/* ─── Shared copy helper ─── */
async function copyText(text, rootEl, footerSelector, footerOriginal) {
    try {
        await navigator.clipboard.writeText(text);
        if (footerSelector) {
            const footer = rootEl.querySelector(footerSelector);
            if (footer) {
                const orig = footer.innerText;
                footer.innerText = 'COPIADO!';
                footer.style.color = 'var(--shell-success)';
                setTimeout(() => {
                    footer.innerText = orig;
                    footer.style.color = '';
                }, 2000);
            }
        } else {
            const orig = rootEl.innerText;
            rootEl.innerText = 'COPIADO!';
            setTimeout(() => { rootEl.innerText = orig; }, 2000);
        }
    } catch (_) {}
}
