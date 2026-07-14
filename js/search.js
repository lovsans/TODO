/* search.js — поиск и фильтрация по атласу букв. */


    function initSearch() {
        const sel = document.getElementById('search-filter');
        sel.innerHTML = '<option value="all">Везде</option>' +
            '<option value="words">Слова</option>' +
            searchableCats.map(c => `<option value="${c}">${categoryMeta[c].label}</option>`).join('');
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

    function exitSearch() {
        const inp = document.getElementById('search-input');
        const sel = document.getElementById('search-filter');
        const res = document.getElementById('search-results');
        const clr = document.getElementById('search-clear');
        if (inp) inp.value = '';
        if (sel) sel.value = 'all';
        if (clr) clr.style.display = 'none';
        if (res) { res.style.display = 'none'; res.innerHTML = ''; }
    }

    function clearSearch() {
        exitSearch();
        document.getElementById('sections-container').style.display = '';
        const inp = document.getElementById('search-input');
        if (inp) inp.focus();
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
            .replace(/sh/g, 's').replace(/ch/g, 'c').replace(/zh/g, 'z');
    }
    function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    // --- Подсветка совпадений ---
    // Оборачивает вхождения токенов в <mark>. Работает по отображаемой строке,
    // толерантна к регистру; результат HTML-безопасен (текст экранируется по кускам).
    function highlightText(text, tokens) {
        const s = (text == null ? '' : String(text));
        const parts = (tokens || []).filter(Boolean).map(escapeRegex).sort((a, b) => b.length - a.length);
        if (!parts.length) return escapeHtml(s);
        let re;
        try { re = new RegExp('(' + parts.join('|') + ')', 'giu'); }
        catch (e) { return escapeHtml(s); }
        let out = '', last = 0, m;
        while ((m = re.exec(s)) !== null) {
            out += escapeHtml(s.slice(last, m.index)) + '<mark class="hl">' + escapeHtml(m[0]) + '</mark>';
            last = m.index + m[0].length;
            if (m.index === re.lastIndex) re.lastIndex++;     // защита от пустых совпадений
        }
        return out + escapeHtml(s.slice(last));
    }

    // Все ли токены видны в «явных» полях карточки (кириллица/латиница/№)?
    // Если нет — значит, совпадение пришло из примечаний, и стоит показать сниппет.
    function letterMatchVisible(c, tokens) {
        const F = searchFields(c);
        return tokens.every(t => {
            const tf = foldLatin(t);
            return (F.cyr && F.cyr.includes(t)) || (F.lat && F.lat.includes(t)) ||
                   (F.latF && tf && F.latF.includes(tf)) || (F.id && F.id === t.replace('#', ''));
        });
    }

    // Короткий фрагмент примечания вокруг первого совпадения, с подсветкой.
    function noteSnippet(c, tokens) {
        const notes = c.notes ? String(c.notes) : '';
        if (!notes) return '';
        const low = notes.toLowerCase();
        let pos = -1;
        for (const t of tokens) { const i = low.indexOf(t); if (i >= 0) { pos = i; break; } }
        if (pos < 0) return '';
        const start = Math.max(0, pos - 30), end = Math.min(notes.length, pos + 60);
        let frag = notes.slice(start, end);
        if (start > 0) frag = '…' + frag;
        if (end < notes.length) frag = frag + '…';
        return highlightText(frag, tokens);
    }

    // Контекст подсветки для карточки буквы: токены + (опц.) сниппет примечания.
    function letterHl(c, tokens) {
        if (!tokens || !tokens.length) return null;
        const note = letterMatchVisible(c, tokens) ? '' : noteSnippet(c, tokens);
        return { tokens, note };
    }

    // --- Поиск по словам (раздел «Слова для чтения») ---
    // Слово = [старое написание, современная форма, значение]. Логическое И по токенам,
    // с толерантностью к латинской диакритике (через foldLatin), как и для букв.
    function wordMatches(it, tokens) {
        const hay = [normText(it[0]), normText(it[1]), normText(it[2])];
        const hayF = hay.map(foldLatin);
        return tokens.every(t => {
            const tf = foldLatin(t);
            return hay.some(h => h.includes(t)) || hayF.some(h => h.includes(tf));
        });
    }
    function searchWords(tokens) {
        const out = [];
        for (const g of wordData) {
            for (const it of g.items) {
                if (!tokens.length || wordMatches(it, tokens)) out.push(it);
            }
        }
        return out;
    }
    // Карточка-слово для результатов: раскрывается по клику/Enter, поля подсвечены.
    function renderWordResult(it, tokens) {
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
                <div class="word-hint" aria-hidden="true">показать</div>
            </div>`;
    }

    function tokenScore(c, t) {
        const F = searchFields(c);
        if (/^#?\d+$/.test(t)) {                       // номер буквы — только точное совпадение
            return F.id && F.id === t.replace('#', '') ? 100 : 0;
        }
        const tf = foldLatin(t);
        if (t === F.cyr || t === F.lat || (tf && tf === F.latF)) return 100;                       // точное совпадение буквы
        if ((F.cyr && F.cyr.startsWith(t)) || (F.lat && F.lat.startsWith(t)) ||
            (F.latF && tf && F.latF.startsWith(tf))) return 70;                                     // совпадение по началу
        if ((F.cyr && F.cyr.includes(t)) || (F.lat && F.lat.includes(t)) ||
            (F.latF && tf && F.latF.includes(tf))) return 45;                                       // подстрока внутри буквы
        if (F.notes) {                                                                              // примечания — низкий приоритет
            const re = new RegExp('(^|[^\\p{L}\\p{N}])' + escapeRegex(t) + '($|[^\\p{L}\\p{N}])', 'u');
            if (re.test(F.notes)) return 25;                                                        // целое слово в примечании
            if (t.length >= 3 && F.notes.includes(t)) return 12;                                    // длинный запрос — подстрока
        }
        return 0;
    }
    // все токены запроса должны совпасть (логическое И); итог — сумма баллов
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
        return searchableCats.includes(f) ? f : null;
    }

    function runSearch() {
        const inp = document.getElementById('search-input');
        const q = normText(inp ? inp.value : '');
        const f = document.getElementById('search-filter').value;
        document.getElementById('search-clear').style.display = q ? 'flex' : 'none';
        const res = document.getElementById('search-results');
        const sections = document.getElementById('sections-container');

        // Без текста запроса — обычные разделы; фильтр только сужает поиск, не заменяет навигацию.
        if (!q) {
            res.style.display = 'none';
            res.innerHTML = '';
            sections.style.display = '';
            const navCat = f !== 'all' ? filterNavCategory(f) : null;
            if (navCat) showSection(navCat);
            else {
                const activeSec = document.querySelector('.section.active');
                const cat = activeSec && activeSec.id.startsWith('section-')
                    ? activeSec.id.slice('section-'.length) : null;
                syncNavFromSection(cat);
            }
            return;
        }

        const tokens = q ? q.split(/\s+/).filter(Boolean) : [];
        const doLetters = (f !== 'words');                 // буквы: всё, кроме фильтра «Слова»
        const doWords   = (f === 'all' || f === 'words');  // слова: «Везде» или «Слова»

        // --- буквы и знаки ---
        let letters = [];
        if (doLetters) {
            buildSearchIndex();
            let pool = searchLetterPool;
            if (f !== 'all' && f !== 'words') pool = charsByCategory[f] || [];
            letters = pool
                .map(c => ({ c, s: scoreMatch(c, tokens) }))
                .filter(x => x.s > 0)
                .sort((a, b) => b.s - a.s || ((a.c.id ?? 1e9) - (b.c.id ?? 1e9)))
                .map(x => x.c);
        }

        // --- слова ---
        const words = doWords ? searchWords(tokens) : [];

        document.querySelectorAll('.nav-item').forEach(n => { n.classList.remove('active'); n.removeAttribute('aria-current'); });
        sections.style.display = 'none';
        res.style.display = '';

        const where = f === 'all' ? 'всех разделах' : (f === 'words' ? 'словах' : `разделе «${categoryMeta[f].label}»`);
        const totalFound = letters.length + words.length;

        let html = `
            <div class="section-title">Поиск${q ? `: «${escapeHtml(q)}»` : ''}</div>
            <div class="section-info">Найдено: ${totalFound} — в ${where}${q ? ', по релевантности' : ''}.</div>`;

        if (doLetters && letters.length) {
            html += (doWords ? `<div class="search-group-title">Буквы и знаки · ${letters.length}</div>` : '')
                  + `<div class="char-grid">${letters.map(c => renderCard(c, letterHl(c, tokens))).join('')}</div>`;
        }
        if (doWords && words.length) {
            html += `<div class="search-group-title">Слова · ${words.length}</div>`
                  + `<div class="word-grid">${words.map(it => renderWordResult(it, tokens)).join('')}</div>`;
        }
        if (totalFound === 0) {
            html += `<div class="search-empty">Ничего не найдено. Попробуйте кириллицу («ө»), латиницу («š»), номер буквы, или калмыцкое слово / его значение («модн», «дерево»).</div>`;
        }

        res.innerHTML = html;
    }

    const runSearchDebounced = debounce(runSearch, 120);
