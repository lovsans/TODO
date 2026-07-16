/* utils.js — общие помощники: экранирование, перемешивание, тема, util-функции. */


    function debounce(fn, ms) {
        let t = null;
        return function () {
            const args = arguments, ctx = this;
            clearTimeout(t);
            t = setTimeout(function () { fn.apply(ctx, args); }, ms);
        };
    }

    function shuffleArr(a) {
        const r = a.slice();
        for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
        return r;
    }

    // Уважает системную настройку «уменьшить движение»: true, если она включена.
    function reducedMotion() {
        try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
        catch (e) { return false; }
    }

    // Прокрутка к активному разделу (двойной rAF — после раскладки sticky-шапки).
    function scrollToSection(el) {
        if (!el) return;
        const behavior = reducedMotion() ? 'auto' : 'smooth';
        requestAnimationFrame(() => requestAnimationFrame(() => {
            el.scrollIntoView({ behavior, block: 'start' });
        }));
    }

    // Кнопка в конце раздела — вернуться к списку разделов.
    function scrollToNav() {
        const nav = document.getElementById('nav-tabs');
        if (!nav) return;
        nav.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
        try {
            const first = nav.querySelector('.nav-group-tab, .nav-item, button');
            if (first) first.focus({ preventScroll: true });
        } catch (e) {}
    }

    // Цифры Тодо Бичик (категория numbers) рисуются горизонтально, не как буквы.
    function isTodoNumber(c) { return !!(c && c.category === 'numbers'); }
    function todoNumClass(c) { return isTodoNumber(c) ? ' todo-num' : ''; }

    // ── Сохранение написанного слова как картинки ─────────────────────────────
    // Картинка рисуется самим браузером: блок вертикального письма со встроенным
    // шрифтом тодо упаковывается в SVG <foreignObject> и переносится на <canvas>.
    // Так сохраняется точное начертание (формы, соединения, перенос столбцов,
    // ориентация), всё работает офлайн и без внешних библиотек. Источник шрифта —
    // константа TODO_FONT_SRC из font-data.js (доступна даже из file://); при её
    // отсутствии есть запасной путь через CSSOM.
    let __todoFontSrc = null;
    function getTodoFontSrc() {
        if (__todoFontSrc) return __todoFontSrc;
        // основной путь: константа из font-data.js (работает в любом окружении)
        if (typeof TODO_FONT_SRC === 'string' && TODO_FONT_SRC) { __todoFontSrc = TODO_FONT_SRC; return __todoFontSrc; }
        // запасной путь: вытащить data-URI из подключённого CSS
        __todoFontSrc = '';
        try {
            for (const ss of document.styleSheets) {
                let rules; try { rules = ss.cssRules; } catch (e) { continue; }
                for (const r of rules) {
                    if (r && r.type === CSSRule.FONT_FACE_RULE && /TodoPozdneyev/i.test(r.cssText)) {
                        const m = r.cssText.match(/url\(([^)]+)\)/);
                        if (m) { __todoFontSrc = m[1].replace(/["']/g, ''); return __todoFontSrc; }
                    }
                }
            }
        } catch (e) {}
        return __todoFontSrc;
    }
    function xmlEsc(s) {
        return String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    }

    // Надёжное получение data-URI шрифта тодо для встраивания в картинку.
    // Сначала пробуем CSSOM (быстро), затем — fetch самого файла шрифтов: на части
    // окружений (напр. file:// в Chrome) доступ к cssRules заблокирован, и тогда
    // прямое чтение css/fonts.css спасает экспорт.
    async function getTodoFontSrcAsync() {
        const sync = getTodoFontSrc();
        if (sync) return sync;
        try {
            const resp = await fetch('css/fonts.css');
            if (resp && resp.ok) {
                const css = await resp.text();
                const m = css.match(/TodoPozdneyev[\s\S]*?url\(([^)]+)\)/);
                if (m) { __todoFontSrc = m[1].replace(/["']/g, ''); return __todoFontSrc; }
            }
        } catch (e) {}
        return '';
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    }

    // Снимает ТОЛЬКО висящие краевые штрихи спины-подчёркивания: ведущий прогон
    // входящего стержня (^_+) и хвостовой исходящий штрих (_+$). Ведущая корона «ъ»
    // (титм) на начальных формах НЕ трогается — это часть начертания буквы (А, Э…),
    // как в исходном файле. Связки между буквами внутри строки тоже сохраняются.
    // Применяется и к одиночной форме, и к собранному слову. Данные не меняются.
    function trimSpine(v) {
        if (v === null || v === undefined) return v;
        const t = String(v).replace(/^_+/, '').replace(/_+$/, '');
        return t.length ? t : String(v);   // не опустошаем форму, если в ней одни штрихи
    }

    function applyTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);
        html.style.colorScheme = theme;            // явный сигнал браузеру (против принудительного затемнения)
        if (document.body) document.body.style.colorScheme = theme;
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
        // транслируем тему во встроенный тренажёр письма (если он смонтирован)
        try {
            const wf = document.getElementById('writer-frame');
            if (wf && wf.contentWindow) wf.contentWindow.postMessage({ __todoTheme: theme }, '*');
        } catch (e) {}
    }

    function repaintNudge() {
        // принудительный полный repaint (Android Chrome/iOS иногда не обновляют var() на корне)
        const b = document.body; if (!b) return;
        const sx = window.scrollX, sy = window.scrollY;
        b.style.display = 'none';
        void b.offsetHeight;
        b.style.display = '';
        window.scrollTo(sx, sy);
    }

    let themeBusy = false;
    function toggleTheme() {
        if (themeBusy) return;                     // защита от двойного срабатывания тапа на мобильном
        themeBusy = true; setTimeout(function() { themeBusy = false; }, 300);
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        repaintNudge();
        try { localStorage.setItem('todo-theme', next); } catch (e) { /* приватный режим — игнорируем */ }
    }

    // ===== Бирюзовые глифы тодо =====
    // По умолчанию знаки тодо (атлас, конструктор слова, тренажёр, тексты для
    // чтения, загадки) рисуются обычным цветом текста темы — тёмным в светлой,
    // белым в тёмной. Этот переключатель в шапке делает их бирюзовым акцентом
    // сайта сразу в ОБЕИХ темах — мягче для глаз при долгом чтении. Реализовано
    // через CSS-переменную --todo-ink (см. style.css): контейнеры знаков тодо
    // красятся через неё вместо --text-primary, а атрибут data-glyph-accent="1"
    // на <html> переопределяет --todo-ink на var(--accent) независимо от темы.
    function applyGlyphAccent(on) {
        document.documentElement.setAttribute('data-glyph-accent', on ? '1' : '0');
        const btn = document.getElementById('glyph-accent-btn');
        if (btn) {
            btn.classList.toggle('is-active', !!on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        }
    }
    function loadGlyphAccent() {
        try { return localStorage.getItem('todo-glyph-accent') === '1'; } catch (e) { return false; }
    }
    function toggleGlyphAccent() {
        const on = document.documentElement.getAttribute('data-glyph-accent') !== '1';
        applyGlyphAccent(on);
        try { localStorage.setItem('todo-glyph-accent', on ? '1' : '0'); } catch (e) { /* приватный режим — игнорируем */ }
    }
