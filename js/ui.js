/* ui.js — навигация по разделам, вкладки, модальные карточки букв. */


    function renderNavTabs() {
        const el = document.getElementById('nav-tabs');
        el.innerHTML = `
            <div class="nav-tiles-row">
                <div class="nav-tiles" role="tablist" aria-label="Группы разделов">
                    ${navGroups.map((g, i) => `
                        <button type="button" class="nav-tile" role="tab"
                                aria-expanded="false" aria-controls="nav-group-panel-${i}" id="nav-group-toggle-${i}"
                                data-nav-group="${i}" onclick="toggleNavGroup(${i})">
                            <span class="nav-group-label">${escapeHtml(g.label)}</span>
                            <span class="nav-group-chevron" aria-hidden="true"></span>
                        </button>`).join('')}
                </div>
                <div class="nav-bulk" aria-label="Управление группами">
                    <button type="button" class="nav-bulk-btn" onclick="expandAllNavGroups()">Развернуть все</button>
                    <button type="button" class="nav-bulk-btn" onclick="collapseAllNavGroups()">Свернуть все</button>
                </div>
            </div>
            <div class="nav-panels">
                ${navGroups.map((g, i) => `
                    <div class="nav-group-panel" id="nav-group-panel-${i}" data-nav-panel="${i}" role="tabpanel" aria-labelledby="nav-group-toggle-${i}" hidden>
                        <div class="nav-group-items" aria-label="${escapeHtml(g.label)}">
                            ${g.cats.map(c => `<button class="nav-item ${c === 'about' ? 'active' : ''}" data-cat="${c}"${c === 'about' ? ' aria-current="page"' : ''} onclick="showSection('${c}')">${categoryMeta[c].label}</button>`).join('')}
                        </div>
                    </div>`).join('')}
            </div>`;
        applyNavGroupState();
    }

    const NAV_GROUP_STORE = 'todo-nav-groups-collapsed';

    function getCollapsedNavGroups() {
        try {
            const raw = localStorage.getItem(NAV_GROUP_STORE);
            if (raw) return new Set(JSON.parse(raw).map(Number));
        } catch (e) {}
        return new Set();
    }

    function saveCollapsedNavGroups(collapsed) {
        try { localStorage.setItem(NAV_GROUP_STORE, JSON.stringify([...collapsed])); } catch (e) {}
    }

    function setNavGroupCollapsed(i, collapsed) {
        const tile = document.getElementById('nav-group-toggle-' + i);
        const panel = document.getElementById('nav-group-panel-' + i);
        if (tile) tile.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        if (tile) tile.classList.toggle('is-active', !collapsed);
        if (panel) {
            panel.classList.toggle('is-open', !collapsed);
            if (collapsed) panel.setAttribute('hidden', '');
            else panel.removeAttribute('hidden');
        }
    }

    function toggleNavGroup(i) {
        const panel = document.getElementById('nav-group-panel-' + i);
        if (!panel) return;
        const collapsed = panel.classList.contains('is-open');
        setNavGroupCollapsed(i, collapsed);
        syncNavGroupStore();
    }

    function syncNavGroupStore() {
        const collapsed = new Set();
        navGroups.forEach((_, i) => {
            const panel = document.getElementById('nav-group-panel-' + i);
            if (panel && !panel.classList.contains('is-open')) collapsed.add(i);
        });
        saveCollapsedNavGroups(collapsed);
    }

    function collapseAllNavGroups() {
        navGroups.forEach((_, i) => setNavGroupCollapsed(i, true));
        saveCollapsedNavGroups(new Set(navGroups.map((_, i) => i)));
    }

    function expandAllNavGroups() {
        navGroups.forEach((_, i) => setNavGroupCollapsed(i, false));
        saveCollapsedNavGroups(new Set());
    }

    function applyNavGroupState() {
        let collapsed;
        try {
            if (localStorage.getItem(NAV_GROUP_STORE) === null) {
                collapseAllNavGroups();
                return;
            }
            collapsed = getCollapsedNavGroups();
        } catch (e) {
            collapseAllNavGroups();
            return;
        }
        navGroups.forEach((_, i) => setNavGroupCollapsed(i, collapsed.has(i)));
    }

    function ensureNavGroupOpen(cat) {
        const gi = navGroups.findIndex(g => g.cats.includes(cat));
        if (gi < 0) return;
        setNavGroupCollapsed(gi, false);
        syncNavGroupStore();
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
                <div class="section-info">${categoryMeta[cat].info}</div>
                <div class="writer-host">
                    <iframe id="writer-frame" title="Тренажёр письма Тодо Бичик"
                            style="width:100%;border:0;display:block;height:1024px;border-radius:14px;background:var(--bg-secondary);"></iframe>
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

    function renderSections() {
        const el = document.getElementById('sections-container');
        const cats = Object.keys(categoryMeta);
        el.innerHTML = cats.map((cat, i) =>
            `<div class="section ${i === 0 ? 'active' : ''}" id="section-${cat}">${renderSectionContent(cat)}</div>`
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

    function openModal(idx, navMode) {            // открытие с карточки в сетке — начинает новую цепочку
        if (!charData[idx]) return;
        modalReturnFocus = document.activeElement;   // запоминаем, откуда открыли
        modalStack = [idx];
        modalNavMode = navMode || null;
        renderModalContent(idx);
        document.getElementById('modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        focusModalDialog();                           // фокус уходит внутрь диалога
    }

    function pushModal(idx) {             // переход по ссылке внутри примечания — добавляет в цепочку
        if (!charData[idx]) return;
        modalStack.push(idx);
        renderModalContent(idx);
        focusModalDialog();               // прежняя ссылка удалена при ререндере — возвращаем фокус в диалог
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

    function renderModalContent(idx) {
        const c = charData[idx];
        if (!c) return;
        const cyr = c.cyrillic !== null ? String(c.cyrillic) : '—';
        document.getElementById('modal-title').textContent = (c.id !== null ? '№' + c.id + ' — ' : '') + cyr;
        const f = document.getElementById('modal-forms');
        function mf(label, val) {
            if (val !== null && val !== undefined)
                return `<div class="modal-form-item"><div class="modal-form-char" aria-hidden="true">${trimSpine(val)}</div><div class="modal-form-label">${label}</div></div>`;
            return `<div class="modal-form-item"><div class="modal-form-char" aria-hidden="true" style="color:var(--text-muted);font-family:Inter,sans-serif;font-size:3rem;">—</div><div class="modal-form-label">${label}</div></div>`;
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

    function closeModal() {
        modalStack = [];
        modalNavMode = null;
        document.getElementById('modal-overlay').classList.remove('active');
        document.body.style.overflow = '';
        // возвращаем фокус на карточку, с которой открыли модалку (если она ещё видима)
        if (modalReturnFocus && typeof modalReturnFocus.focus === 'function') {
            try { modalReturnFocus.focus(); } catch (e) {}
        }
        modalReturnFocus = null;
    }

    function showSection(cat) {
        exitSearch();
        ensureNavGroupOpen(cat);
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
        scrollTopSmooth();
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
    }

