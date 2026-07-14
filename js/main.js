/* main.js — точка входа: глобальные слушатели клавиш, инициализация темы и запуск
   приложения. Подключается ПОСЛЕДНИМ, когда все функции уже определены. */


    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (typeof activeHarmonySection === 'function' && activeHarmonySection()) {
                const next = document.getElementById('harmony-next');
                if (next && next.style.display !== 'none') harmonyNext();
                return;
            }
            const sc = activePracticeScope();
            if (sc) checkAnswer(sc);
        }
    });

    // Клавиши 1–4(9) выбирают соответствующий вариант ответа (единственный способ
    // ответа теперь — «выбор из 4»; ручной ввод убран как непрактичный).
    document.addEventListener('keydown', function(e) {
        if (e.key < '1' || e.key > '9') return;
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        if (typeof activeHarmonySection === 'function' && activeHarmonySection()) {
            const box = document.getElementById('harmony-choices');
            if (box) {
                const btns = box.querySelectorAll('.choice-btn');
                const i = parseInt(e.key, 10) - 1;
                if (i >= 0 && i < btns.length && !btns[i].disabled) { e.preventDefault(); btns[i].click(); }
            }
            return;
        }
        const sc = activePracticeScope();
        if (!sc) return;
        const box = document.getElementById('practice-choices__' + sc);
        if (!box) return;
        const btns = box.querySelectorAll('.choice-btn');
        const i = parseInt(e.key, 10) - 1;
        if (i >= 0 && i < btns.length && !btns[i].disabled) { e.preventDefault(); btns[i].click(); }
    });

    // Клавиатурная активация для «кнопок» и «ссылок», собранных из неинтерактивных
    // тегов (div-карточки, строки таблицы, <a> без href). Делегирование на document —
    // один обработчик вместо дублирования onkeydown в каждой карточке, и работает для
    // элементов, которые ещё будут отрисованы. Нативные button/input/select/a[href]
    // сюда не попадают: браузер обрабатывает их сам, и у них нет role="button|link".
    document.addEventListener('keydown', function (e) {
        const isEnter = e.key === 'Enter';
        const isSpace = e.key === ' ' || e.key === 'Spacebar';
        if (!isEnter && !isSpace) return;
        const el = e.target.closest('[role="button"], [role="link"]');
        if (!el) return;
        // role="link" активируется только по Enter (как настоящая ссылка),
        // role="button" — по Enter и Пробелу.
        if (el.getAttribute('role') === 'link' && !isEnter) return;
        e.preventDefault();        // пробел не должен прокручивать страницу
        el.click();                // переиспользуем существующий onclick
    });


    (function() {
        let saved = null;
        try { saved = localStorage.getItem('todo-theme'); } catch (e) { saved = null; }
        if (saved === 'dark' || saved === 'light') {
            applyTheme(saved);
        } else {
            let prefersDark = false;
            try { prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
            applyTheme(prefersDark ? 'dark' : 'light');
        }
    })();
    applyGlyphAccent(loadGlyphAccent());

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        const overlay = document.getElementById('modal-overlay');
        if (overlay && overlay.classList.contains('active')) { closeModal(); return; }
        const b = document.getElementById('cb-board');
        if (b && b.classList.contains('zoomed')) cbToggleZoom();
    });

    renderNavTabs();
    renderSections();
    initSearch();
    const searchInp = document.getElementById('search-input');
    if (searchInp) searchInp.addEventListener('input', runSearchDebounced);
    initCopybook();
    updateHomeProgress();
