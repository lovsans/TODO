/* writer.js — встроенный автономный тренажёр письма (раздел «Направление письма»).
   Страница тренажёра в writer.html, подключается в iframe при старте приложения. */

    // Монтирует тренажёр в iframe один раз: ставит src на отдельный файл.
    // Тема передаётся тремя путями, дополняющими друг друга:
    //   1) ?theme= в URL — нужен для первого кадра без «мигания» светлой палитры,
    //      пока iframe ещё не догрузился (значение «замораживается» на момент монтирования);
    //   2) postMessage({__todoTheme}) из applyTheme — мгновенно меняет тему уже
    //      загруженного тренажёра при переключении;
    //   3) «рукопожатие» __todoWriterReady (см. слушатель ниже) — тренажёр сообщает,
    //      что готов, и мы заново отдаём ему актуальную тему. Это страхует от гонки:
    //      если пользователь переключил тему, пока iframe ещё грузился, postMessage из
    //      п.2 мог уйти «в пустоту» (слушатель в тренажёре ещё не существовал), и iframe
    //      остался бы со старым значением из ?theme=. Хендшейк гарантирует ресинхронизацию
    //      после каждой (пере)загрузки независимо от момента переключения.
    function mountWriter() {
        const frame = document.getElementById('writer-frame');
        if (!frame || frame.dataset.mounted) return;     // монтируем только один раз
        frame.dataset.mounted = '1';
        let theme = 'light';
        try { theme = document.documentElement.getAttribute('data-theme') || 'light'; } catch (e) {}
        frame.src = 'writer.html?theme=' + theme;
    }

    // Сообщения от тренажёра. Обрабатываем два типа:
    //   • __todoWriterHeight — авто-высота iframe, чтобы не было двойной прокрутки;
    //   • __todoWriterReady  — тренажёр загрузился и готов принять тему: отдаём ему
    //     актуальное значение data-theme. Это ресинхронизация на случай, если
    //     переключение темы произошло во время загрузки iframe (см. mountWriter).
    window.addEventListener('message', function (e) {
        const data = e && e.data;
        if (!data) return;

        // Тренажёр сообщил, что готов — пересылаем ему текущую тему.
        if (data.__todoWriterReady) {
            const frame = document.getElementById('writer-frame');
            if (frame && frame.contentWindow) {
                let theme = 'light';
                try { theme = document.documentElement.getAttribute('data-theme') || 'light'; } catch (e) {}
                frame.contentWindow.postMessage({ __todoTheme: theme }, '*');
            }
            return;
        }

        // Авто-высота iframe.
        if (typeof data.__todoWriterHeight === 'number') {
            const frame = document.getElementById('writer-frame');
            if (frame) {
                let floor = 560;
                try {
                    if (window.matchMedia('(max-width: 640px)').matches) floor = 420;
                } catch (e) {}
                frame.style.height = Math.max(floor, Math.ceil(data.__todoWriterHeight) + 8) + 'px';
            }
        }
    });
