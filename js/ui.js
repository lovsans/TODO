/* ui.js — навигация по разделам, вкладки, модальные карточки букв. */


    const NAV_GROUP_STORE = 'todo-nav-active-group';
    let activeNavGroup = 0;

    function navChipLabel(cat) {
        if (typeof NAV_CHIP_LABEL !== 'undefined' && NAV_CHIP_LABEL[cat]) return NAV_CHIP_LABEL[cat];
        return categoryMeta[cat] ? categoryMeta[cat].label : cat;
    }

    function loadActiveNavGroup() {
        try {
            const raw = localStorage.getItem(NAV_GROUP_STORE);
            if (raw == null) return 0;
            const n = parseInt(raw, 10);
            if (Number.isFinite(n) && n >= 0 && n < navGroups.length) return n;
        } catch (e) {}
        return 0;
    }

    function saveActiveNavGroup(i) {
        try { localStorage.setItem(NAV_GROUP_STORE, String(i)); } catch (e) {}
    }

    function renderNavChips(groupIndex, activeCat) {
        const g = navGroups[groupIndex];
        if (!g) return '';
        return g.cats.map(c => {
            const on = c === activeCat;
            return `<button type="button" class="nav-item${on ? ' active' : ''}" data-cat="${c}"` +
                `${on ? ' aria-current="page"' : ''} onclick="showSection('${c}')">${escapeHtml(navChipLabel(c))}</button>`;
        }).join('');
    }

    function renderNavTabs() {
        const el = document.getElementById('nav-tabs');
        activeNavGroup = loadActiveNavGroup();
        const activeCat = (document.querySelector('.section.active') || {}).id;
        const cat = activeCat && activeCat.startsWith('section-') ? activeCat.slice('section-'.length) : 'about';
        const gi = navGroups.findIndex(g => g.cats.includes(cat));
        if (gi >= 0) activeNavGroup = gi;

        el.innerHTML = `
            <div class="nav-group-tabs" role="tablist" aria-label="Группы разделов">
                ${navGroups.map((g, i) => `
                    <button type="button" class="nav-group-tab${i === activeNavGroup ? ' is-active' : ''}"
                            role="tab" id="nav-group-tab-${i}"
                            aria-selected="${i === activeNavGroup ? 'true' : 'false'}"
                            aria-controls="nav-chips"
                            data-nav-group="${i}" onclick="selectNavGroup(${i})">
                        ${escapeHtml(g.label)}
                    </button>`).join('')}
            </div>
            <div class="nav-chips" id="nav-chips" role="tabpanel" aria-labelledby="nav-group-tab-${activeNavGroup}">
                ${renderNavChips(activeNavGroup, cat)}
            </div>`;
        saveActiveNavGroup(activeNavGroup);
    }

    function selectNavGroup(i, preferCat) {
        if (i < 0 || i >= navGroups.length) return;
        activeNavGroup = i;
        saveActiveNavGroup(i);
        const tabs = document.querySelectorAll('.nav-group-tab');
        tabs.forEach((btn, idx) => {
            const on = idx === i;
            btn.classList.toggle('is-active', on);
            btn.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        const chips = document.getElementById('nav-chips');
        if (!chips) return;
        chips.setAttribute('aria-labelledby', 'nav-group-tab-' + i);
        const group = navGroups[i];
        let keep = null;
        if (preferCat && group.cats.includes(preferCat)) keep = preferCat;
        else {
            const activeBtn = document.querySelector('.nav-item.active');
            const activeCat = activeBtn ? activeBtn.getAttribute('data-cat') : null;
            if (activeCat && group.cats.includes(activeCat)) keep = activeCat;
        }
        chips.innerHTML = renderNavChips(i, keep);
        scrollActiveNavIntoView();
    }

    // На узком экране подтянуть активный чип/вкладку по горизонтали, не трогая скролл страницы.
    function scrollActiveNavIntoView() {
        function scrollXInto(el) {
            if (!el) return;
            const scroller = el.parentElement;
            if (!scroller) return;
            const er = el.getBoundingClientRect();
            const sr = scroller.getBoundingClientRect();
            if (er.left < sr.left) scroller.scrollLeft += er.left - sr.left - 12;
            else if (er.right > sr.right) scroller.scrollLeft += er.right - sr.right + 12;
        }
        try {
            scrollXInto(document.querySelector('.nav-group-tab.is-active'));
            scrollXInto(document.querySelector('.nav-item.active'));
        } catch (e) {}
    }

    function syncNavGroupForCat(cat) {
        const gi = navGroups.findIndex(g => g.cats.includes(cat));
        if (gi < 0) return;
        selectNavGroup(gi, cat);
    }

    function renderSectionContent(cat) {
        if (cat === 'about') return renderAbout();
        if (cat === 'path') return '<div id="path-root"></div>';
        if (cat === 'writing_rules') return renderWritingRules();
        if (cat === 'course') return renderCourse();
        if (cat === 'rules') {
            return `
                <div class="section-title">Правила чтения</div>
                <div class="section-info">Ключевые закономерности «ясного письма» по самоучителю А. В. Бадмаева (1971).</div>
                ${renderRules()}`;
        }
        if (cat === 'harmony') return renderHarmony();
        if (cat === 'words') {
            return `
                <div class="section-title">Слова для чтения</div>
                <div class="section-info">Старое написание ⇄ современный калмыцкий. Нажмите на карточку, чтобы увидеть современную форму.</div>
                ${renderWords()}`;
        }
        if (cat === 'reading') {
            return `
                <div class="section-title">${categoryMeta[cat].label}</div>
                <div class="section-info">${categoryMeta[cat].info}</div>
                ${renderReading()}`;
        }
        if (cat === 'direction') {
            return `
                <div class="section-title">${categoryMeta[cat].label}</div>
                <div class="section-info section-info-writer">${categoryMeta[cat].info}</div>
                <div class="writer-host">
                    <iframe id="writer-frame" class="writer-frame" title="Тренажёр письма Тодо Бичик"></iframe>
                </div>`;
        }
        if (cat === 'copybook') return renderCopybook();
        if (cat === 'compose_word') {
            return `
                <div class="section-title">${categoryMeta[cat].label}</div>
                <div class="section-info">${categoryMeta[cat].info}</div>
                ${renderCompose()}`;
        }
        if (cat === 'write_word') {
            return `
                <div class="section-title">${categoryMeta[cat].label}</div>
                <div class="section-info">${categoryMeta[cat].info}</div>
                ${renderWriteWord()}`;
        }
        if (practiceScopes[cat]) return practiceMarkup(cat);
        if (cat === 'syllables') {
            return `
                <div class="section-title">${categoryMeta[cat].label}</div>
                <div class="section-info">${categoryMeta[cat].info}</div>
                ${renderSyllables()}`;
        }
        if (cat === 'summary') {
            return `
                <div class="section-title">${categoryMeta[cat].label}</div>
                <div class="section-info">${categoryMeta[cat].info}</div>
                ${renderSummary()}`;
        }
        const list = charsByCategory[cat] || [];
        return `
            <div class="section-title">${categoryMeta[cat].label}</div>
            <div class="section-info">${categoryMeta[cat].info}</div>
            <div class="char-grid">${list.map(renderCard).join('')}</div>`;
    }

    function navCatsInOrder() {
        const out = [];
        if (typeof navGroups === 'undefined') return out;
        navGroups.forEach(g => {
            (g.cats || []).forEach(c => {
                if (isValidSection(c) && out.indexOf(c) < 0) out.push(c);
            });
        });
        return out;
    }

    function nextSectionCat(cat) {
        const list = navCatsInOrder();
        const i = list.indexOf(cat);
        if (i < 0 || i >= list.length - 1) return null;
        return list[i + 1];
    }

    function showNextSection() {
        const next = nextSectionCat(getActiveSectionCat());
        if (next) showSection(next);
    }

    function sectionEndNavMarkup(cat) {
        const next = nextSectionCat(cat);
        const nextName = next ? navChipLabel(next) : '';
        const nextBtn = next ? `
                <button type="button" class="section-next-btn" onclick="showNextSection()"
                        aria-label="Дальше: ${escapeHtml(nextName)}" title="Дальше: ${escapeHtml(nextName)}">
                    <span class="section-next-text">Дальше: ${escapeHtml(nextName)}</span>
                    <span aria-hidden="true">→</span>
                </button>` : '';
        return `
            <div class="section-end-nav">
                ${nextBtn}
                <button type="button" class="back-to-nav" onclick="scrollToNav()"
                        aria-label="Назад к списку разделов" title="Назад к списку разделов">
                    <span aria-hidden="true">↑</span>
                    <span class="back-to-nav-text">Назад к списку разделов</span>
                </button>
            </div>`;
    }

    function renderSections() {
        const el = document.getElementById('sections-container');
        const cats = Object.keys(categoryMeta);
        el.innerHTML = cats.map((cat, i) =>
            `<div class="section ${i === 0 ? 'active' : ''}" id="section-${cat}">${renderSectionContent(cat)}${sectionEndNavMarkup(cat)}</div>`
        ).join('');
    }

    // Стек переходов по карточкам
    let modalStack = [];
    // Режим списка для «Пред./След.»: null — внутри своей категории; 'summary' — по всей сводной таблице.
    let modalNavMode = null;

    // Элемент, на который вернём фокус после закрытия модалки (карточка-триггер).
    let modalReturnFocus = null;

    // ── Доступность модалки: фокус-ловушка (role="dialog" + aria-modal) ──────────
    // Внутри открытого диалога фокус не должен «уезжать» на фон под оверлеем.

    // Видимые фокусируемые элементы внутри контейнера (скрытые display:none, напр.
    // кнопка «Назад», отсекаются через offsetParent; сам диалог с tabindex=-1 — через :not).
    function getFocusableIn(container) {
        const sel = 'a[href], [role="link"][tabindex], button:not([disabled]), ' +
                    'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' +
                    '[tabindex]:not([tabindex="-1"])';
        return Array.from(container.querySelectorAll(sel)).filter(el => el.offsetParent !== null);
    }

    // Переносит фокус на сам диалог: скринридер читает заголовок (aria-labelledby),
    // а Tab дальше уводит к кнопкам внутри.
    function focusModalDialog() {
        const d = document.querySelector('#modal-overlay .modal');
        if (d) d.focus();
    }

    // Зацикливает Tab/Shift+Tab внутри открытого диалога.
    function trapModalFocus(e) {
        if (e.key !== 'Tab') return;
        const overlay = document.getElementById('modal-overlay');
        if (!overlay || !overlay.classList.contains('active')) return;
        const dialog = overlay.querySelector('.modal');
        if (!dialog) return;
        const f = getFocusableIn(dialog);
        const active = document.activeElement;
        if (!f.length) { e.preventDefault(); dialog.focus(); return; }
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey) {
            // назад с первого элемента (или с самого диалога) — на последний
            if (active === first || active === dialog || !dialog.contains(active)) {
                e.preventDefault(); last.focus();
            }
        } else {
            // вперёд с последнего (или если фокус как-то ушёл наружу) — на первый
            if (active === last || !dialog.contains(active)) {
                e.preventDefault(); first.focus();
            }
        }
    }
    document.addEventListener('keydown', trapModalFocus);

    function openModal(idx, navMode, opts) {            // открытие с карточки в сетке — начинает новую цепочку
        if (!charData[idx]) return;
        opts = opts || {};
        modalReturnFocus = document.activeElement;   // запоминаем, откуда открыли
        modalStack = [idx];
        modalNavMode = navMode || null;
        renderModalContent(idx);
        document.getElementById('modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        focusModalDialog();                           // фокус уходит внутрь диалога
        if (!opts.skipHash) setRouteHash(null, idx);
    }

    function pushModal(idx) {             // переход по ссылке внутри примечания — добавляет в цепочку
        if (!charData[idx]) return;
        modalStack.push(idx);
        renderModalContent(idx);
        focusModalDialog();               // прежняя ссылка удалена при ререндере — возвращаем фокус в диалог
        setRouteHash(null, idx);
    }

    function modalBack() {
        if (modalStack.length > 1) {
            modalStack.pop();
            renderModalContent(modalStack[modalStack.length - 1]);
            focusModalDialog();
        }
    }

    // ── Пред./След. — переключение между карточками внутри той же категории ──
    // Кэш индексов charData по категории — для «Пред./След.» в модалке.
    const modalNavListCache = Object.create(null);

    function charIndicesForCategory(cat) {
        const key = 'cat:' + cat;
        if (!modalNavListCache[key]) {
            const list = [];
            for (let i = 0; i < charData.length; i++) {
                if (charData[i].category === cat) list.push(i);
            }
            modalNavListCache[key] = list;
        }
        return modalNavListCache[key];
    }

    function modalNavList() {
        const cur = charData[modalStack[modalStack.length - 1]];
        if (!cur) return [];
        if (modalNavMode === 'summary' && typeof SUMMARY_CATS !== 'undefined') {
            if (!modalNavListCache.__summary__) {
                const list = [];
                SUMMARY_CATS.forEach(g => list.push(...charIndicesForCategory(g.cat)));
                modalNavListCache.__summary__ = list;
            }
            return modalNavListCache.__summary__;
        }
        return charIndicesForCategory(cur.category);
    }
    function modalGo(idx) {
        modalStack = [idx];
        renderModalContent(idx);
        focusModalDialog();
        setRouteHash(null, idx);
    }
    function modalPrev() {
        const list = modalNavList();
        const pos = list.indexOf(modalStack[modalStack.length - 1]);
        if (pos > 0) modalGo(list[pos - 1]);
    }
    function modalNext() {
        const list = modalNavList();
        const pos = list.indexOf(modalStack[modalStack.length - 1]);
        if (pos !== -1 && pos < list.length - 1) modalGo(list[pos + 1]);
    }
    // Стрелки клавиатуры — листать карточки, пока открыта модалка (и фокус не в поле ввода).
    document.addEventListener('keydown', function (e) {
        const overlay = document.getElementById('modal-overlay');
        if (!overlay || !overlay.classList.contains('active')) return;
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        const tag = document.activeElement && document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        e.preventDefault();
        if (e.key === 'ArrowLeft') modalPrev(); else modalNext();
    });

    // Телефон: свайп по карточке буквы — Пред. / След.
    (function initModalSwipe() {
        const modal = document.querySelector('#modal-overlay .modal');
        if (!modal || typeof bindSwipeNav !== 'function') return;
        bindSwipeNav(modal, function (d) {
            if (d > 0) modalNext();
            else modalPrev();
        });
    })();

    function renderModalContent(idx) {
        const c = charData[idx];
        if (!c) return;
        const cyr = c.cyrillic !== null ? String(c.cyrillic) : '—';
        document.getElementById('modal-title').textContent = (c.id !== null ? '№' + c.id + ' — ' : '') + cyr;
        const f = document.getElementById('modal-forms');
        function mf(label, val) {
            const numCls = todoNumClass(c);
            if (val !== null && val !== undefined)
                return `<div class="modal-form-item"><div class="modal-form-char${numCls}" aria-hidden="true">${trimSpine(val)}</div><div class="modal-form-label">${label}</div></div>`;
            return `<div class="modal-form-item"><div class="modal-form-char" aria-hidden="true" style="color:var(--text-muted);font-family:var(--font-ui);font-size:3rem;">—</div><div class="modal-form-label">${label}</div></div>`;
        }
        f.innerHTML = mf('Начало', c.initial) + mf('Середина', c.medial) + mf('Конец', c.final);
        let info = '';
        if (c.series) {
            info += `<dt>Серия</dt><dd>${escapeHtml(c.series)}${c.seriesDesc ? ` — ${escapeHtml(c.seriesDesc)}` : ' <span style="color:var(--text-muted)">(звуковая составляющая не указана)</span>'}</dd>`;
        }
        if (c.latin !== null) info += `<dt>Латинская транслитерация</dt><dd>${String(c.latin)}</dd>`;
        if (c.cyrillic !== null) info += `<dt>Кириллица</dt><dd>${String(c.cyrillic)}</dd>`;
        if (c.notes) info += `<dt>Примечания</dt><dd>${linkifyNotes(c.notes)}</dd>`;
        document.getElementById('modal-info').innerHTML = info;
        const back = document.getElementById('modal-back');
        if (back) back.style.display = modalStack.length > 1 ? 'inline-block' : 'none';
        const modal = document.querySelector('#modal-overlay .modal');
        if (modal) modal.scrollTop = 0;
        const list = modalNavList();
        const pos = list.indexOf(idx);
        const prevBtn = document.getElementById('modal-prev');
        const nextBtn = document.getElementById('modal-next');
        if (prevBtn) prevBtn.disabled = pos <= 0;
        if (nextBtn) nextBtn.disabled = pos === -1 || pos >= list.length - 1;
    }

    function closeModal(opts) {
        opts = opts || {};
        const wasOpen = document.getElementById('modal-overlay').classList.contains('active');
        modalStack = [];
        modalNavMode = null;
        document.getElementById('modal-overlay').classList.remove('active');
        document.body.style.overflow = '';
        // возвращаем фокус на карточку, с которой открыли модалку (если она ещё видима)
        if (modalReturnFocus && typeof modalReturnFocus.focus === 'function') {
            try { modalReturnFocus.focus(); } catch (e) {}
        }
        modalReturnFocus = null;
        if (wasOpen && !opts.skipHash) setRouteHash(getActiveSectionCat(), null);
    }

    // ===== Маршрут: #раздел / #letter-N, последний раздел в localStorage =====
    const LAST_SECTION_KEY = 'todo-last-section';

    function isValidSection(cat) {
        return !!(cat && typeof categoryMeta !== 'undefined' && categoryMeta[cat]);
    }

    function getActiveSectionCat() {
        const el = document.querySelector('.section.active');
        if (!el || !el.id || el.id.indexOf('section-') !== 0) return 'about';
        return el.id.slice('section-'.length);
    }

    function loadLastSection() {
        try {
            const cat = localStorage.getItem(LAST_SECTION_KEY);
            if (isValidSection(cat)) return cat;
        } catch (e) {}
        return null;
    }

    function saveLastSection(cat) {
        if (!isValidSection(cat)) return;
        try { localStorage.setItem(LAST_SECTION_KEY, cat); } catch (e) {}
    }

    function parseLocationRoute() {
        const raw = (location.hash || '').replace(/^#/, '');
        if (!raw) return null;
        const letterM = raw.match(/^letter[-/](\d+)$/i);
        if (letterM) {
            const idx = parseInt(letterM[1], 10);
            if (charData && charData[idx]) {
                return { cat: charData[idx].category, letterIdx: idx };
            }
            return null;
        }
        let cat = raw;
        try { cat = decodeURIComponent(raw); } catch (e) {}
        if (isValidSection(cat)) return { cat: cat, letterIdx: null };
        return null;
    }

    function setRouteHash(cat, letterIdx) {
        let hash;
        if (letterIdx != null && charData && charData[letterIdx]) hash = '#letter-' + letterIdx;
        else if (isValidSection(cat)) hash = '#' + encodeURIComponent(cat);
        else return;
        if (location.hash === hash) return;
        try { history.replaceState(null, '', hash); }
        catch (e) { location.hash = hash; }
    }

    function applyLocationRoute(opts) {
        opts = opts || {};
        const route = parseLocationRoute();
        if (route) {
            showSection(route.cat, {
                skipHash: true,
                skipScroll: !!opts.skipScroll || route.letterIdx != null
            });
            if (route.letterIdx != null) openModal(route.letterIdx, null, { skipHash: true });
            else closeModal({ skipHash: true });
            return true;
        }
        return false;
    }

    function handleHashChange() {
        applyLocationRoute({ skipScroll: false });
    }

    function showSection(cat, opts) {
        opts = opts || {};
        if (!isValidSection(cat)) return;
        // Смена раздела закрывает карточку буквы (кроме случая keepModal при маршруте).
        if (!opts.keepModal) {
            const overlay = document.getElementById('modal-overlay');
            if (overlay && overlay.classList.contains('active')) closeModal({ skipHash: true });
        }
        exitSearch();
        syncNavGroupForCat(cat);
        document.getElementById('sections-container').style.display = '';
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const sec = document.getElementById('section-' + cat);
        if (!sec) return;
        sec.classList.add('active');
        document.querySelectorAll('.nav-item').forEach(n => {
            const on = n.getAttribute('data-cat') === cat;
            n.classList.toggle('active', on);
            if (on) n.setAttribute('aria-current', 'page');
            else n.removeAttribute('aria-current');
        });
        saveLastSection(cat);
        if (!opts.skipHash) setRouteHash(cat, null);
        if (cat === 'about') updateHomeProgress();
        if (practiceScopes[cat]) setupPractice(cat);
        if (cat === 'copybook') requestAnimationFrame(() => requestAnimationFrame(cbFit));
        if (cat === 'compose_word') {
            wwColored = loadWwColored();
            applyGlyphColoredBtns();
            if (!composeState.inited) { composeZoomVal = loadComposeZoom(); composeSetup(loadComposeWi()); }
            else composeRender();
        }
        if (cat === 'write_word') wwInit();
        if (cat === 'path') renderPathRoot();
        if (cat === 'harmony') setupHarmony();
        if (!opts.skipScroll) {
            const scrollTarget = cat === 'about'
                ? (document.getElementById('about-hero') || sec)
                : sec;
            scrollToSection(scrollTarget);
        }
    }

    function bootNavigation() {
        if (applyLocationRoute({ skipScroll: true })) return;
        const last = loadLastSection();
        showSection(last || 'about', { skipScroll: last === 'about' || !last });
    }

