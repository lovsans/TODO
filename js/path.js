/* path.js — «Путь»: структурированный курс в духе Duolingo поверх существующего
   атласа и тренировок. Юниты состоят из уроков двух видов:
   - quiz: мини-урок «выучить → квиз» по конкретному набору знаков (idxs);
   - link: урок-переход, отмечающий как пройденный существующий раздел сайта
     (правила, слова, тексты, слоги, письмо) — без дублирования его логики.
   Прогресс пути (пройдено/звёзды) — в localStorage под ключом todo-path.
   Ответы в quiz-уроках также пишутся в общий todo-practice (recordAnswer),
   чтобы тренировки и обзор на главной учитывали занятия в «Пути». */

    const PATH_UNITS = [
        { title: 'Правила', lessons: [
            { id: 'wr', kind: 'link', title: 'Правила письма', sub: 'Направление, штрихи, позиции букв', cat: 'writing_rules' },
            { id: 'rr', kind: 'link', title: 'Правила чтения', sub: 'Сингармонизм и особые случаи', cat: 'rules' },
            { id: 'har', kind: 'link', title: 'Сингармонизм', sub: 'Задний и передний ряды гласных', cat: 'harmony' }
        ]},
        { title: 'Гласные', lessons: [
            { id: 'vow', kind: 'quiz', title: 'Семь гласных', sub: 'а · э · и · о · у · ө · ү', idxs: [0,1,2,3,4,5,6] }
        ]},
        { title: 'Долгие и дифтонги', lessons: [
            { id: 'lv',  kind: 'quiz', title: 'Долгие гласные', sub: 'аа · ээ · ии…', idxs: [7,8,9,10,11,12,13] },
            { id: 'dph', kind: 'quiz', title: 'Дифтонги', sub: 'ай · эй · ой…', idxs: [14,15,16,17,18,19,20] }
        ]},
        { title: 'Согласные', lessons: [
            { id: 'con1', kind: 'quiz', title: 'Н, Ң, Х, Һ, Б', idxs: [21,22,23,24,25] },
            { id: 'con2', kind: 'quiz', title: 'С, Ш, Т, Д, Л', idxs: [31,32,33,34,35] },
            { id: 'con3', kind: 'quiz', title: 'М, Ц/Ч, З/Җ, Й, К', idxs: [36,37,39,44,45] },
            { id: 'con4', kind: 'quiz', title: 'К, Г, Р, В', idxs: [47,49,52,53] }
        ]},
        { title: 'Слоги', lessons: [
            { id: 'syl', kind: 'link', title: 'Слоги по сериям', sub: '145 слогов — по одной серии за раз', cat: 'practice_syllables' }
        ]},
        { title: 'Числа и пунктуация', lessons: [
            { id: 'num', kind: 'quiz', title: 'Цифры 0–9', idxs: [66,67,68,69,70,71,72,73,74,75] },
            { id: 'pun', kind: 'quiz', title: 'Пунктуация', sub: 'бирга · точка · запятая…', idxs: [76,77,78,79] }
        ]},
        { title: 'Слова и тексты', lessons: [
            { id: 'wrd', kind: 'link', title: 'Слова', sub: 'Частотные слова с транслитерацией', cat: 'words' },
            { id: 'txt', kind: 'link', title: 'Тексты', sub: 'Связные тексты для чтения', cat: 'reading' }
        ]},
        { title: 'Галики', lessons: [
            { id: 'gal', kind: 'quiz', title: 'Галики и заимствования', sub: 'Знаки для тибетских/санскритских слов', idxs: [27,28,29,30,38,40,41,42,43,54] }
        ]},
        { title: 'Письмо', lessons: [
            { id: 'dir', kind: 'link', title: 'Направление письма', sub: 'Тренажёр штрихов', cat: 'direction' },
            { id: 'ww',  kind: 'link', title: 'Написать слово', sub: 'Наберите слово сами', cat: 'write_word' },
            { id: 'cb',  kind: 'link', title: 'Пропись', sub: 'PDF-пропись для печати', cat: 'copybook' }
        ]}
    ];

    function pathFlat() {
        const flat = [];
        PATH_UNITS.forEach((u, ui) => u.lessons.forEach((l, li) => flat.push(Object.assign({ unitIndex: ui, lessonIndex: li }, l))));
        return flat;
    }
    function pathLessonById(id) { return pathFlat().find(l => l.id === id); }

    function loadPathProgress() { try { return JSON.parse(localStorage.getItem('todo-path') || '{}') || {}; } catch (e) { return {}; } }
    let pathProgress = loadPathProgress();
    function savePathProgress() { try { localStorage.setItem('todo-path', JSON.stringify(pathProgress)); } catch (e) {} }

    function pathIsDone(id) { return !!(pathProgress[id] && pathProgress[id].done); }
    function pathStars(id) { return (pathProgress[id] && pathProgress[id].stars) || 0; }

    // Урок разблокирован, если это первый урок пути или предыдущий уже пройден.
    function pathIsUnlocked(id) {
        const flat = pathFlat();
        const i = flat.findIndex(l => l.id === id);
        if (i <= 0) return true;
        return pathIsDone(flat[i - 1].id);
    }

    // Текущее представление внутри раздела: список пути или открытый урок.
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
    }

    // ============================================================
    // Список пути — юниты и «змейка» узлов-уроков
    // ============================================================
    function pathRenderList() {
        const flat = pathFlat();
        const doneCount = flat.filter(l => pathIsDone(l.id)).length;
        let counter = 0;
        const unitsHtml = PATH_UNITS.map(u => {
            const uDone = u.lessons.filter(l => pathIsDone(l.id)).length;
            const nodes = u.lessons.map(l => {
                const gi = counter++;
                const unlocked = pathIsUnlocked(l.id);
                const done = pathIsDone(l.id);
                const isNext = unlocked && !done;
                const side = gi % 2 === 0 ? 'lp-left' : 'lp-right';
                const stateCls = done ? 'lp-done' : (unlocked ? (isNext ? 'lp-current' : 'lp-unlocked') : 'lp-locked');
                const icon = done ? '✓' : (l.kind === 'link' ? '→' : (unlocked ? '●' : '🔒'));
                const stars = done ? `<div class="lp-stars">${'★'.repeat(pathStars(l.id))}${'☆'.repeat(3 - pathStars(l.id))}</div>` : '';
                return `
                    <div class="lp-row ${side}">
                        <button type="button" class="lp-node ${stateCls}" ${unlocked ? '' : 'disabled aria-disabled="true"'}
                                onclick="pathNodeClick('${l.id}')" aria-label="${escapeHtml(l.title)}${done ? ' — пройдено' : ''}">
                            <span class="lp-node-icon" aria-hidden="true">${icon}</span>
                        </button>
                        <div class="lp-label">
                            <div class="lp-label-title">${escapeHtml(l.title)}</div>
                            ${l.sub ? `<div class="lp-label-sub">${escapeHtml(l.sub)}</div>` : ''}
                            ${stars}
                        </div>
                    </div>`;
            }).join('');
            return `
                <div class="lp-unit">
                    <div class="lp-unit-head">
                        <span class="lp-unit-title">${escapeHtml(u.title)}</span>
                        <span class="lp-unit-count">${uDone} / ${u.lessons.length}</span>
                    </div>
                    <div class="lp-nodes">${nodes}</div>
                </div>`;
        }).join('');

        return `
            <div class="lp-wrap">
                <div class="about-kicker">Структурированный курс</div>
                <h2 class="about-title">Путь</h2>
                <p class="about-lead">Короткие уроки по порядку — от гласных до связных текстов. Каждый следующий шаг открывается после того, как пройден предыдущий.</p>
                <div class="lp-overall">
                    <div class="lp-overall-bar"><div class="lp-overall-fill" style="width:${flat.length ? Math.round(doneCount / flat.length * 100) : 0}%"></div></div>
                    <div class="lp-overall-label">${doneCount} / ${flat.length} уроков пройдено</div>
                </div>
                ${unitsHtml}
            </div>`;
    }

    function pathNodeClick(id) {
        if (!pathIsUnlocked(id)) return;
        const l = pathLessonById(id);
        if (!l) return;
        if (l.kind === 'link') {
            const prevStars = pathStars(id);
            pathProgress[id] = { done: true, stars: Math.max(prevStars, 3) };
            savePathProgress();
            showSection(l.cat);
            return;
        }
        pathView = { mode: 'lesson', lessonId: id, phase: 'learn', qi: 0, correct: 0, total: 0, queue: [], cardIdx: null };
        renderPathRoot();
    }

    function pathBackToList() { pathView = { mode: 'list' }; renderPathRoot(); }

    // ============================================================
    // Урок-квиз: карточки «выучить» → вопросы → результат
    // ============================================================
    function pathRenderLesson(id) {
        const l = pathLessonById(id);
        if (!l) return pathRenderList();
        if (pathView.phase === 'learn') return pathRenderLearn(l);
        if (pathView.phase === 'quiz') return pathRenderQuiz(l);
        return pathRenderResult(l);
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
                <button type="button" class="lp-back" onclick="pathBackToList()">← Путь</button>
                <h2 class="about-title">${escapeHtml(l.title)}</h2>
                <p class="about-lead">У каждой буквы — своя форма в начале, середине и конце слова. Нажмите на карточку, чтобы увеличить и полистать, затем пройдите квиз — он спрашивает по каждой форме отдельно.</p>
                <div class="lp-cards">${cards}</div>
                <button type="button" class="practice-btn" onclick="pathStartQuiz('${l.id}')">Начать квиз →</button>
            </div>`;
    }

    // ── Увеличенный вид знака с перелистыванием (стрелки, клавиатура, свайп) ──
    function pathOpenFlashcard(i) { pathView.cardIdx = i; renderPathRoot(); }
    function pathCloseFlashcard() { pathView.cardIdx = null; renderPathRoot(); }
    function pathFlashStep(dir) {
        const l = pathLessonById(pathView.lessonId);
        const n = l.idxs.length;
        pathView.cardIdx = ((pathView.cardIdx + dir) % n + n) % n;   // зацикливаем
        renderPathRoot();
    }
    let pathTouchX = null;
    function pathTouchStart(e) { pathTouchX = e.changedTouches[0].clientX; }
    function pathTouchEnd(e) {
        if (pathTouchX == null) return;
        const dx = e.changedTouches[0].clientX - pathTouchX;
        pathTouchX = null;
        if (Math.abs(dx) < 40) return;              // короткое касание — не свайп
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
                <button type="button" class="lp-back" onclick="pathBackToList()">← Путь</button>
                <div class="lp-flash-wrap" ontouchstart="pathTouchStart(event)" ontouchend="pathTouchEnd(event)"
                     onkeydown="pathFlashKey(event)" tabindex="0">
                    <button type="button" class="lp-flash-close" onclick="pathCloseFlashcard()" aria-label="К списку букв урока">Готово ✕</button>
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
        // Каждая буква даёт по одному вопросу на каждую имеющуюся у неё форму
        // (начальная/срединная/конечная) — так тренируются все написания, а не
        // только то, что случайно оказалось первым непустым полем.
        let queue = [];
        chars.forEach(c => FORM_ORDER.forEach(k => { if (c[k] != null) queue.push({ c, formKey: k }); }));
        // Если вопросов набралось мало (короткий урок из 4 согласных даёт больше
        // десятка) — не обрезаем; если, наоборот, вопросов слишком много, оставляем
        // случайные 16, чтобы урок не был утомительным.
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
                <button type="button" class="lp-back" onclick="pathBackToList()">← Путь</button>
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
            fb.textContent = isCorrect ? '✓ Верно!' : '✗ Неверно';
        }
        setTimeout(() => {
            pathView.qi++;
            pathView.answered = false;
            if (pathView.qi >= pathView.queue.length) {
                pathFinishQuiz();
            } else {
                renderPathRoot();
            }
        }, 900);
    }

    function pathFinishQuiz() {
        const l = pathLessonById(pathView.lessonId);
        const pct = pathView.total ? pathView.correct / pathView.total : 0;
        const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
        const prevStars = pathStars(l.id);
        pathProgress[l.id] = { done: true, stars: Math.max(prevStars, stars) };
        savePathProgress();
        updateHomeProgress();
        pathView = { mode: 'lesson', lessonId: l.id, phase: 'result', correct: pathView.correct, total: pathView.total, stars };
        renderPathRoot();
    }

    function pathRenderResult(l) {
        const stars = pathView.stars;
        return `
            <div class="lp-lesson lp-result">
                <div class="lp-result-stars">${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
                <h2 class="about-title">${stars > 0 ? 'Урок пройден!' : 'Попробуйте ещё раз'}</h2>
                <p class="about-lead">Правильных ответов: ${pathView.correct} из ${pathView.total}.</p>
                <div class="lp-result-actions">
                    <button type="button" class="practice-btn" onclick="pathStartQuiz('${l.id}')">Повторить</button>
                    <button type="button" class="practice-btn" onclick="pathBackToList()">Продолжить путь →</button>
                </div>
            </div>`;
    }
