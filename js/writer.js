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

    // Iframe растёт по контенту. Потолок выше — страница чуть длиннее снаружи,
    // зато глиф целиком в холсте и iframe не обрезает его внутренней прокруткой.
    function writerHeightCap() {
        let soft = 1280;
        try {
            if (window.matchMedia('(max-width: 640px)').matches) soft = 1080;
        } catch (e) {}
        return soft;
    }

    function sizeWriterFrame(contentH) {
        const frame = document.getElementById('writer-frame');
        if (!frame) return;
        let floor = 640;
        try {
            if (window.matchMedia('(max-width: 640px)').matches) floor = 520;
        } catch (e) {}
        const want = Math.ceil(contentH) + 20;
        const maxH = writerHeightCap();
        frame.style.height = Math.min(maxH, Math.max(floor, want)) + 'px';
    }

    // Сообщения от тренажёра.
    window.addEventListener('message', function (e) {
        const data = e && e.data;
        if (!data) return;

        if (data.__todoWriterReady) {
            const frame = document.getElementById('writer-frame');
            if (frame && frame.contentWindow) {
                let theme = 'light';
                try { theme = document.documentElement.getAttribute('data-theme') || 'light'; } catch (e) {}
                frame.contentWindow.postMessage({ __todoTheme: theme }, '*');
            }
            return;
        }

        if (typeof data.__todoWriterHeight === 'number') {
            sizeWriterFrame(data.__todoWriterHeight);
        }
    });

    function fitWriterFrame() {
        const frame = document.getElementById('writer-frame');
        if (!frame) return;
        const cur = parseInt(frame.style.height, 10);
        if (!Number.isFinite(cur)) return;
        const maxH = writerHeightCap();
        if (cur > maxH) frame.style.height = maxH + 'px';
    }

    window.addEventListener('resize', fitWriterFrame);
