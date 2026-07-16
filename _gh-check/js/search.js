/* search.js — поиск и фильтрация по атласу букв, словам, правилам и разделам. */


    const SEARCH_RECENT_KEY = 'todo-search-recent';
    const SEARCH_RECENT_MAX = 6;
    const SEARCH_SUGGEST = [
        { q: 'ө', label: 'ө' },
        { q: 'н', label: 'н' },
        { q: 'нурһн', label: 'нурһн' },
        { q: 'дерево', label: 'дерево' },
        { q: 'сингармонизм', label: 'сингармонизм' },
        { q: 'галик', label: 'галик' },
        { q: 'тренировка', label: 'тренировка' },
        { q: 'жеребец', label: 'жеребец' },
        { q: '#21', label: '№ 21' }
    ];
    const READING_GENRE_LABEL = {
        expr: 'Краткие выражения',
        riddles: 'Загадки',
        proverbs: 'Пословицы',
        songs: 'Песни',
        blessing: 'Йорял',
        tale: 'Сказка'
    };
    // Все разделы сайта: порядок как в навигации, плюс любые ключи categoryMeta вне групп.
    function allSearchSectionCats() {
        const seen = new Set();
        const out = [];
        if (typeof navGroups !== 'undefined') {
            for (const g of navGroups) {
                for (const cat of (g.cats || [])) {
                    if (!seen.has(cat) && categoryMeta[cat]) {
                        seen.add(cat);
                        out.push(cat);
                    }
                }
            }
        }
        for (const cat of Object.keys(categoryMeta)) {
            if (!seen.has(cat)) {
                seen.add(cat);
                out.push(cat);
            }
        }
        return out;
    }

    function sectionNavGroup(cat) {
        if (typeof navGroups === 'undefined') return '';
        for (const g of navGroups) {
            if (g.cats && g.cats.indexOf(cat) !== -1) return g.label || '';
        }
        return '';
    }

    function sectionDisplayLabel(cat) {
        if (typeof practiceScopes !== 'undefined' && practiceScopes[cat] && practiceScopes[cat].title) {
            return practiceScopes[cat].title;
        }
        return (categoryMeta[cat] && categoryMeta[cat].label) || cat;
    }

    function initSearch() {
        const sel = document.getElementById('search-filter');
        sel.innerHTML = '<option value="all">Везде</option>' +
            '<option value="words">Слова</option>' +
            '<option value="texts">Тексты</option>' +
            '<option value="rules">Правила чтения</option>' +
            '<option value="sections">Разделы</option>' +
            searchableCats.map(c => `<option value="${c}">${categoryMeta[c].label}</option>`).join('');
        buildSearchIndex();
        setSearchBarOpen(false);
        renderSearchSuggest();
        const inp = document.getElementById('search-input');
        if (inp) {
            inp.addEventListener('focus', renderSearchSuggest);
            inp.addEventListener('keydown', onSearchKeydown);
        }
    }

    function setSearchBarOpen(open) {
        const bar = document.getElementById('search-bar');
        const btn = document.getElementById('search-toggle');
        if (!bar || !btn) return;
        bar.classList.toggle('is-open', !!open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Свернуть поиск' : 'Открыть поиск');
        btn.title = open ? 'Свернуть поиск' : 'Поиск';
    }

    function toggleSearchBar() {
        const bar = document.getElementById('search-bar');
        const open = !(bar && bar.classList.contains('is-open'));
        setSearchBarOpen(open);
        if (open) {
            const inp = document.getElementById('search-input');
            if (inp) requestAnimationFrame(function () { try { inp.focus(); } catch (e) {} });
        }
    }

    function expandSearchBar() {
        setSearchBarOpen(true);
    }

    function focusSearch() {
        expandSearchBar();
        const inp = document.getElementById('search-input');
        if (!inp) return;
        try { inp.focus(); inp.select(); } catch (e) {}
        renderSearchSuggest();
    }

    function onSearchKeydown(e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            const inp = document.getElementById('search-input');
            if (inp && inp.value) clearSearch();
            else {
                exitSearch();
                document.getElementById('sections-container').style.display = '';
                try { inp.blur(); } catch (err) {}
                setSearchBarOpen(false);
            }
            return;
        }
        if (e.key === 'Enter') {
            const q = normText(inpValue());
            if (q) rememberSearch(q);
        }
    }

    function inpValue() {
        const inp = document.getElementById('search-input');
        return inp ? inp.value : '';
    }

    let searchLetterPool = null;
    let searchFieldsByIdx = null;

    function computeSearchFields(c) {
        const cyr = (c.cyrillic && !String(c.cyrillic).includes('_')) ? normText(c.cyrillic) : '';
        const lat = (c.latin && !String(c.latin).includes('_')) ? normText(c.latin) : '';
        return { cyr, lat, latF: lat ? foldLatin(lat) : '', notes: normText(c.notes), id: (c.id != null) ? String(c.id) : '' };
    }

    function buildSearchIndex() {
        if (searchLetterPool) return;
        searchLetterPool = [];
        searchFieldsByIdx = new Array(charData.length);
        for (let i = 0; i < charData.length; i++) {
            const c = charData[i];
            if (!searchableCats.includes(c.category)) continue;
            searchLetterPool.push(c);
            searchFieldsByIdx[c.idx] = computeSearchFields(c);
        }
    }

    function searchFields(c) {
        buildSearchIndex();
        return searchFieldsByIdx[c.idx] || computeSearchFields(c);
    }

    function exitSearch(opts) {
        opts = opts || {};
        const inp = document.getElementById('search-input');
        const sel = document.getElementById('search-filter');
        const res = document.getElementById('search-results');
        const clr = document.getElementById('search-clear');
        if (inp) inp.value = '';
        if (sel) sel.value = 'all';
        if (clr) clr.style.display = 'none';
        if (res) { res.style.display = 'none'; res.innerHTML = ''; }
        // При уходе в раздел сворачиваем; при очистке поля оставляем открытым.
        if (!opts.keepBarOpen) setSearchBarOpen(false);
        renderSearchSuggest();
    }

    function clearSearch() {
        exitSearch({ keepBarOpen: true });
        document.getElementById('sections-container').style.display = '';
        expandSearchBar();
        const inp = document.getElementById('search-input');
        if (inp) inp.focus();
        renderSearchSuggest();
    }

    // --- Поиск: нормализация и ранжирование по релевантности ---
    function normText(s) {
        return (s == null ? '' : String(s)).toLowerCase().normalize('NFC').replace(/ё/g, 'е').trim();
    }
    // свёртка латиницы: š→s, č→c, ž→z, ö→o, ü→u, ñ/ң→n — чтобы можно было искать без диакритики
    function foldLatin(s) {
        return normText(s)
            .replace(/[šş]/g, 's').replace(/[čç]/g, 'c').replace(/ž/g, 'z')
            .replace(/[öô]/g, 'o').replace(/[üû]/g, 'u').replace(/[ñңn̄]/g, 'n')
            .replace(/[өӧ]/g, 'o').replace(/[үӱ]/g, 'u').replace(/һ/g, 'h').replace(/җ/g, 'j')
            .replace(/sh/g, 's').replace(/ch/g, 'c').replace(/zh/g, 'z');
    }
    function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    // Варианты токена: кириллица ↔ упрощённая латиница (ө↔o, ү↔u…).
    function tokenVariants(t) {
        const base = normText(t);
        const folded = foldLatin(base);
        const out = [base];
        if (folded && folded !== base) out.push(folded);
        return out;
    }

    // --- Подсветка совпадений ---
    function highlightText(text, tokens) {
        const s = (text == null ? '' : String(text));
        const parts = [];
        (tokens || []).forEach(t => tokenVariants(t).forEach(v => { if (v) parts.push(escapeRegex(v)); }));
        const uniq = Array.from(new Set(parts)).sort((a, b) => b.length - a.length);
        if (!uniq.length) return escapeHtml(s);
        let re;
        try { re = new RegExp('(' + uniq.join('|') + ')', 'giu'); }
        catch (e) { return escapeHtml(s); }
        let out = '', last = 0, m;
        while ((m = re.exec(s)) !== null) {
            out += escapeHtml(s.slice(last, m.index)) + '<mark class="hl">' + escapeHtml(m[0]) + '</mark>';
            last = m.index + m[0].length;
            if (m.index === re.lastIndex) re.lastIndex++;
        }
        return out + escapeHtml(s.slice(last));
    }

    function letterMatchVisible(c, tokens) {
        const F = searchFields(c);
        return tokens.every(t => {
            return tokenVariants(t).some(tv => {
                const tf = foldLatin(tv);
                return (F.cyr && F.cyr.includes(tv)) || (F.lat && F.lat.includes(tv)) ||
                       (F.latF && tf && F.latF.includes(tf)) || (F.id && F.id === tv.replace('#', ''));
            });
        });
    }

    function noteSnippet(c, tokens) {
        const notes = c.notes ? String(c.notes) : '';
        if (!notes) return '';
        const low = notes.toLowerCase();
        let pos = -1;
        for (const t of tokens) {
            for (const tv of tokenVariants(t)) {
                const i = low.indexOf(tv);
                if (i >= 0) { pos = i; break; }
            }
            if (pos >= 0) break;
        }
        if (pos < 0) return '';
        const start = Math.max(0, pos - 30), end = Math.min(notes.length, pos + 60);
        let frag = notes.slice(start, end);
        if (start > 0) frag = '…' + frag;
        if (end < notes.length) frag = frag + '…';
        return highlightText(frag, tokens);
    }

    function letterHl(c, tokens) {
        if (!tokens || !tokens.length) return null;
        const note = letterMatchVisible(c, tokens) ? '' : noteSnippet(c, tokens);
        return { tokens, note };
    }

    // --- Слова ---
    function wordScore(it, tokens) {
        const hay = [normText(it[0]), normText(it[1]), normText(it[2])];
        const hayF = hay.map(foldLatin);
        let total = 0;
        for (const t of tokens) {
            let best = 0;
            for (const tv of tokenVariants(t)) {
                const tf = foldLatin(tv);
                for (let i = 0; i < hay.length; i++) {
                    const h = hay[i], hf = hayF[i];
                    if (h === tv || hf === tf) best = Math.max(best, 100);
                    else if (h.startsWith(tv) || (tf && hf.startsWith(tf))) best = Math.max(best, 70);
                    else if (h.includes(tv) || (tf && hf.includes(tf))) best = Math.max(best, 45);
                }
            }
            if (best === 0) return 0;
            total += best;
        }
        return total;
    }
    function searchWords(tokens) {
        const out = [];
        for (const g of wordData) {
            for (const it of g.items) {
                const s = wordScore(it, tokens);
                if (s > 0) out.push({ it, s, group: g.group });
            }
        }
        out.sort((a, b) => b.s - a.s);
        return out;
    }
    function renderWordResult(it, tokens, group) {
        const [oldw, modern, meaning] = it;
        return `
            <div class="word-card" role="button" tabindex="0" aria-expanded="false"
                 aria-label="Слово ${escapeHtml(String(oldw))}. Показать современную форму"
                 onclick="revealWord(this)">
                <div class="word-old" aria-hidden="true">${highlightText(oldw, tokens)}</div>
                <div class="word-arrow" aria-hidden="true">⇄</div>
                <div class="word-reveal" aria-hidden="true">
                    <div class="word-modern">${highlightText(modern, tokens)}</div>
                    <div class="word-meaning">${highlightText(meaning, tokens)}</div>
                </div>
                ${group ? `<div class="search-hit-meta" aria-hidden="true">${escapeHtml(group)}</div>` : ''}
                <div class="word-hint" aria-hidden="true">показать</div>
            </div>`;
    }

    // --- Правила чтения ---
    function ruleScore(r, tokens) {
        const hay = [normText(r.tag), normText(r.title), normText(r.body)];
        const hayF = hay.map(foldLatin);
        let total = 0;
        for (const t of tokens) {
            let best = 0;
            for (const tv of tokenVariants(t)) {
                const tf = foldLatin(tv);
                for (let i = 0; i < hay.length; i++) {
                    const h = hay[i], hf = hayF[i];
                    if (h === tv || hf === tf) best = Math.max(best, i === 0 || i === 1 ? 100 : 80);
                    else if (h.startsWith(tv) || (tf && hf.startsWith(tf))) best = Math.max(best, i < 2 ? 70 : 50);
                    else if (h.includes(tv) || (tf && hf.includes(tf))) best = Math.max(best, i < 2 ? 50 : 30);
                }
            }
            if (best === 0) return 0;
            total += best;
        }
        return total;
    }
    function searchRules(tokens) {
        const out = [];
        rulesData.forEach((r, i) => {
            const s = ruleScore(r, tokens);
            if (s > 0) out.push({ r, i, s, rid: r.id != null ? r.id : String(i) });
        });
        out.sort((a, b) => b.s - a.s);
        return out;
    }
    function renderRuleResult(item, tokens) {
        const { r, rid } = item;
        const body = String(r.body || '');
        const snippet = body.length > 140 ? body.slice(0, 140) + '…' : body;
        return `
            <button type="button" class="search-hit search-hit-rule"
                    data-id="${escapeHtml(String(rid))}"
                    onclick="openSearchRule(this.getAttribute('data-id'))">
                <span class="search-hit-kicker">Правило · ${highlightText(r.tag, tokens)}</span>
                <span class="search-hit-title">${highlightText(r.title, tokens)}</span>
                <span class="search-hit-body">${highlightText(snippet, tokens)}</span>
            </button>`;
    }
    function openSearchRule(id) {
        const q = normText(inpValue());
        if (q) rememberSearch(q);
        exitSearch();
        document.getElementById('sections-container').style.display = '';
        gotoRule(id);
    }

    // --- Разделы (прыжок по названию) — все пункты навигации и categoryMeta ---
    function sectionScore(cat, tokens) {
        const meta = categoryMeta[cat];
        if (!meta) return 0;
        const chip = (typeof NAV_CHIP_LABEL !== 'undefined' && NAV_CHIP_LABEL[cat]) ? NAV_CHIP_LABEL[cat] : '';
        const group = sectionNavGroup(cat);
        const practice = (typeof practiceScopes !== 'undefined' && practiceScopes[cat]) ? practiceScopes[cat] : null;
        const display = sectionDisplayLabel(cat);
        const hay = [
            normText(display),
            normText(meta.label),
            normText(chip),
            normText(group),
            normText(practice && practice.title),
            normText(practice && practice.desc),
            normText(meta.info || ''),
            normText(cat.replace(/_/g, ' '))
        ];
        const hayF = hay.map(foldLatin);
        let total = 0;
        for (const t of tokens) {
            let best = 0;
            for (const tv of tokenVariants(t)) {
                const tf = foldLatin(tv);
                for (let i = 0; i < hay.length; i++) {
                    const h = hay[i], hf = hayF[i];
                    if (!h) continue;
                    const primary = i <= 3;
                    if (h === tv || hf === tf) best = Math.max(best, primary ? 100 : 60);
                    else if (h.startsWith(tv) || (tf && hf.startsWith(tf))) best = Math.max(best, primary ? 75 : 40);
                    else if (h.includes(tv) || (tf && hf.includes(tf))) best = Math.max(best, primary ? 55 : 25);
                }
            }
            if (best === 0) return 0;
            total += best;
        }
        return total;
    }
    function searchSections(tokens) {
        const out = [];
        for (const cat of allSearchSectionCats()) {
            const s = sectionScore(cat, tokens);
            if (s > 0) {
                out.push({
                    cat,
                    s,
                    label: sectionDisplayLabel(cat),
                    group: sectionNavGroup(cat)
                });
            }
        }
        out.sort((a, b) => b.s - a.s || a.label.localeCompare(b.label, 'ru'));
        return out;
    }
    function renderSectionResult(item) {
        const kicker = item.group ? ('Раздел · ' + item.group) : 'Раздел';
        return `
            <button type="button" class="search-hit search-hit-section"
                    data-cat="${escapeHtml(item.cat)}"
                    onclick="openSearchSection(this.getAttribute('data-cat'))">
                <span class="search-hit-kicker">${escapeHtml(kicker)}</span>
                <span class="search-hit-title">${escapeHtml(item.label)}</span>
                <span class="search-hit-body">Открыть →</span>
            </button>`;
    }
    function openSearchSection(cat) {
        const q = normText(inpValue());
        if (q) rememberSearch(q);
        exitSearch();
        document.getElementById('sections-container').style.display = '';
        showSection(cat);
    }

    // --- Тексты (раздел «Чтение» / readingData) ---
    function pushReadingFields(into, v) {
        if (v == null) return;
        if (typeof v === 'string') {
            if (v.trim()) into.push(v);
            return;
        }
        if (Array.isArray(v)) {
            v.forEach(x => pushReadingFields(into, x));
            return;
        }
        if (typeof v === 'object') {
            ['td', 'km', 'tr', 'ru', 'title'].forEach(k => {
                if (typeof v[k] === 'string' && v[k].trim()) into.push(v[k]);
            });
            if (v.q) pushReadingFields(into, v.q);
            if (v.a) pushReadingFields(into, v.a);
            if (v.lines) pushReadingFields(into, v.lines);
            if (v.stanzas) pushReadingFields(into, v.stanzas);
        }
    }

    function readingItemTitle(genre, item, idx) {
        if (genre === 'expr') return item.ru || item.km || item.tr || ('выражение ' + (idx + 1));
        if (genre === 'riddles') {
            return (item.ru || (item.q && (item.q.km || item.q.tr)) || ('загадка №' + (idx + 1)));
        }
        if (genre === 'songs') return item.title || ('песня ' + (idx + 1));
        if (genre === 'blessing') return 'Йорял';
        if (genre === 'proverbs') return item.ru || ('пословица ' + (idx + 1));
        if (genre === 'tale') return item.ru || ('отрывок сказки ' + (idx + 1));
        return READING_GENRE_LABEL[genre] || genre;
    }

    function readingItemSnippet(fields, tokens) {
        const prefer = fields.filter(f => /[а-яёәөүҗһң]/i.test(f) || /[a-zšžčöüγƞǰ]/i.test(f));
        const pool = prefer.length ? prefer : fields;
        for (const f of pool) {
            const low = normText(f);
            for (const t of tokens) {
                for (const tv of tokenVariants(t)) {
                    const i = low.indexOf(tv);
                    if (i >= 0) {
                        const raw = String(f);
                        const start = Math.max(0, i - 24);
                        const end = Math.min(raw.length, i + tv.length + 48);
                        let frag = raw.slice(start, end);
                        if (start > 0) frag = '…' + frag;
                        if (end < raw.length) frag = frag + '…';
                        return frag;
                    }
                }
            }
        }
        const first = pool.find(f => f && String(f).trim()) || '';
        const s = String(first);
        return s.length > 90 ? s.slice(0, 90) + '…' : s;
    }

    function readingScore(fields, tokens) {
        const hay = fields.map(normText).filter(Boolean);
        const hayF = hay.map(foldLatin);
        let total = 0;
        for (const t of tokens) {
            let best = 0;
            for (const tv of tokenVariants(t)) {
                const tf = foldLatin(tv);
                for (let i = 0; i < hay.length; i++) {
                    const h = hay[i], hf = hayF[i];
                    if (h === tv || hf === tf) best = Math.max(best, 100);
                    else if (h.startsWith(tv) || (tf && hf.startsWith(tf))) best = Math.max(best, 70);
                    else if (h.includes(tv) || (tf && hf.includes(tf))) best = Math.max(best, 45);
                }
            }
            if (best === 0) return 0;
            total += best;
        }
        return total;
    }

    function collectReadingItems() {
        const out = [];
        if (typeof readingData === 'undefined' || !readingData) return out;
        const genres = Object.keys(READING_GENRE_LABEL);
        for (const genre of genres) {
            const raw = readingData[genre];
            if (!raw) continue;
            const list = Array.isArray(raw) ? raw : [raw];
            list.forEach((item, idx) => {
                const fields = [];
                pushReadingFields(fields, item);
                // жанр тоже ищем («загадка», «песня»…)
                fields.push(READING_GENRE_LABEL[genre] || genre);
                out.push({ genre, idx, fields, item });
            });
        }
        return out;
    }

    function searchTexts(tokens) {
        return collectReadingItems()
            .map(x => {
                const s = readingScore(x.fields, tokens);
                if (s <= 0) return null;
                return {
                    genre: x.genre,
                    idx: x.idx,
                    s,
                    label: READING_GENRE_LABEL[x.genre] || x.genre,
                    title: readingItemTitle(x.genre, x.item, x.idx),
                    snippet: readingItemSnippet(x.fields, tokens)
                };
            })
            .filter(Boolean)
            .sort((a, b) => b.s - a.s || a.label.localeCompare(b.label, 'ru'));
    }

    function renderTextResult(item, tokens) {
        return `
            <button type="button" class="search-hit search-hit-text"
                    data-genre="${escapeHtml(item.genre)}" data-idx="${item.idx}"
                    onclick="openSearchText(this.getAttribute('data-genre'), +this.getAttribute('data-idx'))">
                <span class="search-hit-kicker">Текст · ${escapeHtml(item.label)}</span>
                <span class="search-hit-title">${highlightText(item.title, tokens)}</span>
                <span class="search-hit-body">${highlightText(item.snippet, tokens)}</span>
            </button>`;
    }

    function openSearchText(genre, idx) {
        const q = normText(inpValue());
        if (q) rememberSearch(q);
        exitSearch();
        document.getElementById('sections-container').style.display = '';
        showSection('reading');
        setTimeout(() => {
            if (typeof readingTab === 'function') {
                // вкладка есть только для активных жанров (expr / riddles)
                const tab = document.querySelector('.rd-tab[data-rd="' + genre + '"]');
                if (tab) readingTab(genre);
            }
            if (genre === 'expr' && typeof openExprCard === 'function') openExprCard(idx);
            else if (genre === 'riddles' && typeof openRiddleCard === 'function') openRiddleCard(idx);
            else {
                const root = document.getElementById('section-reading');
                if (root) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 80);
    }

    function tokenScore(c, t) {
        const F = searchFields(c);
        if (/^#?\d+$/.test(t)) {
            return F.id && F.id === t.replace('#', '') ? 100 : 0;
        }
        let best = 0;
        for (const tv of tokenVariants(t)) {
            const tf = foldLatin(tv);
            if (tv === F.cyr || tv === F.lat || (tf && tf === F.latF)) best = Math.max(best, 100);
            else if ((F.cyr && F.cyr.startsWith(tv)) || (F.lat && F.lat.startsWith(tv)) ||
                (F.latF && tf && F.latF.startsWith(tf))) best = Math.max(best, 70);
            else if ((F.cyr && F.cyr.includes(tv)) || (F.lat && F.lat.includes(tv)) ||
                (F.latF && tf && F.latF.includes(tf))) best = Math.max(best, 45);
            else if (F.notes) {
                try {
                    const re = new RegExp('(^|[^\\p{L}\\p{N}])' + escapeRegex(tv) + '($|[^\\p{L}\\p{N}])', 'u');
                    if (re.test(F.notes)) best = Math.max(best, 25);
                    else if (tv.length >= 3 && F.notes.includes(tv)) best = Math.max(best, 12);
                } catch (e) {
                    if (tv.length >= 3 && F.notes.includes(tv)) best = Math.max(best, 12);
                }
            }
        }
        return best;
    }
    function scoreMatch(c, tokens) {
        let total = 0;
        for (const t of tokens) {
            const s = tokenScore(c, t);
            if (s === 0) return 0;
            total += s;
        }
        return total;
    }

    function syncNavFromSection(cat) {
        if (!cat) return;
        document.querySelectorAll('.nav-item').forEach(n => {
            const on = n.getAttribute('data-cat') === cat;
            n.classList.toggle('active', on);
            if (on) n.setAttribute('aria-current', 'page');
            else n.removeAttribute('aria-current');
        });
    }

    function filterNavCategory(f) {
        if (f === 'words') return 'words';
        if (f === 'rules') return 'rules';
        return searchableCats.includes(f) ? f : null;
    }

    // --- Недавние / подсказки ---
    function loadRecentSearches() {
        try {
            const raw = JSON.parse(localStorage.getItem(SEARCH_RECENT_KEY) || '[]');
            return Array.isArray(raw) ? raw.map(x => String(x)).filter(Boolean).slice(0, SEARCH_RECENT_MAX) : [];
        } catch (e) { return []; }
    }
    function rememberSearch(q) {
        const nq = normText(q);
        if (!nq || nq.length < 1) return;
        const next = [nq].concat(loadRecentSearches().filter(x => x !== nq)).slice(0, SEARCH_RECENT_MAX);
        try { localStorage.setItem(SEARCH_RECENT_KEY, JSON.stringify(next)); } catch (e) {}
    }
    function applySearchQuery(q) {
        const inp = document.getElementById('search-input');
        if (!inp) return;
        expandSearchBar();
        inp.value = q;
        try { inp.focus(); } catch (e) {}
        runSearch();
        rememberSearch(q);
        renderSearchSuggest();
    }
    function renderSearchSuggest() {
        const box = document.getElementById('search-suggest');
        if (!box) return;
        const q = normText(inpValue());
        if (q) {
            box.hidden = true;
            box.innerHTML = '';
            return;
        }
        const recent = loadRecentSearches();
        let html = '';
        if (recent.length) {
            html += `<div class="search-suggest-label">Недавние</div><div class="search-suggest-row">` +
                recent.map(r => `<button type="button" class="search-chip" data-q="${escapeHtml(r)}" onclick="applySearchQuery(this.getAttribute('data-q'))">${escapeHtml(r)}</button>`).join('') +
                `</div>`;
        }
        html += `<div class="search-suggest-label">Попробуйте</div><div class="search-suggest-row">` +
            SEARCH_SUGGEST.map(s => `<button type="button" class="search-chip" data-q="${escapeHtml(s.q)}" onclick="applySearchQuery(this.getAttribute('data-q'))">${escapeHtml(s.label)}</button>`).join('') +
            `</div>`;
        box.innerHTML = html;
        box.hidden = false;
    }

    function whereLabel(f) {
        if (f === 'all') return 'везде';
        if (f === 'words') return 'словах';
        if (f === 'texts') return 'текстах';
        if (f === 'rules') return 'правилах чтения';
        if (f === 'sections') return 'разделах';
        return `разделе «${categoryMeta[f].label}»`;
    }

    function isSpecialSearchFilter(f) {
        return f === 'words' || f === 'rules' || f === 'sections' || f === 'texts';
    }

    function runSearch() {
        const inp = document.getElementById('search-input');
        const q = normText(inp ? inp.value : '');
        const f = document.getElementById('search-filter').value;
        document.getElementById('search-clear').style.display = q ? 'flex' : 'none';
        const res = document.getElementById('search-results');
        const sections = document.getElementById('sections-container');
        renderSearchSuggest();

        // Без текста запроса — обычные разделы; фильтр «Разделы» показывает полный каталог.
        if (!q) {
            if (f === 'sections') {
                document.querySelectorAll('.nav-item').forEach(n => {
                    n.classList.remove('active'); n.removeAttribute('aria-current');
                });
                sections.style.display = 'none';
                res.style.display = '';
                const all = allSearchSectionCats().map(cat => ({
                    cat,
                    label: sectionDisplayLabel(cat),
                    group: sectionNavGroup(cat)
                }));
                let html = `
                    <div class="section-title">Все разделы</div>
                    <div class="section-info">Полный каталог сайта · ${all.length}.</div>
                    <div class="search-hit-list">${all.map(renderSectionResult).join('')}</div>`;
                res.innerHTML = html;
                return;
            }
            res.style.display = 'none';
            res.innerHTML = '';
            sections.style.display = '';
            const navCat = (f !== 'all' && f !== 'sections' && f !== 'texts') ? filterNavCategory(f) : null;
            if (f === 'texts') { showSection('reading'); return; }
            if (navCat) showSection(navCat);
            else {
                const activeSec = document.querySelector('.section.active');
                const cat = activeSec && activeSec.id.startsWith('section-')
                    ? activeSec.id.slice('section-'.length) : null;
                syncNavFromSection(cat);
            }
            return;
        }

        const tokens = q.split(/\s+/).filter(Boolean);
        const doLetters  = !isSpecialSearchFilter(f);
        const doWords    = (f === 'all' || f === 'words');
        const doTexts    = (f === 'all' || f === 'texts');
        const doRules    = (f === 'all' || f === 'rules');
        const doSections = (f === 'all' || f === 'sections');

        let letters = [];
        if (doLetters) {
            buildSearchIndex();
            let pool = searchLetterPool;
            if (f !== 'all' && !isSpecialSearchFilter(f)) {
                pool = charsByCategory[f] || [];
            }
            letters = pool
                .map(c => ({ c, s: scoreMatch(c, tokens) }))
                .filter(x => x.s > 0)
                .sort((a, b) => b.s - a.s || ((a.c.id ?? 1e9) - (b.c.id ?? 1e9)))
                .map(x => x.c);
        }

        const words = doWords ? searchWords(tokens) : [];
        const texts = doTexts ? searchTexts(tokens) : [];
        const rules = doRules ? searchRules(tokens) : [];
        const sects = doSections ? searchSections(tokens) : [];

        document.querySelectorAll('.nav-item').forEach(n => { n.classList.remove('active'); n.removeAttribute('aria-current'); });
        sections.style.display = 'none';
        res.style.display = '';

        const totalFound = letters.length + words.length + texts.length + rules.length + sects.length;
        const parts = [];
        if (letters.length) parts.push(`букв ${letters.length}`);
        if (words.length) parts.push(`слов ${words.length}`);
        if (texts.length) parts.push(`текстов ${texts.length}`);
        if (rules.length) parts.push(`правил ${rules.length}`);
        if (sects.length) parts.push(`разделов ${sects.length}`);

        let html = `
            <div class="section-title">Поиск: «${escapeHtml(q)}»</div>
            <div class="section-info">Найдено: ${totalFound}${parts.length ? ' — ' + parts.join(', ') : ''} · в ${whereLabel(f)}.</div>`;

        if (doSections && sects.length) {
            html += `<div class="search-group-title">Разделы · ${sects.length}</div>`
                  + `<div class="search-hit-list">${sects.map(renderSectionResult).join('')}</div>`;
        }
        if (doLetters && letters.length) {
            html += ((doWords || doTexts || doRules || doSections) ? `<div class="search-group-title">Буквы и знаки · ${letters.length}</div>` : '')
                  + `<div class="char-grid">${letters.map(c => renderCard(c, letterHl(c, tokens))).join('')}</div>`;
        }
        if (doWords && words.length) {
            html += `<div class="search-group-title">Слова · ${words.length}</div>`
                  + `<div class="word-grid">${words.map(x => renderWordResult(x.it, tokens, x.group)).join('')}</div>`;
        }
        if (doTexts && texts.length) {
            html += `<div class="search-group-title">Тексты · ${texts.length}</div>`
                  + `<div class="search-hit-list">${texts.map(x => renderTextResult(x, tokens)).join('')}</div>`;
        }
        if (doRules && rules.length) {
            html += `<div class="search-group-title">Правила чтения · ${rules.length}</div>`
                  + `<div class="search-hit-list">${rules.map(x => renderRuleResult(x, tokens)).join('')}</div>`;
        }
        if (totalFound === 0) {
            html += `<div class="search-empty">
                <p>Ничего не найдено. Попробуйте букву («ө»), слово («модн», «дерево»), текст («жеребец», «загадка») или правило («сингармонизм»).</p>
                <div class="search-suggest-row search-empty-chips">
                    ${SEARCH_SUGGEST.map(s => `<button type="button" class="search-chip" data-q="${escapeHtml(s.q)}" onclick="applySearchQuery(this.getAttribute('data-q'))">${escapeHtml(s.label)}</button>`).join('')}
                </div>
            </div>`;
        }

        res.innerHTML = html;
    }

    const runSearchDebounced = debounce(runSearch, 120);
