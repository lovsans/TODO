/* harmony.js — тренажёр сингармонизма: определение ряда слова и выбор
   соответствующей гласной в парах а/э, о/ө, у/ү.
   Вертикальные глифы и раскраска — те же функции, что в «Составить слово»
   и «Написать слово» (assembleWord + composeColorPlan). */

    const harmonyState = {
        filter: 'all',
        mode: 'learn',
        phase: 'idle',
        queue: [],
        qi: 0,
        correct: 0,
        total: 0,
        answered: false,
        item: null,
        weak: [],
        weakKeys: {},
        mistakeCounts: {}
    };

    function harmonyPool() {
        if (harmonyState.filter === 'hard') return HARMONY_ITEMS.filter(x => x.row === 'hard' && x.type !== 'i-contrast');
        if (harmonyState.filter === 'soft') return HARMONY_ITEMS.filter(x => x.row === 'soft' && x.type !== 'i-contrast');
        if (harmonyState.filter === 'i') return HARMONY_ITEMS.filter(x => x.type === 'i-contrast' || (x.word && x.word.includes('и')));
        return HARMONY_ITEMS.slice();
    }

    // Единый порядок во всём тренажёре: передний ряд — первым, задний — вторым.
    const HARMONY_HARD_VOWELS = { 'а': 1, 'о': 1, 'у': 1 };
    const HARMONY_I_WORD_ROW = { 'шинэ': 'soft', 'дөчин': 'soft', 'кэшиг': 'soft', 'һучин': 'hard', 'җирһал': 'hard' };

    function harmonyRowRank(row) {
        return row === 'soft' ? 0 : 1;
    }

    function harmonyOrderByRow(list, rowOf) {
        return list
            .map((v, i) => ({ v, i, r: harmonyRowRank(rowOf(v)) }))
            .sort((a, b) => (a.r - b.r) || (a.i - b.i))
            .map(x => x.v);
    }

    function harmonyVowelRow(v) {
        return HARMONY_HARD_VOWELS[v] ? 'hard' : 'soft';
    }

    function harmonyWordRow(item, w) {
        if (w === item.correct) return item.row;
        return HARMONY_I_WORD_ROW[w] || item.row;
    }

    function harmonyItemKey(item) {
        if (!item) return '';
        if (item.type === 'i-contrast') return [item.type, item.correct, ...(item.wrong || [])].join('|');
        return [item.type, item.row, item.before || '', item.correct, item.word || ''].join('|');
    }

    function harmonyCloneItem(item, repeat) {
        const copy = Object.assign({}, item);
        if (repeat) copy.__repeat = true;
        return copy;
    }

    function harmonyShuffleQueue(items) {
        const pool = (items || harmonyPool()).map(item => harmonyCloneItem(item, !!item.__repeat));
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
        }
        harmonyState.queue = pool;
        harmonyState.qi = 0;
    }

    function harmonyLettersFromTodo(todo) {
        return wwParse(todo).map(i => composeCharByIdx[i]).filter(Boolean);
    }

    // В тодо нет отдельного знака «ә» — в письме это «э» (как в атласе и «Написать слово»).
    const HARMONY_VOWEL_TODO = {
        'а': { idx: 0 },
        'ә': { idx: 1 },
        'э': { idx: 1 },
        'е': { idx: 1 },
        'и': { idx: 2 },
        'ы': { idx: 16 },
        'о': { idx: 3 },
        'у': { idx: 4 },
        'ө': { idx: 5 },
        'ү': { idx: 6 },
    };

    function harmonyVowelLetters(v) {
        const m = HARMONY_VOWEL_TODO[v];
        if (!m) return null;
        const lt = composeCharByIdx[m.idx];
        if (!lt) return null;
        return { letters: [lt], hint: m.hint || null };
    }

    function harmonySlotIndex(item) {
        if (!item || item.type !== 'vowel' || !item.before) return -1;
        return wwParse(item.before).length;
    }

    function harmonyAssembledColored(todo) {
        const letters = harmonyLettersFromTodo(todo);
        if (!letters.length) return { html: '', text: '', letters: [], colorByIndex: {} };
        const plan = composeColorPlan(letters);
        return {
            html: plan.html,
            text: trimSpine(assembleWord(letters)),
            letters,
            colorByIndex: plan.colorByIndex
        };
    }

    function harmonyLegendHtml(letters, colorByIndex, slotIdx, hideSlot, slotTone) {
        if (!letters.length) return '';
        let h = '<div class="harmony-legend" aria-hidden="false">';
        letters.forEach((lt, i) => {
            const ci = colorByIndex[i] != null ? colorByIndex[i] : (i % CW_COLOR_N);
            const isSlot = i === slotIdx;
            const lbl = (hideSlot && isSlot) ? '?' : composeLabel(lt, { pos: i, letters });
            const slotCls = isSlot ? ' harmony-leg-slot' + (slotTone ? ' harmony-leg-slot-' + slotTone : '') : '';
            h += `<span class="harmony-leg-chip cl${ci}${slotCls}">${escapeHtml(lbl)}</span>`;
        });
        h += '</div>';
        return h;
    }

    function harmonyGlyphColumn(todo, sizeCls) {
        const { html, text } = harmonyAssembledColored(todo);
        if (!html) return '';
        return `<div class="harmony-glyphs cw-assembled ${sizeCls || ''}" aria-label="${escapeHtml(todo)}">${html}</div>`;
    }

    function harmonyVowelChoiceInner(v) {
        const parsed = harmonyVowelLetters(v);
        if (!parsed) {
            return `<span class="ww-key-sign harmony-vowel-key harmony-vowel-key--empty">`
                + `<span class="ww-key-glyph harmony-vowel-empty">—</span>`
                + `<span class="ww-key-cap">${escapeHtml(v)}</span>`
                + `<span class="harmony-vowel-hint">нет в тодо</span></span>`;
        }
        const plan = composeColorPlan(parsed.letters);
        return `<span class="ww-key-sign harmony-vowel-key">`
            + `<span class="ww-key-glyph harmony-vowel-glyph">${plan.html}</span>`
            + `<span class="ww-key-cap">${escapeHtml(v)}</span>`
            + (parsed.hint ? `<span class="harmony-vowel-hint">${escapeHtml(parsed.hint)}</span>` : '')
            + `</span>`;
    }

    function harmonyWordChoiceInner(w) {
        const col = harmonyGlyphColumn(w, 'harmony-glyphs-sm');
        return `<div class="harmony-choice-stack">${col}<span class="harmony-choice-cyr">${escapeHtml(w)}</span></div>`;
    }

    function harmonyComposedAnswer(item, answer) {
        if (!item) return answer || '';
        if (item.type === 'vowel') return (item.before || '') + (answer || '') + (item.after || '');
        return answer || '';
    }

    function harmonyDiffSlot(a, b) {
        const aa = wwParse(a || '');
        const bb = wwParse(b || '');
        const n = Math.max(aa.length, bb.length);
        for (let i = 0; i < n; i++) {
            if (aa[i] !== bb[i]) return i;
        }
        return -1;
    }

    function harmonyReviewCard(label, todo, tone, slotIdx) {
        const assembled = harmonyAssembledColored(todo);
        return `<div class="harmony-review-card harmony-review-${tone}">`
            + `<div class="harmony-review-label">${escapeHtml(label)}</div>`
            + harmonyGlyphColumn(todo, 'harmony-glyphs-sm')
            + `<div class="harmony-review-word">«${escapeHtml(todo)}»</div>`
            + harmonyLegendHtml(assembled.letters, assembled.colorByIndex, slotIdx, false, tone)
            + `</div>`;
    }

    function harmonyErrorReviewHtml(item, selected) {
        const chosenWord = harmonyComposedAnswer(item, selected);
        const correctWord = item.word || harmonyComposedAnswer(item, item.correct);
        const slotIdx = item.type === 'vowel' ? harmonySlotIndex(item) : harmonyDiffSlot(chosenWord, correctWord);
        return `<div class="harmony-review" aria-label="Разбор ошибки">`
            + harmonyReviewCard('Выбрано', chosenWord, 'wrong', slotIdx)
            + harmonyReviewCard('Нужно', correctWord, 'correct', slotIdx)
            + `</div>`;
    }

    function harmonyUpdateModeUi() {
        document.querySelectorAll('.harmony-mode-chip').forEach(btn => {
            const on = btn.getAttribute('data-mode') === harmonyState.mode;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        const wrap = document.querySelector('.harmony-wrap');
        if (wrap) {
            wrap.classList.toggle('harmony-mode-learn', harmonyState.mode === 'learn');
            wrap.classList.toggle('harmony-mode-check', harmonyState.mode === 'check');
        }
        const note = document.getElementById('harmony-mode-note');
        if (note) {
            note.textContent = harmonyState.mode === 'learn'
                ? 'Учиться: подсвечиваем ряд и разбираем ошибку.'
                : 'Проверка: без подсказок до ответа.';
        }
    }

    function harmonyUpdateQuestionState(text) {
        const el = document.getElementById('harmony-question-state');
        if (!el) return;
        el.textContent = text || '';
    }

    function harmonyUpdateRefHighlight(item) {
        document.querySelectorAll('.harmony-ref-chip').forEach(chip => {
            const row = chip.getAttribute('data-row');
            let active = harmonyState.mode === 'learn' && item && !harmonyState.answered;
            if (!active) {
                chip.classList.remove('harmony-ref-active');
                return;
            }
            active = item.type === 'i-contrast' ? row === 'neutral' : row === item.row;
            chip.classList.toggle('harmony-ref-active', active);
        });
    }

    function harmonyWordContrastErrorHtml(correct, selected) {
        return `<div class="harmony-review" aria-label="Разбор ошибки">`
            + harmonyReviewCard('Выбрано', selected, 'wrong', -1)
            + harmonyReviewCard('Нужно', correct, 'correct', -1)
            + `</div>`;
    }

    function harmonyRecordMistake(item) {
        const key = harmonyItemKey(item);
        if (!key) return;
        harmonyState.mistakeCounts[key] = (harmonyState.mistakeCounts[key] || 0) + 1;
        if (!harmonyState.weakKeys[key]) {
            harmonyState.weakKeys[key] = true;
            harmonyState.weak.push(harmonyCloneItem(item, false));
        }
    }

    function harmonyScheduleRepeat(item) {
        const repeatItem = harmonyCloneItem(item, true);
        const at = Math.min(harmonyState.queue.length, harmonyState.qi + 3);
        harmonyState.queue.splice(at, 0, repeatItem);
    }

    function harmonyRenderStage(item, opts) {
        opts = opts || {};
        const glyphsEl = document.getElementById('harmony-glyphs');
        const legendEl = document.getElementById('harmony-legend');
        const metaEl = document.getElementById('harmony-word-meta');
        const refWord = item.type === 'i-contrast'
            ? (opts.answered ? item.correct : '')
            : (item.word || item.correct);
        const assembled = harmonyAssembledColored(refWord);
        const slotIdx = harmonySlotIndex(item);
        const stageLabel = document.querySelector('#harmony-stage .cw-stage-label');
        if (stageLabel) stageLabel.textContent = 'Слово письмом тодо (сверху вниз)';

        if (glyphsEl) {
            let html = '';
            if (item.type === 'i-contrast' && !opts.answered) {
                html = '';
            } else if (assembled.html && (opts.showFullWord || item.type === 'row' || item.type === 'vowel' || (item.type === 'i-contrast' && opts.answered))) {
                html = assembled.html;
            }
            if (html) {
                glyphsEl.innerHTML = html;
                glyphsEl.classList.remove('cw-empty');
            } else {
                glyphsEl.innerHTML = '';
                glyphsEl.classList.add('cw-empty');
                if (item.type === 'i-contrast' && !opts.answered) {
                    glyphsEl.classList.add('harmony-glyphs-compare');
                } else {
                    glyphsEl.classList.remove('harmony-glyphs-compare');
                }
            }
        }
        if (legendEl) {
            if (item.type === 'vowel' && !opts.answered && assembled.letters.length) {
                legendEl.innerHTML = harmonyLegendHtml(
                    assembled.letters,
                    assembled.colorByIndex,
                    slotIdx,
                    true
                );
            } else if (item.type === 'vowel' && opts.answered && assembled.letters.length) {
                legendEl.innerHTML = harmonyLegendHtml(
                    assembled.letters,
                    assembled.colorByIndex,
                    slotIdx,
                    false
                );
            } else if (assembled.letters.length && opts.answered) {
                legendEl.innerHTML = harmonyLegendHtml(assembled.letters, assembled.colorByIndex, -1, false);
            } else {
                legendEl.innerHTML = '';
            }
        }
        if (metaEl) {
            const parts = [];
            if (opts.answered) {
                if (refWord) parts.push('«' + refWord + '»');
                if (item.modern) parts.push('→ «' + item.modern + '»');
            }
            if (opts.answered && item.meaning) parts.push('(' + item.meaning + ')');
            metaEl.textContent = parts.join(' ');
        }
    }

    function renderHarmony() {
        return `
            <div class="harmony-wrap practice-container">
                <div class="section-title">Сингармонизм на практике</div>
                <div class="section-info">В калмыцком языке существует правило сингармонизма. Сингармонизм относится ко всему слову: гласные обычно сохраняют один ряд — передний <b>э, ө, ү</b> (мягкие) или задний <b>а, о, у</b> (твердые). Буква <b>и</b> нейтральна: она бывает и в переднерядных, и в заднерядных словах, а ряд определяют другие гласные.</div>
                <div class="harmony-i-note">
                    <strong>Буква «и»</strong> — нейтральная. Смотрите не на неё саму, а на соседние гласные:
                    <span class="harmony-i-example"><span class="harmony-row-soft">шинэ</span> — передний ряд («э»)</span>
                    <span class="harmony-i-example"><span class="harmony-row-hard">җирһал</span> — задний ряд («а»)</span>
                </div>
                <div class="harmony-ref">
                    <span class="harmony-ref-chip harmony-ref-soft" data-row="soft">передний ряд → э · ө · ү</span>
                    <span class="harmony-ref-chip harmony-ref-hard" data-row="hard">задний ряд → а · о · у</span>
                    <span class="harmony-ref-chip harmony-ref-neutral" data-row="neutral">нейтральная → и</span>
                    <button type="button" class="note-link harmony-rules-link" role="link" tabindex="0" onclick="gotoRule('harmony');return false;">Правило в «Правилах чтения» →</button>
                </div>
                <div class="harmony-modes" aria-label="Режим урока">
                    <span class="harmony-filters-label">Режим:</span>
                    <button type="button" class="harmony-mode-chip active" data-mode="learn" aria-pressed="true" onclick="harmonySetMode('learn')">Учиться</button>
                    <button type="button" class="harmony-mode-chip" data-mode="check" aria-pressed="false" onclick="harmonySetMode('check')">Проверка</button>
                    <span id="harmony-mode-note" class="harmony-mode-note">Учиться: подсвечиваем ряд и разбираем ошибку.</span>
                </div>
                <div class="harmony-filters">
                    <span class="harmony-filters-label">Набор:</span>
                    <button type="button" class="harmony-chip active" data-filter="all" onclick="harmonySetFilter('all')">Все</button>
                    <button type="button" class="harmony-chip" data-filter="soft" onclick="harmonySetFilter('soft')">Передний ряд</button>
                    <button type="button" class="harmony-chip" data-filter="hard" onclick="harmonySetFilter('hard')">Задний ряд</button>
                    <button type="button" class="harmony-chip" data-filter="i" onclick="harmonySetFilter('i')">Буква «и»</button>
                </div>
                <div class="harmony-progress">
                    <span id="harmony-count">—</span>
                    <span id="harmony-score">Верно: 0</span>
                </div>
                <div id="harmony-question-state" class="harmony-question-state" aria-live="polite"></div>
                <div id="harmony-feedback" class="practice-feedback"></div>
                <div id="harmony-prompt" class="harmony-prompt"></div>
                <div class="harmony-stage cw-stage" id="harmony-stage">
                    <span class="cw-stage-label">Слово письмом тодо (сверху вниз)</span>
                    <div id="harmony-glyphs" class="harmony-glyphs cw-assembled cw-empty"></div>
                    <div id="harmony-legend"></div>
                    <div id="harmony-word-meta" class="harmony-word-meta"></div>
                </div>
                <div class="practice-choices harmony-choices" id="harmony-choices"></div>
                <button type="button" id="harmony-next" class="practice-btn practice-next" style="display:none" onclick="harmonyNext()">Дальше →</button>
                <button type="button" class="practice-skip" onclick="setupHarmony()">Начать заново</button>
            </div>`;
    }

    function harmonySetFilter(f) {
        harmonyState.filter = f;
        document.querySelectorAll('.harmony-chip').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === f);
        });
        setupHarmony();
    }

    function harmonySetMode(mode) {
        harmonyState.mode = mode === 'check' ? 'check' : 'learn';
        harmonyUpdateModeUi();
        setupHarmony();
    }

    function harmonyRowLabel(row) {
        return row === 'hard' ? 'задний ряд' : 'передний ряд';
    }

    function harmonyRowChoiceInner(row) {
        return row === 'hard'
            ? '<div class="harmony-choice-stack"><strong>Задний ряд</strong><span class="harmony-choice-cyr">а · о · у</span></div>'
            : '<div class="harmony-choice-stack"><strong>Передний ряд</strong><span class="harmony-choice-cyr">э · ө · ү</span></div>';
    }

    function harmonyRenderQuestion() {
        const item = harmonyState.queue[harmonyState.qi];
        if (!item) {
            harmonyState.phase = 'finished';
            document.getElementById('harmony-prompt').textContent = 'Набор пройден! Нажмите «Начать заново» или смените фильтр.';
            const g = document.getElementById('harmony-glyphs');
            if (g) { g.innerHTML = ''; g.classList.add('cw-empty'); }
            const l = document.getElementById('harmony-legend');
            if (l) l.innerHTML = '';
            const m = document.getElementById('harmony-word-meta');
            if (m) m.textContent = '';
            document.getElementById('harmony-choices').innerHTML = '';
            harmonyUpdateQuestionState('Набор завершён');
            harmonyUpdateRefHighlight(null);
            return;
        }
        harmonyState.item = item;
        harmonyState.answered = false;
        harmonyState.phase = 'question';
        harmonyUpdateModeUi();
        harmonyUpdateRefHighlight(item);
        const fb = document.getElementById('harmony-feedback');
        const next = document.getElementById('harmony-next');
        if (fb) { fb.textContent = ''; fb.className = 'practice-feedback'; }
        if (next) next.style.display = 'none';

        const cnt = document.getElementById('harmony-count');
        if (cnt) cnt.textContent = (harmonyState.qi + 1) + ' / ' + harmonyState.queue.length + (item.__repeat ? ' · повтор' : '');
        harmonyUpdateQuestionState((harmonyState.mode === 'learn' ? 'Учебный режим' : 'Проверка') + ' · вопрос');

        const promptEl = document.getElementById('harmony-prompt');
        const learn = harmonyState.mode === 'learn';
        const rowCls = learn ? (item.row === 'hard' ? 'harmony-row-hard' : 'harmony-row-soft') : '';

        if (item.type === 'vowel') {
            if (promptEl) {
                promptEl.innerHTML = learn
                    ? `В слове <span class="harmony-cons ${rowCls}">«${escapeHtml(item.word)}»</span> выберите нужную гласную из пары <b>${escapeHtml(item.pair || '')}</b>. `
                        + `В разборе букв пропуск отмечен знаком «?».`
                    : `Какая гласная из пары <b>${escapeHtml(item.pair || '')}</b> подходит слову «${escapeHtml(item.word)}»?`;
            }
            harmonyRenderStage(item, { answered: false, showFullWord: true });
            const opts = harmonyOrderByRow([item.correct].concat(item.wrong), harmonyVowelRow);
            document.getElementById('harmony-choices').innerHTML = opts.map((v, i) =>
                `<button type="button" class="choice-btn harmony-choice-btn harmony-choice-vowel" data-answer="${escapeHtml(v)}" data-correct="${v === item.correct ? '1' : '0'}" onclick="harmonyChoose(this)">`
                + `<span class="choice-num">${i + 1}</span>${harmonyVowelChoiceInner(v)}</button>`
            ).join('');
        } else if (item.type === 'row') {
            if (promptEl) {
                promptEl.innerHTML = `К какому ряду относится слово <span class="harmony-cons ${rowCls}">«${escapeHtml(item.word)}»</span>?`;
            }
            harmonyRenderStage(item, { answered: false, showFullWord: true });
            const opts = harmonyOrderByRow([item.correct].concat(item.wrong), row => row);
            document.getElementById('harmony-choices').innerHTML = opts.map((row, i) =>
                `<button type="button" class="choice-btn harmony-choice-btn harmony-choice-word" data-answer="${row}" data-correct="${row === item.correct ? '1' : '0'}" onclick="harmonyChoose(this)">`
                + `<span class="choice-num">${i + 1}</span>${harmonyRowChoiceInner(row)}</button>`
            ).join('');
        } else if (item.type === 'i-contrast') {
            if (promptEl) {
                promptEl.innerHTML = (item.prompt || 'Выберите слово:')
                    + (learn ? ' <span class="harmony-row-tag">«и» нейтральна — смотрите на другие гласные слова.</span>' : '');
            }
            harmonyRenderStage(item, { answered: false, showFullWord: false });
            const opts = harmonyOrderByRow([item.correct].concat(item.wrong), w => harmonyWordRow(item, w));
            document.getElementById('harmony-choices').innerHTML = opts.map((w, i) =>
                `<button type="button" class="choice-btn harmony-choice-btn harmony-choice-word" data-answer="${escapeHtml(w)}" data-correct="${w === item.correct ? '1' : '0'}" onclick="harmonyChoose(this)">`
                + `<span class="choice-num">${i + 1}</span>${harmonyWordChoiceInner(w)}</button>`
            ).join('');
        }
    }

    function harmonyChoose(btn) {
        if (harmonyState.answered || !harmonyState.item) return;
        harmonyState.answered = true;
        harmonyState.phase = 'answered';
        const isCorrect = btn.getAttribute('data-correct') === '1';
        const selected = btn.getAttribute('data-answer') || '';
        const item = harmonyState.item;
        const box = document.getElementById('harmony-choices');
        if (box) {
            box.querySelectorAll('.choice-btn').forEach(b => {
                b.disabled = true;
                if (b.getAttribute('data-correct') === '1') b.classList.add('is-correct');
            });
            if (!isCorrect) btn.classList.add('is-wrong');
        }
        harmonyState.total++;
        if (isCorrect) harmonyState.correct++;
        else {
            harmonyRecordMistake(item);
            harmonyScheduleRepeat(item);
        }
        const sc = document.getElementById('harmony-score');
        if (sc) sc.textContent = 'Верно: ' + harmonyState.correct + ' / ' + harmonyState.total;

        const fb = document.getElementById('harmony-feedback');
        const word = item.type === 'i-contrast' ? item.correct : (item.word || item.correct);
        const extra = (item.modern ? ' → «' + item.modern + '»' : '') + (item.meaning ? ' (' + item.meaning + ')' : '');
        if (fb) {
            fb.className = 'practice-feedback ' + (isCorrect ? 'correct' : 'incorrect');
            if (isCorrect) {
                fb.textContent = item.type === 'row'
                    ? '✓ Верно! «' + word + '» — ' + harmonyRowLabel(item.row) + '.' + extra
                    : item.type === 'i-contrast'
                    ? '✓ Верно! «' + word + '» — ' + harmonyRowLabel(item.row) + '.' + extra
                    : '✓ Верно! «' + word + '»' + extra;
            } else {
                fb.className += ' rich';
                fb.innerHTML = '<div class="fb-line">✗ Неверно. '
                    + (item.type === 'row' || item.type === 'i-contrast'
                        ? 'Правильный ответ: «' + word + '» — ' + harmonyRowLabel(item.row) + '.'
                        : 'Сравните выбранный и правильный вариант.')
                    + '</div>'
                    + (item.type === 'row' ? '' : item.type === 'i-contrast' ? harmonyWordContrastErrorHtml(item.correct, selected) : harmonyErrorReviewHtml(item, selected))
                    + (item.explain ? '<details class="harmony-explain"><summary>Почему?</summary>' + escapeHtml(item.explain) + '</details>' : '');
            }
        }
        harmonyRenderStage(item, { answered: true, showFullWord: true });
        harmonyUpdateRefHighlight(null);
        harmonyUpdateQuestionState((harmonyState.mode === 'learn' ? 'Учебный режим' : 'Проверка') + ' · ответ принят');
        const next = document.getElementById('harmony-next');
        if (next) next.style.display = 'block';
    }

    function harmonyNext() {
        if (!harmonyState.answered) return;
        harmonyState.qi++;
        if (harmonyState.qi >= harmonyState.queue.length) {
            harmonyFinish();
            return;
        }
        harmonyRenderQuestion();
    }

    function harmonyFinish() {
        harmonyState.phase = 'finished';
        const fb = document.getElementById('harmony-feedback');
        const weakCount = harmonyState.weak.length;
        if (fb) {
            fb.className = 'practice-feedback correct rich';
            fb.innerHTML = '<div class="fb-line">Готово! ' + harmonyState.correct + ' из ' + harmonyState.total + ' верных.</div>'
                + (weakCount
                    ? '<div class="harmony-finish-note">Слабых мест: ' + weakCount + '. Их можно повторить отдельным коротким заходом.</div>'
                        + '<button type="button" class="practice-btn harmony-repeat-btn" onclick="harmonyRepeatWeak()">Повторить ошибки</button>'
                    : '<div class="harmony-finish-note">Ошибок в этой сессии нет.</div>');
        }
        document.getElementById('harmony-prompt').textContent = '';
        const g = document.getElementById('harmony-glyphs');
        if (g) { g.innerHTML = ''; g.classList.add('cw-empty'); }
        const l = document.getElementById('harmony-legend');
        if (l) l.innerHTML = '';
        const m = document.getElementById('harmony-word-meta');
        if (m) m.textContent = '';
        document.getElementById('harmony-choices').innerHTML = '';
        document.getElementById('harmony-next').style.display = 'none';
        harmonyUpdateQuestionState('Набор завершён');
        harmonyUpdateRefHighlight(null);
    }

    function harmonyRepeatWeak() {
        if (!harmonyState.weak.length) return;
        const weak = harmonyState.weak.map(item => harmonyCloneItem(item, true));
        harmonyState.correct = 0;
        harmonyState.total = 0;
        harmonyState.answered = false;
        harmonyState.weak = [];
        harmonyState.weakKeys = {};
        harmonyState.mistakeCounts = {};
        const sc = document.getElementById('harmony-score');
        if (sc) sc.textContent = 'Верно: 0';
        harmonyShuffleQueue(weak);
        harmonyRenderQuestion();
    }

    function setupHarmony() {
        harmonyState.correct = 0;
        harmonyState.total = 0;
        harmonyState.answered = false;
        harmonyState.phase = 'question';
        harmonyState.weak = [];
        harmonyState.weakKeys = {};
        harmonyState.mistakeCounts = {};
        harmonyUpdateModeUi();
        const sc = document.getElementById('harmony-score');
        if (sc) sc.textContent = 'Верно: 0';
        harmonyShuffleQueue();
        const cnt = document.getElementById('harmony-count');
        if (cnt) cnt.textContent = harmonyState.queue.length ? ('1 / ' + harmonyState.queue.length) : '0 / 0';
        if (!harmonyState.queue.length) {
            document.getElementById('harmony-prompt').textContent = 'В этом наборе пока нет вопросов.';
            harmonyUpdateQuestionState('Нет вопросов');
            return;
        }
        harmonyRenderQuestion();
    }

    function activeHarmonySection() {
        const sec = document.getElementById('section-harmony');
        return sec && sec.classList.contains('active');
    }
