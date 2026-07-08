/* lessons.js — учебный контент и упражнения со словами (о письме, курс, правила,
   слова, силлабарий, конструктор «Составить слово» и «Написать слово», карточки). */


    // ============================================================
    // О ПИСЬМЕ
    // ============================================================
    function renderAbout() {
        return `
        <div class="about-wrap">
            <div class="home-progress" id="home-progress"></div>

            <div class="about-hero">
                <div>
                    <div class="about-kicker">«Ясное письмо» · Тодо Бичиг</div>
                    <h2 class="about-title">Тодо Бичиг — «Ясное письмо»: полная история создания и культурное наследие</h2>
                </div>
            </div>

            <p class="about-lead">Добро пожаловать на специализированный сайт, полностью посвящённый <strong>Тодо Бичиг</strong> (ойр. ᡐᡆᡑᡆ ᡋᡅᡔᡅᡎ — «ясное, чёткое письмо») — одной из самых совершенных и самобытных систем письменности в монгольском мире.</p>

            <figure class="about-portrait">
                <picture>
                    <source srcset="img/zaya-pandita.webp" type="image/webp">
                    <img src="img/zaya-pandita.png" alt="Зая-Пандита Намкхай Гьяцо за работой над переводом текстов" loading="lazy">
                </picture>
                <figcaption>Зая-Пандита Намкхай Гьяцо — создатель Тодо Бичиг</figcaption>
            </figure>

            <h3 class="about-h3">История создания</h3>
            <p>В 1648 году, в эпоху расцвета Джунгарского ханства, выдающийся ойратский просветитель, буддийский монах и лама За́я-Панди́та Намкхай Гьяцо (калм. Зая Пандит Оһторһун Дала; монг. Зая Бандида Огторгуйн Далай (Намхайжамц); 1599–1662) создал новый алфавит. Это произошло во время зимовки у Аблая-тайши на реке Чу по инициативе ойратских нойонов и при поддержке Эрдэни-Батура.</p>
            <p>Зая-Пандита взял за основу классическое старомонгольское (уйгурское) письмо, но существенно его усовершенствовал. Главная цель — сделать письменность максимально близкой к живому разговорному ойратскому языку. В старомонгольском письме многие звуки не различались на письме, что создавало трудности при чтении и особенно при передаче иностранных (в первую очередь тибетских и санскритских) терминов из буддийских текстов. Тодо Бичиг устранило эту неоднозначность: появились новые буквы, диакритические знаки, чёткое разделение гласных и согласных, что сделало письмо по-настоящему «ясным» и фонетически точным.</p>

            <h3 class="about-h3">Значение Тодо Бичиг</h3>
            <p>За свою жизнь Зая-Пандита перевёл с тибетского на ойратский язык около 170 произведений — от канонических текстов Ганджура и Данджура до философских трактатов, медицинских сочинений, легенд и молитв. Благодаря новому письму эти знания стали доступны широкому кругу ойратских читателей.</p>
            <p>Тодо Бичиг — письменность, которая быстро распространилась среди ойратов, калмыков и других западномонгольских народов. Она использовалась в деловой переписке, религиозной литературе, летописях и повседневной жизни вплоть до XX века. У калмыков письменность активно применялась до 1924 года, пока не была заменена кириллицей. В некоторых регионах Китая (среди ойратов) традиции использования Тодо Бичиг сохраняются и по сей день.</p>
            <p>Сайт будет интересен историкам, лингвистам, студентам, преподавателям калмыцкого и монгольского языков, а также всем, кто увлекается культурой Центральной Азии, буддизмом и национальным наследием.</p>
            <blockquote class="about-quote"><strong>Тодо Бичиг</strong> — это не просто алфавит. Это символ интеллектуального расцвета ойратского народа, мост между традицией и точностью, между устным словом и письменной мудростью. Присоединяйтесь к нам, чтобы открыть для себя одну из самых ярких страниц монгольской истории!</blockquote>

            <h3 class="about-h3">Как устроено письмо</h3>
            <p>Буквы пишутся сверху вниз, строкой служит вертикальная линия, на которую «нанизываются» знаки — так же, как и в старомонгольской письменности, из которой выросло Тодо Бичиг. У большинства букв — три формы начертания: начальная, срединная и конечная, а гласные и согласные соединяются в слоги по строгим правилам, которые собраны в силлабарии этого сайта.</p>

            <h3 class="about-h3">Как заниматься</h3>
            <p class="about-method-intro">Самоучитель построен по слоговому принципу — от простого к сложному. Совет автора: «торопись медленно».</p>
            <div class="about-steps">
                <div class="about-step"><span class="about-step-n">1</span><span>Запишите букву во всех трёх положениях, запомните её зрительно, и лишь потом переходите к следующей.</span></div>
                <div class="about-step"><span class="about-step-n">2</span><span>Пишите аккуратно и не спеша, тщательно выводя все крючки и закругления.</span></div>
                <div class="about-step"><span class="about-step-n">3</span><span>В пройденных слогах и словах находите каждую букву и разбирайтесь, почему она так написана.</span></div>
                <div class="about-step"><span class="about-step-n">4</span><span>Запоминайте примечания к буквам и переписывайте слоги и слова по нескольку раз.</span></div>
                <div class="about-step"><span class="about-step-n">5</span><span>Занимайтесь понемногу, но ежедневно — это вернейший путь к усвоению алфавита.</span></div>
            </div>
        </div>`;
    }
    function renderCourse() {
        const tips = [
            'Пишите буквы от руки — в тетради в клетку, используя вертикальные линии как строку.',
            'Занимайтесь понемногу, но каждый день: несколько минут регулярно лучше редких долгих сессий.',
            '«Торопись медленно»: переходите к новой букве, только прочно усвоив предыдущую.',
            'Находите изученные буквы в словах и разбирайтесь, почему они написаны именно так.'
        ];
        return `
        <div class="course-wrap">
            <div class="about-kicker">Маршрут обучения</div>
            <h2 class="about-title">Курс: от первой буквы до чтения текстов</h2>
            <p class="about-lead">Девять этапов по методу самоучителя — от простого к сложному. Двигайтесь по порядку; в каждом этапе есть кнопка перехода в нужный раздел.</p>
            <div class="course-timeline">
                ${courseStages.map(s => `
                    <div class="course-stage">
                        <div class="course-badge">${s.n}</div>
                        <div class="course-body">
                            <div class="course-stage-title">${s.title}</div>
                            <div class="course-stage-text">${s.body}</div>
                            <div class="course-actions">
                                ${s.goto.map(([cat,label]) => `<button class="course-go" onclick="showSection('${cat}')">${label} →</button>`).join('')}
                            </div>
                        </div>
                    </div>`).join('')}
            </div>
            <h3 class="about-h3">Советы для занятий</h3>
            <div class="about-steps">
                ${tips.map(t => `<div class="about-step"><span class="about-step-n">✓</span><span>${t}</span></div>`).join('')}
            </div>
            <p class="about-source">Маршрут составлен по методике: А. В. Бадмаев. «Практический самоучитель старокалмыцкой письменности». — Элиста, 1971.</p>
        </div>`;
    }
    function renderRules() {
        return `<div class="rules-grid">${rulesData.map((r, i) => `
            <div class="rule-card" id="rule-${r.id || i}">
                ${r.num ? `<span class="rule-num">№${r.num}</span>` : ''}
                <span class="rule-tag">${r.tag}</span>
                <div class="rule-title">${r.title}</div>
                <div class="rule-body">${r.body}</div>
            </div>`).join('')}</div>`;
    }

    // ============================================================
    // ПРАВИЛА ПИСЬМА — единый блок с аккордеонами (раздел «writing_rules»)
    // ============================================================

    // Кликабельная карточка знака: берёт готовую запись из charData по latin-id
    // и показывает её глифом TodoPozdneyev + подписью кириллицей. Клик открывает
    // карточку знака с полным примечанием (как и другие кросс-ссылки на сайте).
    function wrGlyph(lat, hint, form) {
        const c = charByLatin(lat);
        if (!c) return '';
        const glyph = trimSpine(form ? (c[form] || c.medial || c.initial || c.final || '?') : (c.medial || c.initial || c.final || '?'));
        return `
            <div class="wr-glyph-item" role="button" tabindex="0" onclick="gotoChar('${lat}')"
                 aria-label="Открыть знак «${escapeHtml(c.cyrillic)}»">
                <span class="wr-glyph-g">${glyph}</span>
                <span class="wr-glyph-c">${escapeHtml(c.cyrillic)}</span>
                ${hint ? `<span class="wr-glyph-hint">${escapeHtml(hint)}</span>` : ''}
            </div>`;
    }
    // Глиф для ячейки таблицы (без подписи и клика) — используется в таблице галиков.
    function wrTdGlyph(lat) {
        const c = charByLatin(lat);
        if (!c) return '';
        return trimSpine(c.medial || c.initial || c.final || '');
    }
    function wrGlyphRow(items) {
        return `<div class="wr-glyph-row">${items.map(it => wrGlyph(it[0], it[1])).join('')}</div>`;
    }

    function renderWritingRules() {
        // Диаграмма направления письма: три столбца, читаемые сверху вниз,
        // столбцы — слева направо (стрелка вниз внутри столбца, стрелка вправо между ними).
        const dirSvg = `
            <svg class="wr-dir-svg" viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Схема направления письма: сверху вниз, столбцы слева направо">
                ${[38, 108, 178].map((x, i) => `
                    <line class="wr-line" x1="${x}" y1="14" x2="${x}" y2="100"></line>
                    <polygon class="wr-arrow" points="${x - 5},94 ${x + 5},94 ${x},106"></polygon>
                    ${[28, 50, 72].map(y => `<circle class="wr-dot" cx="${x}" cy="${y}" r="3.2"></circle>`).join('')}
                    <text x="${x}" y="122" text-anchor="middle">${i + 1}</text>
                `).join('')}
                <line class="wr-line" x1="46" y1="8" x2="100" y2="8"></line>
                <polygon class="wr-arrow" points="96,3 96,13 106,8"></polygon>
                <line class="wr-line" x1="116" y1="8" x2="170" y2="8"></line>
                <polygon class="wr-arrow" points="166,3 166,13 176,8"></polygon>
            </svg>
            <div class="wr-dir-caption">Внутри столбца — сверху вниз; столбцы читаются и пишутся слева направо</div>`;

        const sections = [
            {
                title: 'Направление письма',
                body: `
                    ${dirSvg}
                    <p>Тодо Бичиг — вертикальное письмо: буквы «нанизываются» сверху вниз на невидимую вертикальную ось, которая по-калмыцки называется ${wrGlyph('nurγun')} — «хребет». Один столбец соответствует примерно одной строке привычного горизонтального письма.</p>
                    <p>Столбцы располагаются и читаются <strong>слева направо</strong> — так же, как в старомонгольской письменности, из которой выросло Тодо Бичиг. Поэтому лист или страница заполняются последовательно: дописали столбец до конца — переходят к следующему, правее.</p>`
            },
            {
                title: 'Порядок штрихов',
                body: `
                    <p>Общее правило: штрихи внутри знака ведутся <strong>сверху вниз и слева направо</strong>, начиная от вертикального хребта — сначала основная линия буквы, затем отходящие от неё элементы (зубцы, петли, крючки).</p>
                    <div class="about-steps">
                        <div class="about-step"><span class="about-step-n">1</span><span>Для гласных и части согласных (н, һ, х) добавьте верхнюю «корону» — ${wrGlyph('titm', 'титм — «корона»')}, которой начинается буква.</span></div>
                        <div class="about-step"><span class="about-step-n">2</span><span>Допишите основной элемент буквы — обычно это зубец, ${wrGlyph('aran', 'аран — «зубец»')}, отходящий от хребта.</span></div>
                        <div class="about-step"><span class="about-step-n">3</span><span>Проведите вертикальный штрих — хребет (${wrGlyph('nurγun')}), на который «нанизана» буква.</span></div>
                        <div class="about-step"><span class="about-step-n">4</span><span>Диакритические знаки (точки, черты, крючки) ставятся <em>последними</em>, уже после того как всё слово дописано целиком — начиная снизу и двигаясь вверх по ходу часовой стрелки.</span></div>
                    </div>
                    <p>Именно так, по словам А. В. Бадмаева, разбирается по знакам слово «хальмг»: сначала дописывается весь слоговой костяк слова, и только потом, снизу вверх по часовой стрелке, расставляются все точки и чёрточки. Пошаговую анимацию порядка и направления штрихов для каждого конкретного знака смотрите в разделе <a class="note-link" role="link" tabindex="0" onclick="showSection('direction');return false;">«Направление письма» (тренажёр)</a> — там же можно прописать знак самостоятельно.</p>`
            },
            {
                title: 'Соединительные элементы и лигатуры',
                body: `
                    <p>Буквы Тодо Бичиг не «склеены» произвольно — у письма есть небольшой набор именованных строительных элементов, из которых собирается любой знак:</p>
                    ${wrGlyphRow([
                        ['titm', 'корона — верхний элемент'],
                        ['aran', 'зубец — базовый штрих'],
                        ['nurγun', 'хребет — ось буквы'],
                        ['udān', 'удан — знак долготы']
                    ])}
                    <p>Настоящие лигатуры в Тодо Бичиг образуют «круглые» согласные — ${wrGlyph('b1', 'б — круглая согласная')}, п, к, г — у которых нет собственной соединительной вертикальной черты. Вместо того чтобы тянуться через хребет, они попросту «вбирают» в свою дугу круглую гласную целиком: сочетания бо, бу, бө, бү пишутся одним слитным росчерком, а не буквой и гласной по отдельности.</p>
                    <p>Слоги тоже не собираются механически из «согласный + гласный»: многие пишутся единым эталонным начертанием, которое стоит запомнить целиком. Такие слоговые связки — по сериям в разделе <a class="note-link" role="link" tabindex="0" onclick="showSection('syllables');return false;">«Слоги»</a>, например ${wrGlyph('na', 'слог «на» — начальная форма', 'initial')}.</p>`
            },
            {
                title: 'Позиции букв: начальная, срединная, конечная, изолированная',
                body: `
                    <p>У большинства букв — три формы начертания в зависимости от места в слове:</p>
                    <table class="wr-table">
                        <thead><tr><th>Позиция</th><th>Когда используется</th></tr></thead>
                        <tbody>
                            <tr><td><strong>Начальная</strong></td><td>первая буква слова; у гласных здесь появляется верхняя «корона» — ${wrGlyph('titm', 'титм — корона')}, которой начинается буква.</td></tr>
                            <tr><td><strong>Срединная</strong></td><td>буква внутри слова, между двумя другими знаками.</td></tr>
                            <tr><td><strong>Конечная</strong></td><td>последняя буква слова; у ряда согласных отдельной конечной формы нет.</td></tr>
                        </tbody>
                    </table>
                    <p>Самоучитель Бадмаева прямо указывает: старокалмыцкая письменность придерживалась алфавитно-слогового метода, поэтому после многих согласных обязательно должна идти гласная, в самом конце слова указанных согласных не бывает:</p>
                    ${wrGlyphRow([
                        ['t', 'т'], ['c, č', 'ц/ч'], ['z, ǰ', 'з/җ'], ['x', 'х'], ['y', 'й']
                    ])}
                    <p>Если после буквы «н» стоит гласная, то перед «н» ставится точка. Перед согласной и в конечной форме точку не ставят ${wrGlyph('n', 'н — со знаком различения')}. Её среднее и конечное начертание схоже с буквой «а».</p>
                    <p>После «круглых» согласных — б, п, г, к — пишется специальная конечная форма «а» ${wrGlyph('a_flipped', 'а откидная', 'final')} и «и» ${wrGlyph('i', 'и конечная', 'final')}. В остальных случаях, включая позицию после гласных, — обычные.</p>
                    <p>В Тодо Бичиг для написания каждой буквы отдельно, изолированно, пишут в их начальной форме.</p>`
            },
            {
                title: 'Особенности гласных и согласных',
                body: `
                    <p><strong>Гласные</strong> — семь основных (а, э, и, о, у, ө, ү), плюс их долгие варианты и дифтонги с «й». Начальная форма гласной всегда получает добавочный элемент — корону ${wrGlyph('titm', 'титм — корона')}, ${wrGlyph('a', 'а — начальная', 'initial')}. Гласная «и» смягчает соседние звуки (${wrGlyph('i', 'палатализация')}); буква «у» отличается от «ү» только одной дополнительной чертой слева-внизу — это диакритический знак, который добавляется уже после того, как всё слово дописано, ${wrGlyph('uru_tatasn', 'уру татасн')}.</p>
                    <p><strong>Согласные</strong> подчиняются сингармонизму: твёрдые х, һ, к сочетаются только с гласными заднего ряда (а, о, у) — самоучитель приводит слова «хуби», «хари», «хонин», а не «хүв», «хэр», «хөн»; их мягкие пары употребляются с гласными переднего ряда и «и».</p>
                    <p>Особый случай — буква «н»: перед ней внутри слова ставится точка, если дальше идёт гласная, и не ставится, если дальше согласная, ${wrGlyph('n', 'н — со знаком различения')}. Есть и обратная сторона этого же правила: если конечная «н» в слове стоит после гласной, она читается как «н», а если после согласной — читается как «а» (пример из самоучителя: «сара»). Сама «ң» — отдельный знак, объединяющий «н» и «г»; в начале слова она не употребляется.</p>`
            },
            {
                title: 'Использование галика',
                body: `
                    <p>Галики — особые «дополнительные» начертания, которых нет среди обычных согласных. Зая-Пандита ввёл их, чтобы точно передавать звуки тибетских и санскритских слов из буддийских текстов; позже некоторые из них стали использовать и для более поздних заимствований — уже через русский язык.</p>
                    <table class="wr-table">
                        <thead><tr><th>Знак</th><th>Назначение</th></tr></thead>
                        <tbody>
                            <tr><td class="wr-td-glyph">${wrTdGlyph('p_b_γaliq1')}</td><td>п/б-галик — читается «б»; тибетско-санскритские заимствования</td></tr>
                            <tr><td class="wr-td-glyph">${wrTdGlyph('p_f_γaliq1')}</td><td>п/ф-галик — читается «пха»/«ф»; позже и в словах через русский: февраль, Петр, полковник</td></tr>
                            <tr><td class="wr-td-glyph">${wrTdGlyph('v')}</td><td>в-галик — калмыцкий язык прежде не знал звука «в», поэтому «вачир» писали как «очир»; позже — вагон, Варшава, завод</td></tr>
                            <tr><td class="wr-td-glyph">${wrTdGlyph('z_γaliq1')}</td><td>з-галик — тибетско-санскритские заимствования</td></tr>
                            <tr><td class="wr-td-glyph">${wrTdGlyph('ǰ_γaliq')}</td><td>җ-галик — заимствования (Җаңһар, җава…)</td></tr>
                            <tr><td class="wr-td-glyph">${wrTdGlyph('x_γaliq')}</td><td>х-галик — придыхание в заимствованиях (Лхаса)</td></tr>
                        </tbody>
                    </table>
                    <p>Сама буква «ч» ${wrGlyph('č', 'ч — изначально галик')} тоже когда-то была галиком: в старых рукописях она встречалась только в заимствованных словах, а лишь позже стала записывать звук «ч» и в исконно калмыцких словах вроде «чон», «чавч», «чееҗ».</p>
                    <p>Полный набор галиков со всеми вариантами — в разделе <a class="note-link" role="link" tabindex="0" onclick="showSection('galik');return false;">«Галики и заимствования»</a>; там же можно попрактиковаться в их распознавании.</p>`
            },
            {
                title: 'Пунктуация и цифры',
                body: `
                    <p>Знаки препинания в Тодо Бичиг немногочисленны, но обязательны: они обозначают начало и конец текста, абзаца или предложения.</p>
                    ${wrGlyphRow([
                        ['birγa', 'бирга — начало текста'],
                        ['point_4', 'четыре точки — конец текста'],
                        ['comma', 'запятая — логическое деление'],
                        ['colon', 'две точки — конец предложения']
                    ])}
                    <p>Цифры от 0 до 9 пишутся собственными знаками, не связанными по форме с буквами:</p>
                    ${wrGlyphRow(['0','1','2','3','4','5','6','7','8','9'].map(d => [d, null]))}`
            },
            {
                title: 'Самые частые ошибки новичков',
                body: `
                    <div class="wr-mistake-grid">
                        <div class="wr-mistake">
                            <div class="wr-mistake-bad"><span class="wr-mistake-tag">Неверно</span><span>Дописывать в конце слова все согласные «как слышится» в современном калмыцком.</span></div>
                            <div class="wr-mistake-good"><span class="wr-mistake-tag">Верно</span><span>Помнить про слоговой принцип: после ряда согласных (т, ц/ч, з, х, й и др.) в Тодо Бичиг всегда должна идти гласная, поэтому на конце слова этих букв не бывает вовсе.</span></div>
                        </div>
                        <div class="wr-mistake">
                            <div class="wr-mistake-bad"><span class="wr-mistake-tag">Неверно</span><span>Смешивать твёрдые и мягкие ряды: писать х/һ/к с гласными переднего ряда без разбора.</span></div>
                            <div class="wr-mistake-good"><span class="wr-mistake-tag">Верно</span><span>Проверять сингармонизм: твёрдые знаки — только с а, о, у (хуби, хари, хонин); мягкие — с гласными переднего ряда и «и».</span></div>
                        </div>
                        <div class="wr-mistake">
                            <div class="wr-mistake-bad"><span class="wr-mistake-tag">Неверно</span><span>Расставлять диакритические точки и черты сразу по ходу письма, знак за знаком.</span></div>
                            <div class="wr-mistake-good"><span class="wr-mistake-tag">Верно</span><span>Сначала дописать всё слово целиком, и только потом добавить диакритику — снизу вверх по ходу часовой стрелки.</span></div>
                        </div>
                        <div class="wr-mistake">
                            <div class="wr-mistake-bad"><span class="wr-mistake-tag">Неверно</span><span>Читать конечную «н» после согласной как «н» — по аналогии с её обычным звучанием.</span></div>
                            <div class="wr-mistake-good"><span class="wr-mistake-tag">Верно</span><span>После гласной конечная «н» читается «н», а после согласной — «а» (пример из самоучителя: «сара»).</span></div>
                        </div>
                        <div class="wr-mistake">
                            <div class="wr-mistake-bad"><span class="wr-mistake-tag">Неверно</span><span>Не различать «у» и «ү» — у обеих букв похожий круглый «живот».</span></div>
                            <div class="wr-mistake-good"><span class="wr-mistake-tag">Верно</span><span>У буквы «у» слева-внизу есть дополнительная черта — ${wrGlyph('uru_tatasn')}; у «ү» её нет.</span></div>
                        </div>
                        <div class="wr-mistake">
                            <div class="wr-mistake-bad"><span class="wr-mistake-tag">Неверно</span><span>В середине и в конце слова путать знак «г» ${wrGlyph('g1')} со знаком «к» — это документированная ошибка даже среди калмыцких имён (Пунцук вместо Пунцуг).</span></div>
                            <div class="wr-mistake-good"><span class="wr-mistake-tag">Верно</span><span>Сверяться с карточкой знака: «г» и «к» различаются графически, несмотря на внешнее сходство под влиянием русской орфографии.</span></div>
                        </div>
                        <div class="wr-mistake">
                            <div class="wr-mistake-bad"><span class="wr-mistake-tag">Неверно</span><span>Читать «с», «ц/ч», «з» перед «и» так же, как и перед другими гласными.</span></div>
                            <div class="wr-mistake-good"><span class="wr-mistake-tag">Верно</span><span>Перед «и» эти буквы читаются иначе: «с» → «ш», «ц/ч» → «ч», «з» → «җ» (см. «Правила чтения»).</span></div>
                        </div>
                    </div>`
            }
        ];

        return `
        <div class="wr-wrap">
            <div class="about-kicker">Практическое руководство</div>
            <h2 class="about-title">Правила письма Тодо Бичиг</h2>
            <p class="about-lead">От направления штрихов до самых частых ошибок — здесь собрано всё, что нужно знать, прежде чем взяться за перо. Нажимайте на раскрывающиеся блоки и на знаки — они кликабельны и открывают подробную карточку.</p>
            ${sections.map((s, i) => `
                <details class="wr-acc"${i === 0 ? ' open' : ''}>
                    <summary><span class="wr-acc-n">${i + 1}</span><span>${s.title}</span><span class="wr-acc-chev" aria-hidden="true">▾</span></summary>
                    <div class="wr-acc-body">${s.body}</div>
                </details>`).join('')}
            <p class="about-source">По материалам самоучителя: А. В. Бадмаев. «Практический самоучитель старокалмыцкой письменности». — Элиста, 1971.</p>
        </div>`;
    }

    // Переход из примечания к карточке правила: закрываем модалку, открываем раздел правил, подсвечиваем карточку.
    function gotoRule(id) {
        closeModal();
        showSection('rules');
        setTimeout(() => {
            const el = document.getElementById('rule-' + id);
            if (!el) return;
            el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
            // переносим фокус на правило, чтобы пользователь клавиатуры/скринридера
            // оказался там же, куда ведёт визуальная подсветка
            if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
            try { el.focus({ preventScroll: true }); } catch (e) {}
            el.classList.remove('rule-highlight');
            void el.offsetWidth;            // перезапуск анимации
            el.classList.add('rule-highlight');
            setTimeout(() => el.classList.remove('rule-highlight'), 2200);
        }, 80);
    }

    // Открыть карточку буквы прямо в модалке (для перекрёстных ссылок в примечаниях).
    function charByLatin(lat) { return charData.find(x => x.latin === lat); }
    function gotoChar(lat) { const c = charByLatin(lat); if (c) pushModal(c.idx); }

    // Делаем ссылки в примечаниях кликабельными: «Глобальное правило №2» → карточка правила,
    // ссылки на другие буквы («в строке И», «см. выше Б» и т. п.) → карточка этой буквы.
    function linkifyNotes(notes) {
        let html = escapeHtml(notes);
        const ruleLink = m => `<a class="note-link" role="link" tabindex="0" onclick="gotoRule('nonfirst');return false;">${m}</a>`;
        const charLink = (lat, text) => `<a class="note-link" role="link" tabindex="0" onclick="gotoChar('${lat}');return false;">${text}</a>`;
        const hasRuleRef = /Глобальн(?:ое|ого) правил(?:о|а) №2/.test(notes);
        html = html.replace(/Глобальн(?:ое|ого) правил(?:о|а) №2/g, ruleLink);
        // Если в примечании нет явной ссылки на «Глобальное правило №2», но речь о непервом слоге —
        // делаем кликабельной саму фразу «непервом слоге / непервых слогах».
        if (!hasRuleRef) {
            html = html.replace(/неперв[а-яё]*\s+слог[а-яё]*/i, m => ruleLink(m));
        }
        html = html.replace(/в строке И/g, m => charLink('i', m));
        html = html.replace(/знак «аг» \(см\. выше\)/g, () => charLink('q', 'знак «аг»'));
        html = html.replace(/согласного Х \(см\. выше\)/g, () => 'согласного ' + charLink('x', 'Х'));
        html = html.replace(/\(см\. правило буквы С\)/g, () => '(см. ' + charLink('s', 'правило буквы С') + ')');
        html = html.replace(/\(см\. выше Б\)/g, () => '(см. выше ' + charLink('b1', 'Б') + ')');
        return html;
    }
    function renderWords() {
        return wordData.map(g => `
            <div class="word-group">
                <div class="word-group-title">${g.group}</div>
                <div class="word-grid">
                    ${g.items.map(([oldw, modern, meaning]) => `
                        <div class="word-card" role="button" tabindex="0" aria-expanded="false"
                             aria-label="Слово ${escapeHtml(String(oldw))}. Показать современную форму"
                             onclick="revealWord(this)">
                            <div class="word-old" aria-hidden="true">${oldw}</div>
                            <div class="word-arrow" aria-hidden="true">⇄</div>
                            <div class="word-reveal" aria-hidden="true">
                                <div class="word-modern">${modern}</div>
                                <div class="word-meaning">${meaning}</div>
                            </div>
                            <div class="word-hint" aria-hidden="true">показать</div>
                        </div>`).join('')}
                </div>
            </div>`).join('');
    }

    // Раскрытие/сворачивание карточки-слова: класс для CSS-анимации + синхронизация
    // aria-expanded, и прячем/открываем ответ от скринридера (пока свёрнуто — он не
    // читается, чтобы сохранить смысл «сначала угадай»).
    function revealWord(el) {
        const open = el.classList.toggle('revealed');
        el.setAttribute('aria-expanded', open ? 'true' : 'false');
        const rev = el.querySelector('.word-reveal');
        if (rev) rev.setAttribute('aria-hidden', open ? 'false' : 'true');
    }

    // Состояние упражнения. tiles — перемешанные плитки (могут повторяться),
    // placed — список iid плиток в порядке выкладывания.
    const composeState = { wi: 0, tiles: [], placed: [], order: [], answered: false, correct: 0, total: 0, inited: false };

    // Запоминаем, на каком слове пользователь остановился, чтобы при следующем
    // открытии продолжить с него, а не с первого слова.
    function loadComposeWi() {
        try {
            const n = parseInt(localStorage.getItem('todo-compose-wi'), 10);
            return (Number.isFinite(n) && n >= 0 && n < composeWords.length) ? n : 0;
        } catch (e) { return 0; }
    }
    function saveComposeWi() {
        try { localStorage.setItem('todo-compose-wi', String(composeState.wi)); } catch (e) {}
    }
    let composeZoomVal = COMPOSE_ZOOM.def;
    function loadComposeZoom() {
        try {
            const v = parseFloat(localStorage.getItem('todo-compose-zoom'));
            return (isFinite(v) && v >= COMPOSE_ZOOM.min && v <= COMPOSE_ZOOM.max) ? v : COMPOSE_ZOOM.def;
        } catch (e) { return COMPOSE_ZOOM.def; }
    }
    function applyComposeZoom() {
        const el = document.getElementById('cw-assembled');
        if (el) el.style.setProperty('--cw-zoom', composeZoomVal);
        const lab = document.getElementById('cw-zoom-val');
        if (lab) lab.textContent = Math.round(composeZoomVal * 100) + '%';
    }
    function composeZoom(dir) {
        const v = Math.round((composeZoomVal + dir * COMPOSE_ZOOM.step) * 100) / 100;
        composeZoomVal = Math.min(COMPOSE_ZOOM.max, Math.max(COMPOSE_ZOOM.min, v));
        try { localStorage.setItem('todo-compose-zoom', String(composeZoomVal)); } catch (e) {}
        applyComposeZoom();
    }

    const composeCharByIdx = {};
    charData.forEach(c => { composeCharByIdx[c.idx] = c; });
    // Синтетический «пробел» (idx -1) для многословных заданий игры (например,
    // «Республика Калмыкия» → «халимаг тангачи»). В атлас не входит; при сборке даёт
    // разрыв между словами, а как плитка показывается подписью «пробел».
    composeCharByIdx[-1] = { idx: -1, category: 'space', cyrillic: 'пробел', latin: 'space', initial: ' ', medial: ' ', final: ' ' };

    // Гласные/долгие/дифтонги — для правила «конечная н пишется как конечная а».
    function composeIsVowelLike(l) {
        return !!l && (l.category === 'vowels' || l.category === 'long_vowels' || l.category === 'diphthongs');
    }
    // Круглые гласные о/у/ө/ү, их долгие и дифтонги с круглым началом (ой/уй/өй/үй).
    function composeIsRoundVowel(l) {
        return !!l && [3, 4, 5, 6, 10, 11, 12, 13, 17, 18, 19, 20].includes(l.idx);
    }
    // Мягкие (переднерядные) гласные э/и/ө/ү + их долгие (ээ,ии,өө,өү) и дифтонги
    // (эй,ий,өй,үй). «и» — нейтральная, но в письме относится к мягкому ряду (ки→к2).
    function composeIsSoftVowel(l) {
        return !!l && [1, 2, 5, 6, 8, 9, 12, 13, 15, 16, 19, 20].includes(l.idx);
    }

    // ── Втягивание круглого гласного в арку круглой согласной (б/п/к/г) ───────
    // Шрифт TodoPozdneyev не имеет GSUB/GPOS: «вбирание» гласного в арку сделано
    // спец-глифами с большим отрицательным отступом (lsb) и крошечной шириной.
    // В таблице слогов они закодированы вручную (бо="бО", бу="бя", бө="бӨ",
    // бү="бю"); те же четыре глифа используются для П/К/Г. В конструкторе слово
    // собирается побуквенно, поэтому после круглой согласной нужно подменить
    // первый круглый гласный его «втягиваемым» вариантом.
    // Карта строится на уровне ГЛИФА (символа в строке формы), покрывая и
    // строчные (initial/medial, долгие, дифтонги), и заглавные (в конечных формах).
    const TUCK_GLYPH = {
        'о': 'О', 'у': 'я', 'ө': 'Ө', 'ү': 'ю',   // строчные
        'У': 'я', 'Ү': 'ю'                          // заглавные варианты в final
    };
    // idx круглых согласных, образующих арку (б динамически меняет 25⇄26).
    const ROUND_CONS_IDX = new Set([25, 26, 27, 29, 30, 45, 47, 49]);

    // Снимаем ведущую «спину/корону» (после согласной она не нужна) и втягиваем
    // ПЕРВЫЙ круглый гласный; удлинитель/й/и остаются как есть (боо, буу, бой…).
    function tuckAfterRound(formStr) {
        let s = String(formStr).replace(/^[_ъ]+/, '');
        const first = s.charAt(0);
        if (TUCK_GLYPH[first]) s = TUCK_GLYPH[first] + s.slice(1);
        return s;
    }

    function composeForm(letter, pos, total, prev, next) {
        // Возвращает строку формы для шрифта в зависимости от позиции в слове.
        if (!letter) return '';
        // Круглая согласная «б»: перед круглыми гласными (о,у,ө,ү и их долгими/дифтонгами)
        // берётся широкая форма б1, иначе — узкая б2.
        if (letter.idx === 25 || letter.idx === 26) {
            const src = composeIsRoundVowel(next) ? composeCharByIdx[25] : composeCharByIdx[26];
            if (src) letter = src;
        }
        // Галик «п/ф» (idx 29/30): перед круглыми гласными (о,у,ө,ү и их долгими/
        // дифтонгами) — широкая форма (29), иначе — узкая (30). Гласная втягивается
        // в арку галика так же, как у круглых б/к/г (ФО, ФУ, ФӨ, ФҮ).
        if (letter.idx === 29 || letter.idx === 30) {
            const src = composeIsRoundVowel(next) ? composeCharByIdx[29] : composeCharByIdx[30];
            if (src) letter = src;
        }

        // Правило Тодо для «г» (раскладка А. Оргаева): в КОНЦЕ слова или в СЕРЕДИНЕ
        // перед согласной «г» пишется каноническим знаком «г_аг» (латин. q, знак №52,
        // idx 51): конечная форма — в конце слова, срединная — перед согласной.
        //   • «халимаг», «-г#»          → конечная «Щ»
        //   • «догшин», «г + согласная» → срединная «щ»
        // Перед гласными/долгими/дифтонгами остаётся обычная «г»: твёрдая (idx 49)
        // перед а/о/у и мягкая «корона» (через слоги гэ/ги/гө/гү) перед э/и/ө/ү —
        // эти случаи обрабатываются прежней логикой и силлабарием.
        if ((letter.idx === 49 || letter.idx === 50) && composeCharByIdx[51]) {
            const ag = composeCharByIdx[51];
            const atEnd = (total <= 1) || (pos === total - 1);
            const nextIsCons = !!next && (next.category === 'consonants' || next.category === 'galik');
            if (atEnd) return ag.final != null ? ag.final : (ag.medial || '');
            if (nextIsCons) return ag.medial != null ? ag.medial : (ag.final || '');
        }

        // Закон сингармонизма для «к» (idx 45–48). В конце слова → знак «аг» (q).
        // Перед гласной выбираем нужную форму К по ряду и огублённости следующей
        // гласной (простые гласные уже собраны силлабарием — это касается долгих и
        // дифтонгов):
        //   • твёрдый ряд (а,о,у/аа,оо,уу): круглые о/у → к1 (45), некруглый а → к1_узк (46);
        //   • мягкий ряд (э,и,ө,ү/долгие):  круглые ө/ү → к2 (47), некруглые э/и → к2_узк (48).
        if (letter.idx === 45 || letter.idx === 46 || letter.idx === 47 || letter.idx === 48) {
            const ag = composeCharByIdx[51];
            const atEnd = (total <= 1) || (pos === total - 1);
            if (atEnd && ag) return ag.final != null ? ag.final : (ag.medial || '');
            if (composeIsVowelLike(next)) {
                const soft = composeIsSoftVowel(next);
                const round = composeIsRoundVowel(next);
                const pickIdx = soft ? (round ? 47 : 48) : (round ? 45 : 46);
                if (composeCharByIdx[pickIdx]) letter = composeCharByIdx[pickIdx];
            }
        }

        let form;
        if (total <= 1) {
            form = letter.initial || letter.final || letter.medial || '';
        } else if (pos === 0) {
            form = letter.initial != null ? letter.initial : (letter.medial != null ? letter.medial : letter.final || '');
        } else if (pos === total - 1) {
            // Правило Тодо: в конце слова «н» пишется знаком конечной «а» (хвост вправо,
            // без точки-цег слева). После гласной — обычная конечная «а», после
            // согласной — откидная «а».
            if (letter.idx === 21) {
                if (composeIsVowelLike(prev) && composeCharByIdx[0]) return composeCharByIdx[0].final;
                if (!composeIsVowelLike(prev) && composeCharByIdx[55] && composeCharByIdx[55].final) return composeCharByIdx[55].final;
            }
            form = letter.final != null ? letter.final : (letter.medial != null ? letter.medial : letter.initial || '');
        } else {
            // Правило Тодо для «н»: перед согласной в СЕРЕДИНЕ слова тоже пишется
            // без точки-цег, как буква «а» (санчир, зандн, гэндн) — тот же принцип,
            // что и на конце слова (см. ветку pos === total - 1 выше и заметку idx 21).
            const nextIsConsForN = !!next && (next.category === 'consonants' || next.category === 'galik');
            if (letter.idx === 21 && nextIsConsForN && composeCharByIdx[0] && composeCharByIdx[0].medial != null) {
                return composeCharByIdx[0].medial;
            }
            form = letter.medial != null ? letter.medial : (letter.initial != null ? letter.initial : letter.final || '');
        }

        // Любой гласный сразу после круглой согласной (б/п/к/г) примыкает к её арке:
        // у круглых гласных (о,у,ө,ү) при этом меняется глиф (втягивание внутрь арки),
        // у «а/и/э» просто снимается соединительный штрих, чтобы гласная вытекала из
        // согласной вплотную (как в слоге «ба»), а не висела на спине через зазор.
        if (prev && ROUND_CONS_IDX.has(prev.idx) && composeIsVowelLike(letter)) {
            form = tuckAfterRound(form);
        }
        return form;
    }

    // ── Эталонные соединения «согласный + гласный» из раздела слогов ──────────
    // Силлабарий задаёт ПРАВИЛЬНУЮ форму каждой пары C+V (начальную/серединную/
    // конечную). Строим из него таблицу и собираем слова на её основе: гласный
    // садится прямо на согласный, как в слоге, без лишней спины-зазора между ними.
    const SYLL = {};
    (function buildSyll() {
        const VOW = { 'а': 0, 'э': 1, 'и': 2, 'о': 3, 'у': 4, 'ө': 5, 'ү': 6 };
        const CONS = { 'н': 21, 'х': 23, 'һ': 24, 'б': 25, 'с': 31, 'ш': 32, 'т': 33,
                       'д': 34, 'л': 35, 'м': 36, 'ц': 37, 'з': 39, 'й': 44, 'к': 45,
                       'г': 49, 'р': 52, 'в': 53 };
        charData.forEach(c => {
            if (c.category !== 'syllables') return;
            const cy = String(c.cyrillic || '');
            if (!cy || cy.endsWith('ң')) return;                       // закрытые/ng-слоги
            if (String(c.initial || '').startsWith('ъЪ')) return;      // галик-х
            if (cy[0] === 'җ') return;
            let cons = cy[0]; const vow = cy[cy.length - 1];
            if (cons === 'ч') cons = 'ц';                              // «чи» — ц-серия
            if (!(cons in CONS) || !(vow in VOW)) return;
            SYLL[CONS[cons] + ':' + VOW[vow]] = { initial: c.initial, medial: c.medial, final: c.final };
        });
    })();

    function syllKey(consLetter, vowLetter) {
        const ci = (consLetter.idx === 25 || consLetter.idx === 26) ? 25 : consLetter.idx;
        return ci + ':' + vowLetter.idx;
    }

    // Собирает строку слова. Согласный + базовый гласный, для которых есть слог в
    // силлабарии, рисуются единой эталонной формой (по позиции в слове); остальное
    // (кластеры, одиночные буквы, долгие гласные, дифтонги, галики) — прежним
    // движком composeForm.
    // Разбивает слово на «единицы» начертания: либо слог «согласный+гласный» единой
    // эталонной формой, либо одиночная буква своим движком. Возвращает массив
    // { form, s, e } — форма и диапазон исходных букв (включительно), который она
    // покрывает (для слога s..s+1, иначе s..s). Используется и сборкой строки, и
    // раскраской по буквам.
    function assembleUnitsPlain(letters) {
        const n = letters.length;
        const spans = [];
        let i = 0;
        while (i < n) {
            const cur = letters[i], nxt = letters[i + 1];
            const isCV = cur && (cur.category === 'consonants' || cur.category === 'galik') && nxt &&
                         nxt.category === 'vowels' && nxt.idx >= 0 && nxt.idx <= 6 &&
                         SYLL[syllKey(cur, nxt)] &&
                         !(i === 0 && i + 1 === n - 1);   // слог = всё слово → не лигатура, а нач.согл+кон.гл по буквам
            if (isCV) { spans.push({ s: i, e: i + 1, syll: SYLL[syllKey(cur, nxt)] }); i += 2; }
            else { spans.push({ s: i, e: i, letter: cur }); i += 1; }
        }
        return spans.map(u => {
            let form;
            if (u.syll) {
                form = (u.s === 0) ? u.syll.initial : (u.e === n - 1) ? u.syll.final : u.syll.medial;
            } else {
                form = composeForm(u.letter, u.s, n,
                    u.s > 0 ? letters[u.s - 1] : null,
                    u.s + 1 < n ? letters[u.s + 1] : null);
            }
            form = form || '';
            // «ң» (idx 22) имеет длинный хвост-спину, который сам дотягивается до
            // следующего знака. Убираем ведущий соединительный штрих у того, что
            // стоит сразу после ң, чтобы стык ңһ (и любой ң + буква) был бесшовным.
            const prevLetter = u.s > 0 ? letters[u.s - 1] : null;
            if (prevLetter && prevLetter.idx === 22) form = form.replace(/^_+/, '');
            return { form, s: u.s, e: u.e };
        });
    }

    // Разбивает буквы слова на подгруппы вокруг знаков препинания (idx 76–79 —
    // бирга, точка, запятая, двоеточие: category 'punctuation'). Каждый знак —
    // отдельная подгруппа из одной буквы, буквы между знаками — свои подгруппы.
    // Нужно для assembleUnits: без этого буква ПЕРЕД знаком препинания получала
    // бы срединную форму (знак ведь «не последний» в исходном слове), хотя по
    // смыслу запятая/точка сразу завершает написание предыдущей буквы — ей нужна
    // конечная форма, как в конце слова.
    function splitPunctGroups(letters) {
        const groups = [];
        let cur = [], curStart = 0;
        for (let i = 0; i < letters.length; i++) {
            const lt = letters[i];
            if (lt && lt.category === 'punctuation') {
                if (cur.length) { groups.push({ start: curStart, letters: cur }); cur = []; }
                groups.push({ start: i, letters: [lt] });
                curStart = i + 1;
            } else {
                if (!cur.length) curStart = i;
                cur.push(lt);
            }
        }
        if (cur.length) groups.push({ start: curStart, letters: cur });
        return groups;
    }

    // Разбивает слово на «единицы» начертания: либо слог «согласный+гласный» единой
    // эталонной формой, либо одиночная буква своим движком. Возвращает массив
    // { form, s, e } — форма и диапазон исходных букв (включительно), который она
    // покрывает (для слога s..s+1, иначе s..s). Используется и сборкой строки, и
    // раскраской по буквам. Если в буквах есть знаки препинания, начертание
    // считается отдельно по подгруппам вокруг них (см. splitPunctGroups), чтобы
    // буква перед знаком получала конечную форму сразу, не дожидаясь пробела.
    function assembleUnits(letters) {
        const hasPunct = letters.some(lt => lt && lt.category === 'punctuation');
        if (!hasPunct) return assembleUnitsPlain(letters);
        const out = [];
        splitPunctGroups(letters).forEach(g => {
            assembleUnitsPlain(g.letters).forEach(u => {
                out.push({ form: u.form, s: u.s + g.start, e: u.e + g.start });
            });
        });
        return out;
    }

    function assembleWord(letters) {
        return assembleUnits(letters).map(u => u.form).join('');
    }

    // Раскраска собранного слова по буквам: каждая «единица» начертания получает свой
    // цвет из палитры (cl0…cl9, циклически). Возвращает HTML собранной строки, её
    // «плоский» текст и карту «индекс выложенной буквы → номер цвета».
    // opt.inline — массив цветов: если задан, цвет проставляется инлайн-стилем
    // (для картинки, где классы style.css недоступны); иначе вешаются классы clN.
    // opt.plain — без раскраски вообще: буквы обычным цветом текста (одним
    // сплошным run'ом), используется для варианта «обычный шрифт».
    const CW_COLOR_N = 10;
    function composeColorPlan(placedLetters, opt) {
        const inline = opt && opt.inline;
        const plain = !!(opt && opt.plain);
        const colorByIndex = {};
        // делим на слова по синтетическому пробелу (idx -1), храня исходные индексы
        const segs = [[]];
        placedLetters.forEach((lt, idx) => {
            if (lt.idx === -1) segs.push([]);
            else segs[segs.length - 1].push({ lt, idx });
        });
        let color = 0;
        const wordHtmls = [], wordTexts = [], wordCharRuns = [];
        segs.forEach(seg => {
            if (!seg.length) return;
            const units = assembleUnits(seg.map(x => x.lt));
            let chars = [];                              // {ch, color}
            units.forEach(u => {
                // Слог «согласный+гласный» рисуется единой эталонной формой, но это
                // ДВЕ буквы. Чтобы каждая буква получала свой цвет (а не весь слог —
                // один), делим форму: первый глиф — согласный, остаток — гласный,
                // и красим их соседними цветами палитры.
                if (u.e > u.s && u.form.length >= 2) {
                    const cCons = color % CW_COLOR_N;
                    colorByIndex[seg[u.s].idx] = cCons;
                    chars.push({ ch: u.form[0], color: cCons });
                    color++;
                    const cVow = color % CW_COLOR_N;
                    if (u.e < seg.length) colorByIndex[seg[u.e].idx] = cVow;
                    for (const ch of u.form.slice(1)) chars.push({ ch, color: cVow });
                    color++;
                    return;
                }
                const c = color % CW_COLOR_N;
                for (let li = u.s; li <= u.e && li < seg.length; li++) colorByIndex[seg[li].idx] = c;
                for (const ch of u.form) chars.push({ ch, color: c });
                color++;
            });
            // снимаем висящие краевые штрихи спины-подчёркивания (как trimSpine), но
            // посимвольно, чтобы сохранить раскраску оставшихся символов
            let lo = 0, hi = chars.length - 1;
            while (lo <= hi && chars[lo].ch === '_') lo++;
            while (hi >= lo && chars[hi].ch === '_') hi--;
            if (lo > hi) { lo = 0; hi = chars.length - 1; }   // одни штрихи — не опустошаем
            chars = chars.slice(lo, hi + 1);
            if (!chars.length) return;
            let html;
            if (plain) {
                // Без раскраски: один сплошной run обычным цветом текста.
                html = `<span class="ww-plain">${escapeHtml(chars.map(x => x.ch).join(''))}</span>`;
            } else {
                html = ''; let k = 0;
                while (k < chars.length) {
                    const c = chars[k].color; let run = '';
                    while (k < chars.length && chars[k].color === c) { run += chars[k].ch; k++; }
                    html += inline
                        ? `<span style="color:${inline[c % inline.length]}">${escapeHtml(run)}</span>`
                        : `<span class="cl${c}">${escapeHtml(run)}</span>`;
                }
            }
            wordHtmls.push(html);
            wordTexts.push(chars.map(x => x.ch).join(''));
            wordCharRuns.push(chars.slice());
        });
        return { html: wordHtmls.join('  '), text: wordTexts.join('  '), colorByIndex, words: wordCharRuns };
    }

    function renderCompose() {
        // Статическая оболочка; динамику наполняет composeSetup().
        return `
            <div class="cw-wrap">
                <div class="cw-progress">
                    <span id="cw-counter">Слово 1</span>
                    <span class="cw-streak" id="cw-streak">Верно: 0 / 0</span>
                </div>
                <div class="cw-nav">
                    <button class="cw-btn cw-btn-ghost" onclick="composePrev()">← Предыдущее</button>
                    <button class="cw-btn cw-btn-ghost" onclick="composeNext()">Следующее →</button>
                </div>
                <div class="cw-task">
                    <div class="cw-meaning" id="cw-meaning">—</div>
                    <div class="cw-translit" id="cw-translit"></div>
                </div>
                <div class="cw-stage">
                    <span class="cw-stage-label">Собранное слово (сверху вниз)</span>
                    <div class="cw-zoom">
                        <span class="cw-zoom-label-txt">Размер</span>
                        <button class="cw-zoom-btn" onclick="composeZoom(-1)" title="Меньше" aria-label="Уменьшить">−</button>
                        <span class="cw-zoom-val" id="cw-zoom-val">100%</span>
                        <button class="cw-zoom-btn" onclick="composeZoom(1)" title="Больше" aria-label="Увеличить">+</button>
                    </div>
                    <div class="cw-assembled cw-empty" id="cw-assembled"></div>
                    <div class="cw-placed" id="cw-placed"></div>
                </div>
                <div class="cw-tray-label">Буквы слова — нажимайте по порядку:</div>
                <div class="cw-tray" id="cw-tray"></div>
                <div class="cw-feedback" id="cw-feedback"></div>
                <div class="cw-controls">
                    <button class="cw-btn" onclick="composeCheck()">Проверить</button>
                    <button class="cw-btn cw-btn-ghost" onclick="composeBackspace()">⌫ Убрать</button>
                    <button class="cw-btn cw-btn-ghost" onclick="composeClear()">Очистить</button>
                    <button class="cw-btn cw-btn-ghost" onclick="composeHint()">Подсказка</button>
                    <button class="cw-btn cw-btn-ghost" onclick="composeReveal()">Показать ответ</button>
                    <button class="cw-btn" id="cw-next" style="display:none" onclick="composeNext()">Следующее слово →</button>
                </div>
                <div class="cw-forms-note">
                    Слово пишется <b>сверху вниз</b>. Форма буквы зависит от места: начальная · серединная · конечная.<br>
                    На конце знак с хвостом вправо после гласной читается «<b>н</b>» (наран), а после согласной — «<b>а</b>» (откидная «а»).<br>
                    Круглая «<b>б</b>» перед круглыми гласными (о, у, ө, ү) берёт широкую форму (б1), перед остальными — узкую (б2).<br>
                    После круглых согласных (<b>б, п, к, г</b>) круглый гласный <b>вбирается в арку</b>: бо, бу, бө, бү, а также долгие и дифтонги (буу, бой).
                </div>
            </div>`;
    }

    function composeSetup(wi) {
        composeState.inited = true;
        if (typeof wi === 'number') composeState.wi = ((wi % composeWords.length) + composeWords.length) % composeWords.length;
        saveComposeWi();
        const w = composeWords[composeState.wi];
        // Строим плитки-экземпляры (с учётом повторов букв) и перемешиваем.
        const tiles = w.ids.map((id, k) => ({ iid: 'cw' + composeState.wi + '_' + k, letter: composeCharByIdx[id], label: (w.labels && w.labels[k]) || null }));
        composeState.tiles = tiles;
        composeState.order = shuffleArr(tiles.map(t => t.iid));
        composeState.placed = [];
        composeState.answered = false;
        const cnt = document.getElementById('cw-counter');
        if (cnt) cnt.textContent = 'Слово ' + (composeState.wi + 1) + ' из ' + composeWords.length;
        const mean = document.getElementById('cw-meaning');
        if (mean) mean.textContent = w.meaning;
        const tr = document.getElementById('cw-translit');
        if (tr) tr.innerHTML = 'Тодо: <b>' + escapeHtml(w.todo) + '</b>'
            + (w.latin ? ' · лат. <i>' + escapeHtml(w.latin) + '</i>' : '')
            + (w.modern ? ' · совр. ' + escapeHtml(w.modern) : '')
            + ' · букв: ' + w.ids.filter(x => x !== -1).length;
        const fb = document.getElementById('cw-feedback');
        if (fb) { fb.textContent = ''; fb.className = 'cw-feedback'; }
        const nx = document.getElementById('cw-next');
        if (nx) nx.style.display = 'none';
        applyComposeZoom();
        composeRender();
    }

    function composeRender() {
        const tileById = {};
        composeState.tiles.forEach(t => { tileById[t.iid] = t; });
        // Собранная строка вертикальным письмом
        const placedLetters = composeState.placed.map(iid => tileById[iid].letter);
        const total = placedLetters.length;
        // Разбиваем по синтетическому пробелу (idx -1) и собираем каждое слово
        // отдельно — тогда начальные/конечные формы букв в каждом слове верны;
        // слова разделяются зазором (как в разделе «Написать слово»).
        const segs = [[]];
        placedLetters.forEach(lt => { if (lt.idx === -1) segs.push([]); else segs[segs.length - 1].push(lt); });
        const assembled = segs.map(s => trimSpine(assembleWord(s))).filter(Boolean).join('  ');
        // Раскраска по буквам (одни и те же цвета для собранной строки и для чипов).
        const colorPlan = composeColorPlan(placedLetters);
        const asmEl = document.getElementById('cw-assembled');
        if (asmEl) {
            asmEl.classList.toggle('cw-empty', total === 0);
            asmEl.classList.remove('cw-ok', 'cw-bad');
            if (composeState.answered) {
                // при проверке показываем единый зелёный/красный цвет — это сигнал
                // правильности; поэтому раскраску по буквам на этот момент снимаем
                asmEl.textContent = assembled;
                asmEl.classList.add(composeIsCorrect() ? 'cw-ok' : 'cw-bad');
            } else {
                asmEl.innerHTML = colorPlan.html;
            }
        }
        // Чипы выложенных букв (нажатие — убрать)
        const placedEl = document.getElementById('cw-placed');
        if (placedEl) {
            placedEl.innerHTML = composeState.placed.map((iid, i) => {
                const t = tileById[iid];
                const lt = t.letter;
                const cc = colorPlan.colorByIndex[i];
                const clCls = (cc != null && !composeState.answered) ? ' cl' + cc : '';
                return `<span class="cw-chip${clCls}" onclick="composeRemoveAt(${i})" title="Убрать">
                            <span class="cw-chip-num">${i + 1}</span>${escapeHtml(t.label || composeLabel(lt))}<span class="cw-chip-x">✕</span>
                        </span>`;
            }).join('');
        }
        // Поднос плиток
        const trayEl = document.getElementById('cw-tray');
        if (trayEl) {
            const used = new Set(composeState.placed);
            trayEl.innerHTML = composeState.order.map(iid => {
                const t = tileById[iid];
                const lt = t.letter;
                const isUsed = used.has(iid);
                const glyph = lt.initial != null ? lt.initial : (lt.medial != null ? lt.medial : (lt.final || ''));
                return `<div class="cw-tile ${isUsed ? 'cw-used' : ''}" onclick="composeTap('${iid}')">
                            <div class="cw-tile-glyph">${trimSpine(glyph)}</div>
                            <div class="cw-tile-cyr">${escapeHtml(t.label || composeLabel(lt))}</div>
                        </div>`;
            }).join('');
        }
    }

    // Короткая кириллическая метка буквы (без технических пометок вроде «б1», «ц, ч»).
    function composeLabel(lt) {
        let s = lt.cyrillic != null ? String(lt.cyrillic) : (lt.latin || '');
        s = s.split(',')[0].trim();           // «ц, ч» → «ц»
        s = s.replace(/[0-9]+$/, '');         // «б1» → «б»
        return s || (lt.latin || '');
    }

    function wwParse(str) {
        const s = String(str).toLowerCase();
        const ids = [];
        let i = 0;
        while (i < s.length) {
            const two = s.substr(i, 2);
            if (WW_DI[two] !== undefined) {
                // Дифтонг на «й» (ай, эй, ий, ой, уй, өй, үй): если сразу за ним идёт
                // гласная, то «й» стоит МЕЖДУ гласными и является согласным следующего
                // слога (V-й-V), а не хвостом дифтонга. Тогда дифтонг не берём: выдаём
                // только первую гласную, а «й» соединится с последующей гласной в слог
                // на следующих шагах (ойун → о + йу + н, как буйан → б-у + йа + н).
                // Долгих гласных (аа, оо, өү…) это правило не касается — у них второй
                // символ не «й».
                if (two.charAt(1) === 'й' && WW_VOWEL_CH.has(s.charAt(i + 2))) {
                    const v = two.charAt(0);
                    if (WW_SI[v] !== undefined) { ids.push(WW_SI[v]); i += 1; continue; }
                }
                ids.push(WW_DI[two]); i += 2; continue;
            }
            const one = s[i];
            // Буква «ы» отдельного знака в Тодо Бичиг не имеет: в словах с твердорядными
            // гласными она передаёт дифтонг «ийи» (idx 16), но только после согласных
            // д, т, л, н — например, хальмгудын ⇄ xalimaguudiyin, һолын ⇄ γoliyin.
            // После любых других согласных «ы» в такой орфографии не встречается,
            // поэтому вне этого контекста символ пропускаем как неподдерживаемый.
            // Мягкий знак «ь» отдельного знака в Тодо Бичиг не имеет и на письме
            // передаётся буквой «и» (толь ⇄ толи, заль ⇄ зали, альхн ⇄ алихан).
            if (one === 'ь') { ids.push(2); i += 1; continue; }
            if (one === 'ы') {
                const prevId = ids[ids.length - 1];
                if (prevId === 21 || prevId === 33 || prevId === 34 || prevId === 35) {
                    ids.push(16); i += 1; continue;
                }
                i += 1; continue;
            }
            if (WW_SI[one] !== undefined) { ids.push(WW_SI[one]); i += 1; continue; }
            i += 1;   // неподдерживаемый символ пропускаем
        }
        return ids;
    }

    // ── Масштаб для «Написать слово» (как в «Составить слово», своя память) ──
    let wwZoomVal = COMPOSE_ZOOM.def;
    function loadWwZoom() {
        try {
            const v = parseFloat(localStorage.getItem('todo-ww-zoom'));
            return (isFinite(v) && v >= COMPOSE_ZOOM.min && v <= COMPOSE_ZOOM.max) ? v : COMPOSE_ZOOM.def;
        } catch (e) { return COMPOSE_ZOOM.def; }
    }
    function applyWwZoom() {
        const el = document.getElementById('ww-out');
        if (el) el.style.setProperty('--cw-zoom', wwZoomVal);
        const lab = document.getElementById('ww-zoom-val');
        if (lab) lab.textContent = Math.round(wwZoomVal * 100) + '%';
    }
    function wwZoom(dir) {
        const v = Math.round((wwZoomVal + dir * COMPOSE_ZOOM.step) * 100) / 100;
        wwZoomVal = Math.min(COMPOSE_ZOOM.max, Math.max(COMPOSE_ZOOM.min, v));
        try { localStorage.setItem('todo-ww-zoom', String(wwZoomVal)); } catch (e) {}
        applyWwZoom();
    }
    function wwInit() { wwZoomVal = loadWwZoom(); applyWwZoom(); wwColored = loadWwColored(); applyWwColoredBtn(); wwRender(); }

    // ── Цветные буквы / обычный шрифт для «Написать слово» (своя память) ──
    let wwColored = true;
    function loadWwColored() {
        try {
            const v = localStorage.getItem('todo-ww-colored');
            return v === null ? true : v === '1';
        } catch (e) { return true; }
    }
    function applyWwColoredBtn() {
        const btn = document.getElementById('ww-color-toggle');
        if (!btn) return;
        btn.classList.toggle('is-active', wwColored);
        btn.textContent = wwColored ? '🎨 Цветные буквы' : '🖋 Обычный шрифт';
        btn.setAttribute('aria-pressed', wwColored ? 'true' : 'false');
    }
    function wwToggleColored() {
        wwColored = !wwColored;
        try { localStorage.setItem('todo-ww-colored', wwColored ? '1' : '0'); } catch (e) {}
        applyWwColoredBtn();
        wwRender();
    }

    // Палитра «разноцветных букв» для картинки: классы style.css внутри SVG не
    // действуют, поэтому в картинке цвет ставится инлайн. Совпадает с cl0…cl9.
    const WW_PALETTE = {
        light: ['#e03131','#1971c2','#2f9e44','#e8590c','#9c36b5','#0c8599','#d6336c','#5f3dc4','#f08c00','#66a80f'],
        dark:  ['#ff8787','#74c0fc','#8ce99a','#ffa94d','#eebefa','#66d9e8','#faa2c1','#b197fc','#ffc078','#c0eb75']
    };
    function wwPalette() {
        return document.documentElement.getAttribute('data-theme') === 'dark' ? WW_PALETTE.dark : WW_PALETTE.light;
    }

    // Цвета для одноцветного сохранения «на фото» (буквы одним цветом, фон прозрачный):
    // белый — для тёмных фото, чёрный — для светлых, плюс несколько ярких. [код, имя].
    const WW_SAVE_COLORS = [
        ['#ffffff', 'Белый'], ['#111111', 'Чёрный'], ['#0d9488', 'Бирюзовый'],
        ['#1971c2', 'Синий'],  ['#e03131', 'Красный'], ['#2f9e44', 'Зелёный'],
        ['#9c36b5', 'Фиолетовый'], ['#f08c00', 'Оранжевый'], ['#d4a017', 'Золотой']
    ];

    // Плоский список букв из поля ввода с разделителями слов (idx -1) — для раскраски.
    function wwFlatLetters() {
        const inp = document.getElementById('ww-input');
        const flat = [];
        if (inp) {
            inp.value.split(/\s+/).filter(w => w.length).forEach(w => {
                const letters = wwParse(w).map(i => composeCharByIdx[i]).filter(Boolean);
                if (!letters.length) return;
                if (flat.length) flat.push({ idx: -1 });
                letters.forEach(l => flat.push(l));
            });
        }
        return flat;
    }

    function renderWriteWord() {
        const keyboard = WW_GROUPS.map(g => {
            const keys = g.idxs.map(idx => {
                const lt = composeCharByIdx[idx];
                if (!lt) return '';
                const lab = escapeHtml(WW_NICE_LABEL[idx] || composeLabel(lt));
                const ins = escapeHtml(WW_INSERT[idx] || composeLabel(lt));
                return `<button class="ww-key" onclick="wwInsert('${ins}')" title="${lab}">${lab}</button>`;
            }).join('');
            return `<div class="ww-krow-label">${g.label}</div><div class="ww-krow">${keys}</div>`;
        }).join('');
        // Ряд галиков и заимствованных букв: глиф рисуется шрифтом тодо из поля initial,
        // подпись — короткое название. Вставляют специальные токены (см. WW_GALIK_DEFS).
        const galikKeys = WW_GALIK_DEFS.map(d => {
            const lt = composeCharByIdx[d.idx];
            if (!lt) return '';
            const glyph = lt.initial != null ? lt.initial : (lt.medial != null ? lt.medial : (lt.final || ''));
            const ins = escapeHtml(d.ins);
            return `<button class="ww-key ww-key-sign" onclick="wwInsert('${ins}')" title="${escapeHtml(d.title)}">
                        <span class="ww-key-glyph">${escapeHtml(trimSpine(glyph))}</span>
                        <span class="ww-key-cap">${escapeHtml(d.cap)}</span>
                    </button>`;
        }).join('');
        const galikRow = `<div class="ww-krow-label">Галики и заимствованные</div><div class="ww-krow ww-krow-signs">${galikKeys}</div>`;
        // Отдельный ряд цифр и знаков письма (бирга, точки, запятая). Глиф на кнопке
        // рисуется шрифтом тодо из поля initial; подпись — привычное название/цифра.
        const signKeys = WW_SIGN_DEFS.map(d => {
            const lt = composeCharByIdx[d.idx];
            if (!lt) return '';
            const glyph = lt.initial != null ? lt.initial : (lt.medial != null ? lt.medial : (lt.final || ''));
            const ins = escapeHtml(d.ins);
            return `<button class="ww-key ww-key-sign" onclick="wwInsert('${ins}')" title="${escapeHtml(d.title)}">
                        <span class="ww-key-glyph">${escapeHtml(trimSpine(glyph))}</span>
                        <span class="ww-key-cap">${escapeHtml(d.cap)}</span>
                    </button>`;
        }).join('');
        const signRow = `<div class="ww-krow-label">Цифры и знаки</div><div class="ww-krow ww-krow-signs">${signKeys}</div>`;
        return `
            <div class="cw-wrap ww-wrap">
                <div class="ww-typebox">
                    <input id="ww-input" class="ww-input" type="text" inputmode="text"
                           autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
                           placeholder="Печатайте кириллицей и цифры; пробел — новое слово" oninput="wwRender()">
                </div>
                <div class="cw-stage">
                    <span class="cw-stage-label">Ваше слово (сверху вниз)</span>
                    <div class="cw-zoom">
                        <button class="cw-btn cw-btn-ghost ww-color-btn" id="ww-color-toggle"
                                onclick="wwToggleColored()" aria-pressed="true"
                                title="Переключить между цветными буквами и обычным шрифтом">🎨 Цветные буквы</button>
                        <span class="cw-zoom-label-txt">Размер</span>
                        <button class="cw-zoom-btn" onclick="wwZoom(-1)" title="Меньше" aria-label="Уменьшить">−</button>
                        <span class="cw-zoom-val" id="ww-zoom-val">100%</span>
                        <button class="cw-zoom-btn" onclick="wwZoom(1)" title="Больше" aria-label="Увеличить">+</button>
                    </div>
                    <div class="cw-assembled cw-empty" id="ww-out"></div>
                    <div class="ww-translit" id="ww-translit"></div>
                </div>
                <div class="ww-controls">
                    <button class="cw-btn cw-btn-ghost" onclick="wwBackspace()">⌫ Стереть</button>
                    <button class="cw-btn cw-btn-ghost" onclick="wwClear()">Очистить</button>
                    <div class="ww-save" id="ww-save">
                        <button class="cw-btn" onclick="wwSaveMenu()" aria-haspopup="true" aria-expanded="false" id="ww-save-toggle">⤓ Сохранить картинку ▾</button>
                        <div class="ww-save-menu" id="ww-save-menu" role="menu" style="display:none">
                            <button class="ww-save-opt" role="menuitem" onclick="wwSaveImage('color')">🎨 Цветными буквами</button>
                            <button class="ww-save-opt" role="menuitem" onclick="wwSaveImage('bw')">⬛ Одним цветом (ч/б)</button>
                            <div class="ww-save-sep" role="separator"></div>
                            <button class="ww-save-opt" role="menuitem" onclick="wwSaveImage('color',{transparent:true})">🖼 Без фона — цветными (на фото)</button>
                            <button class="ww-save-opt" role="menuitem" onclick="wwSaveImage('bw',{transparent:true})">🖼 Без фона — ч/б (на фото)</button>
                            <div class="ww-save-sep" role="separator"></div>
                            <div class="ww-save-swlabel">Один цвет (без фона):</div>
                            <div class="ww-save-swatches">${WW_SAVE_COLORS.map(c =>
                                `<button class="ww-save-swatch" role="menuitem" title="${c[1]}" aria-label="${c[1]}"
                                         style="background:${c[0]}" onclick="wwSaveImage('bw',{transparent:true,fg:'${c[0]}'})"></button>`
                            ).join('')}</div>
                            <div class="ww-save-sep" role="separator"></div>
                            <button class="ww-save-opt" role="menuitem" onclick="wwSaveImage('color',{transparent:true,copy:true})">📋 Скопировать картинку</button>
                        </div>
                    </div>
                </div>
                <div class="ww-kbd-hint">Можно печатать с клавиатуры или нажимать буквы, цифры и знаки ниже:</div>
                <div class="ww-keyboard">${keyboard}${galikRow}${signRow}</div>
            </div>`;
    }
    function wwTranslitLabel(lt) {
        if (!lt) return '';
        if (WW_SIGN_TR[lt.idx] !== undefined) return WW_SIGN_TR[lt.idx];
        if (WW_NICE_LABEL[lt.idx] !== undefined) return WW_NICE_LABEL[lt.idx];
        return composeLabel(lt);
    }

    // Общий разбор поля ввода → массив слов в тодо-глифах + их транслитерация.
    // Используется и для показа на экране (wwRender), и для сохранения картинки.
    function wwBuild() {
        const inp = document.getElementById('ww-input');
        const todoWords = [], translitWords = [];
        if (inp) {
            // Пробелы разделяют слова: каждое слово собирается отдельно (своя
            // начальная…конечная форма) и отделяется зазором.
            inp.value.split(/\s+/).filter(w => w.length).forEach(w => {
                const letters = wwParse(w).map(i => composeCharByIdx[i]).filter(Boolean);
                if (!letters.length) return;
                todoWords.push(trimSpine(assembleWord(letters)));
                translitWords.push(letters.map(wwTranslitLabel).join(''));
            });
        }
        return { todoWords, translitWords };
    }

    function wwRender() {
        const out = document.getElementById('ww-out');
        if (!out) return;
        const { translitWords } = wwBuild();
        const plan = composeColorPlan(wwFlatLetters(), wwColored ? null : { plain: true });
        out.innerHTML = plan.html;
        out.classList.toggle('cw-empty', plan.text.length === 0);
        const tr = document.getElementById('ww-translit');
        if (tr) tr.textContent = translitWords.join(' ');
    }

    // Меню выбора при сохранении картинки (цветными буквами / одним цветом).
    function wwSaveMenu() {
        const menu = document.getElementById('ww-save-menu');
        const tog = document.getElementById('ww-save-toggle');
        if (!menu) return;
        const open = menu.style.display !== 'none';
        menu.style.display = open ? 'none' : 'flex';
        if (tog) tog.setAttribute('aria-expanded', open ? 'false' : 'true');
    }
    function wwCloseSaveMenu() {
        const menu = document.getElementById('ww-save-menu');
        const tog = document.getElementById('ww-save-toggle');
        if (menu) menu.style.display = 'none';
        if (tog) tog.setAttribute('aria-expanded', 'false');
    }
    // Закрытие меню по клику вне его.
    document.addEventListener('click', function (e) {
        const wrap = document.getElementById('ww-save');
        if (wrap && !wrap.contains(e.target)) wwCloseSaveMenu();
    });

    function wwInsert(cyr) {
        const inp = document.getElementById('ww-input');
        if (!inp) return;
        inp.value += cyr;
        wwRender();
        inp.focus();
    }
    function wwBackspace() {
        const inp = document.getElementById('ww-input');
        if (!inp) return;
        // Галик-токен — это базовая буква + надстрочная цифра (¹²³); стираем целиком.
        const n = /[\u00b9\u00b2\u00b3]$/.test(inp.value) ? 2 : 1;
        inp.value = inp.value.slice(0, -n);
        wwRender();
        inp.focus();
    }
    function wwClear() {
        const inp = document.getElementById('ww-input');
        if (!inp) return;
        inp.value = '';
        wwRender();
        inp.focus();
    }

    async function wwSaveImage(mode, opts) {
        wwCloseSaveMenu();
        opts = opts || {};
        const transparent = !!opts.transparent;   // прозрачный фон — чтобы класть поверх фото
        const toClipboard = !!opts.copy;           // скопировать в буфер, а не скачивать файлом
        const colored = mode === 'color';
        const { translitWords } = wwBuild();
        // Раскладка по словам/буквам с раскраской (или одним цветом). plan.words —
        // массив слов, каждое — массив { ch, color }; этого хватает для рисования.
        const plan = composeColorPlan(wwFlatLetters(), colored ? { inline: wwPalette() } : null);
        if (!plan.words || !plan.words.length) { alert('Сначала напишите слово — поле пустое.'); return; }

        const FS = 96;                 // кегль тодо для картинки (для чёткости)
        const PAD = 48;
        const MAXH = 1700;             // высота столбца до переноса в следующий
        const WORDGAP = Math.round(FS * 0.45);   // зазор между словами в столбце
        const COLGAP = Math.round(FS * 0.35);    // зазор между столбцами
        const scale = Math.min(3, Math.max(2, Math.round(window.devicePixelRatio || 1)));

        const cs = getComputedStyle(document.body);
        const pick = (v, d) => { const s = (cs.getPropertyValue(v) || '').trim(); return s || d; };
        const bg = transparent ? 'transparent' : pick('--bg-secondary', '#f5f5f4');
        const fg = (!colored && opts.fg) ? opts.fg : pick('--text-primary', '#1c1917');
        const border = pick('--border', '#e7e5e4');
        const palette = colored ? wwPalette() : null;

        // Рисуем экранным шрифтом тодо ПРЯМО на canvas — дождёмся его готовности.
        try { await document.fonts.load(`${FS}px 'TodoPozdneyev'`); await document.fonts.ready; } catch (e) {}

        // Ключевая идея: НЕ используем SVG/<foreignObject> (там встроенный шрифт может
        // не успеть загрузиться при растеризации, и буквы «рассыпаются» в запасной
        // шрифт, плюс в Chrome «портится» canvas). Вместо этого рисуем сами: для знаков
        // с Vertical_Orientation=R вертикальное письмо (writing-mode:vertical-lr +
        // text-orientation:mixed) тождественно горизонтальной строке, повёрнутой на 90°
        // по часовой. Поэтому каждый столбец собираем горизонтальной полосой тем же
        // шрифтом (родные соединения/насадки глифов сохраняются), затем поворачиваем
        // растр полосы на 90° CW. Результат детерминированный и всегда цельный.
        const fontStr = `${FS}px 'TodoPozdneyev'`;
        const meas = document.createElement('canvas').getContext('2d'); meas.font = fontStr;
        const wordWidth = w => meas.measureText(w.map(c => c.ch).join('')).width;

        // Неразрывные слова укладываем в столбцы по высоте MAXH (перенос — только между
        // словами, как при writing-mode; внутри слова перенос недопустим — порвём связки).
        const cols = []; let cur = [], curLen = 0;
        for (const w of plan.words) {
            const wl = wordWidth(w);
            const add = (cur.length ? WORDGAP : 0) + wl;
            if (cur.length && curLen + add > MAXH) { cols.push(cur); cur = []; curLen = 0; }
            cur.push(w); curLen += (cur.length > 1 ? WORDGAP : 0) + wl;
        }
        if (cur.length) cols.push(cur);

        const stripLen = col => col.reduce((s, w, i) => s + (i ? WORDGAP : 0) + wordWidth(w), 0);
        const probe = meas.measureText('Нтог');
        const asc = Math.ceil(probe.actualBoundingBoxAscent || FS * 0.8) + 8;
        const desc = Math.ceil(probe.actualBoundingBoxDescent || FS * 0.3) + 8;
        const bandH = asc + desc;                       // толщина одного столбца на холсте
        const maxLen = Math.ceil(Math.max.apply(null, cols.map(stripLen).concat([1])));
        const innerW = cols.length * bandH + (cols.length - 1) * COLGAP;
        const innerH = maxLen;
        const W = innerW + PAD * 2, H = innerH + PAD * 2;

        const canvas = document.createElement('canvas');
        canvas.width = Math.round(W * scale);
        canvas.height = Math.round(H * scale);
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        if (!transparent) {
            ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = border; ctx.lineWidth = 1;
            ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
        }
        ctx.font = fontStr; ctx.textBaseline = 'alphabetic';

        // Столбцы идут слева направо (как vertical-lr). Каждый — горизонтальная полоса,
        // повёрнутая на 90° CW: левый край полосы становится верхом столбца.
        cols.forEach((col, ci) => {
            const len = Math.ceil(stripLen(col));
            const strip = document.createElement('canvas');
            strip.width = Math.max(1, Math.round(len * scale));
            strip.height = Math.round(bandH * scale);
            const sx = strip.getContext('2d');
            sx.scale(scale, scale);
            sx.font = fontStr; sx.textBaseline = 'alphabetic';
            let pen = 0;
            col.forEach((w, wi) => {
                if (wi) pen += WORDGAP;
                w.forEach(chobj => {
                    sx.fillStyle = palette ? palette[chobj.color % palette.length] : fg;
                    sx.fillText(chobj.ch, pen, asc);
                    pen += meas.measureText(chobj.ch).width;
                });
            });
            const colX = PAD + ci * (bandH + COLGAP);
            ctx.save();
            ctx.translate(colX + bandH, PAD);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(strip, 0, 0, len, bandH);
            ctx.restore();
        });

        // Имя файла — из транслитерации слов.
        let base = translitWords.join('_').replace(/[^\p{L}\p{N}_-]+/gu, '').slice(0, 40);
        if (!base) base = 'todo-bichig-' + new Date().toISOString().slice(0, 10);

        const triggerDownload = (href, ext, revoke) => {
            const a = document.createElement('a');
            a.href = href; a.download = base + ext;
            document.body.appendChild(a); a.click(); a.remove();
            if (revoke) setTimeout(() => URL.revokeObjectURL(href), 1500);
        };
        const copyBlob = async (blob) => {
            try {
                if (!navigator.clipboard || !window.ClipboardItem) return false;
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                return true;
            } catch (e) { return false; }
        };
        const deliverPng = async (blob) => {
            if (toClipboard) {
                if (await copyBlob(blob)) { alert('Картинка скопирована. Вставьте её (Ctrl/⌘+V) в редактор фото, историю или сообщение.'); return; }
                alert('Скопировать в буфер в этом браузере не получилось — сохраняю картинку файлом.');
            }
            triggerDownload(URL.createObjectURL(blob), '.png', true);
        };

        // Canvas с fillText НИКОГДА не «портится» — PNG доступен без откатов.
        if (canvas.toBlob) {
            canvas.toBlob(b => {
                if (b) { deliverPng(b); }
                else if (!toClipboard) { triggerDownload(canvas.toDataURL('image/png'), '.png', false); }
                else { alert('Не удалось создать картинку в этом браузере.'); }
            }, 'image/png');
        } else if (!toClipboard) {
            triggerDownload(canvas.toDataURL('image/png'), '.png', false);
        } else {
            alert('Копирование картинки не поддерживается в этом браузере.');
        }
    }

    function composeTap(iid) {
        if (composeState.answered) return;
        if (composeState.placed.includes(iid)) return;
        composeState.placed.push(iid);
        const fb = document.getElementById('cw-feedback');
        if (fb) { fb.textContent = ''; fb.className = 'cw-feedback'; }
        composeRender();
    }

    function composeRemoveAt(i) {
        if (composeState.answered) return;
        composeState.placed.splice(i, 1);
        composeRender();
    }

    function composeBackspace() {
        if (composeState.answered) return;
        composeState.placed.pop();
        composeRender();
    }

    function composeClear() {
        if (composeState.answered) return;
        composeState.placed = [];
        const fb = document.getElementById('cw-feedback');
        if (fb) { fb.textContent = ''; fb.className = 'cw-feedback'; }
        composeRender();
    }

    function composeIsCorrect() {
        const tileById = {};
        composeState.tiles.forEach(t => { tileById[t.iid] = t; });
        const target = composeWords[composeState.wi].ids;
        const got = composeState.placed.map(iid => tileById[iid].letter.idx);
        if (got.length !== target.length) return false;
        return got.every((id, i) => id === target[i]);
    }

    function composeCheck() {
        if (composeState.answered) return;
        const target = composeWords[composeState.wi].ids;
        const fb = document.getElementById('cw-feedback');
        if (composeState.placed.length === 0) {
            if (fb) { fb.textContent = 'Сначала выложите буквы.'; fb.className = 'cw-feedback'; }
            return;
        }
        const ok = composeIsCorrect();
        composeState.total++;
        if (ok) {
            composeState.correct++;
            composeState.answered = true;
            if (fb) { fb.textContent = '✓ Верно! Слово собрано правильно.'; fb.className = 'cw-feedback cw-fb-ok'; }
            const nx = document.getElementById('cw-next');
            if (nx) nx.style.display = '';
        } else {
            let msg = '✗ Не совсем — проверьте порядок букв.';
            if (composeState.placed.length !== target.length)
                msg = '✗ В слове ' + target.length + ' букв, а выложено ' + composeState.placed.length + '.';
            if (fb) { fb.textContent = msg; fb.className = 'cw-feedback cw-fb-bad'; }
        }
        composeUpdateStreak();
        composeRender();
    }

    function composeHint() {
        if (composeState.answered) return;
        // Находит первую плитку, дающую следующую правильную букву, и выкладывает её.
        const target = composeWords[composeState.wi].ids;
        const tileById = {};
        composeState.tiles.forEach(t => { tileById[t.iid] = t; });
        const pos = composeState.placed.length;
        if (pos >= target.length) return;
        // Если уже выложенное расходится с ответом — снимаем последнюю неверную букву.
        for (let i = 0; i < composeState.placed.length; i++) {
            if (tileById[composeState.placed[i]].letter.idx !== target[i]) {
                composeState.placed = composeState.placed.slice(0, i);
                break;
            }
        }
        const need = target[composeState.placed.length];
        const used = new Set(composeState.placed);
        const tile = composeState.order.find(iid => !used.has(iid) && tileById[iid].letter.idx === need);
        if (tile) composeState.placed.push(tile);
        const fb = document.getElementById('cw-feedback');
        if (fb) { fb.textContent = 'Подсказка: добавлена следующая буква.'; fb.className = 'cw-feedback'; }
        composeRender();
    }

    function composeReveal() {
        // Выкладывает слово целиком в правильном порядке.
        const target = composeWords[composeState.wi].ids;
        const tileById = {};
        composeState.tiles.forEach(t => { tileById[t.iid] = t; });
        const placed = [];
        const used = new Set();
        target.forEach(id => {
            const tile = composeState.order.find(iid => !used.has(iid) && tileById[iid].letter.idx === id);
            if (tile) { used.add(tile); placed.push(tile); }
        });
        composeState.placed = placed;
        composeState.answered = true;
        const fb = document.getElementById('cw-feedback');
        if (fb) { fb.textContent = 'Показан правильный ответ.'; fb.className = 'cw-feedback'; }
        const nx = document.getElementById('cw-next');
        if (nx) nx.style.display = '';
        composeRender();
    }

    function composeNext() {
        composeSetup(composeState.wi + 1);
        const sec = document.getElementById('section-compose_word');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function composePrev() {
        composeSetup(composeState.wi - 1);   // modulo в composeSetup корректно обрабатывает выход за 0
        const sec = document.getElementById('section-compose_word');
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function composeUpdateStreak() {
        const el = document.getElementById('cw-streak');
        if (el) el.textContent = 'Верно: ' + composeState.correct + ' / ' + composeState.total;
    }

    function renderSyllables() {
        const syls = charData.filter(c => c.category === 'syllables');
        // Группируем по сериям, сохраняя порядок появления.
        const order = [];
        const bySeries = {};
        syls.forEach(c => {
            const key = c.series || '—';
            if (!bySeries[key]) { bySeries[key] = { desc: c.seriesDesc, items: [] }; order.push(key); }
            if (!bySeries[key].desc && c.seriesDesc) bySeries[key].desc = c.seriesDesc;
            bySeries[key].items.push(c);
        });
        return order.map(key => {
            const g = bySeries[key];
            const descHtml = g.desc
                ? `<span class="syl-group-desc">${escapeHtml(g.desc)}</span>`
                : `<span class="syl-group-desc syl-group-desc--none">звуковая составляющая не указана</span>`;
            return `
                <div class="syl-group">
                    <div class="syl-group-head">
                        <span class="syl-group-series">${escapeHtml(key)}</span>
                        ${descHtml}
                        <span class="syl-group-count">${g.items.length}</span>
                    </div>
                    <div class="char-grid">
                        ${g.items.map(renderCard).join('')}
                    </div>
                </div>`;
        }).join('');
    }

    // Категории и их порядок в сводной таблице — используется также для навигации
    // «Пред./След.» по карточкам, открытым из сводной таблицы (ui.js).
    const SUMMARY_CATS = [
        { cat: 'vowels',      label: 'Гласные' },
        { cat: 'long_vowels', label: 'Долгие гласные' },
        { cat: 'diphthongs',  label: 'Дифтонги' },
        { cat: 'consonants',  label: 'Согласные' },
        { cat: 'galik',       label: 'Галики и заимствования' },
        { cat: 'special',     label: 'Специальные' },
        { cat: 'elements',    label: 'Элементы письма' },
        { cat: 'numbers',     label: 'Цифры' },
        { cat: 'punctuation', label: 'Пунктуация' }
    ];

    function renderSummary() {
        // Большая сводная таблица по четырём категориям алфавита.
        const groups = SUMMARY_CATS;
        const glyph = val => (val !== null && val !== undefined && val !== '')
            ? `<span class="sum-glyph" aria-hidden="true">${trimSpine(val)}</span>`
            : `<span class="sum-missing" aria-hidden="true">—</span>`;
        const bodyRows = groups.map(g => {
            const items = charData.filter(c => c.category === g.cat);
            const head = `
                <tr class="sum-group-row">
                    <td colspan="6">
                        <span class="sum-group-label">${escapeHtml(g.label)}</span>
                        <span class="sum-group-count">${items.length}</span>
                    </td>
                </tr>`;
            const rows = items.map(c => {
                const id  = c.id !== null && c.id !== undefined ? escapeHtml(String(c.id)) : '—';
                const cyr = c.cyrillic !== null && c.cyrillic !== undefined ? escapeHtml(String(c.cyrillic)) : '—';
                const lat = c.latin !== null && c.latin !== undefined && c.latin !== '' ? escapeHtml(String(c.latin)) : '—';
                // Имя строки-кнопки для скринридера (глифы в ячейках скрыты через aria-hidden).
                const aria = [];
                if (c.id !== null && c.id !== undefined) aria.push('буква № ' + c.id);
                if (c.cyrillic !== null && c.cyrillic !== undefined) aria.push('кириллица ' + c.cyrillic);
                if (c.latin !== null && c.latin !== undefined && c.latin !== '') aria.push('латиница ' + c.latin);
                const ariaLabel = (aria.join(', ') || 'буква') + '. Открыть карточку';
                return `
                    <tr class="sum-row" role="button" tabindex="0" aria-label="${escapeHtml(ariaLabel)}" onclick="openModal(${c.idx}, 'summary')">
                        <td class="sum-id">${id}</td>
                        <td class="sum-cyr">${cyr}</td>
                        <td class="sum-lat">${lat}</td>
                        <td>${glyph(c.initial)}</td>
                        <td>${glyph(c.medial)}</td>
                        <td>${glyph(c.final)}</td>
                    </tr>`;
            }).join('');
            return head + rows;
        }).join('');
        summaryZoomVal = loadSummaryZoom();
        const pct = Math.round(summaryZoomVal * 100) + '%';
        return `
            <div class="sum-board" id="sum-board" style="--sum-zoom:${summaryZoomVal}">
                <div class="sum-toolbar">
                    <div class="sum-toolgrp sum-zoom-group">
                        <span class="sum-tool-label">Размер</span>
                        <button type="button" class="sum-tool-btn sum-zoombtn" onclick="summaryZoom(-1)" aria-label="Уменьшить">−</button>
                        <span class="sum-zoom-label" id="sum-zoom-label">${pct}</span>
                        <button type="button" class="sum-tool-btn sum-zoombtn" onclick="summaryZoom(1)" aria-label="Увеличить">＋</button>
                        <button type="button" class="sum-tool-btn" onclick="summaryZoomReset()" title="Сбросить масштаб">Сброс</button>
                    </div>
                    <div class="sum-toolgrp">
                        <button type="button" class="sum-tool-btn sum-expand" id="sum-expand" onclick="summaryToggleExpand()">⤢ Развернуть</button>
                    </div>
                </div>
                <div class="sum-wrap">
                    <table class="sum-table">
                        <thead>
                            <tr>
                                <th>№</th><th>Кир.</th><th>Лат.</th>
                                <th>Начало</th><th>Середина</th><th>Конец</th>
                            </tr>
                        </thead>
                        <tbody>${bodyRows}</tbody>
                    </table>
                </div>
            </div>`;
    }

    // ── Сводная таблица: масштаб (зум) и полноэкранный режим ──────────────────
    const SUM_ZOOM = { min: 0.7, max: 2.5, step: 0.15, def: 1 };
    let summaryZoomVal = SUM_ZOOM.def;
    function loadSummaryZoom() {
        try {
            const v = parseFloat(localStorage.getItem('todo-summary-zoom'));
            if (isFinite(v) && v >= SUM_ZOOM.min && v <= SUM_ZOOM.max) return v;
        } catch (e) {}
        return SUM_ZOOM.def;
    }
    function applySummaryZoom() {
        const board = document.getElementById('sum-board');
        if (board) board.style.setProperty('--sum-zoom', summaryZoomVal);
        const lab = document.getElementById('sum-zoom-label');
        if (lab) lab.textContent = Math.round(summaryZoomVal * 100) + '%';
        try { localStorage.setItem('todo-summary-zoom', String(summaryZoomVal)); } catch (e) {}
    }
    function summaryZoom(dir) {
        const v = Math.round((summaryZoomVal + dir * SUM_ZOOM.step) * 100) / 100;
        summaryZoomVal = Math.min(SUM_ZOOM.max, Math.max(SUM_ZOOM.min, v));
        applySummaryZoom();
    }
    function summaryZoomReset() {
        summaryZoomVal = SUM_ZOOM.def;
        applySummaryZoom();
    }
    function summaryToggleExpand() {
        const board = document.getElementById('sum-board');
        if (!board) return;
        const on = board.classList.toggle('zoomed');
        document.body.style.overflow = on ? 'hidden' : '';
        const btn = document.getElementById('sum-expand');
        if (btn) btn.textContent = on ? '✕ Свернуть' : '⤢ Развернуть';
    }
    // Esc — выйти из полноэкранного режима сводной таблицы.
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        const board = document.getElementById('sum-board');
        if (board && board.classList.contains('zoomed')) summaryToggleExpand();
    });

    function renderCard(c, hl) {
        const idLabel = c.id !== null ? '#' + c.id : '—';
        const cyrLabel = c.cyrillic !== null ? String(c.cyrillic) : '—';
        const latLabel = c.latin !== null ? String(c.latin) : '';
        // Осмысленное имя карточки для скринридера (сами глифы — коды хак-шрифта,
        // их прячем через aria-hidden, иначе AT озвучит «апостроф-a», «dA» и т. п.).
        const aria = [];
        if (c.id !== null) aria.push('буква № ' + c.id);
        if (c.cyrillic !== null) aria.push('кириллица ' + c.cyrillic);
        if (c.latin !== null && c.latin !== '') aria.push('латиница ' + c.latin);
        const ariaLabel = (aria.join(', ') || 'буква') + '. Открыть карточку';
        // Подсветка совпадений в режиме поиска (hl = { tokens, note }); иначе просто экранируем.
        const tok = hl && hl.tokens;
        const idH  = tok ? highlightText(idLabel, tok)  : escapeHtml(idLabel);
        const cyrH = tok ? highlightText(cyrLabel, tok) : escapeHtml(cyrLabel);
        const latH = tok ? highlightText(latLabel, tok) : escapeHtml(latLabel);
        function formBox(label, val) {
            if (val !== null && val !== undefined)
                return `<div class="form-box"><div class="form-box-label">${label}</div><div class="form-box-char" aria-hidden="true">${trimSpine(val)}</div></div>`;
            return `<div class="form-box"><div class="form-box-label">${label}</div><div class="form-box-missing" aria-hidden="true">—</div></div>`;
        }
        return `
            <div class="char-card" role="button" tabindex="0" aria-label="${escapeHtml(ariaLabel)}" onclick="openModal(${c.idx})">
                <div class="card-top" aria-hidden="true">
                    <span class="card-id">${idH}</span>
                    <span class="card-cyr">${cyrH}</span>
                    <span class="card-latin">${latH}</span>
                </div>
                <div class="card-display">
                    ${formBox('Начало', c.initial)}
                    ${formBox('Середина', c.medial)}
                    ${formBox('Конец', c.final)}
                </div>
                ${hl && hl.note ? `<div class="card-note">${hl.note}</div>` : ''}
            </div>`;
    }

    // ============================================================
    // РАЗДЕЛ «ЧТЕНИЕ» — связные тексты пособия «Цаһан толһа»
    // ============================================================
    // Источник: перенабор А. Оргаева (шрифт BarinTodo). Строки в readingData —
    // позиционная кодировка письма Тодо под этот шрифт; отображаются вертикально
    // (writing-mode: vertical-lr; text-orientation: mixed). Эта раскладка иная,
    // чем у TodoPozdneyev (силлабарий/атлас), поэтому раздел рендерится своим
    // шрифтом 'BarinTodo' и не пересекается с остальным сайтом.

    // Жанровые вкладки внутри раздела.
    const READING_TABS = [
        { id: 'expr',     label: 'Краткие выражения' },
        { id: 'riddles',  label: 'Загадки' }
        // Прочие вкладки временно скрыты: набраны шрифтом BarinTodo и пока
        // не вписываются в логику сайта. Данные (reading-data.js) и рендер-функции
        // сохранены — чтобы вернуть, добавьте записи обратно:
        //   { id: 'proverbs', label: 'Пословицы' },
        //   { id: 'songs',    label: 'Песни' },
        //   { id: 'blessing', label: 'Йорял' },
        //   { id: 'tale',     label: 'Сказка' }
    ];

    // Каждый фрагмент = объект {td, km, tr, ru}: тодо, калмыцкая форма, транслитерация, перевод.
    // Транслитерация и перевод показываются под текстом и переключаются галочками.

    // Перевод (или «—», если поле ru пустое).
    function rdRu(ru) {
        const v = (ru && ru.trim()) ? escapeHtml(ru) : '<span class="rd-empty">—</span>';
        return `<div class="rd-ru">${v}</div>`;
    }
    // Строка транслитерации.
    function rdTr(tr) {
        return `<div class="rd-tr">${escapeHtml(tr || '')}</div>`;
    }
    // Современная калмыцкая форма (кириллица).
    function rdKm(km) {
        return `<div class="rd-km">${escapeHtml(km || '')}</div>`;
    }

    // Оборачивает каждое «слово» (по пробелам) текста тодо в неразрывный блок
    // (display:inline-block), чтобы при переносе обтекающего текста в новый
    // вертикальный столбец (white-space: normal) перенос происходил ТОЛЬКО
    // между словами, а не между буквами внутри слова. Без этого одно слово
    // могло попасть на границу столбца и визуально «развалиться» пополам —
    // выглядит как «шрифт ломается», хотя сами глифы отрисовываются верно.
    function rdTodoWords(td) {
        return String(td || '').split(' ').map(w =>
            w ? `<span class="rd-todo-word">${escapeHtml(w)}</span>` : '').join(' ');
    }

    // Группа строк (стих, пословица, строфа): столбцы Тодо слева направо,
    // под ними — транслитерация построчно, затем перевод.
    function rdGroup(lines, ru) {
        const todo = `<div class="rd-lines">${lines.map(l =>
            `<div class="rd-todo rd-line" aria-hidden="true">${escapeHtml(l.td)}</div>`).join('')}</div>`;
        const tr = `<div class="rd-tr-block">${lines.map(l => rdTr(l.tr)).join('')}</div>`;
        return `${todo}${tr}${rdRu(ru)}`;
    }

    function renderReadingExpr() {
        // Краткие выражения: текст в кодировке TodoPozdneyev — рисуем шрифтом
        // 'TodoPozdneyev'. Карточка показывает весь текст и растёт под него; клик
        // открывает её крупно (openExprCard), а чипы внизу скрывают/показывают
        // строки (калмыцкая форма / латиница / перевод) на самой карточке.
        return `<div class="rd-grid">${readingData.expr.map((p, i) =>
            `<div class="rd-cell rd-cell-expr" role="button" tabindex="0"
                  aria-label="Открыть крупно: ${escapeHtml(p.ru || p.tr)}"
                  onclick="openExprCard(${i})"
                  onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openExprCard(${i});}">
                <div class="rd-todo rd-todo-pozd rd-line" aria-hidden="true">${escapeHtml(p.td)}</div>
                ${rdKm(p.km)}${rdTr(p.tr)}${rdRu(p.ru)}
                <div class="rd-cell-toggles" onclick="event.stopPropagation()" onkeydown="event.stopPropagation()">
                    <button type="button" class="rd-chip" aria-pressed="true" title="Калмыцкая форма"
                            onclick="exprToggleLine(this,'km')">Калм.</button>
                    <button type="button" class="rd-chip" aria-pressed="true" title="Транслитерация"
                            onclick="exprToggleLine(this,'tr')">Лат.</button>
                    <button type="button" class="rd-chip" aria-pressed="true" title="Перевод"
                            onclick="exprToggleLine(this,'ru')">Рус.</button>
                </div>
                <span class="rd-zoom-hint" aria-hidden="true">⤢</span>
            </div>`).join('')}</div>`;
    }

    function renderReadingRiddles() {
        // Загадки из Zagadki.xlsx: набраны шрифтом TodoPozdneyev (та же кодировка,
        // что и «Краткие выражения»), в отличие от остальных вкладок раздела «Чтение».
        // У каждой загадки есть современная калмыцкая форма (km) — показываем и её.
        // Карточка кликабельна целиком (открывает крупный лайтбокс), кроме кнопки
        // «Показать отгадку» и самой отгадки — на них клик не всплывает наверх.
        return `<div class="rd-riddle-grid">${readingData.riddles.map((r, i) => `
            <div class="rd-riddle" role="button" tabindex="0"
                 aria-label="Открыть крупно загадку №${i + 1}"
                 onclick="openRiddleCard(${i})"
                 onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openRiddleCard(${i});}">
                <div class="rd-riddle-num" aria-hidden="true">№${i + 1}</div>
                <div class="rd-riddle-q">
                    <div class="rd-todo rd-todo-pozd rd-prose" aria-hidden="true">${rdTodoWords(r.q.td)}</div>
                    ${rdKm(r.q.km)}${rdTr(r.q.tr)}${rdRu(r.ru)}
                </div>
                <button type="button" class="rd-reveal-btn" aria-expanded="false"
                        onclick="event.stopPropagation();readingRevealAnswer(this)">Показать отгадку</button>
                <div class="rd-riddle-a" hidden onclick="event.stopPropagation()">
                    <div class="rd-riddle-a-inner">
                        <div class="rd-todo rd-todo-pozd rd-line" aria-hidden="true">${escapeHtml(r.a.td)}</div>
                        ${rdKm(r.a.km)}${rdTr(r.a.tr)}${rdRu(r.a.ru)}
                    </div>
                </div>
                <span class="rd-zoom-hint" aria-hidden="true">⤢</span>
            </div>`).join('')}</div>`;
    }

    function renderReadingProverbs() {
        return `<div class="rd-block-grid">${readingData.proverbs.map(p =>
            `<div class="rd-block">${rdGroup(p.lines, p.ru)}</div>`).join('')}</div>`;
    }

    function renderReadingSongs() {
        return readingData.songs.map(s => `
            <div class="rd-song">
                <div class="rd-song-title">${escapeHtml(s.title)}</div>
                <div class="rd-block-grid">
                    ${s.stanzas.map(st => `<div class="rd-block">${rdGroup(st.lines, st.ru)}</div>`).join('')}
                </div>
            </div>`).join('');
    }

    function renderReadingBlessing() {
        const b = readingData.blessing;
        return `<div class="rd-block-grid"><div class="rd-block rd-block-wide">${rdGroup(b.lines, b.ru)}</div></div>`;
    }

    function renderReadingTale() {
        // Проза: абзац Тодо сам перетекает в столбцы; под ним транслитерация и перевод.
        return `<div class="rd-tale">${readingData.tale.map(p => `
            <div class="rd-tale-para">
                <div class="rd-todo rd-prose" aria-hidden="true">${escapeHtml(p.td)}</div>
                <div class="rd-tr rd-tr-prose">${escapeHtml(p.tr || '')}</div>
                ${rdRu(p.ru)}
            </div>`).join('')}</div>`;
    }

    function renderReadingPane(id) {
        switch (id) {
            case 'expr':     return renderReadingExpr();
            case 'riddles':  return renderReadingRiddles();
            case 'proverbs': return renderReadingProverbs();
            case 'songs':    return renderReadingSongs();
            case 'blessing': return renderReadingBlessing();
            case 'tale':     return renderReadingTale();
            default:         return '';
        }
    }

    function renderReading() {
        const subnav = READING_TABS.map((t, i) =>
            `<button type="button" class="rd-tab ${i === 0 ? 'active' : ''}" data-rd="${t.id}"
                     onclick="readingTab('${t.id}')">${t.label}</button>`).join('');
        const panes = READING_TABS.map((t, i) =>
            `<div class="rd-pane" id="rd-pane-${t.id}"${i === 0 ? '' : ' hidden'}>${renderReadingPane(t.id)}</div>`).join('');
        // Начальное состояние переключателей берём из localStorage (по умолчанию — показано).
        let showKm = true, showTr = true, showRu = true;
        try {
            showKm = (localStorage.getItem('tb-rd-km') ?? '1') === '1';
            showTr = (localStorage.getItem('tb-rd-tr') ?? '1') === '1';
            showRu = (localStorage.getItem('tb-rd-ru') ?? '1') === '1';
        } catch (e) {}
        const rootCls = `rd-root${showKm ? '' : ' rd-hide-km'}${showTr ? '' : ' rd-hide-tr'}${showRu ? '' : ' rd-hide-ru'}`;
        return `
            <div class="rd-note">Тексты письмом Тодо набраны по пособию «Цаһан толһа» (Очр Номт; перенабор А. Оргаева).
            Читаются вертикально, столбцы — слева направо. Транслитерация и перевод — черновые (первый проход), их можно дополнять.</div>
            <div class="${rootCls}">
                <div class="rd-controls">
                    <label class="rd-toggle"><input type="checkbox" id="rd-show-km"${showKm ? ' checked' : ''}
                        onchange="readingToggle('km', this.checked)"> Калмыцкая форма</label>
                    <label class="rd-toggle"><input type="checkbox" id="rd-show-tr"${showTr ? ' checked' : ''}
                        onchange="readingToggle('tr', this.checked)"> Транслитерация</label>
                    <label class="rd-toggle"><input type="checkbox" id="rd-show-ru"${showRu ? ' checked' : ''}
                        onchange="readingToggle('ru', this.checked)"> Перевод</label>
                </div>
                <div class="rd-subnav" role="tablist"${READING_TABS.length > 1 ? '' : ' hidden'}>${subnav}</div>
                ${panes}
            </div>`;
    }

    // Показ/скрытие транслитерации ('tr') или перевода ('ru') во всём разделе.
    function readingToggle(which, on) {
        const root = document.querySelector('.rd-root');
        if (root) root.classList.toggle('rd-hide-' + which, !on);
        try { localStorage.setItem('tb-rd-' + which, on ? '1' : '0'); } catch (e) {}
    }

    // Переключение жанровой вкладки внутри раздела «Чтение».
    function readingTab(id) {
        document.querySelectorAll('.rd-tab').forEach(b =>
            b.classList.toggle('active', b.getAttribute('data-rd') === id));
        document.querySelectorAll('.rd-pane').forEach(p =>
            p.hidden = (p.id !== 'rd-pane-' + id));
    }

    // Раскрытие отгадки загадки.
    function readingRevealAnswer(btn) {
        const ans = btn.parentElement.querySelector('.rd-riddle-a');
        const open = ans.hidden;
        ans.hidden = !open;
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = open ? 'Скрыть отгадку' : 'Показать отгадку';
    }

    // Скрыть/показать строку (km/tr/ru) на конкретной карточке-свитке.
    // Не открывает лайтбокс (клик по чипам гасится в разметке).
    function exprToggleLine(btn, field) {
        const cell = btn.closest('.rd-cell-expr');
        if (!cell) return;
        const hidden = cell.classList.toggle('rd-cell-hide-' + field);
        btn.classList.toggle('off', hidden);
        btn.setAttribute('aria-pressed', hidden ? 'false' : 'true');
    }

    // ============================================================
    // Лайтбокс «Краткие выражения» — открыть карточку крупно
    // Изолирован от модалки букв; столбец тодо рисуется TodoPozdneyev.
    // ============================================================
    var exprLbIndex = 0;
    var exprLbReturnFocus = null;

    function exprList() {
        return (typeof readingData !== 'undefined' && readingData.expr) ? readingData.expr : [];
    }

    function exprEnsureLightbox() {
        if (document.getElementById('expr-lb')) return;
        const ov = document.createElement('div');
        ov.className = 'expr-lb-overlay';
        ov.id = 'expr-lb';
        ov.setAttribute('role', 'dialog');
        ov.setAttribute('aria-modal', 'true');
        ov.setAttribute('aria-label', 'Краткое выражение');
        ov.innerHTML =
            '<button type="button" class="expr-lb-close" aria-label="Закрыть">&times;</button>' +
            '<button type="button" class="expr-lb-nav expr-lb-prev" aria-label="Предыдущее выражение">&#8249;</button>' +
            '<div class="expr-lb-card">' +
              '<div class="expr-lb-todo rd-todo-pozd" id="expr-lb-todo" aria-hidden="true"></div>' +
              '<div class="expr-lb-meta">' +
                '<div class="expr-lb-km" id="expr-lb-km"></div>' +
                '<div class="expr-lb-ru" id="expr-lb-ru"></div>' +
                '<div class="expr-lb-tr" id="expr-lb-tr"></div>' +
                '<div class="expr-lb-count" id="expr-lb-count"></div>' +
              '</div>' +
            '</div>' +
            '<button type="button" class="expr-lb-nav expr-lb-next" aria-label="Следующее выражение">&#8250;</button>';
        document.body.appendChild(ov);
        ov.addEventListener('click', function (e) { if (e.target === ov) closeExprCard(); });
        ov.querySelector('.expr-lb-close').addEventListener('click', closeExprCard);
        ov.querySelector('.expr-lb-prev').addEventListener('click', function () { exprCardStep(-1); });
        ov.querySelector('.expr-lb-next').addEventListener('click', function () { exprCardStep(1); });
    }

    function exprLbKeydown(e) {
        if (e.key === 'Escape') closeExprCard();
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); exprCardStep(-1); }
        else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); exprCardStep(1); }
    }

    function renderExprCard() {
        const list = exprList();
        const p = list[exprLbIndex];
        if (!p) return;
        const td = document.getElementById('expr-lb-todo');
        const km = document.getElementById('expr-lb-km');
        const ru = document.getElementById('expr-lb-ru');
        const tr = document.getElementById('expr-lb-tr');
        const cnt = document.getElementById('expr-lb-count');
        if (td) td.textContent = p.td || '';
        if (km) km.textContent = p.km || '';
        if (ru) ru.textContent = p.ru || '';
        if (tr) tr.textContent = p.tr || '';
        if (cnt) cnt.textContent = (exprLbIndex + 1) + ' / ' + list.length;
    }

    // Открыть карточку выражения крупно (вызывается из onclick сетки).
    function openExprCard(idx) {
        const list = exprList();
        if (!list.length) return;
        exprEnsureLightbox();
        exprLbReturnFocus = document.activeElement;
        exprLbIndex = ((idx % list.length) + list.length) % list.length;
        renderExprCard();
        const ov = document.getElementById('expr-lb');
        ov.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', exprLbKeydown);
        const closeBtn = ov.querySelector('.expr-lb-close');
        if (closeBtn) closeBtn.focus();
    }

    // Листание ±1 (стрелки/клавиатура), по кругу.
    function exprCardStep(d) {
        const list = exprList();
        if (!list.length) return;
        exprLbIndex = (((exprLbIndex + d) % list.length) + list.length) % list.length;
        renderExprCard();
    }

    function closeExprCard() {
        const ov = document.getElementById('expr-lb');
        if (ov) ov.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', exprLbKeydown);
        if (exprLbReturnFocus && typeof exprLbReturnFocus.focus === 'function') {
            try { exprLbReturnFocus.focus(); } catch (e) {}
        }
        exprLbReturnFocus = null;
    }

    // ============================================================
    // Лайтбокс «Загадки» — открыть загадку крупно, с кнопкой «Показать отгадку»
    // внутри. Переиспользует базовую разметку/стили expr-lb-overlay,
    // но со своим id и элементами, не пересекается с лайтбоксом выражений.
    // ============================================================
    var riddleLbIndex = 0;
    var riddleLbReturnFocus = null;
    var riddleLbAnswerShown = false;

    function riddleList() {
        return (typeof readingData !== 'undefined' && readingData.riddles) ? readingData.riddles : [];
    }

    function riddleEnsureLightbox() {
        if (document.getElementById('riddle-lb')) return;
        const ov = document.createElement('div');
        ov.className = 'expr-lb-overlay';
        ov.id = 'riddle-lb';
        ov.setAttribute('role', 'dialog');
        ov.setAttribute('aria-modal', 'true');
        ov.setAttribute('aria-label', 'Загадка');
        ov.innerHTML =
            '<button type="button" class="expr-lb-close" aria-label="Закрыть">&times;</button>' +
            '<button type="button" class="expr-lb-nav expr-lb-prev" aria-label="Предыдущая загадка">&#8249;</button>' +
            '<div class="expr-lb-card riddle-lb-card" id="riddle-lb-card">' +
              '<div class="riddle-lb-top">' +
                '<div class="riddle-lb-count" id="riddle-lb-count"></div>' +
                '<div class="riddle-lb-zoom-group">' +
                  '<span class="riddle-lb-zoom-label-text">Размер</span>' +
                  '<button type="button" class="sum-tool-btn riddle-lb-zoombtn" id="riddle-lb-zoom-minus" aria-label="Уменьшить текст">−</button>' +
                  '<span class="sum-zoom-label" id="riddle-lb-zoom-label"></span>' +
                  '<button type="button" class="sum-tool-btn riddle-lb-zoombtn" id="riddle-lb-zoom-plus" aria-label="Увеличить текст">＋</button>' +
                '</div>' +
              '</div>' +
              '<div class="expr-lb-todo riddle-lb-todo rd-todo-pozd" id="riddle-lb-todo" aria-hidden="true"></div>' +
              '<div class="expr-lb-meta">' +
                '<div class="expr-lb-km" id="riddle-lb-km"></div>' +
                '<div class="expr-lb-tr riddle-lb-tr" id="riddle-lb-tr"></div>' +
                '<div class="expr-lb-ru riddle-lb-ru" id="riddle-lb-ru"></div>' +
              '</div>' +
              '<button type="button" class="rd-reveal-btn" id="riddle-lb-reveal" aria-expanded="false">Показать отгадку</button>' +
              '<div class="riddle-lb-answer" id="riddle-lb-answer" hidden>' +
                '<div class="expr-lb-todo riddle-lb-todo-a rd-todo-pozd" id="riddle-lb-a-todo" aria-hidden="true"></div>' +
                '<div class="expr-lb-meta">' +
                  '<div class="expr-lb-km" id="riddle-lb-a-km"></div>' +
                  '<div class="expr-lb-tr riddle-lb-tr" id="riddle-lb-a-tr"></div>' +
                  '<div class="expr-lb-ru riddle-lb-ru" id="riddle-lb-a-ru"></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<button type="button" class="expr-lb-nav expr-lb-next" aria-label="Следующая загадка">&#8250;</button>';
        document.body.appendChild(ov);
        ov.addEventListener('click', function (e) { if (e.target === ov) closeRiddleCard(); });
        ov.querySelector('.expr-lb-close').addEventListener('click', closeRiddleCard);
        ov.querySelector('.expr-lb-prev').addEventListener('click', function () { riddleCardStep(-1); });
        ov.querySelector('.expr-lb-next').addEventListener('click', function () { riddleCardStep(1); });
        ov.querySelector('#riddle-lb-reveal').addEventListener('click', toggleRiddleLbAnswer);
        ov.querySelector('#riddle-lb-zoom-minus').addEventListener('click', function () { riddleZoom(-1); });
        ov.querySelector('#riddle-lb-zoom-plus').addEventListener('click', function () { riddleZoom(1); });
        applyRiddleZoom();
    }

    // ── Загадки: масштаб текста внутри лайтбокса (тот же приём, что и у
    // сводной таблицы букв — CSS-переменная + localStorage) ──────────────
    const RIDDLE_ZOOM = { min: 0.7, max: 2, step: 0.15, def: 1 };
    let riddleZoomVal = RIDDLE_ZOOM.def;
    function loadRiddleZoom() {
        try {
            const v = parseFloat(localStorage.getItem('todo-riddle-zoom'));
            if (isFinite(v) && v >= RIDDLE_ZOOM.min && v <= RIDDLE_ZOOM.max) return v;
        } catch (e) {}
        return RIDDLE_ZOOM.def;
    }
    riddleZoomVal = loadRiddleZoom();
    function applyRiddleZoom() {
        const card = document.getElementById('riddle-lb-card');
        if (card) card.style.setProperty('--riddle-zoom', riddleZoomVal);
        const lab = document.getElementById('riddle-lb-zoom-label');
        if (lab) lab.textContent = Math.round(riddleZoomVal * 100) + '%';
        try { localStorage.setItem('todo-riddle-zoom', String(riddleZoomVal)); } catch (e) {}
    }
    function riddleZoom(dir) {
        const v = Math.round((riddleZoomVal + dir * RIDDLE_ZOOM.step) * 100) / 100;
        riddleZoomVal = Math.min(RIDDLE_ZOOM.max, Math.max(RIDDLE_ZOOM.min, v));
        applyRiddleZoom();
    }

    // Показать/скрыть отгадку внутри лайтбокса.
    function toggleRiddleLbAnswer() {
        riddleLbAnswerShown = !riddleLbAnswerShown;
        const ans = document.getElementById('riddle-lb-answer');
        const btn = document.getElementById('riddle-lb-reveal');
        if (ans) ans.hidden = !riddleLbAnswerShown;
        if (btn) {
            btn.setAttribute('aria-expanded', riddleLbAnswerShown ? 'true' : 'false');
            btn.textContent = riddleLbAnswerShown ? 'Скрыть отгадку' : 'Показать отгадку';
        }
    }

    function riddleLbKeydown(e) {
        if (e.key === 'Escape') closeRiddleCard();
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); riddleCardStep(-1); }
        else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); riddleCardStep(1); }
    }

    function renderRiddleCard() {
        const list = riddleList();
        const r = list[riddleLbIndex];
        if (!r) return;
        const qTodo = document.getElementById('riddle-lb-todo');
        const qKm = document.getElementById('riddle-lb-km');
        const qTr = document.getElementById('riddle-lb-tr');
        const qRu = document.getElementById('riddle-lb-ru');
        const cnt = document.getElementById('riddle-lb-count');
        if (qTodo) qTodo.innerHTML = rdTodoWords(r.q.td);
        if (qKm) qKm.textContent = r.q.km || '';
        if (qTr) qTr.textContent = r.q.tr || '';
        if (qRu) qRu.textContent = r.ru || '';
        if (cnt) cnt.textContent = 'Загадка ' + (riddleLbIndex + 1) + ' / ' + list.length;

        const aTodo = document.getElementById('riddle-lb-a-todo');
        const aKm = document.getElementById('riddle-lb-a-km');
        const aTr = document.getElementById('riddle-lb-a-tr');
        const aRu = document.getElementById('riddle-lb-a-ru');
        if (aTodo) aTodo.innerHTML = rdTodoWords(r.a.td);
        if (aKm) aKm.textContent = r.a.km || '';
        if (aTr) aTr.textContent = r.a.tr || '';
        if (aRu) aRu.textContent = r.a.ru || '';

        // При каждом открытии/переключении загадки отгадка снова скрыта.
        riddleLbAnswerShown = false;
        const ans = document.getElementById('riddle-lb-answer');
        const btn = document.getElementById('riddle-lb-reveal');
        if (ans) ans.hidden = true;
        if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Показать отгадку'; }
    }

    // Открыть загадку крупно (вызывается из onclick сетки).
    function openRiddleCard(idx) {
        const list = riddleList();
        if (!list.length) return;
        riddleEnsureLightbox();
        riddleLbReturnFocus = document.activeElement;
        riddleLbIndex = ((idx % list.length) + list.length) % list.length;
        renderRiddleCard();
        const ov = document.getElementById('riddle-lb');
        ov.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', riddleLbKeydown);
        const closeBtn = ov.querySelector('.expr-lb-close');
        if (closeBtn) closeBtn.focus();
    }

    // Листание ±1 (стрелки/клавиатура), по кругу.
    function riddleCardStep(d) {
        const list = riddleList();
        if (!list.length) return;
        riddleLbIndex = (((riddleLbIndex + d) % list.length) + list.length) % list.length;
        renderRiddleCard();
    }

    function closeRiddleCard() {
        const ov = document.getElementById('riddle-lb');
        if (ov) ov.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', riddleLbKeydown);
        if (riddleLbReturnFocus && typeof riddleLbReturnFocus.focus === 'function') {
            try { riddleLbReturnFocus.focus(); } catch (e) {}
        }
        riddleLbReturnFocus = null;
    }
