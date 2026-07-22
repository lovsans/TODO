/* practice.js — тренажёр чтения: вопросы, прогресс, серия занятий, экспорт/импорт. */


    // Транзиентное состояние тренировки — отдельное для каждого набора (scope),
    // т.к. блоков практики теперь несколько (гласные/согласные/цифры/все).
    const pstate = {};
    function getPState(scope) {
        if (!pstate[scope]) pstate[scope] = {
            idx: 0, form: '', formKey: '', letter: null,
            correct: 0, total: 0,
            answered: false, timer: null, lastKey: null, gridOpen: false
        };
        return pstate[scope];
    }
    let practiceProgress = loadProgress();
    // По умолчанию уже выученные знаки в тренировку не попадают — так прогресс
    // не «топчется» на давно освоенных буквах. Явный выбор пользователя (снял
    // галку «Только невыученные») сохраняется в localStorage и имеет приоритет.
    let practiceOnlyUnlearned = true;
    try {
        const v = localStorage.getItem('todo-only-unlearned');
        if (v !== null) practiceOnlyUnlearned = v === '1';
    } catch (e) {}
    let practiceMode = 'read'; // read = угадать чтение по форме
    const CHOICE_COUNT = 4;

    // ===== Формы знака (начальная/серединная/конечная) =====
    // Раньше форма для вопроса выбиралась полностью случайно с первого же раза,
    // а «выучено» засчитывалось по 2 верным ответам подряд НА ЛЮБУЮ форму — то есть
    // можно было дважды угадать начальную форму и больше никогда не увидеть конечную,
    // а знак уже считался бы освоенным. Теперь прогресс ведётся отдельно по каждой
    // форме, а «выучен» — когда освоены ВСЕ имеющиеся у знака формы.
    const FORM_ORDER = ['initial', 'medial', 'final'];
    const FORM_LABELS = { initial: 'начальная', medial: 'серединная', final: 'конечная' };
    const FORM_MASTERY = 1; // верных подряд на каждую форму, чтобы она считалась освоенной

    // Прогресс по формам конкретного знака (с подстраховкой на старый формат данных,
    // где был только общий p.streak без разбивки по формам).
    function formProgress(c, fkey) {
        const p = practiceProgress[letterKey(c)];
        return (p && p.forms && p.forms[fkey]) || null;
    }
    // Выбор формы для вопроса: начальная вводится первой, серединная/конечная
    // подмешиваются только после того, как предыдущая по порядку форма хотя бы
    // раз отвечена верно — так все три формы не сваливаются на новичка сразу.
    // Совсем новая форма (ни разу не показанная) выбирается чаще остальных —
    // отчасти ради «знакомства» (см. ниже), отчасти чтобы они не терялись среди
    // уже знакомых.
    function pickForm(letter) {
        const avail = FORM_ORDER.filter(k => letter[k]);
        if (avail.length <= 1) return avail[0];
        const weights = avail.map((fk, i) => {
            const prevKey = i > 0 ? avail[i - 1] : null;
            const prevStreak = prevKey ? ((formProgress(letter, prevKey) || {}).streak || 0) : Infinity;
            if (i > 0 && prevStreak < 1) return 0;             // следующая форма ещё не «открыта»
            const fp = formProgress(letter, fk);
            if (fp && fp.mastered) return 1;      // освоена — изредка повторяем
            if (!fp || !fp.seen) return 5;                      // совсем новая — показываем чаще
            return 3;                                           // в процессе освоения
        });
        const sum = weights.reduce((a, b) => a + b, 0);
        if (sum <= 0) return avail[0];
        let r = Math.random() * sum;
        for (let i = 0; i < avail.length; i++) { r -= weights[i]; if (r <= 0) return avail[i]; }
        return avail[avail.length - 1];
    }

    // ===== Серии слогов: тренируем по одной серии (Н-ряд, Б-ряд…), а не все 145 разом =====
    // Серия открывается, когда предыдущая выучена хотя бы на этот процент.
    const SYLLABLE_UNLOCK_RATIO = 0.7;
    let syllableGroupIdx = loadSyllableGroupIdx();
    let syllableShowAll = loadSyllableShowAll();
    function loadSyllableGroupIdx() {
        try {
            const v = parseInt(localStorage.getItem('todo-syl-group'), 10);
            return (Number.isInteger(v) && v >= 0 && v < SYLLABLE_GROUPS.length) ? v : 0;
        } catch (e) { return 0; }
    }
    function saveSyllableGroupIdx() { try { localStorage.setItem('todo-syl-group', String(syllableGroupIdx)); } catch (e) {} }
    function loadSyllableShowAll() { try { return localStorage.getItem('todo-syl-showall') === '1'; } catch (e) { return false; } }
    function saveSyllableShowAll() { try { localStorage.setItem('todo-syl-showall', syllableShowAll ? '1' : '0'); } catch (e) {} }

    // Сколько знаков серии уже выучено (по общему прогрессу, не зависит от текущего выбора серии).
    function syllableGroupStats(g) {
        const items = charData.filter(c => g.idxSet.has(c.idx) && !practiceExclude.has(c.latin));
        const learned = items.filter(isLearned).length;
        return { learned, total: items.length, ratio: items.length ? learned / items.length : 0 };
    }
    function isSyllableGroupUnlocked(i) {
        if (i <= 0) return true;
        return syllableGroupStats(SYLLABLE_GROUPS[i - 1]).ratio >= SYLLABLE_UNLOCK_RATIO;
    }
    // Следующая незавершённая серия после fromIdx; если дальше всё закрыто/готово —
    // ищем любую открытую незавершённую (чтобы не застревать на 100%).
    function findNextIncompleteSyllableGroup(fromIdx) {
        for (let i = fromIdx + 1; i < SYLLABLE_GROUPS.length; i++) {
            if (!isSyllableGroupUnlocked(i)) break;
            if (syllableGroupStats(SYLLABLE_GROUPS[i]).ratio < 1) return i;
        }
        for (let i = 0; i < SYLLABLE_GROUPS.length; i++) {
            if (i === fromIdx) continue;
            if (isSyllableGroupUnlocked(i) && syllableGroupStats(SYLLABLE_GROUPS[i]).ratio < 1) return i;
        }
        return -1;
    }
    // Если текущая серия на 100% — переключаемся на следующую незавершённую.
    // syllableReviewComplete: пользователь сам открыл уже готовую серию — не уводим.
    let syllableAdvanceNotice = null;
    let syllableReviewComplete = false;
    function advanceSyllableSeriesIfComplete() {
        if (syllableShowAll || syllableReviewComplete) return null;
        const cur = SYLLABLE_GROUPS[syllableGroupIdx];
        if (!cur || syllableGroupStats(cur).ratio < 1) return null;
        const next = findNextIncompleteSyllableGroup(syllableGroupIdx);
        if (next < 0) return null;
        const from = cur.title;
        const to = SYLLABLE_GROUPS[next].title;
        syllableGroupIdx = next;
        saveSyllableGroupIdx();
        return { from, to };
    }
    // Пул вопросов с учётом выбранной серии слогов; для остальных блоков — без изменений.
    function getScopedPool(scope) {
        const base = getPracticePool(scope);
        if (scope !== 'practice_syllables' || syllableShowAll) return base;
        const g = SYLLABLE_GROUPS[syllableGroupIdx];
        return base.filter(c => g.idxSet.has(c.idx));
    }
    function selectSyllableGroup(i, scope) {
        if (!isSyllableGroupUnlocked(i)) return;
        syllableGroupIdx = i; saveSyllableGroupIdx();
        // Готовую серию оставляем, только если её выбрали вручную (повтор).
        syllableReviewComplete = syllableGroupStats(SYLLABLE_GROUPS[i]).ratio >= 1;
        syllableAdvanceNotice = null;
        setupPractice(scope);
    }
    function toggleSyllableShowAll(scope) {
        const box = document.getElementById('syl-showall__' + scope);
        syllableShowAll = !!(box && box.checked);
        saveSyllableShowAll();
        setupPractice(scope);
    }
    function syllableGroupsMarkup(scope) {
        const chips = SYLLABLE_GROUPS.map((g, i) => {
            const stat = syllableGroupStats(g);
            const unlocked = isSyllableGroupUnlocked(i);
            const pct = stat.total ? Math.round(stat.ratio * 100) : 0;
            const cls = ['syl-chip'];
            if (i === syllableGroupIdx) cls.push('active');
            if (!unlocked) cls.push('locked');
            const title = unlocked
                ? `${g.title}: ${stat.learned} / ${stat.total} выучено`
                : `Сначала пройдите серию «${SYLLABLE_GROUPS[i - 1].title}» хотя бы на ${Math.round(SYLLABLE_UNLOCK_RATIO * 100)}%`;
            return `<button type="button" class="${cls.join(' ')}" ${unlocked ? '' : 'disabled'}` +
                   ` onclick="selectSyllableGroup(${i},'${scope}')" title="${escapeHtml(title)}">` +
                   `<span class="syl-chip-title">${unlocked ? '' : '🔒 '}${escapeHtml(g.title)}</span>` +
                   `${unlocked ? `<span class="syl-chip-pct">${pct}%</span>` : ''}` +
                   `</button>`;
        }).join('');
        return `
            <div class="syl-groups" id="syl-groups__${scope}">
                <div class="syl-groups-head">
                    <span>Серия слогов</span>
                    <label class="pc-toggle"><input type="checkbox" id="syl-showall__${scope}" ${syllableShowAll ? 'checked' : ''} onchange="toggleSyllableShowAll('${scope}')"> показывать все серии сразу</label>
                </div>
                <div class="syl-chips${syllableShowAll ? ' syl-chips-disabled' : ''}">${chips}</div>
            </div>`;
    }
    function renderSyllableGroups(scope) {
        const el = document.getElementById('syl-groups__' + scope);
        if (el) el.outerHTML = syllableGroupsMarkup(scope);
    }

    function acceptedAnswers(c) {
        const set = new Set();
        const o = practiceOverride[c.latin];
        if (o) {
            o.answers.forEach(a => set.add(a.toLowerCase().trim()));
        } else {
            const add = s => s.split(/[,/]/).forEach(x => { x = x.trim().toLowerCase(); if (x) set.add(x); });
            if (c.cyrillic && !c.cyrillic.includes('_')) add(c.cyrillic);
            if (c.latin && !c.latin.includes('_')) add(c.latin);
        }
        return [...set];
    }

    function practiceName(c) {
        const o = practiceOverride[c.latin];
        let name = (o && o.name) ? o.name : c.cyrillic;
        if (!name) return '';
        // На плитках: «з, җ» → «з», «к2_узк» → «к2» — иначе длинные подписи разъезжают сетку 2×2.
        if (!(o && o.name)) {
            name = String(name).split(',')[0].trim();
            name = name.split('_')[0].trim();
        }
        return name;
    }

    function getPracticePool(scope) {
        const def = practiceScopes[scope] || practiceScopes.practice;
        // знаки с хотя бы одной формой и осмысленным ответом (буквы, цифры, пунктуация)
        return charData.filter(c => {
            if (practiceExclude.has(c.latin)) return false;
            if (def.cats && !def.cats.includes(c.category)) return false;
            // слоги тренируются только в своём разделе, не попадают в общий набор «все знаки»
            if (!def.cats && c.category === 'syllables') return false;
            const hasForm = c.initial || c.medial || c.final;
            return hasForm && acceptedAnswers(c).length > 0;
        });
    }

    // Разметка одного блока тренировки. Все id и обработчики привязаны к scope,
    // чтобы несколько блоков практики сосуществовали на странице.
    function practiceMarkup(scope) {
        const def = practiceScopes[scope];
        return `
            <div class="practice-container">
                <div class="section-title">${def.title}</div>
                <div class="section-info">${def.desc}</div>
                ${scope === 'practice_syllables' ? syllableGroupsMarkup(scope) : ''}
                <div class="practice-controls">
                    <label class="pc-toggle"><input type="checkbox" id="only-unlearned__${scope}" onchange="toggleOnlyUnlearned('${scope}')"> Только невыученные</label>
                    <div class="practice-streak" id="practice-streak__${scope}"></div>
                </div>
                <div id="practice-feedback__${scope}" class="practice-feedback"></div>
                <div class="practice-char-display">
                    <div id="practice-char__${scope}" class="practice-char"></div>
                    <div class="practice-prompt" id="practice-prompt__${scope}">Как читается эта буква?</div>
                </div>
                <div class="practice-choices" id="practice-choices__${scope}"></div>
                <button id="practice-next__${scope}" class="practice-btn practice-next" style="display:none" onclick="nextQuestion('${scope}')">Дальше →</button>
                <button class="practice-skip" onclick="setupPractice('${scope}')">Пропустить →</button>
                <div class="practice-stats">
                    <div class="stat-box"><div class="stat-label">Верно</div><div class="stat-value" id="score-correct__${scope}">0</div></div>
                    <div class="stat-box"><div class="stat-label">Всего</div><div class="stat-value" id="score-total__${scope}">0</div></div>
                    <div class="stat-box"><div class="stat-label">Процент</div><div class="stat-value" id="score-percent__${scope}">0%</div></div>
                </div>
                <div class="practice-progress">
                    <div class="pp-head"><span>Прогресс изучения</span><span class="pp-count" id="pp-count__${scope}">0 / 0</span></div>
                    <div class="pp-bar"><div class="pp-bar-fill" id="pp-fill__${scope}"></div></div>
                    <button type="button" class="pp-toggle" id="pp-toggle__${scope}" onclick="toggleProgressGrid('${scope}')">Показать буквы ▾</button>
                    <div class="pp-grid" id="pp-grid__${scope}" style="display:none"></div>
                    <div class="pp-actions">
                        <button type="button" class="pp-btn" onclick="exportProgress()">Экспорт</button>
                        <button type="button" class="pp-btn" onclick="document.getElementById('import-file__${scope}').click()">Импорт</button>
                        <button type="button" class="pp-reset" onclick="resetProgress('${scope}')">Сбросить прогресс</button>
                        <input type="file" id="import-file__${scope}" accept="application/json,.json" style="display:none" onchange="handleImportFile(this,'${scope}')">
                    </div>
                </div>
            </div>`;
    }

    // ===== «Умные» отвлекающие варианты =====
    // В описаниях многих знаков (поле notes) встречаются устойчивые традиционные
    // формулы вида «Хойр арата...» (двузубая), «Бүтү толһата...» (петлеголовая),
    // «Сарвһр толһата...» (торчащеголовая) и т.п. — названия по форме знака.
    // Если у двух знаков совпадает такая формула, они действительно похожи по
    // начертанию (например б1/б2 — одна и та же буква, узкий/круглый вариант;
    // с/ш — обе «торчащеголовые»; о/ө и у/ү — общая форма «живота»). Такие пары
    // и стоит давать как отвлекающие варианты — это тренирует реальные зрительные
    // путаницы, а не отличие от заведомо непохожих знаков.
    const SHAPE_TYPE_WORDS = ['арата', 'толһата', 'толһа', 'өвртә', 'гестә', 'нурһта', 'гиҗгтә', 'хамрта', 'хоңшарта', 'шилвтә', 'цегтә'];
    const shapeTagsCache = new Map();
    function shapeTags(c) {
        if (shapeTagsCache.has(c.idx)) return shapeTagsCache.get(c.idx);
        const text = c.notes || '';
        const tags = new Set();
        SHAPE_TYPE_WORDS.forEach(w => {
            const re = new RegExp('([^\\s,.;:()«»]{2,18}\\s?' + w + ')', 'i');
            const m = text.match(re);
            if (m) tags.add(m[1].trim().toLowerCase().replace(/\s+/g, ' '));
        });
        shapeTagsCache.set(c.idx, tags);
        return tags;
    }
    // Число совпавших «формул» начертания — чем больше, тем правдоподобнее
    // визуальная путаница. У знаков без таких формул в notes (цифры, слоги,
    // долгие/дифтонги) совпадений не будет — для них дистракторы остаются
    // случайными, как и раньше.
    function shapeSimilarity(a, b) {
        const ta = shapeTags(a);
        if (!ta.size) return 0;
        const tb = shapeTags(b);
        let n = 0;
        ta.forEach(t => { if (tb.has(t)) n++; });
        return n;
    }

    // Четыре варианта: правильное чтение + три отвлекающих из того же набора.
    // Отвлекающие берём из полного пула scope (даже в режиме «только невыученные»),
    // чтобы кнопок всегда хватало; дубли по подписи отсекаем. Сначала добираем
    // зрительно похожие знаки (shapeSimilarity), а если их не хватает —
    // дополняем случайными, как и раньше.
    function buildChoiceOptions(scope, letter) {
        const correct = practiceName(letter);
        const opts = [correct];
        const seen = new Set([correct.toLowerCase()]);
        const pool = getScopedPool(scope).slice();
        for (let i = pool.length - 1; i > 0; i--) {       // перемешиваем пул
            const j = Math.floor(Math.random() * (i + 1));
            const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
        // стабильная сортировка по похожести: при равном score порядок остаётся
        // случайным (мы уже перемешали пул строкой выше), поэтому похожие знаки
        // выбираются первыми, а среди равно (не)похожих — вразнобой
        pool.sort((a, b) => shapeSimilarity(letter, b) - shapeSimilarity(letter, a));
        for (const c of pool) {
            if (opts.length >= CHOICE_COUNT) break;
            const nm = practiceName(c), key = nm.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key); opts.push(nm);
        }
        for (let i = opts.length - 1; i > 0; i--) {        // перемешиваем варианты
            const j = Math.floor(Math.random() * (i + 1));
            const t = opts[i]; opts[i] = opts[j]; opts[j] = t;
        }
        return { opts, correct };
    }
    function renderChoices(scope, letter) {
        const box = document.getElementById('practice-choices__' + scope);
        if (!box) return;
        const { opts, correct } = buildChoiceOptions(scope, letter);
        box.innerHTML = opts.map((nm, i) =>
            `<button type="button" class="choice-btn" data-correct="${nm === correct ? '1' : '0'}" onclick="chooseAnswer('${scope}', this)">` +
                `<span class="choice-num">${i + 1}</span><span class="choice-label">${escapeHtml(nm)}</span>` +
            `</button>`).join('');
    }
    function chooseAnswer(scope, btn) {
        const st = getPState(scope);
        if (st.answered || !st.letter) return;
        const isCorrect = btn.getAttribute('data-correct') === '1';
        const box = document.getElementById('practice-choices__' + scope);
        if (box) {
            box.querySelectorAll('.choice-btn').forEach(b => {
                b.disabled = true;
                if (b.getAttribute('data-correct') === '1') b.classList.add('is-correct');
            });
            if (!isCorrect) btn.classList.add('is-wrong');
        }
        finishAnswer(scope, st.letter, isCorrect);
    }

    // Общая обработка ответа (счёт, прогресс, серия, обратная связь) — для обоих режимов.
    function finishAnswer(scope, letter, isCorrect) {
        const st = getPState(scope);
        const feedback = document.getElementById('practice-feedback__' + scope);
        st.total++;
        if (isCorrect) st.correct++;
        recordAnswer(letter, st.formKey, isCorrect);
        updateDailyStreak();
        st.answered = true;

        const nm = practiceName(letter);
        const showLat = (letter.latin && !letter.latin.includes('_') && letter.latin.toLowerCase() !== nm.toLowerCase()
                         && !practiceOverride[letter.latin]) ? ` (${letter.latin})` : '';
        if (isCorrect) {
            feedback.className = 'practice-feedback correct';
            feedback.textContent = `✓ Верно! Это «${nm}»${showLat}`;
            st.timer = setTimeout(() => nextQuestion(scope), 1200);   // листаем сами через паузу
        } else {
            const formList = [['initial','начальная'], ['medial','серединная'], ['final','конечная']].filter(([k]) => letter[k]);
            const formsHtml = formList.map(([k, lbl]) =>
                `<div class="fb-form"><div class="fb-form-glyph${todoNumClass(letter)}">${escapeHtml(letter[k])}</div><div class="fb-form-lbl">${lbl}</div></div>`).join('');
            feedback.className = 'practice-feedback incorrect rich';
            feedback.innerHTML =
                `<div class="fb-line">✗ Неверно. Правильно: «${escapeHtml(nm)}»${escapeHtml(showLat)}</div>` +
                `<div class="fb-forms">${formsHtml}</div>` +
                (letter.notes ? `<div class="fb-note">${escapeHtml(letter.notes)}</div>` : '');
            const next = document.getElementById('practice-next__' + scope);
            if (next) next.style.display = 'block';
        }
        document.getElementById('score-correct__' + scope).textContent = st.correct;
        document.getElementById('score-total__' + scope).textContent = st.total;
        document.getElementById('score-percent__' + scope).textContent =
            st.total > 0 ? Math.round((st.correct / st.total) * 100) + '%' : '0%';
        updateProgressUI(scope);
        renderStreak();
    }

    // ===== Прогресс изучения (сохраняется между сессиями) =====
    function letterKey(c) {
        if (c.category === 'syllables') return 'syl:' + c.id;
        return c.id != null ? 'i' + c.id : 'l:' + (c.latin || c.cyrillic || '');
    }
    function loadProgress() { try { return JSON.parse(localStorage.getItem('todo-practice') || '{}') || {}; } catch (e) { return {}; } }
    function saveProgress() { try { localStorage.setItem('todo-practice', JSON.stringify(practiceProgress)); } catch (e) {} }
    function isLearned(c) {
        const p = practiceProgress[letterKey(c)];
        if (!p || !p.forms) return false;
        const avail = FORM_ORDER.filter(k => c[k]);
        return avail.length > 0 && avail.every(k => (p.forms[k] && p.forms[k].mastered));
    }
    // Ответ засчитывается в прогресс конкретной формы (fkey), а в p.seen/p.correct
    // копится агрегат по знаку — он нужен только чтобы отличить совсем «новый» знак
    // от того, с которым уже работали (для серой/жёлтой подсветки в сетке прогресса).
    function recordAnswer(c, fkey, ok) {
        const k = letterKey(c);
        const p = practiceProgress[k] || { seen: 0, correct: 0, forms: {} };
        if (!p.forms) p.forms = {};
        const f = p.forms[fkey] || (p.forms[fkey] = { seen: 0, streak: 0 });
        f.seen++;
        if (ok) {
            f.streak++;
            if (f.streak >= FORM_MASTERY) f.mastered = true;
            p.correct = (p.correct || 0) + 1;
        } else {
            f.streak = 0;
        }
        p.seen = (p.seen || 0) + 1;
        practiceProgress[k] = p; saveProgress();
    }
    // невыученные буквы выпадают чаще; одну и ту же подряд не повторяем
    function pickNextIndex(pool, lastKey) {
        const weights = pool.map(c => letterKey(c) === lastKey ? 0.001 : (isLearned(c) ? 1 : 4));
        let sum = weights.reduce((a, b) => a + b, 0), r = Math.random() * sum;
        for (let i = 0; i < pool.length; i++) { r -= weights[i]; if (r <= 0) return i; }
        return Math.max(0, pool.length - 1);
    }
    function updateProgressUI(scope) {
        if (scope === 'practice_syllables') renderSyllableGroups(scope);
        const st = getPState(scope);
        const pool = getScopedPool(scope);
        const learned = pool.filter(isLearned).length, total = pool.length;
        const cnt = document.getElementById('pp-count__' + scope), fill = document.getElementById('pp-fill__' + scope);
        if (cnt) cnt.textContent = learned + ' / ' + total;
        if (fill) fill.style.width = total ? Math.round(learned / total * 100) + '%' : '0%';
        const grid = document.getElementById('pp-grid__' + scope);
        if (grid && st.gridOpen) {
            grid.innerHTML = pool.map(c => {
                const p = practiceProgress[letterKey(c)];
                const cls = (!p || !p.seen) ? 'new' : (isLearned(c) ? 'learned' : 'seen');
                const word = cls === 'learned' ? 'выучено' : (cls === 'seen' ? 'в процессе' : 'не изучено');
                const lbl = practiceName(c);
                return `<span class="pp-chip ${cls}" title="${escapeHtml(lbl)} — ${word}">${escapeHtml(lbl)}</span>`;
            }).join('');
        }
    }
    function toggleProgressGrid(scope) {
        const st = getPState(scope);
        st.gridOpen = !st.gridOpen;
        const g = document.getElementById('pp-grid__' + scope), t = document.getElementById('pp-toggle__' + scope);
        if (g) g.style.display = st.gridOpen ? 'flex' : 'none';
        if (t) t.textContent = st.gridOpen ? 'Скрыть буквы ▴' : 'Показать буквы ▾';
        updateProgressUI(scope);
    }
    function resetProgress(scope) {
        if (!confirm('Сбросить весь прогресс изучения? Счёт текущей сессии тоже обнулится.')) return;
        practiceProgress = {}; saveProgress();
        // прогресс изучения общий — обновляем счёт и UI во всех блоках практики
        PRACTICE_CATS.forEach(sc => {
            const s = getPState(sc);
            s.correct = 0; s.total = 0;
            const c = document.getElementById('score-correct__' + sc);
            const tt = document.getElementById('score-total__' + sc);
            const pc = document.getElementById('score-percent__' + sc);
            if (c) c.textContent = '0';
            if (tt) tt.textContent = '0';
            if (pc) pc.textContent = '0%';
            updateProgressUI(sc);
        });
        setupPractice(scope);
    }

    // пул для тренировки: либо весь набор, либо только невыученные из него
    function getTrainingPool(scope) {
        const base = getScopedPool(scope);
        if (!practiceOnlyUnlearned) return base;
        const filtered = base.filter(c => !isLearned(c));
        return filtered.length ? filtered : [];
    }
    function toggleOnlyUnlearned(scope) {
        const box = document.getElementById('only-unlearned__' + scope);
        practiceOnlyUnlearned = !!(box && box.checked);
        try { localStorage.setItem('todo-only-unlearned', practiceOnlyUnlearned ? '1' : '0'); } catch (e) {}
        // настройка общая — синхронизируем чекбоксы остальных блоков
        PRACTICE_CATS.forEach(sc => {
            const b = document.getElementById('only-unlearned__' + sc);
            if (b) b.checked = practiceOnlyUnlearned;
        });
        setupPractice(scope);
    }

    // ===== Дневная серия занятий =====
    function dateStr(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
    function loadStreak() { try { return JSON.parse(localStorage.getItem('todo-streak') || 'null') || { last: null, streak: 0, best: 0 }; } catch (e) { return { last: null, streak: 0, best: 0 }; } }
    function saveStreak(s) { try { localStorage.setItem('todo-streak', JSON.stringify(s)); } catch (e) {} }
    function updateDailyStreak() {
        const s = loadStreak(), today = dateStr(new Date());
        if (s.last === today) return s;
        const y = new Date(); y.setDate(y.getDate() - 1);
        s.streak = (s.last === dateStr(y)) ? (s.streak || 0) + 1 : 1;
        s.last = today; s.best = Math.max(s.best || 0, s.streak);
        saveStreak(s); return s;
    }
    function pluralDay(n) {
        const a = n % 10, b = n % 100;
        if (a === 1 && b !== 11) return 'день';
        if (a >= 2 && a <= 4 && (b < 10 || b >= 20)) return 'дня';
        return 'дней';
    }
    const PROGRESS_SCOPES = [
        ['practice_vowels', 'Гласные'],
        ['practice_long_vowels', 'Долгие гласные'],
        ['practice_diphthongs', 'Дифтонги'],
        ['practice_consonants', 'Согласные'],
        ['practice_galik', 'Галики'],
        ['practice_syllables', 'Слоги'],
        ['practice_numbers', 'Цифры']
    ];

    function overallPracticeProgress() {
        let learned = 0, total = 0;
        PROGRESS_SCOPES.forEach(([sc]) => {
            const p = progressForScope(sc);
            learned += p.learned;
            total += p.total;
        });
        const pct = total ? Math.round(learned / total * 100) : 0;
        return { learned, total, pct };
    }

    function progressToggleMarkup(s) {
        const n = (s && s.streak) || 0;
        const streak = n > 0 ? `🔥 ${n} ${pluralDay(n)}` : '🔥 Серия';
        const { learned, total, pct } = overallPracticeProgress();
        const stats = total
            ? `<span class="progress-toggle-stats">${learned}&nbsp;/&nbsp;${total} <span class="progress-toggle-pct">(${pct}%)</span></span>`
            : '';
        return `<span class="progress-toggle-streak">${streak}</span>` +
            (stats ? `<span class="progress-toggle-sep" aria-hidden="true">·</span>${stats}` : '');
    }

    function progressToggleTitle(s) {
        const n = (s && s.streak) || 0;
        const streak = n > 0 ? `Серия: ${n} ${pluralDay(n)}` : 'Серия занятий';
        const { learned, total, pct } = overallPracticeProgress();
        return total
            ? `${streak} · выучено ${learned} / ${total} (${pct}%)`
            : streak;
    }

    function setProgressBarOpen(open) {
        const tools = document.getElementById('top-tools');
        const btn = document.getElementById('progress-toggle');
        if (!tools || !btn) return;
        tools.classList.toggle('progress-open', !!open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        const title = progressToggleTitle(loadStreak());
        btn.setAttribute('aria-label', open ? 'Свернуть серию занятий' : title);
        btn.title = open ? 'Свернуть' : title;
        if (open && typeof setSearchBarOpen === 'function') setSearchBarOpen(false);
    }

    function toggleProgressBar() {
        const tools = document.getElementById('top-tools');
        const open = !(tools && tools.classList.contains('progress-open'));
        setProgressBarOpen(open);
        if (open) updateHomeProgress();
    }

    function renderStreak() {
        const s = loadStreak(), n = s.streak || 0;
        const html = n > 0
            ? `🔥 Серия: <b>${n}</b> ${pluralDay(n)}` + (s.best > n ? ` · рекорд ${s.best}` : '')
            : 'Серия: 0 — позанимайтесь сегодня';
        PRACTICE_CATS.forEach(sc => {
            const el = document.getElementById('practice-streak__' + sc);
            if (el) el.innerHTML = html;
        });
        updateHomeProgress();    // держим обзор на главной в актуальном состоянии
    }

    // ===== Обзор прогресса на главной (агрегирует практику и дневную серию) =====
    function progressForScope(scope) {
        const pool = getPracticePool(scope);
        const learned = pool.filter(isLearned).length;
        return { learned, total: pool.length };
    }
    function openPracticeFromProgress(scope) {
        if (typeof setProgressBarOpen === 'function') setProgressBarOpen(false);
        if (scope && typeof showSection === 'function') showSection(scope);
    }

    function renderProgressOverview() {
        const s = loadStreak(), n = s.streak || 0;
        let learnedAll = 0, totalAll = 0;
        const bars = PROGRESS_SCOPES.map(([sc, label]) => {
            const { learned, total } = progressForScope(sc);
            learnedAll += learned; totalAll += total;
            const pct = total ? Math.round(learned / total * 100) : 0;
            return `
                <button type="button" class="hp-row" onclick="openPracticeFromProgress('${sc}')"
                        aria-label="Открыть тренировку: ${escapeHtml(label)}">
                    <span class="hp-row-label">${escapeHtml(label)}</span>
                    <span class="hp-bar" aria-hidden="true"><span class="hp-bar-fill" style="width:${pct}%"></span></span>
                    <span class="hp-row-count">${learned} / ${total}</span>
                    <span class="hp-row-go" aria-hidden="true">→</span>
                </button>`;
        }).join('');
        const pctAll = totalAll ? Math.round(learnedAll / totalAll * 100) : 0;
        const streakText = n > 0
            ? `🔥 Серия занятий: <b>${n}</b> ${pluralDay(n)}` + (s.best > n ? ` <span class="hp-best">· рекорд ${s.best}</span>` : '')
            : `Серия занятий: <b>0</b> <span class="hp-best">· начните сегодня</span>`;
        const started = totalAll > 0 && learnedAll > 0;
        const intro = started
            ? `<div class="hp-overall">Выучено букв и знаков: <b>${learnedAll} / ${totalAll}</b> (${pctAll}%). Нажмите строку, чтобы открыть тренировку.</div>`
            : `<div class="hp-empty">Выберите тренировку ниже — знак считается выученным, когда каждая его форма отвечена верно хотя бы один раз.</div>`;
        const cont = getContinueAction();
        return `
            <div class="hp-card">
                <div class="hp-top">
                    <span class="hp-streak">${streakText}</span>
                    ${started ? intro : ''}
                </div>
                ${started ? '' : intro}
                <div class="hp-rows">${bars}</div>
                <button type="button" class="hp-cta" onclick="continueLearning()">
                    ${escapeHtml(cont.label)}
                </button>
            </div>`;
    }
    function updateHomeProgress() {
        const el = document.getElementById('home-progress');
        if (el) el.innerHTML = renderProgressOverview();
        const label = document.getElementById('progress-toggle-label');
        const s = loadStreak();
        if (label) label.innerHTML = progressToggleMarkup(s);
        const btn = document.getElementById('progress-toggle');
        if (btn && !document.getElementById('top-tools')?.classList.contains('progress-open')) {
            const title = progressToggleTitle(s);
            btn.title = title;
            btn.setAttribute('aria-label', title);
        }
    }

    // ===== «Продолжить»: следующий урок Пути или последняя тренировка =====
    const LAST_PRACTICE_KEY = 'todo-last-practice';

    function saveLastPractice(scope) {
        if (!scope || !practiceScopes[scope]) return;
        try { localStorage.setItem(LAST_PRACTICE_KEY, scope); } catch (e) {}
    }
    function loadLastPractice() {
        try {
            const s = localStorage.getItem(LAST_PRACTICE_KEY);
            if (s && practiceScopes[s]) return s;
        } catch (e) {}
        return null;
    }

    function getContinueAction() {
        if (typeof pathFlat === 'function' && typeof pathIsUnlocked === 'function' && typeof pathIsDone === 'function') {
            const next = pathFlat().find(l => pathIsUnlocked(l.id) && !pathIsDone(l.id));
            if (next) {
                return {
                    kind: 'path',
                    lesson: next,
                    label: 'Продолжить путь: ' + next.title + ' →'
                };
            }
        }
        const last = loadLastPractice();
        if (last) {
            const name = (typeof NAV_CHIP_LABEL !== 'undefined' && NAV_CHIP_LABEL[last])
                || (categoryMeta[last] && categoryMeta[last].label)
                || 'тренировку';
            return { kind: 'practice', cat: last, label: 'Продолжить: ' + name + ' →' };
        }
        if (typeof pathFlat === 'function') {
            return { kind: 'path-start', cat: 'path', label: 'Начать путь →' };
        }
        return { kind: 'practice', cat: 'practice', label: 'Начать тренировку →' };
    }

    function continueLearning() {
        if (typeof setProgressBarOpen === 'function') setProgressBarOpen(false);
        const a = getContinueAction();
        if (a.kind === 'path' && a.lesson) {
            if (a.lesson.kind === 'quiz' && typeof pathNodeClick === 'function') {
                showSection('path');
                pathNodeClick(a.lesson.id);
                return;
            }
            if (a.lesson.cat) { showSection(a.lesson.cat); return; }
            showSection('path');
            return;
        }
        showSection(a.cat || 'path');
    }

    // ===== Экспорт / импорт прогресса =====
    function exportProgress() {
        const data = JSON.stringify({ app: 'todo-bichig', version: 1, exported: new Date().toISOString(),
            progress: practiceProgress, streak: loadStreak() }, null, 2);
        const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
        const a = document.createElement('a');
        a.href = url; a.download = 'todo-progress.json';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    function handleImportFile(input, scope) {
        const file = input.files && input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const obj = JSON.parse(reader.result);
                if (obj && typeof obj === 'object' && obj.progress && typeof obj.progress === 'object') {
                    practiceProgress = obj.progress; saveProgress();
                    if (obj.streak && typeof obj.streak === 'object') saveStreak(obj.streak);
                    PRACTICE_CATS.forEach(updateProgressUI);
                    renderStreak();
                    setupPractice(scope);
                    alert('Прогресс импортирован.');
                } else {
                    alert('Это не похоже на файл прогресса Тодо Бичик.');
                }
            } catch (e) {
                alert('Не удалось прочитать файл: ' + e.message);
            }
            input.value = '';
        };
        reader.readAsText(file);
    }

    function setupPractice(scope) {
        saveLastPractice(scope);
        const st = getPState(scope);
        if (st.timer) { clearTimeout(st.timer); st.timer = null; }
        st.answered = false;
        const box = document.getElementById('only-unlearned__' + scope);
        if (box) box.checked = practiceOnlyUnlearned;
        const fb = document.getElementById('practice-feedback__' + scope);
        const next = document.getElementById('practice-next__' + scope);
        const prompt = document.getElementById('practice-prompt__' + scope);
        if (!fb) return;
        if (next) next.style.display = 'none';
        fb.textContent = ''; fb.className = 'practice-feedback';
        const choiceBox = document.getElementById('practice-choices__' + scope);

        // Серия слогов на 100% → автоматически к следующей незавершённой.
        if (scope === 'practice_syllables') {
            const moved = advanceSyllableSeriesIfComplete();
            if (moved) {
                syllableAdvanceNotice = `Серия «${moved.from}» — 100%. Дальше: «${moved.to}».`;
            }
        }

        let pool = getTrainingPool(scope);
        // Если пул пуст из‑за 100% серии — ещё раз попробуем перейти вперёд.
        if (!pool.length && scope === 'practice_syllables' && !syllableShowAll) {
            const moved = advanceSyllableSeriesIfComplete();
            if (moved) {
                syllableAdvanceNotice = `Серия «${moved.from}» — 100%. Дальше: «${moved.to}».`;
                pool = getTrainingPool(scope);
            }
        }

        if (syllableAdvanceNotice && scope === 'practice_syllables') {
            fb.className = 'practice-feedback correct';
            fb.textContent = syllableAdvanceNotice;
            syllableAdvanceNotice = null;
        }

        if (!pool.length) {                                   // включён режим «только невыученные», а всё выучено
            st.letter = null;
            const ch = document.getElementById('practice-char__' + scope);
            if (ch) { ch.textContent = '✓'; ch.classList.remove('todo-num'); }
            if (prompt) {
                prompt.textContent = scope === 'practice_syllables' && !syllableShowAll
                    ? 'Все открытые серии слогов выучены! Снимите «Только невыученные», чтобы повторять, или включите «показывать все серии».'
                    : 'Всё выучено! Снимите «Только невыученные», чтобы повторять.';
            }
            if (choiceBox) choiceBox.innerHTML = '';
            updateProgressUI(scope); renderStreak();
            return;
        }

        st.idx = pickNextIndex(pool, st.lastKey);
        const letter = pool[st.idx];
        st.letter = letter;
        st.lastKey = letterKey(letter);
        // форма выбирается не случайно с первого раза, а по правилам pickForm()
        // (см. выше): начальная сначала, остальные подмешиваются постепенно.
        const fkey = pickForm(letter);
        const fname = FORM_LABELS[fkey];
        st.form = fname; st.formKey = fkey;
        const chEl = document.getElementById('practice-char__' + scope);
        if (chEl) {
            chEl.textContent = trimSpine(letter[fkey]);
            chEl.classList.toggle('todo-num', isTodoNumber(letter));
        }
        const noun = letter.category === 'syllables' ? 'слог' : 'знак';
        const seriesHint = (scope === 'practice_syllables' && !syllableShowAll) ? ` Серия: ${SYLLABLE_GROUPS[syllableGroupIdx].title}.` : '';

        if (prompt) prompt.textContent = `Как читается этот ${noun}? Форма: ${fname}.${seriesHint} Выберите правильный вариант.`;
        renderChoices(scope, letter);
        updateProgressUI(scope); renderStreak();
    }

    function nextQuestion(scope) {
        if (!getPState(scope).answered) return;
        setupPractice(scope);
    }

    // Отвечают только кнопками вариантов (chooseAnswer); Enter после ответа
    // просто листает на следующий вопрос — см. слушатель keypress в main.js.
    function checkAnswer(scope) {
        const st = getPState(scope);
        if (st.answered) nextQuestion(scope);
    }

    // активный блок практики (если открыт)
    function activePracticeScope() {
        for (const sc of PRACTICE_CATS) {
            const sec = document.getElementById('section-' + sc);
            if (sec && sec.classList.contains('active')) return sc;
        }
        return null;
    }
