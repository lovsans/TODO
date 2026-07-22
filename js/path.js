/* path.js — «Путь»: линейный курс по порядку самоучителя.
   Уроки двух видов:
   - quiz: выучить формы → квиз;
   - link: переход в раздел сайта (не засчитывается по клику — только после «Готово»).
   Следующий урок открывается только когда пройден предыдущий.
   Прогресс: localStorage todo-path; ответы quiz → todo-practice. */

    // Порядок как в courseStages (Бадмаев): знакомство → буквы → слоги → правила → слова → практика.
    const PATH_UNITS = [
        { title: 'Знакомство с письмом', lessons: [
            { id: 'abo', kind: 'link', title: 'О письме', sub: 'История и метод занятий', cat: 'about' },
            { id: 'wr', kind: 'link', title: 'Правила письма', sub: 'Направление, штрихи, позиции букв', cat: 'writing_rules' },
            { id: 'dir', kind: 'link', title: 'Направление письма', sub: 'Тренажёр штрихов', cat: 'direction' }
        ]},
        { title: 'Гласные', lessons: [
            { id: 'vow', kind: 'quiz', title: 'Семь гласных', sub: 'а · э · и · о · у · ө · ү', idxs: [0,1,2,3,4,5,6] },
            { id: 'pv', kind: 'link', title: 'Тренировка: гласные', sub: 'Закрепить базовые гласные', cat: 'practice_vowels' }
        ]},
        { title: 'Долгие гласные и дифтонги', lessons: [
            { id: 'lv', kind: 'quiz', title: 'Долгие гласные', sub: 'аа · ээ · ии…', idxs: [7,8,9,10,11,12,13] },
            { id: 'plv', kind: 'link', title: 'Тренировка: долгие', sub: 'Закрепить долгие гласные', cat: 'practice_long_vowels' },
            { id: 'dph', kind: 'quiz', title: 'Дифтонги', sub: 'ай · эй · ой…', idxs: [14,15,16,17,18,19,20] },
            { id: 'pdph', kind: 'link', title: 'Тренировка: дифтонги', sub: 'Закрепить сочетания с «й»', cat: 'practice_diphthongs' }
        ]},
        { title: 'Согласные', lessons: [
            { id: 'con1', kind: 'quiz', title: 'Н, Ң, Х, Һ, Б', idxs: [21,22,23,24,25] },
            { id: 'con2', kind: 'quiz', title: 'С, Ш, Т, Д, Л', idxs: [31,32,33,34,35] },
            { id: 'con3', kind: 'quiz', title: 'М, Ц/Ч, З/Җ, Й, К', idxs: [36,37,39,44,45] },
            { id: 'con4', kind: 'quiz', title: 'К, Г, Р, В', idxs: [47,49,52,53] },
            { id: 'pcon', kind: 'link', title: 'Тренировка: согласные', sub: 'Закрепить основные согласные', cat: 'practice_consonants' },
            { id: 'gal', kind: 'quiz', title: 'Галики и заимствования', sub: 'Знаки для тибетских/санскритских слов', idxs: [27,28,29,30,38,40,41,42,43,54] },
            { id: 'pgal', kind: 'link', title: 'Тренировка: галики', sub: 'Редкие знаки отдельно', cat: 'practice_galik' }
        ]},
        { title: 'Цифры, знаки и спецформы', lessons: [
            { id: 'num', kind: 'quiz', title: 'Цифры 0–9', idxs: [66,67,68,69,70,71,72,73,74,75] },
            { id: 'pun', kind: 'quiz', title: 'Пунктуация', sub: 'бирга · точка · запятая…', idxs: [76,77,78,79] },
            { id: 'spc', kind: 'link', title: 'Специальные формы', sub: 'Вспомогательные начертания', cat: 'special' }
        ]},
        { title: 'Слоги', lessons: [
            { id: 'syl_atlas', kind: 'link', title: 'Силлабарий', sub: 'Слоги по сериям', cat: 'syllables' },
            { id: 'syl', kind: 'link', title: 'Тренировка: слоги', sub: 'По одной серии за раз', cat: 'practice_syllables' }
        ]},
        { title: 'Правила чтения', lessons: [
            { id: 'rr', kind: 'link', title: 'Правила чтения', sub: 'Ключевые закономерности', cat: 'rules' },
            { id: 'har', kind: 'link', title: 'Сингармонизм', sub: 'Задний и передний ряды гласных', cat: 'harmony' }
        ]},
        { title: 'Чтение слов', lessons: [
            { id: 'wrd', kind: 'link', title: 'Слова', sub: 'Старое написание ⇄ современный калмыцкий', cat: 'words' },
            { id: 'txt', kind: 'link', title: 'Тексты', sub: 'Связные тексты для чтения', cat: 'reading' }
        ]},
        { title: 'Практика и повторение', lessons: [
            { id: 'prac', kind: 'link', title: 'Общая практика', sub: 'Угадывайте чтение по форме', cat: 'practice' },
            { id: 'ww', kind: 'link', title: 'Написать слово', sub: 'Наберите слово сами', cat: 'write_word' },
            { id: 'cb', kind: 'link', title: 'Пропись', sub: 'PDF-пропись для печати', cat: 'copybook' }
        ]}
    ];

    function pathFlat() {
        const flat = [];
        PATH_UNITS.forEach((u, ui) => u.lessons.forEach((l, li) => flat.push(Object.assign({ unitIndex: ui, lessonIndex: li }, l))));
        return flat;
    }
    function pathLessonById(id) { return pathFlat().find(l => l.id === id); }
    function pathLessonIndex(id) { return pathFlat().findIndex(l => l.id === id); }
    function pathNextAfter(id) {
        const flat = pathFlat();
        const i = flat.findIndex(l => l.id === id);
        return i >= 0 && i < flat.length - 1 ? flat[i + 1] : null;
    }

    function loadPathProgress() { try { return JSON.parse(localStorage.getItem('todo-path') || '{}') || {}; } catch (e) { return {}; } }
    let pathProgress = loadPathProgress();
    function savePathProgress() { try { localStorage.setItem('todo-path', JSON.stringify(pathProgress)); } catch (e) {} }

    function pathIsDone(id) { return !!(pathProgress[id] && pathProgress[id].done); }
    function pathStars(id) { return (pathProgress[id] && pathProgress[id].stars) || 0; }

    // Если в старом прогрессе уже есть пройденные уроки «дальше» по новому порядку —
    // закрываем пробелы впереди, чтобы человек не застрял на новых вводных шагах.
    (function pathMigrateLinearProgress() {
        const flat = pathFlat();
        let changed = false;
        for (let i = 0; i < flat.length; i++) {
            if (!pathIsDone(flat[i].id)) continue;
            for (let j = 0; j < i; j++) {
                if (pathIsDone(flat[j].id)) continue;
                pathProgress[flat[j].id] = { done: true, stars: Math.max(pathStars(flat[j].id), 1) };
                changed = true;
            }
        }
        if (changed) savePathProgress();
    })();

    // Строго: урок открыт только если это первый или предыдущий уже пройден.
    function pathIsUnlocked(id) {
        const flat = pathFlat();
        const i = flat.findIndex(l => l.id === id);
        if (i < 0) return false;
        if (i === 0) return true;
        return pathIsDone(flat[i - 1].id);
    }

    function pathCurrentLesson() {
        return pathFlat().find(l => pathIsUnlocked(l.id) && !pathIsDone(l.id)) || null;
    }

    function pathLessonGoal(l) {
        if (l.kind === 'quiz') return 'Сначала посмотрите формы букв, затем ответьте на квиз — по каждой форме отдельно.';
        return 'Откройте раздел, изучите материал, затем нажмите «Готово» на панели вверху — иначе следующий урок не откроется.';
    }

    // Контекст link-урока: пока он активен, раздел открыт «из Пути».
    const COURSE_CTX_KEY = 'todo-course-ctx';
    function loadCourseCtx() {
        try { return JSON.parse(sessionStorage.getItem(COURSE_CTX_KEY) || 'null'); } catch (e) { return null; }
    }
    function saveCourseCtx(ctx) {
        try {
            if (ctx) sessionStorage.setItem(COURSE_CTX_KEY, JSON.stringify(ctx));
            else sessionStorage.removeItem(COURSE_CTX_KEY);
        } catch (e) {}
    }
    function clearCourseCtx() { saveCourseCtx(null); }

    let pathView = { mode: 'list' };

    function pathCharsByIdx(idxs) { return idxs.map(i => charData.find(c => c.idx === i)).filter(Boolean); }

    function renderPathRoot() {
        const el = document.getElementById('path-root');
        if (!el) return;
        el.innerHTML = pathView.mode === 'lesson' ? pathRenderLesson(pathView.lessonId) : pathRenderList();
        if (pathView.mode === 'lesson' && pathView.phase === 'learn' && pathView.cardIdx != null) {
            const w = el.querySelector('.lp-flash-wrap');
            if (w) w.focus();
        }
        updateCourseRail();
    }

    function updateCourseRail() {
        const rail = document.getElementById('course-rail');
        if (!rail) return;
        const ctx = loadCourseCtx();
        if (!ctx || !ctx.lessonId) {
            rail.innerHTML = '';
            rail.hidden = true;
            document.body.classList.remove('course-lesson-active');
            return;
        }
        const l = pathLessonById(ctx.lessonId);
        if (!l) { rail.innerHTML = ''; rail.hidden = true; return; }
        const activeCat = typeof getActiveSectionCat === 'function' ? getActiveSectionCat() : null;
        // Панель видна, когда пользователь ушёл из Пути в материал урока.
        if (activeCat === 'path') {
            rail.innerHTML = '';
            rail.hidden = true;
            document.body.classList.remove('course-lesson-active');
            return;
        }
        document.body.classList.add('course-lesson-active');
        rail.hidden = false;
        rail.innerHTML = `
            <div class="course-rail-inner">
                <div class="course-rail-meta">
                    <span class="course-rail-kicker">Урок пути</span>
                    <span class="course-rail-title">${escapeHtml(l.title)}</span>
                </div>
                <div class="course-rail-actions">
                    <button type="button" class="course-rail-btn course-rail-btn-secondary" onclick="showSection('path')">К пути</button>
                    <button type="button" class="course-rail-btn course-rail-btn-primary" onclick="pathCompleteAndContinue()">Готово</button>
                </div>
            </div>`;
    }

    function pathCompleteAndContinue() {
        const ctx = loadCourseCtx();
        if (!ctx || !ctx.lessonId) return;
        const id = ctx.lessonId;
        const prevStars = pathStars(id);
        pathProgress[id] = { done: true, stars: Math.max(prevStars, 3) };
        savePathProgress();
        clearCourseCtx();
        updateHomeProgress();
        pathView = { mode: 'lesson', lessonId: id, phase: 'celebrate' };
        showSection('path');
    }

    // ============================================================
    // Список пути
    // ============================================================
    function pathRenderList() {
        const flat = pathFlat();
        const doneCount = flat.filter(l => pathIsDone(l.id)).length;
        const cur = pathCurrentLesson();
        let counter = 0;

        const unitsHtml = PATH_UNITS.map((u, ui) => {
            const uDone = u.lessons.filter(l => pathIsDone(l.id)).length;
            const uComplete = uDone === u.lessons.length;
            const isCurrentUnit = cur ? cur.unitIndex === ui : (doneCount >= flat.length && ui === PATH_UNITS.length - 1);
            const nodes = u.lessons.map(l => {
                const gi = counter++;
                const unlocked = pathIsUnlocked(l.id);
                const done = pathIsDone(l.id);
                const isCurrent = !!(cur && cur.id === l.id);
                const side = gi % 2 === 0 ? 'lp-left' : 'lp-right';
                const stateCls = done ? 'lp-done' : (unlocked ? (isCurrent ? 'lp-current' : 'lp-unlocked') : 'lp-locked');
                const icon = done ? '✓' : (isCurrent ? (l.kind === 'quiz' ? 'Aa' : '→') : (unlocked ? '·' : '🔒'));
                const stars = done
                    ? `<div class="lp-stars" aria-label="${pathStars(l.id)} из 3">${'★'.repeat(pathStars(l.id))}${'☆'.repeat(3 - pathStars(l.id))}</div>`
                    : '';
                const startBtn = isCurrent
                    ? `<button type="button" class="lp-duo-start" onclick="pathNodeClick('${l.id}')">Начать</button>`
                    : '';
                return `
                    <div class="lp-row ${side}${isCurrent ? ' lp-row-current' : ''}">
                        ${startBtn}
                        <button type="button" class="lp-node ${stateCls}" ${unlocked ? '' : 'disabled aria-disabled="true"'}
                                onclick="pathNodeClick('${l.id}')"
                                aria-label="${escapeHtml(l.title)}${done ? ' — пройдено' : isCurrent ? ' — текущий урок' : unlocked ? '' : ' — ещё закрыт'}">
                            <span class="lp-node-icon" aria-hidden="true">${icon}</span>
                        </button>
                        <div class="lp-label">
                            <div class="lp-label-title">${escapeHtml(l.title)}</div>
                            ${l.sub ? `<div class="lp-label-sub">${escapeHtml(l.sub)}</div>` : ''}
                            ${stars}
                            ${!unlocked ? `<div class="lp-label-lock">Сначала пройдите предыдущий урок</div>` : ''}
                        </div>
                    </div>`;
            }).join('');
            return `
                <div class="lp-unit${isCurrentUnit ? ' is-current' : ''}${uComplete ? ' is-complete' : ''}">
                    <div class="lp-unit-head">
                        <span class="lp-unit-kicker">Этап ${ui + 1}${uComplete ? ' · завершён' : isCurrentUnit ? ' · сейчас' : ''}</span>
                        <span class="lp-unit-title">${escapeHtml(u.title)}</span>
                        <span class="lp-unit-count">${uDone} / ${u.lessons.length}</span>
                    </div>
                    <div class="lp-nodes">${nodes}</div>
                </div>`;
        }).join('');

        const jump = cur
            ? `<button type="button" class="lp-jump-btn" onclick="pathNodeClick('${cur.id}')">
                    <span class="lp-jump-label">Сейчас</span>
                    <span class="lp-jump-title">${escapeHtml(cur.title)}</span>
               </button>`
            : `<div class="lp-jump-done">Путь пройден</div>`;

        return `
            <div class="lp-wrap">
                <div class="about-kicker">Структурированный курс</div>
                <h2 class="about-title">Путь</h2>
                <p class="about-lead">Один урок за раз — строго по порядку самоучителя. Следующий шаг откроется только после прохождения текущего.</p>
                <div class="lp-overall">
                    <div class="lp-overall-bar"><div class="lp-overall-fill" style="width:${flat.length ? Math.round(doneCount / flat.length * 100) : 0}%"></div></div>
                    <div class="lp-overall-label">${doneCount} / ${flat.length} уроков пройдено</div>
                </div>
                ${jump}
                ${unitsHtml}
            </div>`;
    }

    function pathNodeClick(id) {
        if (!pathIsUnlocked(id)) return;
        const l = pathLessonById(id);
        if (!l) return;
        clearCourseCtx();
        // Все уроки начинаются с intro — даже повтор пройденного.
        pathView = { mode: 'lesson', lessonId: id, phase: 'intro' };
        if (typeof getActiveSectionCat === 'function' && getActiveSectionCat() !== 'path') {
            showSection('path');
        } else {
            renderPathRoot();
        }
        updateCourseRail();
    }

    function pathBeginLesson(id) {
        const l = pathLessonById(id);
        if (!l || !pathIsUnlocked(id)) return;
        if (l.kind === 'link') {
            saveCourseCtx({ lessonId: id });
            showSection(l.cat);
            updateCourseRail();
            return;
        }
        clearCourseCtx();
        pathView = { mode: 'lesson', lessonId: id, phase: 'learn', qi: 0, correct: 0, total: 0, queue: [], cardIdx: null };
        renderPathRoot();
        updateCourseRail();
    }

    function pathBackToList() {
        clearCourseCtx();
        pathView = { mode: 'list' };
        renderPathRoot();
    }

    function pathGoNextAfter(id) {
        const next = pathNextAfter(id);
        if (next && pathIsUnlocked(next.id)) pathNodeClick(next.id);
        else pathBackToList();
    }

    // ============================================================
    // Урок: intro → learn/quiz | раздел → celebrate / result
    // ============================================================
    function pathRenderLesson(id) {
        const l = pathLessonById(id);
        if (!l) return pathRenderList();
        if (pathView.phase === 'intro') return pathRenderIntro(l);
        if (pathView.phase === 'celebrate') return pathRenderCelebrate(l);
        if (pathView.phase === 'learn') return pathRenderLearn(l);
        if (pathView.phase === 'quiz') return pathRenderQuiz(l);
        return pathRenderResult(l);
    }

    function pathRenderIntro(l) {
        const n = pathLessonIndex(l.id) + 1;
        const total = pathFlat().length;
        const unit = PATH_UNITS[l.unitIndex];
        const kindLabel = l.kind === 'quiz' ? 'Урок' : 'Практика';
        const already = pathIsDone(l.id);
        return `
            <div class="lp-lesson lp-intro">
                <button type="button" class="lp-back" onclick="pathBackToList()">Путь</button>
                <div class="lp-intro-card">
                    <div class="lp-intro-kicker">${kindLabel} · ${n} из ${total}${already ? ' · повтор' : ''}</div>
                    <h2 class="lp-intro-title">${escapeHtml(l.title)}</h2>
                    ${unit ? `<div class="lp-intro-unit">Этап ${l.unitIndex + 1} — ${escapeHtml(unit.title)}</div>` : ''}
                    ${l.sub ? `<p class="lp-intro-sub">${escapeHtml(l.sub)}</p>` : ''}
                    <p class="lp-intro-goal">${escapeHtml(pathLessonGoal(l))}</p>
                    <button type="button" class="lp-intro-start" onclick="pathBeginLesson('${l.id}')">Начать</button>
                </div>
            </div>`;
    }

    function pathRenderCelebrate(l) {
        const next = pathNextAfter(l.id);
        const primary = next
            ? `<button type="button" class="lp-intro-start" onclick="pathGoNextAfter('${l.id}')">Дальше: ${escapeHtml(next.title)}</button>`
            : `<button type="button" class="lp-intro-start" onclick="pathBackToList()">К пути</button>`;
        return `
            <div class="lp-lesson lp-result lp-celebrate">
                <div class="lp-celebrate-mark" aria-hidden="true"><span class="lp-celebrate-check"></span></div>
                <h2 class="lp-intro-title">Готово</h2>
                <p class="lp-intro-sub">${escapeHtml(l.title)}</p>
                <div class="lp-result-actions">
                    ${primary}
                    <button type="button" class="lp-text-btn" onclick="pathBackToList()">К списку пути</button>
                </div>
            </div>`;
    }

    function pathRenderLearn(l) {
        if (pathView.cardIdx != null) return pathRenderFlashcard(l);
        const chars = pathCharsByIdx(l.idxs);
        const formLbl = { initial: 'Начало', medial: 'Середина', final: 'Конец' };
        const cards = chars.map((c, i) => {
            const forms = FORM_ORDER.map(k => {
                if (c[k] == null) return `<div class="lp-form-item"><div class="lp-form-char lp-form-empty">—</div><div class="lp-form-label">${formLbl[k]}</div></div>`;
                return `<div class="lp-form-item"><div class="lp-form-char${todoNumClass(c)}">${trimSpine(c[k])}</div><div class="lp-form-label">${formLbl[k]}</div></div>`;
            }).join('');
            return `
                <button type="button" class="lp-card" onclick="pathOpenFlashcard(${i})" aria-label="Увеличить знак «${escapeHtml((c.cyrillic || '').split(',')[0].trim())}»">
                    <div class="lp-card-forms">${forms}</div>
                    <div class="lp-card-cyr">${escapeHtml((c.cyrillic || '').split(',')[0].trim())}</div>
                    <div class="lp-card-zoom" aria-hidden="true">⤢</div>
                </button>`;
        }).join('');
        return `
            <div class="lp-lesson">
                <button type="button" class="lp-back" onclick="pathBackToList()">Путь</button>
                <h2 class="lp-intro-title">${escapeHtml(l.title)}</h2>
                <p class="lp-intro-sub">Три формы каждой буквы. Откройте карточку, затем перейдите к квизу.</p>
                <div class="lp-cards">${cards}</div>
                <button type="button" class="lp-intro-start" onclick="pathStartQuiz('${l.id}')">Начать квиз</button>
            </div>`;
    }

    function pathOpenFlashcard(i) { pathView.cardIdx = i; renderPathRoot(); }
    function pathCloseFlashcard() { pathView.cardIdx = null; renderPathRoot(); }
    function pathFlashStep(dir) {
        const l = pathLessonById(pathView.lessonId);
        const n = l.idxs.length;
        pathView.cardIdx = ((pathView.cardIdx + dir) % n + n) % n;
        renderPathRoot();
    }
    let pathTouchX = null;
    function pathTouchStart(e) { pathTouchX = e.changedTouches[0].clientX; }
    function pathTouchEnd(e) {
        if (pathTouchX == null) return;
        const dx = e.changedTouches[0].clientX - pathTouchX;
        pathTouchX = null;
        if (Math.abs(dx) < 40) return;
        pathFlashStep(dx < 0 ? 1 : -1);
    }
    function pathFlashKey(e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); pathFlashStep(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); pathFlashStep(1); }
        else if (e.key === 'Escape') { e.preventDefault(); pathCloseFlashcard(); }
    }

    function pathRenderFlashcard(l) {
        const chars = pathCharsByIdx(l.idxs);
        const i = pathView.cardIdx;
        const c = chars[i];
        const formLbl = { initial: 'Начало', medial: 'Середина', final: 'Конец' };
        const forms = FORM_ORDER.map(k => {
            if (c[k] == null) return `<div class="lp-form-item"><div class="lp-flash-char lp-form-empty">—</div><div class="lp-form-label">${formLbl[k]}</div></div>`;
            return `<div class="lp-form-item"><div class="lp-flash-char${todoNumClass(c)}">${trimSpine(c[k])}</div><div class="lp-form-label">${formLbl[k]}</div></div>`;
        }).join('');
        return `
            <div class="lp-lesson">
                <button type="button" class="lp-back" onclick="pathBackToList()">Путь</button>
                <div class="lp-flash-wrap" ontouchstart="pathTouchStart(event)" ontouchend="pathTouchEnd(event)"
                     onkeydown="pathFlashKey(event)" tabindex="0">
                    <button type="button" class="lp-flash-close" onclick="pathCloseFlashcard()" aria-label="К списку букв урока">Готово</button>
                    <div class="lp-flash-count">${i + 1} / ${chars.length}</div>
                    <div class="lp-flash-nav">
                        <button type="button" class="lp-flash-arrow" onclick="pathFlashStep(-1)" aria-label="Предыдущая буква">←</button>
                        <div class="lp-flash-forms">${forms}</div>
                        <button type="button" class="lp-flash-arrow" onclick="pathFlashStep(1)" aria-label="Следующая буква">→</button>
                    </div>
                    <div class="lp-flash-cyr">${escapeHtml((c.cyrillic || '').split(',')[0].trim())}</div>
                    <div class="lp-flash-hint">← → или свайп, чтобы листать</div>
                </div>
            </div>`;
    }

    function pathStartQuiz(id) {
        const l = pathLessonById(id);
        const chars = pathCharsByIdx(l.idxs);
        let queue = [];
        chars.forEach(c => FORM_ORDER.forEach(k => { if (c[k] != null) queue.push({ c, formKey: k }); }));
        if (queue.length > 16) {
            for (let i = queue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const t = queue[i]; queue[i] = queue[j]; queue[j] = t;
            }
            queue = queue.slice(0, 16);
        }
        for (let i = queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = queue[i]; queue[i] = queue[j]; queue[j] = t;
        }
        pathView = { mode: 'lesson', lessonId: id, phase: 'quiz', qi: 0, correct: 0, total: 0, queue, answered: false };
        renderPathRoot();
    }

    function pathQuizLabel(c) {
        let s = c.cyrillic != null ? String(c.cyrillic) : (c.latin || '');
        s = s.split(',')[0].trim().replace(/[0-9]+$/, '');
        return s || (c.latin || '');
    }

    function pathRenderQuiz(l) {
        const total = pathView.queue.length;
        const { c, formKey } = pathView.queue[pathView.qi];
        const form = c[formKey];
        const formLbl = { initial: 'начальная', medial: 'срединная', final: 'конечная' };
        const allChars = pathCharsByIdx(l.idxs);
        const correct = pathQuizLabel(c);
        const opts = [correct];
        const seen = new Set([correct.toLowerCase()]);
        const pool = allChars.slice();
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
        for (const cc of pool) {
            if (opts.length >= 4) break;
            const nm = pathQuizLabel(cc), key = nm.toLowerCase();
            if (seen.has(key)) continue;
            seen.add(key); opts.push(nm);
        }
        for (let i = opts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = opts[i]; opts[i] = opts[j]; opts[j] = t;
        }
        const choices = opts.map((nm, i) =>
            `<button type="button" class="choice-btn" data-correct="${nm === correct ? '1' : '0'}" onclick="pathChoose(this)">` +
                `<span class="choice-num">${i + 1}</span><span class="choice-label">${escapeHtml(nm)}</span>` +
            `</button>`).join('');
        return `
            <div class="lp-lesson">
                <button type="button" class="lp-back" onclick="pathBackToList()">Путь</button>
                <div class="pp-head"><span>${escapeHtml(l.title)}</span><span class="pp-count">${pathView.qi + 1} / ${total}</span></div>
                <div class="pp-bar"><div class="pp-bar-fill" style="width:${Math.round(pathView.qi / total * 100)}%"></div></div>
                <div id="path-feedback" class="practice-feedback"></div>
                <div class="practice-char-display">
                    <div class="practice-char${todoNumClass(c)}">${trimSpine(form)}</div>
                    <div class="practice-prompt">Как читается ${formLbl[formKey]} форма этого знака?</div>
                </div>
                <div class="practice-choices" id="path-choices">${choices}</div>
            </div>`;
    }

    function pathChoose(btn) {
        if (pathView.answered) return;
        pathView.answered = true;
        const isCorrect = btn.getAttribute('data-correct') === '1';
        const box = document.getElementById('path-choices');
        if (box) {
            box.querySelectorAll('.choice-btn').forEach(b => {
                b.disabled = true;
                if (b.getAttribute('data-correct') === '1') b.classList.add('is-correct');
            });
            if (!isCorrect) btn.classList.add('is-wrong');
        }
        pathView.total++;
        if (isCorrect) pathView.correct++;
        const { c, formKey } = pathView.queue[pathView.qi];
        recordAnswer(c, formKey, isCorrect);
        updateDailyStreak();
        const fb = document.getElementById('path-feedback');
        if (fb) {
            fb.className = 'practice-feedback ' + (isCorrect ? 'correct' : 'incorrect');
            fb.textContent = isCorrect ? 'Верно' : 'Неверно';
        }
        setTimeout(() => {
            pathView.qi++;
            pathView.answered = false;
            if (pathView.qi >= pathView.queue.length) pathFinishQuiz();
            else renderPathRoot();
        }, 900);
    }

    function pathFinishQuiz() {
        const l = pathLessonById(pathView.lessonId);
        const pct = pathView.total ? pathView.correct / pathView.total : 0;
        const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
        const prevStars = pathStars(l.id);
        if (stars > 0) {
            pathProgress[l.id] = { done: true, stars: Math.max(prevStars, stars) };
            savePathProgress();
            updateHomeProgress();
        }
        pathView = { mode: 'lesson', lessonId: l.id, phase: 'result', correct: pathView.correct, total: pathView.total, stars };
        renderPathRoot();
    }

    function pathRenderResult(l) {
        const stars = pathView.stars;
        const next = pathNextAfter(l.id);
        const ok = stars > 0;
        const primary = ok
            ? (next
                ? `<button type="button" class="lp-intro-start" onclick="pathGoNextAfter('${l.id}')">Дальше: ${escapeHtml(next.title)}</button>`
                : `<button type="button" class="lp-intro-start" onclick="pathBackToList()">К пути</button>`)
            : `<button type="button" class="lp-intro-start" onclick="pathStartQuiz('${l.id}')">Повторить</button>`;
        return `
            <div class="lp-lesson lp-result">
                <div class="lp-result-stars" aria-label="${stars} из 3">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
                <h2 class="lp-intro-title">${ok ? 'Отлично' : 'Ещё раз'}</h2>
                <p class="lp-intro-sub">${escapeHtml(l.title)} · ${pathView.correct} из ${pathView.total}</p>
                <div class="lp-result-actions">
                    ${primary}
                    ${ok
                        ? `<button type="button" class="lp-text-btn" onclick="pathStartQuiz('${l.id}')">Пройти ещё раз</button>`
                        : `<button type="button" class="lp-text-btn" onclick="pathBackToList()">К пути</button>`}
                </div>
            </div>`;
    }
