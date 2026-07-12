/* badmaev-course.js — логика побуквенного курса по Бадмаеву */

(function () {
    const STORE_KEY = 'todo-badmaev-v2';
    const FORM_NAMES = { initial: 'Начальные', medial: 'Срединные', final: 'Конечные' };
    const FORM_KEYS = ['initial', 'medial', 'final'];

    let activeLesson = 0;
    let activeStep = 0;
    let freePreview = true;
    let quiz = null;
    let review = null;
    let progress = loadProgress();

    function loadProgress() {
        try {
            const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {};
            Object.keys(raw).forEach(id => {
                if (raw[id] && raw[id].steps && raw[id].steps.length === 4) {
                    raw[id].steps.push(false);
                }
            });
            return raw;
        } catch (e) { return {}; }
    }

    function saveProgress() {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(progress)); } catch (e) {}
        try {
            localStorage.setItem('todo-badmaev-last', JSON.stringify({
                lesson: activeLesson,
                step: activeStep,
                at: Date.now()
            }));
        } catch (e) {}
        updateOverall();
        updateToday();
    }

    function lessonProgress(id) {
        if (!progress[id]) progress[id] = { steps: [false, false, false, false, false], copies: 0 };
        while (progress[id].steps.length < 5) progress[id].steps.push(false);
        return progress[id];
    }

    function isLessonDone(i) {
        return lessonProgress(BADMAEV_LESSONS[i].id).steps.every(Boolean);
    }

    function isUnlocked(i) {
        return freePreview || i === 0 || isLessonDone(i - 1);
    }

    function charByIdx(idx) {
        return charData.find(c => c.idx === idx);
    }

    function trimForm(value) {
        if (value == null) return '—';
        const result = String(value).replace(/^_+/, '').replace(/_+$/, '');
        return result || '—';
    }

    function bcTodoGlyph(text) {
        if (!text || typeof wwParse !== 'function' || typeof assembleWord !== 'function') return text || '';
        const letters = wwParse(String(text).toLowerCase()).map(i => composeCharByIdx[i]).filter(Boolean);
        return trimSpine(assembleWord(letters)) || text;
    }

    function esc(value) {
        return typeof escapeHtml === 'function'
            ? escapeHtml(value)
            : String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    function atlasLink(lesson) {
        const c = charByIdx(lesson.idx);
        if (!c) return 'index.html';
        return 'index.html';
    }

    function previousWords(beforeIndex) {
        const out = [];
        for (let i = 0; i < beforeIndex; i++) {
            const l = BADMAEV_LESSONS[i];
            if (!l.words) continue;
            l.words.forEach(w => out.push({ ...w, fromLetter: l.letter, fromTitle: l.title }));
        }
        return out;
    }

    function syllablesOfWord(todo, letter) {
        const s = String(todo).toLowerCase();
        const parts = [];
        let i = 0;
        while (i < s.length) {
            let matched = false;
            for (let len = Math.min(3, s.length - i); len >= 1; len--) {
                const chunk = s.substr(i, len);
                if (chunk.includes(letter) || len === 1) {
                    parts.push({ text: chunk, has: chunk.includes(letter) });
                    i += len;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                parts.push({ text: s[i], has: s[i] === letter });
                i += 1;
            }
        }
        if (parts.length < 2) {
            return Array.from(s).map((ch, idx) => ({ text: ch, has: ch === letter, idx }));
        }
        return parts.map((p, idx) => ({ ...p, idx }));
    }

    function makeReview(lesson, lessonIndex) {
        const pool = (lesson.words || []).map(w => ({ ...w, fromLetter: lesson.letter }))
            .concat(previousWords(lessonIndex));
        if (!pool.length) return null;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        const target = lesson.letter;
        const parts = syllablesOfWord(pick.todo, target);
        const correct = parts.filter(p => p.has);
        if (!correct.length) return makeReview(lesson, lessonIndex);
        const correctIdx = correct[Math.floor(Math.random() * correct.length)].idx;
        const options = shuffleArr(parts.map(p => p.idx)).slice(0, Math.min(4, parts.length));
        if (!options.includes(correctIdx)) options[0] = correctIdx;
        return {
            word: pick,
            parts,
            target,
            correctIdx,
            options: shuffleArr([...new Set(options)]),
            answered: false
        };
    }

    function updateToday() {
        const el = document.getElementById('today-card');
        if (!el) return;
        const l = BADMAEV_LESSONS[activeLesson];
        const st = BADMAEV_STEPS[activeStep];
        const state = lessonProgress(l.id);
        const done = state.steps.filter(Boolean).length;
        el.innerHTML = `
            <div class="today-kicker">Сегодня · торопись медленно</div>
            <div class="today-main"><b>${esc(l.title)}</b> · шаг ${activeStep + 1} — ${esc(st)}</div>
            <div class="today-sub">Урок ${activeLesson + 1} из ${BADMAEV_LESSONS.length} · стр. ${l.page} · ${done}/5 шагов</div>`;
    }

    function updateOverall() {
        const total = BADMAEV_LESSONS.length * 5;
        const done = BADMAEV_LESSONS.reduce((sum, l) => sum + lessonProgress(l.id).steps.filter(Boolean).length, 0);
        const pct = Math.round(done / total * 100);
        const val = document.getElementById('overall-value');
        const bar = document.getElementById('overall-bar');
        if (val) val.textContent = pct + '%';
        if (bar) bar.style.width = pct + '%';
    }

    function renderNav() {
        const host = document.getElementById('lesson-list');
        if (!host) return;
        let html = '';
        BADMAEV_PARTS.forEach(part => {
            html += `<div class="nav-part-title">${esc(part.title)}</div>`;
            for (let i = part.from; i <= part.to && i < BADMAEV_LESSONS.length; i++) {
                const l = BADMAEV_LESSONS[i];
                const done = isLessonDone(i);
                const locked = !isUnlocked(i);
                html += `<button class="lesson-link ${i === activeLesson ? 'active' : ''} ${locked ? 'locked' : ''} ${l.isGalik ? 'galik' : ''}"
                    type="button" data-lesson="${i}" aria-label="${esc(l.title)}">
                    <span class="lesson-num">${i + 1}</span>
                    <span class="lesson-name">${esc(l.title)}</span>
                    <span class="lesson-state">${done ? '✓' : (locked ? '🔒' : '')}</span>
                </button>`;
            }
        });
        host.innerHTML = html;
        host.querySelectorAll('[data-lesson]').forEach(btn => {
            btn.addEventListener('click', () => openLesson(parseInt(btn.dataset.lesson, 10)));
        });
    }

    function renderLesson() {
        const lesson = BADMAEV_LESSONS[activeLesson];
        const state = lessonProgress(lesson.id);
        const card = document.getElementById('course-card');
        if (!card) return;
        card.innerHTML = `
            <header class="lesson-head">
                <div class="bk-page-tag">стр. ${lesson.page}</div>
                <div class="lesson-count">Урок ${activeLesson + 1} из ${BADMAEV_LESSONS.length} · Часть 1</div>
                <h2 class="lesson-title bk-letter-head">${esc(lesson.capital)}, ${esc(lesson.letter)}</h2>
                <p class="lesson-sub">${esc(lesson.title)} — рассмотрите знак, прочитайте соединения, перепишите и разберите слова.</p>
                <div class="lesson-links">
                    <a class="ghost-btn" href="${atlasLink(lesson)}">Атлас букв →</a>
                    <a class="ghost-btn" href="index.html">Прописи и тренажёр →</a>
                </div>
            </header>
            <nav class="steps" aria-label="Шаги урока">
                ${BADMAEV_STEPS.map((name, i) =>
                    `<button type="button" class="step-tab ${i === activeStep ? 'active' : ''} ${state.steps[i] ? 'done' : ''}"
                        data-step="${i}">${i + 1}. ${name}</button>`
                ).join('')}
            </nav>
            <div class="lesson-body">${renderStep(lesson, state)}</div>`;
        card.querySelectorAll('[data-step]').forEach(btn => {
            btn.addEventListener('click', () => openStep(parseInt(btn.dataset.step, 10)));
        });
        bindStepActions(card);
        updateToday();
    }

    function bindStepActions(root) {
        root.querySelectorAll('[data-complete]').forEach(btn => {
            btn.addEventListener('click', () => completeStep(parseInt(btn.dataset.complete, 10)));
        });
        root.querySelectorAll('[data-copy]').forEach(btn => {
            btn.addEventListener('click', () => setCopies(parseInt(btn.dataset.copy, 10)));
        });
        root.querySelectorAll('[data-review]').forEach(btn => {
            btn.addEventListener('click', () => answerReview(parseInt(btn.dataset.review, 10)));
        });
        root.querySelectorAll('[data-quiz]').forEach(btn => {
            btn.addEventListener('click', () => answerQuiz(btn.dataset.quiz));
        });
        root.querySelectorAll('[data-advance-quiz]').forEach(btn => btn.addEventListener('click', advanceQuiz));
        root.querySelectorAll('[data-restart-quiz]').forEach(btn => btn.addEventListener('click', restartQuiz));
        root.querySelectorAll('[data-next-lesson]').forEach(btn => {
            btn.addEventListener('click', () => openLesson(parseInt(btn.dataset.nextLesson, 10)));
        });
    }

    function renderStep(lesson, state) {
        if (activeStep === 0) return renderForms(lesson, state);
        if (activeStep === 1) return renderCombinations(lesson, state);
        if (activeStep === 2) return renderCopy(lesson, state);
        if (activeStep === 3) return renderReview(lesson, state);
        return renderQuiz(lesson, state);
    }

    function formCell(lesson, key) {
        const c = charByIdx(lesson.idx);
        if (!c) return '<td class="bk-td">—</td>';
        if (key === 'initial' && lesson.noInitial) return '<td class="bk-td bk-td-muted">не употр.</td>';
        if (key === 'final' && lesson.noFinal) return '<td class="bk-td bk-td-muted">не употр.</td>';
        const val = c[key];
        if (val == null) return '<td class="bk-td bk-td-muted">—</td>';
        return `<td class="bk-td"><div class="todo-glyph todo-glyph--form" aria-hidden="true">${esc(trimForm(val))}</div></td>`;
    }

    function renderForms(lesson, state) {
        return `
            <div class="step-kicker">Шаг 1 · знакомство</div>
            <h3 class="step-title">Рассмотрите три положения</h3>
            <p class="step-intro">Как в учебнике: сначала печатные формы, затем способ написания от руки.</p>
            <div class="bk-forms-wrap">
                <table class="bk-forms-table" aria-label="Формы буквы">
                    <thead><tr>${FORM_KEYS.map(k => `<th>${FORM_NAMES[k]}</th>`).join('')}</tr></thead>
                    <tbody><tr>${FORM_KEYS.map(k => formCell(lesson, k)).join('')}</tr></tbody>
                </table>
            </div>
            <div class="write-sample">
                <div class="write-sample-label">Способ написания</div>
                <div class="todo-glyph todo-glyph--sample">${esc(trimForm(charByIdx(lesson.idx)?.initial || charByIdx(lesson.idx)?.medial))}</div>
            </div>
            <div class="rule-box"><b>* Примечание Бадмаева</b>${esc(lesson.note)}</div>
            ${stepFooter(state, 0, 'Я рассмотрел формы')}
        `;
    }

    function renderComboCols(items) {
        return `<div class="todo-cols">${items.map(combo => `
            <div class="todo-col">
                <div class="todo-glyph todo-glyph--combo" aria-hidden="true">${esc(bcTodoGlyph(combo))}</div>
                <div class="combo-label">${esc(combo)}</div>
            </div>`).join('')}</div>`;
    }

    function renderWordTable(words) {
        if (!words || !words.length) return '';
        return `<div class="bk-words">
            <h3 class="bk-words-title">Слоги и слова для написаний</h3>
            <div class="bk-word-grid">
                ${words.map(w => `
                    <div class="bk-word-item">
                        <div class="todo-glyph todo-glyph--word">${esc(bcTodoGlyph(w.todo))}</div>
                        <div class="bk-word-meta">
                            <b>${esc(w.todo)}</b>
                            <span>(${esc(w.modern)}${w.alt ? ' · ' + esc(w.alt) : ''})</span>
                        </div>
                    </div>`).join('')}
            </div>
        </div>`;
    }

    function renderCombinations(lesson, state) {
        const combos = lesson.combinations || [];
        const drill = (lesson.syllables && lesson.syllables.length) ? lesson.syllables : combos;
        return `
            <div class="step-kicker">Шаг 2 · чтение</div>
            <h3 class="step-title">Соединение букв</h3>
            <p class="step-intro">Прочитайте вслух. На письме столбцы идут сверху вниз, строки — слева направо.</p>
            ${drill.length ? `<div class="bk-section"><div class="bk-section-label">Соединения и слоги для тренировки</div>${renderComboCols(drill)}</div>` : ''}
            ${renderWordTable(lesson.words)}
            ${stepFooter(state, 1, 'Я прочитал соединения')}
        `;
    }

    function renderCopy(lesson, state) {
        const c = charByIdx(lesson.idx);
        const keys = FORM_KEYS.filter(k => {
            if (k === 'initial' && lesson.noInitial) return false;
            if (k === 'final' && lesson.noFinal) return false;
            return c && c[k] != null;
        });
        return `
            <div class="step-kicker">Шаг 3 · рука запоминает</div>
            <h3 class="step-title">Перепишите знак три раза</h3>
            <p class="step-intro">Возьмите тетрадь в клетку. Вертикальная линия клетки — «хребет» буквы. Пишите медленно.</p>
            <div class="copy-sheet">
                <div class="copy-targets">
                    ${keys.map(key => `<div class="copy-target">
                        <div class="todo-glyph todo-glyph--copy">${esc(trimForm(c[key]))}</div>
                        <small>${FORM_NAMES[key]}</small>
                    </div>`).join('')}
                </div>
            </div>
            <div class="copy-count">
                <span>Отметьте повторы:</span>
                ${[1, 2, 3].map(n => `<button class="copy-dot ${state.copies >= n ? 'done' : ''}" type="button" data-copy="${n}">${state.copies >= n ? '✓' : n}</button>`).join('')}
            </div>
            ${state.copies >= 3 ? stepFooter(state, 2, 'Написание выполнено') : '<div class="footer-note center-note">После трёх повторов шаг засчитывается автоматически.</div>'}
        `;
    }

    function renderReview(lesson, state) {
        if (!review) review = makeReview(lesson, activeLesson);
        if (!review) {
            return `
                <div class="step-kicker">Шаг 4 · разбор</div>
                <h3 class="step-title">Пока нечего разбирать</h3>
                <p class="step-intro">В этом уроке ещё нет слов из упражнений. Перейдите к проверке.</p>
                ${stepFooter(state, 3, 'Пропустить разбор')}
            `;
        }
        const w = review.word;
        return `
            <div class="step-kicker">Шаг 4 · разбор</div>
            <h3 class="step-title">Где стоит буква «${esc(review.target)}»?</h3>
            <p class="step-intro">Как советует Бадмаев: в пройденных словах находите каждую букву и разбирайтесь, почему она так написана.</p>
            <div class="review-card">
                <div class="todo-glyph todo-glyph--review">${esc(bcTodoGlyph(w.todo))}</div>
                <div class="review-word-label">${esc(w.todo)} <span>(${esc(w.modern)})</span></div>
            </div>
            <p class="review-prompt">В каком слоге / фрагменте встречается «${esc(review.target)}»?</p>
            <div class="review-options">
                ${review.options.map(idx => {
                    const p = review.parts[idx];
                    const cls = review.answered
                        ? (idx === review.correctIdx ? 'correct' : (review.selected === idx ? 'wrong' : ''))
                        : '';
                    return `<button type="button" class="review-option ${cls}" data-review="${idx}" ${review.answered ? 'disabled' : ''}>${esc(p.text)}</button>`;
                }).join('')}
            </div>
            ${review.answered ? stepFooter(state, 3, review.selected === review.correctIdx ? 'Верно! Далее →' : 'Понятно, далее →') : ''}
        `;
    }

    function makeQuiz(lesson) {
        const target = charByIdx(lesson.idx);
        const formKeys = FORM_KEYS.filter(k => target && target[k]);
        const form = formKeys[Math.floor(Math.random() * formKeys.length)];
        const distractors = BADMAEV_LESSONS.filter(x => x.id !== lesson.id)
            .sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [lesson, ...distractors].sort(() => Math.random() - 0.5);
        return { round: 1, score: 0, answered: false, form, options };
    }

    function renderQuiz(lesson, state) {
        if (!quiz) quiz = makeQuiz(lesson);
        if (quiz.round > 3) {
            const passed = quiz.score >= 2;
            if (passed && !state.steps[4]) {
                state.steps[4] = true;
                saveProgress();
            }
            const nextBtn = passed && activeLesson < BADMAEV_LESSONS.length - 1
                ? `<button class="primary-btn" type="button" data-next-lesson="${activeLesson + 1}">Следующая буква →</button>` : '';
            return `
                <div class="quiz-card">
                    <div class="step-kicker">Результат</div>
                    <h3 class="step-title">${passed ? 'Урок закреплён' : 'Стоит повторить формы'}</h3>
                    <p class="step-intro">Верных ответов: <b>${quiz.score} из 3</b>. ${passed ? 'Следующая буква открыта.' : 'Нужно не менее двух.'}</p>
                    <button class="primary-btn" type="button" data-restart-quiz">Пройти ещё раз</button>
                    ${nextBtn}
                </div>`;
        }
        const c = charByIdx(lesson.idx);
        return `
            <div class="quiz-card">
                <div class="step-kicker">Шаг 5 · проверка</div>
                <h3 class="step-title">Какая это буква?</h3>
                <div class="quiz-meta"><span>Вопрос ${quiz.round} из 3</span><span>Верно: ${quiz.score}</span></div>
                <div class="quiz-glyph"><div class="todo-glyph todo-glyph--quiz">${esc(trimForm(c[quiz.form]))}</div></div>
                <div class="quiz-options">
                    ${quiz.options.map(opt => {
                        let cls = '';
                        if (quiz.answered) cls = opt.id === lesson.id ? 'correct' : (quiz.selected === opt.id ? 'wrong' : '');
                        return `<button type="button" class="quiz-option ${cls}" data-quiz="${opt.id}" ${quiz.answered ? 'disabled' : ''}>${esc(opt.letter)}</button>`;
                    }).join('')}
                </div>
                ${quiz.answered ? `<button class="primary-btn" type="button" data-advance-quiz">${quiz.round === 3 ? 'Узнать результат' : 'Следующий вопрос →'}</button>` : ''}
            </div>`;
    }

    function stepFooter(state, step, label) {
        return `<div class="lesson-footer">
            <span class="footer-note">${state.steps[step] ? '✓ Шаг завершён' : 'Отметьте шаг после выполнения.'}</span>
            <button class="primary-btn footer-btn" type="button" data-complete="${step}">${state.steps[step] ? 'Далее →' : esc(label)}</button>
        </div>`;
    }

    function openLesson(i) {
        if (!isUnlocked(i)) return;
        activeLesson = i;
        activeStep = 0;
        quiz = null;
        review = null;
        renderAll();
        document.getElementById('course-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function openStep(i) {
        activeStep = i;
        if (i !== 4) quiz = null;
        if (i !== 3) review = null;
        renderLesson();
        saveProgress();
    }

    function completeStep(step) {
        const state = lessonProgress(BADMAEV_LESSONS[activeLesson].id);
        if (!state.steps[step]) {
            state.steps[step] = true;
            saveProgress();
        }
        activeStep = Math.min(4, step + 1);
        if (activeStep === 3) review = null;
        if (activeStep === 4) quiz = null;
        renderAll();
    }

    function setCopies(n) {
        const state = lessonProgress(BADMAEV_LESSONS[activeLesson].id);
        state.copies = state.copies === n ? n - 1 : n;
        state.steps[2] = state.copies >= 3;
        saveProgress();
        renderAll();
    }

    function answerReview(idx) {
        if (!review || review.answered) return;
        review.answered = true;
        review.selected = idx;
        const state = lessonProgress(BADMAEV_LESSONS[activeLesson].id);
        state.steps[3] = true;
        saveProgress();
        renderLesson();
    }

    function answerQuiz(id) {
        if (!quiz || quiz.answered) return;
        quiz.answered = true;
        quiz.selected = id;
        if (id === BADMAEV_LESSONS[activeLesson].id) quiz.score++;
        renderLesson();
    }

    function advanceQuiz() {
        if (quiz.round >= 3) {
            quiz.round = 4;
            renderAll();
        } else {
            quiz.round++;
            const next = makeQuiz(BADMAEV_LESSONS[activeLesson]);
            next.round = quiz.round;
            next.score = quiz.score;
            quiz = next;
            renderLesson();
        }
    }

    function restartQuiz() {
        quiz = makeQuiz(BADMAEV_LESSONS[activeLesson]);
        renderLesson();
    }

    function renderAll() {
        renderNav();
        renderLesson();
        updateOverall();
    }

    function restoreLastSession() {
        try {
            const last = JSON.parse(localStorage.getItem('todo-badmaev-last') || 'null');
            if (last && typeof last.lesson === 'number' && isUnlocked(last.lesson)) {
                activeLesson = last.lesson;
                activeStep = Math.min(4, last.step || 0);
            }
        } catch (e) {}
    }

    function init() {
        const previewToggle = document.getElementById('preview-toggle');
        const resetBtn = document.getElementById('reset-btn');
        const themeBtn = document.getElementById('theme-btn');

        if (previewToggle) {
            freePreview = previewToggle.checked;
            previewToggle.addEventListener('change', e => {
                freePreview = e.target.checked;
                if (!isUnlocked(activeLesson)) activeLesson = 0;
                renderAll();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (!confirm('Сбросить прогресс курса?')) return;
                progress = {};
                activeLesson = 0;
                activeStep = 0;
                quiz = null;
                review = null;
                saveProgress();
                renderAll();
            });
        }

        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                document.documentElement.dataset.theme = next;
                themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
                try { localStorage.setItem('todo-theme', next); } catch (e) {}
            });
            themeBtn.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
        }

        restoreLastSession();
        renderAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
